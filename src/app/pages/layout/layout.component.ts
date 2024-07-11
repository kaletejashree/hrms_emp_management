import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Clear user token or session data (example: userToken from localStorage)
    localStorage.removeItem('userToken');
    
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}

