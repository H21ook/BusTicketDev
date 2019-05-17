import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { OrderDetailPage } from './order-detail.page';

describe('OrderDetailPage', () => {
  let component: OrderDetailPage;
  let fixture: ComponentFixture<OrderDetailPage>;
  let OrderDetailPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(OrderDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 10 elements', () => {
    OrderDetailPage = fixture.nativeElement;
    const items = OrderDetailPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
