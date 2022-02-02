import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWriteMessageComponent } from './chat-write-message.component';

describe('ChatWriteMessageComponent', () => {
  let component: ChatWriteMessageComponent;
  let fixture: ComponentFixture<ChatWriteMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatWriteMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWriteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
