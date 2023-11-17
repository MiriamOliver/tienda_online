export interface Design {
  id:number,
  titulo:string,
  imagen:string,
  id_artista:number,
  nombre:string,
  fecha:string,
  tema:string,
  estilo:string,
  productos:any
}

export interface listaDisenos{
  todos:Design[]
  afines:Design[]
}

export interface TipoProducto{
  tipo:string,
  checked:boolean
}

export interface FiltroDisenos{
    fecha: string,
    estilo:string,
    tema:string,
    productos:TipoProducto[]
}
