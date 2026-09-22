import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallScreen } from './call-screen';

describe('CallScreen', () => {
  let component: CallScreen;
  let fixture: ComponentFixture<CallScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(CallScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
