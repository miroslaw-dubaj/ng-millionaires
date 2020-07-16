import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LooseDialogComponent } from './loose-dialog.component';

describe('QuestionDialogComponent', () => {
  let component: LooseDialogComponent;
  let fixture: ComponentFixture<LooseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LooseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LooseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
