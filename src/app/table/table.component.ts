import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Characters, isCharacters, Planets, Starships } from '../interfaces';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() arr: (Characters | Planets | Starships)[] = [];

  @Input() tableFor : 'characters' | 'planets' | 'starships' = 'characters'

 

  displayed = {
    characters: [
      'name',
      'height',
      'mass',
      'gender',
      'birth_year',
    ],
    
    planets : [
      'name',
      'climate',
      'gravity',
      'population',
      'terrain',
    ],
    
    starships : [
      'name',
      'model',
      'starship_class',
      'passengers',
      'length',
    ]
  
  };
  
  dataSource = this.arr;

  constructor(public dialog: MatDialog) {}

  ngOnInit(

  ): void {}

  openDialog(data: Characters | Planets | Starships) {
    this.dialog.open(DialogElementsExampleDialog, { data });
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  base: any
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Characters | Planets | Starships
  ) {
    this.base = data
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
