import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { Items } from '../models/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private API_URL = 'http://localhost:8080/api/v1/item';

  private _handleHttpErrors (defaultData: any) {
    return(err: any) => {
      console.log(err);
      return of ({
        status: err.status,
        message: err.message,
        data: defaultData
      });
    }
  }

  constructor(private http: HttpClient) {}

  // get all items
  getAllItems(): Observable<APIResponse<Items[]>> {
    return this.http.get<APIResponse<Items[]>>(this.API_URL).pipe(catchError(this._handleHttpErrors([])));
  }

  // get item by id
  getItemById(id: string): Observable<APIResponse<Items>> {
    return this.http.get<APIResponse<Items>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Items())));
  }

  // create new item
  createItem(data: Items): Observable<APIResponse<Items>> {
    return this.http.post<APIResponse<Items>>(this.API_URL, data).pipe(catchError(this._handleHttpErrors(new Items())))
  }

  // update item
  updateItem(id: string,data: Items): Observable<APIResponse<Items>> {
    return this.http.put<APIResponse<Items>>(this.API_URL + '/' + id, data).pipe(catchError(this._handleHttpErrors(new Items())))
  }

  // delete item
  deleteItem(id: string): Observable<APIResponse<Items>> {
    return this.http.delete<APIResponse<Items>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Items())));
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
