import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {

    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Nếu có token, cho phép truy cập
          return true;
        } else {
          console.log('Token not found');
          // Nếu không có token, chuyển hướng đến trang đăng nhập hoặc trang khác
          return this.router.createUrlTree(['auth/login']);
        }
      }),
      catchError((err) => {
        console.log('Error when checking authentication', err);
        // Chuyển hướng đến trang đăng nhập nếu có lỗi
        return of(this.router.createUrlTree(['auth/login']));
      })
    );
  }
}
