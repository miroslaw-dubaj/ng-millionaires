import { Injectable } from '@angular/core';
import { Question, MillionairesRestService } from './millionaires.rest.service'
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, filter } from 'rxjs/operators'
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs/internal/Subject';
import { StorageService, GamesStorage } from 'src/app/shared/services/storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // private gameState: GameState = [];

  private data$: Observable<GameState>;
  private _gameState: BehaviorSubject<GameState> = new BehaviorSubject(null);

  stakes: Stake[] = [
    { amount: '500 PLN', guaranteed: false },
    { amount: '1000 PLN', guaranteed: true },
    { amount: '2000 PLN', guaranteed: false },
    { amount: '5000 PLN', guaranteed: false },
    { amount: '10 000 PLN', guaranteed: false },
    { amount: '20 000 PLN', guaranteed: false },
    { amount: '40 000 PLN', guaranteed: true },
    { amount: '75 000 PLN', guaranteed: false },
    { amount: '125 000 PLN', guaranteed: false },
    { amount: '250 000 PLN', guaranteed: false },
    { amount: '500 000 PLN', guaranteed: false },
    { amount: '1 000 000 PLN', guaranteed: false }
  ];

  answers: string[][] = [];

  private _guaranteed: Subject<string> = new Subject();
  public _currentQuestion: Subject<number> = new Subject();


  formControls: FormArray = new FormArray([]);

  constructor(
    private gameRestService: MillionairesRestService,
    private storage: StorageService,
    private userService: UserService
  ) {
    this.startNewGame().subscribe(data => this._gameState.next({ questions: data }));
    this.data$ = this._gameState.asObservable();
    this.setFormControls();
    this.setAnswers();
    this.storage.getItem('games')
      ? this.saveProgress()
      : this.initStorage()
  }

  startNewGame() {
    return this.gameRestService.getQuestions()
      .pipe(
        map(data => data.results),
        map(data => data.map(data => ({ question: data, questionPassedStatus: false })))
      );
  }

  setFormControls() {
    return this.data$.pipe(
      filter(d => d != null),
      map(data => data.questions)
    ).subscribe(data => data
      .forEach(() => this.formControls.push(new FormGroup({
        radio: new FormControl('', Validators.required)
      }))));
  }

  setAnswers() {
    return this.data$.pipe(filter(data => data != null), map(data => data.questions)).subscribe(data => data
      .forEach(question => {
        const mixedAnswers = [...question.question.incorrect_answers]

        Math.floor(Math.random() * 4) > 2
          ? mixedAnswers.push(question.question.correct_answer)
          : mixedAnswers.splice(Math.floor(Math.random() * 4), 0, question.question.correct_answer);

        this.answers.push(mixedAnswers);
      })
    );
  }

  saveProgress() {
    const storageData: GamesStorage = this.storage.getItem('games')
    storageData.games.push({ userName: this.userService.userName, password: 'asd123', gameData: 'TEST 2' })
    this.storage.setItem('games', storageData);
  }

  initStorage() {
    const currentGame: GamesStorage = {
      games: [
        { userName: 'mirek', password: 'asd123', gameData: 'TEST' }
      ]
    };
    this.storage.setItem('games', currentGame);
  }

  clearAnswers() {
    this.answers = []
  }

  getAnswers(i: number, o: number) {
    return of(this.answers[i][o]);
  }

  getCorrectAnswer(i: number) {
    let correctAnswer: string;
    this.data$.pipe(
      filter(d => d != null),
      map(data => data.questions[i].question.correct_answer)
    ).subscribe(data => correctAnswer = data);
    return correctAnswer
  }

  getQuestion(i: number) {
    return this.data$.pipe(
      filter(d => d != null),
      map(data => data.questions[i].question.question)
    )
  }

  setCurrentQuestion(i: number) {
    this._currentQuestion.next(i);
  }

  getFormControls() {
    return this.data$.pipe(
      filter(d => d != null),
      map(data => data.questions.map(question => new FormGroup({
        radio: new FormControl('', Validators.required)
      })))
    );
  }

  getStakes() {
    return this.stakes
  }

  setGuaranteed(amount: string) {
    this._guaranteed.next(amount);
  }

  getGuaranteed() {
    return this._guaranteed.asObservable();
  }

  restartGame() {
    this.startNewGame().subscribe(data => this._gameState.next({ questions: data }));
    setTimeout(() => {
      this.clearAnswers();
      this.setAnswers()
      this.setFormControls()
    }, 800);
  }
}

export interface GameState {
  questions: QuestionState[];
}

export interface QuestionState {
  questionPassedStatus: boolean;
  question: Question;
}

export interface Stake {
  amount: string;
  guaranteed: boolean;
}