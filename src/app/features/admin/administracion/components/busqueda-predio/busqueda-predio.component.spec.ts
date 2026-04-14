import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPredioComponent } from './busqueda-predio.component';

describe('BusquedaPredioComponent', () => {
  let component: BusquedaPredioComponent;
  let fixture: ComponentFixture<BusquedaPredioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaPredioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
