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
   sendOtp( username: string, email: string, password: string ): Observable<any> {
      console.log('Payload for sendOtp:'); // ตรวจสอบ payload
      return this.http.post(this.apiUrl, {
         action: 'sendOtp',
         username: username,
         email: email,
         password: password,
      }).pipe(
         catchError(this.handleError)
      );
   }        

   // ฟังก์ชันสำหรับการตรวจสอบ OTP
   verifyOtp(email: string, otp: string): Observable<any> {
      return this.http.post(this.apiUrl, {
         action: 'verifyOtp',
         email: email,
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
