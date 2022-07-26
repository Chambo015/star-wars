export interface Films {
    title: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: Date;
    url: string;
    episode_id : number;
    poster: string;
    vehicles: string[];
    characters : string[];
    planets : string[];
    starships : string[];
    species : string[];
}
export interface AllFilms {
    results: Films[];
    count: number
}