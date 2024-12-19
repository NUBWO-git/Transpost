import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class userservice {
   private apiUrl = 'http://localhost/transpost/transpost.php';

   constructor(private http: HttpClient) {}

   // ฟังก์ชันสำหรับการสมัครสมาชิก
   regis(username: string, email: string, password: string): Observable<any> {
      return this.http.post(this.apiUrl, {
         action: 'register',
         username: username,
         email: email,
         password: password,
      }).pipe(
         catchError(this.handleError)
      );
   }

   // ฟังก์ชันสำหรับการขอ OTP
   sendOtp(email: string): Observable<any> {
      return this.http.post(this.apiUrl, {
         action: 'sendOtp',
         email: email,
      }).pipe(
         catchError(this.handleError)
      );
   }

   // ฟังก์ชันสำหรับการตรวจสอบ OTP
   verifyOtp(otp: string): Observable<any> {
      return this.http.post(this.apiUrl, {
         action: 'verifyOtp',
         otp: otp,
      }).pipe(
         catchError(this.handleError)
      );
   }

   // ฟังก์ชันจัดการข้อผิดพลาด
   private handleError(error: any) {
      let errorMessage = 'เกิดข้อผิดพลาด';
      if (error.error instanceof ErrorEvent) {
         errorMessage = `Error: ${error.error.message}`;
      } else {
         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => new Error(errorMessage));
   }
}
