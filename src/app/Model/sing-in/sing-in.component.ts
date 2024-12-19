import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [  ],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.scss'
})
export class SingInComponent {
  constructor(private router: Router) {}

  navigateToApply(): void {
    this.router.navigate(['/welcome_Transpost/apply']);
  }
  ToHomepage(): void{
    this.router.navigate(['/welcome_Transpost/Homrpage'])
  }
}
