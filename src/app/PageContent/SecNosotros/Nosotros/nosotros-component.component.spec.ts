import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosComponentComponent } from './nosotros-component.component';

describe('NosotrosComponentComponent', () => {
  let component: NosotrosComponentComponent;
  let fixture: ComponentFixture<NosotrosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosotrosComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NosotrosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
