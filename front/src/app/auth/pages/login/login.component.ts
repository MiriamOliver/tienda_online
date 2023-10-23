import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Sesion, Resultado } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  timer: number | undefined;
  loginCorrecto: number = -1;
  submitted: boolean = false;
  loginForm!: FormGroup;
  usuario:Sesion;
  resultado:Resultado;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.usuario = {
      email: "",
      password:""
    }
    this.resultado = {
      msg: "",
      success: false
    }
  }

  ngOnInit(): void {
    this.loginCorrecto = -1;
    this.submitted = false;

    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ])],
      passwd: ['', Validators.required],
    })
  }

  get form() {
    return this.loginForm.controls;
  }

  login(){

    this.usuario.email = this.loginForm.get('email')?.value;
    this.usuario.password = this.loginForm.get('passwd')?.value;

    this.authService.login(this.usuario).subscribe(resp => {
      if (!resp.success) {
        this.loginCorrecto = 1;
        this.resultado.msg = resp.msg;
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {this.loginCorrecto = -1;}, 5000);
      }else{
        localStorage.setItem('user', JSON.stringify(resp.data));
        if(JSON.parse(localStorage.getItem('user')!).rol == 'cliente'){
          this.router.navigate(['cliente/inicio']);
        }else if(JSON.parse(localStorage.getItem('user')!).rol == 'administrador'){
          this.router.navigate(['administrador/inicio']);
        }
      }
    });
  }

  onSubmit() {
    this.submitted = true;
  }


  abrirRegistro() {
    this.router.navigate(['auth/registro']);
  }

  abrirRecPasswd() {
    this.router.navigate(['auth/recpasswd']);
  }
}

