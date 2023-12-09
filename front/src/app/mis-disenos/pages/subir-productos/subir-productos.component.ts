import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MisDisenosService } from '../../services/mis-disenos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { crearProducto } from '../../interfaces/mis-disenos';

@Component({
  selector: 'app-subir-productos',
  templateUrl: './subir-productos.component.html',
  styleUrls: ['./subir-productos.component.scss']
})
export class SubirProductosComponent implements OnInit{

  timer: number | undefined;
  selectedFile: string = "";
  submitted: boolean = false;
  productoForm!: FormGroup;
  producto!:crearProducto;
  listaTipo:string[] = [];
  tipo:string = '';
  previsualizacion = '';
  errorAddProducto:number = -1;
  mensaje = '';
  abrirCrearProducto:number = -1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private misDisenosService:MisDisenosService,
  ) {
    this.producto = {
      titulo:'',
      imagen:'',
      precio:0,
      tipo:'',
      descripcion:'',
      id_artista:0,
      id_diseno:0
    }
  }

  ngOnInit(): void {

    this.misDisenosService.getTipos().subscribe(resp =>{this.listaTipo = resp});

    this.productoForm = this.fb.group({
      imagen: ['', Validators.required],
      titulo: ['', Validators.required],
      precio: ['', Validators.compose([
              Validators.required,
              Validators.pattern("[0-9]+(\\.[0-9][0-9]?)?")])],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  get form() {
    return this.productoForm.controls;
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

  addProducto() {
    this.producto.titulo = this.productoForm.get('titulo')?.value + ' - ' + this.productoForm.get('tipo')?.value;
    this.producto.imagen = this.selectedFile;
    this.producto.tipo = this.productoForm.get('tipo')?.value;
    this.producto.precio = Number(this.productoForm.get('precio')?.value);
    this.producto.descripcion = this.productoForm.get('descripcion')?.value;
    this.producto.id_artista = JSON.parse(localStorage.getItem('user')!).id;
    this.producto.id_diseno = Number(JSON.parse(localStorage.getItem('diseno')!).id);

    this.misDisenosService.addProducto(this.producto)
    .subscribe(resp => {
      if(resp.sucess){
        this.limpiarDatosAddProducto();
        this.misDisenosService.getDisenoListaProductos(JSON.parse(localStorage.getItem('diseno')!).id);
        window.location.reload();

      }else{
        this.mensaje = 'Error en el registro';
        this.errorAddProducto = 1;
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {this.errorAddProducto = -1; window.location.reload();}, 3000);
      }
    })
  }

  abrirAddProducto() {
    this.limpiarDatosAddProducto();
    this.abrirCrearProducto = 0;
  }

  cerrarAddProducto() {
    this.limpiarDatosAddProducto();
    this.abrirCrearProducto = -1;
  }

  limpiarDatosAddProducto(){
    this.productoForm.reset();
  }
}
