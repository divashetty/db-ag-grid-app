import { AppService } from './app.service';
import { Component, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular-readCSV';
  public data: any[][] = [];
  public records: any[] = [];
  rowdata:Array<any> =[];
  columnDefs:Array<any>=[];
  public isDataLoaded!: boolean;
  api:any;
  @ViewChild('csvReader') csvReader: any;



  constructor(public appService:AppService) { }

  ngOnInit(): void {
  }
  uploadListener($event: any){
    this.appService.getCsvDataFile($event).subscribe((obj:any)=>{
     const {rowdata, columnDefs} = obj;
    //  this.rowdata= rowdata;
      this.columnDefs= columnDefs;
      this.isDataLoaded=true;
      this.api.setRowData(rowdata);
      this.api.redrawRows({rowNode:rowdata});
    }) 
      
  }

  onGreadReady(param:any){
    this.api= param.api;
  }
}