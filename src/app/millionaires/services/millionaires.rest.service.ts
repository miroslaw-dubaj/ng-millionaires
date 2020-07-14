import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MillionairesRestService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://opentdb.com/api.php?amount=12&type=multiple')
  }  
}

export interface ApiResponse {
  response_code: number;
  results: Question[];

}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
