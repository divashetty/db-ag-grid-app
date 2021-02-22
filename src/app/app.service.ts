
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class AppService {
public data: any[][] = [];
  
  constructor() { }

  genarateHeaderRow(){
     const columnDefs = this.data[0].map((clm:string)=>{
      return {
        headerName: clm,
        field: clm.replace(/\s+/g, '')
      }
    });
    let rows = this.data.slice(1);
    
    const rowdata = rows.map(row=>{
      row = row.join("$#").split("$#");
      
      return row.map((column,index)=>{
        const key = columnDefs[index].field;
        return {
          [key]:column.toString()
        }
      })
    });
    console.log(rowdata[0]);
    
    return {columnDefs, rowdata};
  }

  getCsvDataFile(evt: any) {
    return new Observable((observer)=>{
      const target : DataTransfer =  <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname : string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        observer.next(this.genarateHeaderRow());
    }
    reader.readAsBinaryString(target.files[0]);
    }); 

  }

}
