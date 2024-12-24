import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class userservice {
   private apiUrl = 'http://localhost/transpost/transpost.php';

   constructor(private http: HttpClient) {}

   // ฟังก์ชันที่คืนค่า Observable
   register(data: any): Observable<any> {
      const url = 'http://localhost/transpost/transpost.php';
      return this.http.post(url, data);
   }

   // ฟังก์ชันสำหรับการสมัครสมาชิก
   regis(username: string, email: string, password: string): Observable<any> {
      const payload = {
         action: 'register', // เปลี่ยน action ให้ตรงกับที่ PHP คาดหวัง
         username: username,
         email: email,
         password: password,
      };
      return this.http.post(this.apiUrl, payload).pipe(
         catchError(this.handleError)
      );
   }

   // ฟังก์ชันสำหรับการขอ OTP
   sendOtp(username: string, email: string, password: string): Observable<any> {
      const payload = { action: 'sendOtp', username, email, password }; // ใช้ username แทน name
      return this.http.post(this.apiUrl, payload, { responseType: 'json' }).pipe(
         catchError((error) => {
            console.error('Error in sendOtp:', error);
            throw new Error('เกิดข้อผิดพลาดในการส่ง OTP');
         })
      );
   }

   // ฟังก์ชันสำหรับการตรวจสอบ OTP
   verifyOtp(email: string, otp: string, username: string, password: string, action: string): Observable<any> {
      const payload = {
         action: action,
         email: email,
         otp: otp,
         username: username,
         password: password,
      };
      return this.http.post(this.apiUrl, payload).pipe(
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
      console.error(errorMessage);  // แสดงข้อผิดพลาดในคอนโซล
      return throwError(() => new Error(errorMessage));  // ส่งข้อผิดพลาดกลับไปยัง caller
   }
}
