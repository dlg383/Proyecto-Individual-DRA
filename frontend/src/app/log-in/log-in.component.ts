import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { SesionService } from '../sesion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  user?: User;
  errorMessage: string | null = null;
  passwordImage: string = '/assets/img/showPassword.png';
  
  constructor(private userService: UserService, public sesionService: SesionService, private router: Router){}
  
  getUser(name: string, password: string): void {
    name = name.trim();
    password = password.trim();
  
    if (!name || !password) { 
      this.errorMessage = "Name and password are required";
      return; 
    }
  
    this.userService.getUser({ name, password } as User)
      .subscribe(
        user => {
          this.user = user;
          this.sesionService.sesion = this.user.id;
          this.router.navigate(['/'])
        },
        error => {
          console.error('User not found!', error);
          this.errorMessage = "User not found!";
        }
      );
  } 
  
  togglePasswordVisibility(): void {
    const passwordField: any = document.getElementById('password');
    
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      this.passwordImage = '/assets/img/hidePassword.png';
    } else {
      passwordField.type = 'password';
      this.passwordImage = '/assets/img/showPassword.png';
    }
  }
}
