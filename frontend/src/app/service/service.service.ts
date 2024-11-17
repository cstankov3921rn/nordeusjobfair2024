import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";
import {Observable} from "rxjs";
import {MyMatrix} from "../model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly apiUrl = environment.postApi

  constructor(private httpClient: HttpClient) { }

  getMatrix(): Observable<string>{
    return this.httpClient.get(this.apiUrl, { responseType: 'text' });
  }

}
