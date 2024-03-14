import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { APIResponse } from '../models/api-response';
import { Observable, catchError, of, tap, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // API URL for user operations
  private API_URL = 'http://localhost:8080/api/v1/auth';


  // Authentication token and logged-in user
  auth_token?: string;
  loggedInUser?: User;

  // Subject to notify subcribers about changes in the logged-in user
  loggedInUser$ = new Subject<User | undefined>();

  // Method to update the logged-in user and save user data
  public updateLoggedinUser(user: User) {
    this.loggedInUser$.next(user);
    this.saveUserData(this.auth_token!, user);
  }

  // Helper method to handle HTTP errors
  private _handleHttpErrors(defaultValue: any) {
    return(error: any) => {
      console.error(error);

      if (error.status === 401) {
        this.router.navigateByUrl('/login');
      }

      return of ({
        status: error.status,
        message: error.message,
        data: defaultValue
      });
    }
  }

  // Constructor with dependency injection
  constructor(private http: HttpClient, private router: Router) { 
    // Automatically attempt to log in the user when the service is created
    // this.autoLogin();
  }

  // Login method to authenticate the user
  login(data: any): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.API_URL}/login`, data).pipe(
      tap((res) => {
        if (res.status === 'success') {
          // Update the authentication token and logged in user details
          this.auth_token = res.data.token;
          this.loggedInUser = res.data.User;

          // Notify subscribers about the updated user
          this.loggedInUser$.next(this.loggedInUser);

          // Save user data in local storage
          this.saveUserData(this.auth_token!, this.loggedInUser!);
        }
      }),
      catchError(this._handleHttpErrors(new User()))
    );
  }


  // Save user data in local storage
  saveUserData(token: string, user: User) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }


  // Automaticall attempt to log in the user using stored credentials
  autoLogin() {
    let tokenFromStorage = localStorage.getItem('authToken');
    let userFromStorage = localStorage.getItem('user');

    if (tokenFromStorage) this.auth_token = tokenFromStorage;
    if (userFromStorage) {
      // Parse and set the logged-in user
      this.loggedInUser = JSON.parse(userFromStorage) as User;

      // Notify subscribers about the auto login
      this.loggedInUser$.next(this.loggedInUser);
      console.log("Auto Login Successful");
    }
  }


  // Logout method to clear user data and redirect to the authentication page
  logout() {
    this.auth_token = undefined;
    this.loggedInUser = undefined;

    // Notify subcribers about the logged-out state
    this.loggedInUser$.next(undefined);

    // Remove user data from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Redirect to the authentication page
    this.router.navigateByUrl('/login');
  }


  // >>>>>>>>>>>>>>>>>>>> CRUD Operations <<<<<<<<<<<<<<<<<<<<

    // Set user id
    authUserId = '';

    // get profile data
    profileData : any;

    // Get user by ID || get user profile
    getProfile(): Observable<APIResponse<User[]>> {
      return this.http.get<APIResponse<User[]>>(`${this.API_URL}/${this.authUserId}`).pipe(tap((res) => {
        
      }), catchError(this._handleHttpErrors(new User())));
    }
    
    // Register user
    registerProfile(data:User): Observable<APIResponse<any>> {
      return this.http.post<APIResponse<User>>(this.API_URL + '/register', data).pipe(catchError(this._handleHttpErrors(new User())));
    }


    // Update user
    updateProfile(id: string, data:User): Observable<APIResponse<User>> {
      return this.http.put<APIResponse<User>>(this.API_URL + '/' + id, data).pipe(catchError(this._handleHttpErrors(new User())));
    }


    deleteProfile(id: string): Observable<APIResponse<User>> {
      return this.http.delete<APIResponse<User>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new User())));
    }
  // >>>>>>>>>>>>>>>>>>>> End of CRUD Operations <<<<<<<<<<<<<<<<<<<<

}
