import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { strongPasswordValidator } from 'src/app/shared/validator/password-validator';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit{
onSubmit() {
throw new Error('Method not implemented.');
}
  myForm: FormGroup;
  thumbnail!: string;
  constructor(private cookieService : CookieService){
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(35)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', []),
      thumbnail: new FormControl('', []),
      phone: new FormControl('',)
    });

  }
  ngOnInit(): void {
    this.thumbnail = this.cookieService.get('thumnail');
    this.myForm.patchValue({
      name: this.cookieService.get('user_name'),
      email: this.cookieService.get('email'),
      phone: this.cookieService.get('phone'),
      thumbnail: this.cookieService.get('thumnail'),
    });

    console.log(this.myForm.value);
  }
}
