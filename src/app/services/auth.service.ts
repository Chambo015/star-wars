import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FbAuthResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private стрим для работы с next
  // public стрим чтобы читать из вне
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated$.asObservable();

  private _error$ = new BehaviorSubject<string>('');
  public error$ = this._error$.asObservable();

  // Для переключение форм входа или рег
  private _isLogin$ = new BehaviorSubject<boolean>(true);
  public isLogin$ = this._isLogin$.asObservable();
  isLogin(boolean: boolean) {
    this._isLogin$.next(boolean);
  }

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const tokenExpires = localStorage.getItem('fb-token-expires');

    if (tokenExpires) {
      const expDate = new Date(tokenExpires);
      if (Date.now() > +expDate) {
        this.logout();
        return null;
      }
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    return this.http
      .post<FbAuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
        user
      )
      .pipe(
        tap(this.setToken.bind(this)), // Делаем bind так как внутри setToken мы делаем обращение к this
        catchError(this.handleError.bind(this))
      );
  }

  signup(user: User) {
    return this.http.post<FbAuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`,
      user
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  logout() {
    // При выходе мы чистим весь localStorage
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    this._isAuthenticated$.next(!!this.token);
    return !!this.token;
  }

  private setToken(res: FbAuthResponse | null) {
    if (res) {
      const { idToken, expiresIn } = res;
      // Приходит время в секундах поэтому нужно суммировать с текущем временем (Date.now() возвращает в мс)
      const expiresDate = new Date(Date.now() + parseInt(expiresIn) * 1000);
      localStorage.setItem('fb-token', idToken);
      localStorage.setItem('fb-token-expires', expiresDate.toString());
      this._isAuthenticated$.next(true);
    } else {
      // если res = null
      localStorage.clear();
      this._isAuthenticated$.next(false);
    }
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this._error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this._error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this._error$.next('Такого email нет');
        break;
      case 'EMAIL_EXISTS':
        this._error$.next('Такой email уже существует');
        break;
    }

    return throwError(error);
  }
}
