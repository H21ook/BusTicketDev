import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningInfoPage } from './warning-info.page';

describe('WarningInfoPage', () => {
  let component: WarningInfoPage;
  let fixture: ComponentFixture<WarningInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
