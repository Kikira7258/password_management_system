import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailOtpComponent } from './change-email-otp.component';

describe('ChangeEmailOtpComponent', () => {
  let component: ChangeEmailOtpComponent;
  let fixture: ComponentFixture<ChangeEmailOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeEmailOtpComponent]
    });
    fixture = TestBed.createComponent(ChangeEmailOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
