import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerInfoPage } from './passenger-info.page';

describe('PassengerInfoPage', () => {
  let component: PassengerInfoPage;
  let fixture: ComponentFixture<PassengerInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
