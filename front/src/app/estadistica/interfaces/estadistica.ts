export interface EstadisticaMes {
  fecha:string,
  precio:number,
  mes:string,
}

export interface EstadisticaAnio {
  fecha:string,
  precio:number,
}

export interface ListadoDisenios{
  id:number,
  titulo:string,
  imagen:string,
  estilo:string,
  tema:string,
  cantidad:string,
  precio:string,
  productos:Productos[]
}

export interface Productos{
  id_producto:number,
  id_disenio:number,
  titulo:string,
  imagen:string,
  cantidad:number,
  tipo:string,
  activado: string,
  estado:string,
  precio:string,
}
