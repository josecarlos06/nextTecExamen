import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAsideComponent } from './form-aside.component';

describe('FormAsideComponent', () => {
  let component: FormAsideComponent;
  let fixture: ComponentFixture<FormAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
