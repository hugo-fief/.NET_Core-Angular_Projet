import { Injectable } from '@angular/core';

@Injectable()

export class ConstantsService {
  public static readonly AppUrl: string = 'http://localhost:62785/api/student';
  public static readonly AppUrlId: string = 'http://localhost:62785/api/student/';
}
