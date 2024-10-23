import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { strongPasswordValidator } from '../../../shared/validator/password-validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private httpRequestService: HttpRequestService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService,  // Add CookieService dependency
  ) {
    this.myForm = new FormGroup({
      email: new FormControl('phamcua670@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('Cua@12345', [
        Validators.required,
        Validators.minLength(6),
        strongPasswordValidator(),
      ]),
    });
  }
  ngOnInit() {
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:3000/auth/google';
  }


  onSubmit() {
    let data = this.myForm.value;
    this.httpRequestService.post('users/login', data).subscribe({
      next: (data: any) => {
        console.log('Data:', data);
        // Set cookie

        this.cookieService.set('userName', data.name);
      
        this.toastr.success('Đăng nhập thành công', 'Success');
        this.router.navigate(['/']);
      },
      error: (err: Error) => {
        this.toastr.error('Tài khoản hoặc mật khẩu không đúng', 'Error');
        console.error(err);
      }
    });
  }
}
