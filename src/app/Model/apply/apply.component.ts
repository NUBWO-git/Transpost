import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApplyDialogComponent } from '../../Dialog/apply-dialog/apply-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

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
  styleUrls: ['./apply.component.scss'],
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
  successMessage: string = '';  // ประกาศตัวแปร successMessage
  errorMessage: string = '';    // ประกาศตัวแปร errorMessage


  constructor(
    private userservice: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  // ฟังก์ชันสมัครสมาชิก
  register() {
    // ตรวจสอบว่ามีข้อมูลครบถ้วนก่อน
    if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.otp) {
      this.snackBar.open('กรุณากรอกข้อมูลให้ครบถ้วนก่อนสมัครสมาชิก', '', { duration: 3000 });
      return;
    }

    // ตรวจสอบรหัสผ่านและการยืนยันรหัสผ่าน
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('รหัสผ่านไม่ตรงกัน', '', { duration: 3000 });
      return;
    }

    // เรียกใช้ฟังก์ชัน verifyOtp เพื่อยืนยัน OTP
    this.userservice.verifyOtp(this.email, this.otp, this.username, this.password, 'verifyOtp').subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.snackBar.open('สมัครสมาชิกสำเร็จ', '', { duration: 3000 });
          this.router.navigate(['welcome_Transpost/sign-in']);  // เปลี่ยนเส้นทางไปยังหน้าล็อกอิน
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

    this.userservice.sendOtp(this.username, this.email, this.password).subscribe({
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
  verifyOtp() {
    const action = 'verifyOtp'; // ระบุ action ให้เป็น 'verifyOtp'
    
    this.userservice.verifyOtp(this.email, this.otp, this.username, this.password, action).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.successMessage = response.message;
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = 'ไม่สามารถยืนยัน OTP ได้';
      }
    );
  }
  
  

  // ฟังก์ชันเปิด Dialog
  openDialog() {
    const dialogRef = this.dialog.open(ApplyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
