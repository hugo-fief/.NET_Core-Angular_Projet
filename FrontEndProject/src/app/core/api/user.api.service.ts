import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApiUrl } from './base-api.service';
import { UserDto } from '../dto/user.dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})

export class UserApiService {
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getAllUsers(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`${BaseApiUrl.apiUrl}`);
  }

  public createUser(userToCreate: UserDto): Observable<void> {
    return this.httpClient.post<void>(`${BaseApiUrl.apiUrl}`, userToCreate);
  }

  public updateUser(userId: number, userToUpdate: UserDto): Observable<void> {
    return this.httpClient.put<void>(`${BaseApiUrl.apiUrl}/${userId}`, userToUpdate);
  }

  public deleteUserById(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${BaseApiUrl.apiUrl}/${userId}`);
  }
}
