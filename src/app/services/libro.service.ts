import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LibrosModel } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  URL: string = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  getLibros(): Observable<any>{
    return this.http.get<LibrosModel[]>(this.URL + 'libro').pipe(map(res => res));
  }

  saveLibro(libro: LibrosModel): Observable<any>{
    return this.http.post<any>(this.URL + 'libro', libro).pipe(map(res => res));
  }

  updateLibro(libro: LibrosModel): Observable<any>{
    return this.http.post<any>(this.URL + 'libro/update', libro).pipe(map(res => res));
  }

  deleteLibro(id: number): Observable<any>{
    return this.http.get<any>(this.URL + 'libro/delete' + id).pipe(map(res => res));
  }
}
