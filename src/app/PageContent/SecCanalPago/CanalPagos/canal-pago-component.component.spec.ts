import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalPagoComponentComponent } from './canal-pago-component.component';

describe('CanalPagoComponentComponent', () => {
  let component: CanalPagoComponentComponent;
  let fixture: ComponentFixture<CanalPagoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanalPagoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanalPagoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
