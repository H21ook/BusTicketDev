import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistinationStopListPage } from './distination-stop-list.page';

describe('DistinationStopListPage', () => {
  let component: DistinationStopListPage;
  let fixture: ComponentFixture<DistinationStopListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistinationStopListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistinationStopListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
