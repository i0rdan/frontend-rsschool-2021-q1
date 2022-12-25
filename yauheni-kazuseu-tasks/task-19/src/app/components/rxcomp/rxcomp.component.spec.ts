import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxcompComponent } from './rxcomp.component';

describe('RxcompComponent', () => {
  let component: RxcompComponent;
  let fixture: ComponentFixture<RxcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxcompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
