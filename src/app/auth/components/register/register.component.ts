import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import {strongPasswordValidator} from '../../../shared/validator/password-validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  constructor(private httpRequestService: HttpRequestService){
    this.myForm = new FormGroup({
      name: new FormControl('',[ Validators.required, Validators.minLength(10), Validators.maxLength(35)]),
      email: new FormControl('',[ Validators.required, Validators.minLength(12),Validators.maxLength(30), Validators.email]),
      password: new FormControl('', [Validators.required,strongPasswordValidator()]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(12),Validators.maxLength(30)]),
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(){
    console.log(this.myForm.value);
    this.httpRequestService.post('users/register', this.myForm.value).subscribe(res => console.log(res));
  }

}
