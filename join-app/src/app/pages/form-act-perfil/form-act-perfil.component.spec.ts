import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActPerfilComponent } from './form-act-perfil.component';

describe('FormActPerfilComponent', () => {
  let component: FormActPerfilComponent;
  let fixture: ComponentFixture<FormActPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
