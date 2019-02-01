import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KButtonComponent } from './k-button.component';

describe('KButtonComponent', () => {
  let component: KButtonComponent;
  let fixture: ComponentFixture<KButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
