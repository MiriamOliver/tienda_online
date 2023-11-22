import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MisDisenosService } from '../../services/mis-disenos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { crearDiseno } from '../../interfaces/mis-disenos';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-subir-disenos',
  templateUrl: './subir-disenos.component.html',
  styleUrls: ['./subir-disenos.component.scss']
})
export class SubirDisenosComponent implements OnInit{

  selectedFile: string = "";
  creacionCorrecta: number = -1;
  submitted: boolean = false;
  disenoForm!: FormGroup;
  diseno!:crearDiseno;
  errorRegistrarDiseno:number = 0;
  estilo:string = '';
  tema:string = '';
  previsualizacion = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private misDisenosService:MisDisenosService
  ) {

  }

  ngOnInit(): void {

    this.disenoForm = this.fb.group({
      imagen: ['', Validators.required],
      titulo: ['', Validators.required],
      tema: ['', Validators.required],
      estilo: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  get form() {
    return this.disenoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

  onFileSelected(event:any): any{
    this.selectedFile = event.target.files[0];
    this.extraerImagen(this.selectedFile).then((imagen:any) => {
    this.previsualizacion = imagen.base;})
  }

  extraerImagen = async(event:any) => new Promise((resolve) =>{
    try{
      let safeImg = window.URL.createObjectURL(event);
      let image = this.sanitizer.bypassSecurityTrustUrl(safeImg);
      let reader = new FileReader();
      reader.readAsDataURL(event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return reader;

    }catch(error){
      return null;
    };
  })

  subirDiseno() {
    this.diseno.titulo = this.disenoForm.get('titulo')?.value;
    this.diseno.imagen = this.selectedFile;
    this.diseno.estilo = this.disenoForm.get('estilo')?.value;
    this.diseno.tema = this.disenoForm.get('tema')?.value;
    this.diseno.descripcion = this.disenoForm.get('descripcion')?.value;
    this.diseno.id_artista = JSON.parse(localStorage.getItem('user')!).id;

    this.misDisenosService.registrarDiseno(this.diseno).subscribe(resp => {
      if (resp) {
        [['misdisenos/diseno'+resp.id]]
      }else{
        this.errorRegistrarDiseno = 1;
      }
    });
  }
}
