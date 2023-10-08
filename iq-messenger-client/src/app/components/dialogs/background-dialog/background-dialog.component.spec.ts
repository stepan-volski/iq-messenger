import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundDialogComponent } from './background-dialog.component';

describe('BackgroundDialogComponent', () => {
  let component: BackgroundDialogComponent;
  let fixture: ComponentFixture<BackgroundDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundDialogComponent]
    });
    fixture = TestBed.createComponent(BackgroundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
