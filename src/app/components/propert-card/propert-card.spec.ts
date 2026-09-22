import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertCard } from './propert-card';

describe('PropertCard', () => {
  let component: PropertCard;
  let fixture: ComponentFixture<PropertCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
