export interface Registro {
  avatar: string;
  nombre: string;
  email: string;
  password: string;
}

export interface Sesion {
  email: string;
  password: string;
}

export interface Auth {
  success: boolean;
  msg: string;
  data: {
      id: number;
      nombre: string;
      token: string;
  }
}

export interface Resultado {
  success: boolean;
  msg: string;
}
