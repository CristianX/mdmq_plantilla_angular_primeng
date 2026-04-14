import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredioDatosBasicosComponent } from './predio-datos-basicos.component';

describe('PredioDatosBasicosComponent', () => {
  let component: PredioDatosBasicosComponent;
  let fixture: ComponentFixture<PredioDatosBasicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredioDatosBasicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredioDatosBasicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
