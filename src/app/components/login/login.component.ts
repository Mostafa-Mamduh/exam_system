import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Iuser } from '../../models/iuser';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userData = new FormGroup({
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
  });
  constructor(private _UsersService: UsersService , private _Router : Router) {}
  get email() {
    return this.userData.get('email');
  }
  get password() {
    return this.userData.get('password');
  }
  onSubmit() {
    // console.log(this.userData.value);
    this._UsersService.getAllUsers().subscribe({
      next: (users) => {
        let foundUser: any = users.find((user) => {
          return (
            user.email == this.email?.value &&
            user.password == this.password?.value
          );
        });
        if (foundUser) {
          localStorage.setItem('user', JSON.stringify(foundUser));
          this._Router.navigate(['/exams']);
          console.log(foundUser);
        } else {
          alert('Invalid email or password');
          this._Router.navigateByUrl(`/register`)
        }
      },
    });
  }
}
