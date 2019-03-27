import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { OrderPage } from './order.page';

describe('OrderPage', () => {
  let component: OrderPage;
  let fixture: ComponentFixture<OrderPage>;
  let OrderPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(OrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 10 elements', () => {
    OrderPage = fixture.nativeElement;
    const items = OrderPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
