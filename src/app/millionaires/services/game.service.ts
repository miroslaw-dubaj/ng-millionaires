import { Injectable } from '@angular/core';
import { Question, MillionairesRestService, ApiResponse } from './millionaires.rest.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // private gameState: GameState = [];

  private data$: Observable<GameState>;

  constructor(private gameRestService: MillionairesRestService) {

  }

  startNewGame() {
    this.data$ = this.gameRestService.getQuestions().pipe(map(data => {
      const gameState: GameState = {
        questions: []
      }

      data.results.forEach(result => gameState.questions
        .push({ question: result, questionPassedStatus: false })
      );

      return gameState
    }))
  }

  getGameStatus() {
    return this.data$;
  }

}

export interface GameState {
  questions: QuestionState[];
}

export interface QuestionState {
  questionPassedStatus: boolean;
  question: Question;
}