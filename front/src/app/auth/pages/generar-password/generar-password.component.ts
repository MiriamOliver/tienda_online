import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { confirmarPasswd } from '../../validators/validator';
import { Resultado } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-generar-password',
  templateUrl: './generar-password.component.html',
  styleUrls: ['./generar-password.component.scss']
})
export class GenerarPasswordComponent implements OnInit{

  timer: number | undefined;
  submitted: boolean = false;
  genPasswdForm!: FormGroup;
  cambioPasswd = 1;
  genPasswdCorrecto = -1;
  resultado:Resultado

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.resultado = {
      msg: "",
      success: false
    }
  }

  ngOnInit(): void {
    this.cambioPasswd = 1;
    this.submitted = false;
    this.genPasswdForm = this.fb.group({
      codigo: ['', Validators.required],
      passwords: this.fb.group({
        passwd: ['', Validators.required],
        passwdConf: ['', Validators.required]
      },
      {
        validators: [confirmarPasswd()]
      })
    })
  }

  get passwords(){
    return this.genPasswdForm.controls["passwords"] as FormGroup;
  }

  genPasswd() {
    this.authService.generarPassword(
          this.genPasswdForm.get('passwords')?.get('passwd')?.value,
          this.genPasswdForm.get('codigo')?.value)
    .subscribe(resp => {
      if (!resp.success) {
          this.genPasswdCorrecto = 1;
          this.resultado.msg = resp.msg;
          clearTimeout(this.timer);
          this.timer = window.setTimeout(() => {this.genPasswdCorrecto = -1;}, 5000);
        }else{
          this.genPasswdCorrecto = 2;
          this.resultado.msg = resp.msg;
        }
    });
  }

  get form() {
    return this.genPasswdForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

  abrirRestPasswd() {
    this.router.navigate(['auth/recpasswd']);
  }

  abrirLogin(){
      this.router.navigate(['auth/login']);
  }
}
