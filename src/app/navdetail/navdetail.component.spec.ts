import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdetailComponent } from './navdetail.component';

describe('NavdetailComponent', () => {
  let component: NavdetailComponent;
  let fixture: ComponentFixture<NavdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
