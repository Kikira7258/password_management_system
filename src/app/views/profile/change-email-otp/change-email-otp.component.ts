import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-change-email-otp',
  templateUrl: './change-email-otp.component.html',
  styleUrls: ['./change-email-otp.component.css']
})
export class ChangeEmailOtpComponent {

  @Input() open: boolean = false;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  otp: string = '';
  // newEmail: string = '';
  // changeEmailError: string = '';

  constructor() {}

  submitEmailOtp(e:any) {
    e.stopPropagation();
    this.submit.emit(this.otp);
  }

  closeModal() {
    this.open = false;
    this.otp = '';
    this.close.emit();
  }
}
