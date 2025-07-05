import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  formatoImg: string;
  titulo: string;
  imagen: string;
  precio: number;
  descripcion: string;
}

export interface CategoryData {
  armaduras: Item[];
  armamento: Item[];
  estratagemas: Item[];
  superdestructor: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly dataUrl = 'https://bcortes-1013.github.io/categoria-api/superitems.json';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryData> {
    return this.http.get<CategoryData>(this.dataUrl);
  }
}
