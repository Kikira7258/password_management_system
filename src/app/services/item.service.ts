import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, lastValueFrom, Observable, of, tap } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { Items } from '../models/items';
import { Router } from '@angular/router';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private API_URL = 'http://localhost:8080/api/v1/item';

  // Keep count of the number of items 
  public itemCount$ = new BehaviorSubject<number>(0);
  public favoritedItemCount$ = new BehaviorSubject<number>(0);

  private _handleHttpErrors (defaultData: any) {
    return(err: any) => {
      console.log(err);
      
      if (err.status === 401) {
        this.router.navigateByUrl('/login');
      }

      return of ({
        status: err.error.status,
        message: err.error.message,
        error: err.error.error,
        data: defaultData
      });
    }
  }

  constructor(private noteService:NoteService, private http: HttpClient, private router: Router) {
    // Get the initial favorited item count
    lastValueFrom(this.getAllItems());
    lastValueFrom(this.getAllItems(true));
  }

  // get all items
  getAllItems(favorited? : boolean): Observable<APIResponse<Items[]>> {
    let params = new HttpParams();
    if (favorited !== undefined) {
      params = params.set('favorited', favorited.toString());
    }
    return this.http.get<APIResponse<Items[]>>(this.API_URL, { params }).pipe(tap((res:any)=>{
      // update the item count whenever a request is sent.
      if(favorited) this.favoritedItemCount$.next(res.data.length);
      else this.itemCount$.next(res.data.length);
      
    }),catchError(this._handleHttpErrors([])));
  }

  // get item by id
  getItemById(id: string): Observable<APIResponse<Items>> {
    return this.http.get<APIResponse<Items>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Items())));
  }

  // create new item
  createItem(data: Items): Observable<APIResponse<Items>> {
    return this.http.post<APIResponse<Items>>(this.API_URL, data).pipe(tap((res:any)=>{
      this.itemCount$.next(this.itemCount$.getValue() + 1);
      if (res.data.item.favorite) this.favoritedItemCount$.next(this.favoritedItemCount$.getValue() + 1);
      if (res.data.note) this.noteService.noteCount$.next(this.noteService.noteCount$.getValue() + 1);
      
    }),catchError(this._handleHttpErrors(new Items())))
  }

  // update item
  updateItem(id: string,data: Partial<Items>): Observable<APIResponse<Items>> {
    return this.http.put<APIResponse<Items>>(this.API_URL + '/' + id, data).pipe(tap((res:any)=>{
     this.favoritedItemCount$.next(this.favoritedItemCount$.getValue() + (res.data.favorite ? 1 : -1));
    }),catchError(this._handleHttpErrors(new Items())))
  }

  // delete item
  deleteItem(id: string): Observable<APIResponse<Items>> {
    return this.http.delete<APIResponse<Items>>(this.API_URL + '/' + id).pipe(tap((res:any)=>{
      this.itemCount$.next(this.itemCount$.getValue() - 1);
    }),catchError(this._handleHttpErrors(new Items())));
  }
  
}


// export interface Item {
//   id?: string;
//   username?: string;
//   password?: string;
//   website?: string;
//   timeStamp?: string;
//   note?: string;
//   favorite?: boolean;
// }
