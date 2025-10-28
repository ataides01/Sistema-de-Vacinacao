export interface User {
  id: number;
  nome: string;
  email: string;
  perfil: 'enfermeiro' | 'farmaceutico' | 'administrador' | 'paciente';  ativo: boolean;
  dataCadastro: Date;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
