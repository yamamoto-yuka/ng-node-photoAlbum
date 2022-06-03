import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MynameComponent } from './myname.component';

describe('MynameComponent', () => {
  let component: MynameComponent;
  let fixture: ComponentFixture<MynameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MynameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MynameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
