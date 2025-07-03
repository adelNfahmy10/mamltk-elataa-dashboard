import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumouAboutComponent } from './sumou-about.component';

describe('SumouAboutComponent', () => {
  let component: SumouAboutComponent;
  let fixture: ComponentFixture<SumouAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumouAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumouAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
