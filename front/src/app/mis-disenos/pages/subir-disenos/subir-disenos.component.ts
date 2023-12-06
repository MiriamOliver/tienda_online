import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
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

  timer: number | undefined;
  selectedFile: string = "";
  creacionCorrecta: number = -1;
  submitted: boolean = false;
  disenoForm!: FormGroup;
  diseno:crearDiseno;
  errorRegistrarDiseno:number = -1;
  estilo:string = '';
  tema:string = '';
  titulo:string = '';
  descripcion = '';
  previsualizacion = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private misDisenosService:MisDisenosService
  ) {
    this.diseno = {
      titulo:'',
      imagen:'',
      tema:'',
      estilo:'',
      descripcion:'',
      id_artista:0,
    }
  }

  ngOnInit(): void {

    this.disenoForm = this.fb.group({
      imagen: ['', Validators.required],
      titulo: ['', Validators.required],
      tema: ['', Validators.required],
      estilo: ['', Validators.required],
      descripcion: ['', Validators.required],
    })

    if(!this.router.url.includes('editar'))
    {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.misDisenosService.getDatosDiseno(id))
      )
      .subscribe(( resp) => {
        this.diseno = {
          titulo:resp.titulo,
          imagen:resp.imagen,
          tema:resp.tema,
          estilo:resp.estilo,
          descripcion: resp.descripcion,
          id_artista:JSON.parse(localStorage.getItem('user')!).id,
        }
        this.titulo = this.diseno.titulo;
        this.previsualizacion =  this.diseno.imagen;
        this.tema = this.diseno.tema;
        this.estilo =  this.diseno.estilo;
        this.descripcion = this.diseno.descripcion;
      });
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
    localStorage.removeItem('diseno');
    this.diseno.titulo = this.disenoForm.get('titulo')?.value;
    this.diseno.imagen = this.selectedFile;
    this.diseno.estilo = this.disenoForm.get('estilo')?.value;
    this.diseno.tema = this.disenoForm.get('tema')?.value;
    this.diseno.descripcion = this.disenoForm.get('descripcion')?.value;
    this.diseno.id_artista = JSON.parse(localStorage.getItem('user')!).id;

    this.misDisenosService.registrarDiseno(this.diseno).subscribe(resp => {
      if (resp) {
        localStorage.setItem('diseno', JSON.stringify({
          id: resp,
        }));
        this.router.navigate(['misdisenos/diseno/'+resp]);
      }else{
        this.errorRegistrarDiseno = 1;
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {this.errorRegistrarDiseno = -1;}, 3000);
      }
    });
  }

  modificarDiseno(){
    localStorage.removeItem('diseno');
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.selectedFile){
      this.diseno.imagen = this.selectedFile;
    }else{
      this.diseno.imagen = '';
    }
    this.diseno.titulo = this.disenoForm.get('titulo')?.value;
    this.diseno.estilo = this.disenoForm.get('estilo')?.value;
    this.diseno.tema = this.disenoForm.get('tema')?.value;
    this.diseno.descripcion = this.disenoForm.get('descripcion')?.value;
    this.diseno.id_artista = JSON.parse(localStorage.getItem('user')!).id;

    this.misDisenosService.modificarDiseno(this.diseno, id).subscribe(resp => {
      if (resp) {
        localStorage.setItem('diseno', JSON.stringify({
          id: resp,
        }));
        this.router.navigate(['misdisenos/diseno/'+resp]);
      }else{
        this.errorRegistrarDiseno = 1;
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {this.errorRegistrarDiseno = -1;}, 3000);
      }
    });
  }
}
