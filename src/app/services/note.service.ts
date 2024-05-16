import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { Notes } from '../models/notes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private API_URL = 'http://localhost:8080/api/v1/note';

  private _handleHttpErrors(defaultValue: any) {
    return(err: any) => {

      if (err.status === 401) {
        this.router.navigateByUrl('/login');
      }

      console.log(err);
      return of({
        status: err.error.status,
        message: err.error.message,
        error: err.error.error,
        data: defaultValue
      })
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  // get all notes
  getAllNotes(): Observable<APIResponse<Notes[]>> {
    return this.http.get<APIResponse<Notes[]>>(this.API_URL).pipe(catchError(this._handleHttpErrors([])));
  }

  // get note by id
  getNotById(id: string): Observable<APIResponse<Notes>> {
    return this.http.get<APIResponse<Notes>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Notes())));
  } 

  // create new note
  createNote(data: Notes): Observable<APIResponse<Notes>> {
    return this.http.post<APIResponse<Notes>>(this.API_URL, data).pipe(catchError(this._handleHttpErrors(new Notes())));
  }

  // update note
  updateNote(id: string, data: Notes): Observable<APIResponse<Notes>> {
    return this.http.put<APIResponse<Notes>>(this.API_URL + '/' + id, data).pipe(catchError(this._handleHttpErrors(new Notes())))
  }

  //delete note
  deleteNote(id: string): Observable<APIResponse<Notes>> {
    return this.http.delete<APIResponse<Notes>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Notes())))
  }

}
