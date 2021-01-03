import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.css']
})
export class ChangePhoneComponent implements OnInit {
  phoneForm: FormGroup;
  numberPattern = '^[+][0-9]*$';
  error = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(this.numberPattern)]
      ]
    });
  }

  onPhoneFormSubmit() {
    if (this.phoneForm.invalid) {
      return;
    }

    this.userService
      .sendChangePhoneEmail(this.phoneForm.value.phoneNumber)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'success',
            summary: 'Link sent!',
            detail:
              'Please check your inbox and click in link to change phone number!'
          });
        },
        error: error => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Phone number can not be changed',
            detail: error
          });
        }
      });
  }
}
