import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailDialogComponent } from './country-detail-dialog.component';

describe('CountryDetailDialogComponent', () => {
  let component: CountryDetailDialogComponent;
  let fixture: ComponentFixture<CountryDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryDetailDialogComponent]
    });
    fixture = TestBed.createComponent(CountryDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
