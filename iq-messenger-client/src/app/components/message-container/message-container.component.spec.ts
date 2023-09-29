import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContainerComponent } from './message-container.component';

describe('MessageContainerComponent', () => {
  let component: MessageContainerComponent;
  let fixture: ComponentFixture<MessageContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageContainerComponent]
    });
    fixture = TestBed.createComponent(MessageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
