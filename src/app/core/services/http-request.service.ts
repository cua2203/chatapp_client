// http-request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

interface RequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  skipAuth?: boolean; // Thêm tùy chọn để bỏ qua token nếu cần
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root', // Service được cung cấp cho toàn bộ ứng dụng
})
export class HttpRequestService {
  private apiUrl = 'http://localhost:3000/v1/api'; // Địa chỉ API của bạn

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}

  private getToken(): string | null {
    return this.cookieService.get('jwt_token') || null;
  }

  // Tạo headers cho các request
  private createHeaders(options?: RequestOptions): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const token = this.getToken();
    if (token && !options?.skipAuth) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (options?.headers) {
      headers = options.headers;
    }
    return headers;
  }

  // Phương thức GET
  get<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}/${endpoint}`, {
        headers: this.createHeaders(options),
        params: options?.params,
        withCredentials: true // Thêm tùy chọn này để gửi cookie
      })
      .pipe(
        catchError(this.handleError) // Xử lý lỗi
      );
  }

  // Phương thức POST
  post<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${url}`, body, {
      headers: this.createHeaders(options),
      params: options?.params,
      withCredentials: true // Thêm tùy chọn này để gửi cookie
    }).pipe(
      catchError(this.handleError)
    );
  }

  // PUT Request
  put<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${url}`, body, {
      headers: this.createHeaders(options),
      params: options?.params,
      withCredentials: true // Thêm tùy chọn này để gửi cookie
    }).pipe(
      catchError(this.handleError)
    );
  }

  // PATCH Request
  patch<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${url}`, body, {
      headers: this.createHeaders(options),
      params: options?.params,
      withCredentials: true // Thêm tùy chọn này để gửi cookie
    }).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE Request
  delete<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${url}`, {
      headers: this.createHeaders(options),
      params: options?.params,
      withCredentials: true // Thêm tùy chọn này để gửi cookie
    }).pipe(
      catchError(this.handleError)
    );
  }


  // Phương thức xử lý lỗi
  // Xử lý lỗi
  private handleError(error: any): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client hoặc mạng
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      // Lỗi phía server
      errorMessage = `Mã lỗi: ${error.status}\nThông báo: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
