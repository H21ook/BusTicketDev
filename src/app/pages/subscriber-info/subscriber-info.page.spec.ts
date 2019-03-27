import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberInfoPage } from './subscriber-info.page';

describe('SubscriberInfoPage', () => {
  let component: SubscriberInfoPage;
  let fixture: ComponentFixture<SubscriberInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
