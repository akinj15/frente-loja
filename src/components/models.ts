export interface Login {
  user: string;
  password: string;
  terminal: string;
  prevenda: boolean;
}

export interface ServerRequest {
  sessionId: string
  metodo: string
  parametros: {
    nome: string
    senha: string
    prevenda: boolean
    chaveTerminal: number
  }
}
