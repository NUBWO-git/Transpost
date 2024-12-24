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
  sentOtp: string = '';  

  constructor(
    private userService: userservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  // ฟังก์ชันสมัครสมาชิก
  register() {
    if (!this.otp) {
      this.snackBar.open('กรุณากรอก OTP ก่อนสมัครสมาชิก', '', { duration: 3000 });
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('รหัสผ่านไม่ตรงกัน', '', { duration: 3000 });
      return;
    }
  
    // ส่งพารามิเตอร์ให้ครบ
    this.userService.verifyOtp(this.email, this.otp, this.username, this.password, 'verifyOtp').subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.snackBar.open('สมัครสมาชิกสำเร็จ', '', { duration: 3000 });
          this.router.navigate(['welcome_Transpost/sign-in']);
        } else {
          this.snackBar.open(response.message || 'เกิดข้อผิดพลาด', '', { duration: 3000 });
        }
      },
      error: () => {
        this.snackBar.open('เกิดข้อผิดพลาดในการสมัครสมาชิก', '', { duration: 3000 });
      }
    });
  }

  // ฟังก์ชันขอ OTP
  requestOtp() {
    if (!this.username || !this.email || !this.password) {
      this.snackBar.open('กรุณากรอกข้อมูลให้ครบถ้วนก่อนขอ OTP', '', { duration: 3000 });
      return;
    }

    this.isSendingOtp = true; // แสดงสถานะกำลังส่ง OTP

    this.userService.sendOtp(this.username, this.email, this.password).subscribe({
      next: (response: any) => {
        this.isSendingOtp = false; // ยกเลิกสถานะกำลังส่ง
        if (response.status === 'success') {
          this.snackBar.open('ส่ง OTP ไปยังอีเมลแล้ว', '', { duration: 3000 });
          this.otpSent = true;
          this.sentOtp = response.otp; // เก็บ OTP ที่ส่งมาจาก Server
        } else {
          this.snackBar.open(response.message || 'ไม่สามารถส่ง OTP ได้', '', { duration: 3000 });
        }
      },
      error: () => {
        this.isSendingOtp = false; // ยกเลิกสถานะกำลังส่ง
        this.snackBar.open('เกิดข้อผิดพลาดในการขอ OTP', '', { duration: 3000 });
      }
    });
  }

  // ฟังก์ชันตรวจสอบ OTP
  verifyOtp(action: string) {
    if (!this.email || !this.otp) {
      this.snackBar.open('กรุณากรอก OTP และอีเมล', '', { duration: 3000 });
      return;
    }

    this.userService.verifyOtp(this.password, this.username, this.email, this.otp, action).subscribe({
      next: (response) => {
        if (response && response.status === 'success') {
          this.snackBar.open('OTP ถูกต้อง', '', { duration: 3000 });
          this.otpValid = true;
        } else {
          this.snackBar.open(response.message || 'OTP หรืออีเมลไม่ถูกต้อง', '', { duration: 3000 });
          this.otpValid = false;
        }
      },
      error: () => {
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
