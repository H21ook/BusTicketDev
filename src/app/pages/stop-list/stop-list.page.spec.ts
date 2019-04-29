import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopListPage } from './stop-list.page';

describe('StopListPage', () => {
  let component: StopListPage;
  let fixture: ComponentFixture<StopListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
