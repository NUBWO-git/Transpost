import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApplyDialogComponent } from '../../Dialog/apply-dialog/apply-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { userservice } from '../../service/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplyComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  otp: string = '';
  termsAccepted: boolean = false;
  otpSent: boolean = false;
  otpValid: boolean = false;
  isSendingOtp: boolean = false;

  constructor(
    private userService: userservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  // ฟังก์ชันสมัครสมาชิก
  register() {
    console.log('register() called');
  
    if (!this.otpValid) {
      this.snackBar.open('กรุณากรอก OTP ที่ถูกต้อง', '', { duration: 3000 });
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('รหัสผ่านไม่ตรงกัน', '', { duration: 3000 });
      return;
    }
  
    if (!this.username || !this.email || !this.password) {
      this.snackBar.open('กรุณากรอกข้อมูลให้ครบถ้วน', '', { duration: 3000 });
      return;
    }
  
    if (!this.otpSent) {
      this.snackBar.open('กรุณาขอ OTP ก่อน', '', { duration: 3000 });
      return;
    }
  
    // ส่งข้อมูลการสมัครสมาชิกไปยัง API
    this.userService.regis(this.username, this.email, this.password).subscribe({
      next: (response) => {
        console.log('response', response);
        if (response && response.status === 'success') {
          this.snackBar.open('สมัครสมาชิกสำเร็จ', '', { duration: 3000 });
  
          // เก็บข้อมูลผู้ใช้ใน LocalStorage
          const userData = {
            username: this.username,
            email: this.email,
            password: this.password
          };
          try {
            localStorage.setItem('user', JSON.stringify(userData));
            console.log('User data saved to LocalStorage:', userData);
          } catch (error) {
            console.error('Failed to save user data to LocalStorage:', error);
            this.snackBar.open('เกิดข้อผิดพลาดในการบันทึกข้อมูล', '', { duration: 3000 });
            return;
          }
  
          this.router.navigate(['welcome_Transpost/sign-in']);
        } else {
          this.snackBar.open('ไม่สามารถสมัครสมาชิกได้', '', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('error', error);
        this.snackBar.open('เกิดข้อผิดพลาด', '', { duration: 3000 });
      }
    });
  }

  // ฟังก์ชันขอ OTP
  requestOtp() {
    if (!this.email) {
      this.snackBar.open('กรุณากรอกอีเมลก่อนขอ OTP', '', { duration: 3000 });
      return;
    }

    this.userService.sendOtp(this.email).subscribe({
      next: (response) => {
        if (response && response.status === 'success') {
          this.snackBar.open('OTP ถูกส่งไปยังอีเมลแล้ว', '', { duration: 3000 });
          this.otpSent = true;
        } else {
          this.snackBar.open('ไม่สามารถส่ง OTP ได้', '', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open('เกิดข้อผิดพลาดในการขอ OTP', '', { duration: 3000 });
      }
    });
  }

  // ฟังก์ชันตรวจสอบ OTP
  verifyOtp() {
    if (!this.otp) {
      this.snackBar.open('กรุณากรอก OTP', '', { duration: 3000 });
      return;
    }

    this.userService.verifyOtp(this.otp).subscribe({
      next: (response) => {
        if (response && response.status === 'success') {
          this.snackBar.open('OTP ถูกต้อง', '', { duration: 3000 });
          this.otpValid = true;
        } else {
          this.snackBar.open('OTP ไม่ถูกต้อง', '', { duration: 3000 });
          this.otpValid = false;
        }
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open('เกิดข้อผิดพลาดในการตรวจสอบ OTP', '', { duration: 3000 });
      }
    });
  }

  // ฟังก์ชันเปิด Dialog
  openDialog() {
    const dialogRef = this.dialog.open(ApplyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
