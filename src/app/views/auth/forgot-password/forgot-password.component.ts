import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @Input() open: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();









  closeModal() {
    this.close.emit();
  }

}
