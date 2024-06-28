import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SesionService } from '../sesion.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  users: User[] = [];
  errorMessage: string | null = null;
  passwordImage1: string = '/assets/img/showPassword.png';
  passwordImage2: string = '/assets/img/showPassword.png';
  
  constructor(private userService: UserService, private router: Router, public sesionService: SesionService){}
  
  addUser(name: string, password: string, confirmPassword: string): void {
    name = name.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (!name || !password || !confirmPassword) { 
      this.errorMessage = "Name and password are required";
      return; 
    }else if (password != confirmPassword){
      this.errorMessage = "Passwords do not match";
      return;
    }

    this.userService.addUser({ name, password } as User)
      .subscribe(
        user => {
          this.users.push(user);
          this.errorMessage = null;
          this.sesionService.sesion = user.id;
          this.router.navigate(['/'])
        },
        error => {
          console.error('There was an error adding the user!', error);
          this.errorMessage = "El nombre de usuario ya está registrado";
        }
      );
  }

  togglePasswordVisibility1(): void {
    const passwordField: any = document.getElementById('password1');
    
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      this.passwordImage1 = '/assets/img/hidePassword.png';
    } else {
      passwordField.type = 'password';
      this.passwordImage1 = '/assets/img/showPassword.png';
    }
  }

  togglePasswordVisibility2(): void {
    const passwordField: any = document.getElementById('password2');
    
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      this.passwordImage2 = '/assets/img/hidePassword.png';
    } else {
      passwordField.type = 'password';
      this.passwordImage2 = '/assets/img/showPassword.png';
    }
  }
}
