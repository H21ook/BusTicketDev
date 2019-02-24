import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSeatCheckboxComponent } from './bus-seat-checkbox.component';

describe('BusCheckboxComponent', () => {
  let component: BusSeatCheckboxComponent;
  let fixture: ComponentFixture<BusSeatCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusSeatCheckboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusSeatCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
