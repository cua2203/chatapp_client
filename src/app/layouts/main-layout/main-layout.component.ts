import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  userName!: string;

  constructor(private authService : AuthService, private cookieService: CookieService){

  }
  ngOnInit(): void {
    this.userName = this.cookieService.get('user_name')
  }

  logOut(){
    this.authService.logout().subscribe(data=>{
      console.log(data);  
    });

}
}
