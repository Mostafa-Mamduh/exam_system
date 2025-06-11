import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userData = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      remembered: new FormControl(false),
      // role: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordsMatchValidator }
  );

  constructor(private _httpClient: HttpClient, private _router: Router) {}

  onSubmit() {
    if (this.userData.valid) {
      console.log(this.userData.value);
      let user = { ...this.userData.value, role: 'student' };
      this._httpClient.post(`${environment.appUrl}/users`, user).subscribe({
        next: (res) => {
          console.log(res);
          this._router.navigate(['/login']); 
        },
        error: (err) => {
          console.error('Error registering user:', err);
        }
      });
    } else {
      this.userData.markAllAsTouched(); 
    }
  }

  get name() {
    return this.userData.get('name');
  }
  get email() {
    return this.userData.get('email');
  }
  get password() {
    return this.userData.get('password');
  }
  get confirmPassword() {
    return this.userData.get('confirmPassword');
  }
  get role() {
    return this.userData.get('role');
  }
  get remembered() {
    return this.userData.get('remembered');
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }
}
