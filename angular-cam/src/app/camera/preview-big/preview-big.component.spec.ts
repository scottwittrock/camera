import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBigComponent } from './preview-big.component';

describe('PreviewBigComponent', () => {
  let component: PreviewBigComponent;
  let fixture: ComponentFixture<PreviewBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
