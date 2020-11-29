import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Indices } from '../_models/indices';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IndicesService {

  constructor(private http: HttpClient) { }

  // getIndice(indice: string) {
  //   return this.http.get<Indices[]>(`${environment.API_PATH}/indices?indice=${indice}`);
  // }

  getIndice(indice: string, pageSize: number = 1, pageNumber: number = 1, draw: number = 1) {
    return this.http.get<Indices[]>(`${environment.API_PATH}/indices?pageSize=${pageSize}&pageNumber=${pageNumber}&indice=${indice}&getAll=${true}&draw=${draw}`);
  }

  getIndicePage(indice: string, pageSize: number, pageNumber: number, draw: number) {
    return this.http.get<Indices[]>(`${environment.API_PATH}/indices?pageSize=${pageSize}&pageNumber=${pageNumber}&indice=${indice}&getAll=${true}&draw=${draw}`);
  }
  
  getIndiceData(indice: string, data: string) {
    return this.http.get<Indices[]>(`${environment.API_PATH}/indices/byDate?indice=${indice}&data=${data}`);
  }

  addIndice(indiceList: any) {
    return this.http.post(`${environment.API_PATH}/indices`, indiceList);
  }

  updateIndice(id: number, indice: any) {
    return this.http.put(`${environment.API_PATH}/indices/${id}`, [indice]);
  }

  removeIndice(id: number) {
    return this.http.delete(`${environment.API_PATH}/indices/${id}`);
  }

  async getIndiceDataBase(indice, data, formDefaultValues) {
    if (!indice || !data) {
      return 1;
    }
    switch (indice) {
      case "Encargos Contratuais %":
        return new Promise((resolve, reject) => {
          resolve(formDefaultValues.formIndiceEncargos)
        })
        break;
      default:
        return (await this.getIndiceData(indice, data))
          .toPromise().then(ind => ind['valor'])
    }
  }
}