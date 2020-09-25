import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})

export class CrudService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getData(): any {
    return this.http.get(`${ConstantsService.AppUrl}`);
  }

  postData(formData: any): any {
    return this.http.post(`${ConstantsService.AppUrl}`, formData);
  }

  putData(id: any, formData: any): any {
    return this.http.put(`${ConstantsService.AppUrlId}` + id, formData);
  }
  deleteData(id: any): any {
    return this.http.delete(`${ConstantsService.AppUrlId}` + id);
  }
}
