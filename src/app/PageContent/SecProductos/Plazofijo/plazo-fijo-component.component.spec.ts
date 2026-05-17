import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazoFijoComponentComponent } from './plazo-fijo-component.component';

describe('PlazoFijoComponentComponent', () => {
  let component: PlazoFijoComponentComponent;
  let fixture: ComponentFixture<PlazoFijoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlazoFijoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlazoFijoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
