import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @Input() open: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UserService, private router:Router) { }

  forgotPassword(form:NgForm) {
    if(form.invalid) return;

    let email = form.value.forgotPassword;

    console.log(form.value);

    this.userService.forgotPassword(email).subscribe((res) => {
      console.log(res);
      
      if(res.status === 'success') {
        this.router.navigate(['/verify-password']);
      }
    })
  }



  closeModal() {
    this.close.emit();
  }

}
