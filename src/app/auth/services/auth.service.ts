import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


type LoginDTO= {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/v1/api'; // Địa chỉ API của bạn

  constructor(private http: HttpClient, private router: Router,private cookieService: CookieService) {}

  isAuthenticated(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/users/check_auth`, { withCredentials: true }).pipe(
      map((response: any) => {
       // Kiểm tra trả về response có rs = true hay không
        if(response.rs){
          console.log(response)
          this.cookieService.set('user_name', response.user.name); // Lưu token vào cookie
          this.cookieService.set('thumnail', response.user.thumnail);
          this.cookieService.set('email', response.user.email);
          this.cookieService.set('phone', response.user.phone);
            return true
        }
        else{
            return false
        }

      }),
      catchError(() => {
        // Nếu có lỗi (ví dụ: 401 Unauthorized), trả về false
        return of(false);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/logout`,{ withCredentials: true }).pipe(
      map((response: any) => {
        this.router.navigate(['auth/login'])

        return response
      }),
      catchError(() => {
        // Nếu có l��i (ví dụ: 401 Unauthorized), trả về false
        return of(false);
      })
    );
  }

  login(DTO:LoginDTO):Observable<any>{
    return this.http.post(`${this.apiUrl}/users/login`,DTO, { withCredentials: true }).pipe(
      map((response: any) => {
        this.router.navigate(['/']);
        return response
      }),
      catchError(() => {
        // Nếu có l��i (ví dụ: 401 Unauthorized), trả về false
        return of(false);
      })
    );
  }
}
