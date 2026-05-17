import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaComponentComponent } from './ayuda-component.component';

describe('AyudaComponentComponent', () => {
  let component: AyudaComponentComponent;
  let fixture: ComponentFixture<AyudaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyudaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AyudaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
