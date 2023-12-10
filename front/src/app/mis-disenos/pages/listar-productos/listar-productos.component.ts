import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MisDisenosService } from '../../services/mis-disenos.service';
import { infoProducto } from '../../interfaces/mis-disenos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent implements OnInit{

  productos:any;
  confirmarBorrarProducto = -1;
  id_producto = 0;
  id_editar = 0;
  contenedor:any = null;
  contenedorEditarId:any = null;
  pag:number;
  contenedorEditar:string = '';
  tipo:string = '';
  titulo:string = '';
  descripcion:string = '';
  precio:number = 0.00;
  previsualizacion:any = '';
  producto:infoProducto;
  submitted: boolean = false;
  productoForm!: FormGroup;
  timer: number | undefined;
  selectedFile: string = "";
  listaTipo:string[] = [];
  errorModificarProducto = -1;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private misDesignService:MisDisenosService) {
      this.pag = 1;
      this.producto = {
        id : 0,
        titulo:'',
        imagen:'',
        tipo:'',
        precio:0.00,
        descripcion:'',
        id_artista:0,
        id_diseno:0,
      }
    }


    ngOnInit(): void {
      this.misDesignService.getDisenoListaProductos(JSON.parse(localStorage.getItem('diseno')!).id);
      this.misDesignService.getTipos().subscribe(resp =>{this.listaTipo = resp});
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

    get listadoProductos(){
      return this.misDesignService.listadoProductos;
    }

    letraMayuscula(nombre:string){
      let firstLetra = nombre.charAt(0);
      let palabra = nombre.slice(1);
      return firstLetra.toUpperCase() + palabra;
    }

    modificarProducto(id:any){
      this.id_editar = id;
      let result = this.misDesignService.obtenerProducto(id);
      this.previsualizacion = result.imagen;
      this.titulo = result.titulo;
      this.precio = result.precio;
      this.tipo = result.tipo;
      this.descripcion = result.descripcion;
      if(this.id_editar != 0){
        this.contenedorEditar = 'editar';
        if(this.contenedorEditar == 'editar'){
          this.productoForm = this.fb.group({
            titulo: ['', Validators.required],
            tipo: ['', Validators.required],
            precio: ['', Validators.compose([
              Validators.required,
              Validators.pattern("[0-9]+(\\.[0-9][0-9]?)?")])],
            descripcion: ['', Validators.required],
          })
        }
      }
    }

    cerrarModificar(){
      this.contenedorEditar = '';
      this.id_editar = 0;
      this.previsualizacion = '';
      this.titulo = '';
      this.precio = 0.00;
      this.tipo = '';
      this.descripcion = '';
    }

    confirmarModificarProducto(){
      console.log('holita')
      if(this.selectedFile){
        this.producto.imagen = this.selectedFile;
      }else{
        this.producto.imagen = '';
      }
      this.producto.id = this.id_editar;
      this.producto.titulo = this.productoForm.get('titulo')?.value;
      this.producto.precio = this.productoForm.get('precio')?.value;
      this.producto.tipo = this.productoForm.get('tipo')?.value;
      this.producto.descripcion = this.productoForm.get('descripcion')?.value;
      this.producto.id_artista = JSON.parse(localStorage.getItem('user')!).id;
      this.producto.id_diseno = JSON.parse(localStorage.getItem('diseno')!).id;

      this.misDesignService.modificarProducto(this.producto).subscribe(resp => {
        if (resp) {
          this.cerrarModificar();
          window.location.reload();
        }else{
          this.errorModificarProducto = 1;
          this.contenedorEditarId = document.getElementById('info'+this.id_editar);
          this.contenedorEditarId.style.position = 'relative';
          clearTimeout(this.timer);
          this.timer = window.setTimeout(() => {this.errorModificarProducto = -1;
                                                  this.contenedorEditarId.style.removeProperty("position")
                                                  this.contenedorEditarId = null;
                                                }, 3000);
        }
      });

    }

    abrirBorrarProducto(id:any){
      this.confirmarBorrarProducto = 1;
      this.id_producto = id;
      this.contenedor = document.getElementById('info'+this.id_producto);
      this.contenedor.style.position = 'relative';
      console.log(this.contenedor);
    }

    cerrarBorrarProducto(){
      this.confirmarBorrarProducto = -1;
      this.id_producto = 0;
      this.contenedor.style.removeProperty("position")
      this.contenedor = null;
    }

    borrarProducto(){
      this.misDesignService.borrarProducto(this.id_producto)
      .subscribe(resp => {
        if(resp.success){
          this.id_producto = 0;
          this.contenedor.style.removeProperty("position")
          this.contenedor = null;
          window.location.reload();
        }
      });
    }

    activarProducto(id:number, activar:number){
      this.misDesignService.activarProducto(id, activar)
      .subscribe(resp => {
        if(resp.success){
          window.location.reload();
        }
      });
    }

}
