import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { confirmarPasswd } from '../../validators/validator';
import { Registro, Resultado } from '../../interfaces/auth.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  timer: number | undefined;
  selectedFile: string = "";
  passwdCorrecta: boolean = false;
  registroCorrecto: number = -1;
  submitted: boolean = false;
  registerForm!: FormGroup;
  usuario:Registro;
  resultado:Resultado;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.usuario = {
      avatar: "",
      nombre: "",
      email: "",
      password:""
    }
    this.resultado = {
      msg: "",
      success: false
    }
  }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      avatar: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ])],
      passwords: this.fb.group({
        passwd: ['', Validators.required],
        passwdConf: ['', Validators.required]
      },
      {
        validators: [confirmarPasswd()]
      })
    })
  }

  get form() {
    return this.registerForm.controls;
  }

  get passwords(){
    return this.registerForm.controls["passwords"] as FormGroup;
  }


  onFileSelected(event:any): any{
    this.selectedFile = event.target.files[0];
  }

  registro() {

    this.usuario.avatar = this.selectedFile;
    this.usuario.nombre = this.registerForm.get('nombre')?.value;
    this.usuario.email = this.registerForm.get('email')?.value;
    this.usuario.password = this.registerForm.get('passwords')?.get('passwd')?.value;

    if (this.registerForm.get('passwords')?.get('passwd')?.value == this.registerForm.get('passwords')?.get('passwdConf')?.value) {

      this.authService.registro(this.usuario).subscribe(resp => {
        if (!resp.success) {
          this.registroCorrecto = 1;
          this.resultado.msg = resp.msg;
          clearTimeout(this.timer);
          this.timer = window.setTimeout(() => {this.registroCorrecto = -1;}, 5000);
        }else{
          this.registroCorrecto = 2;
          this.resultado.msg = resp.msg;
          clearTimeout(this.timer);
          this.timer = window.setTimeout(() => {this.registroCorrecto = -1;
            this.router.navigate(['auth/login']);}, 5000);
          }
      });
    }
    else {
      this.passwdCorrecta = true;
    }
  }

  onSubmit() {
    this.submitted = true;
  }

  abrirLogin() {
    this.router.navigate(['auth/login']);
  }
}
