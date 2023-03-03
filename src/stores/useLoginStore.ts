import { defineStore } from 'pinia'
import api from '../boot/axios'
import { Login } from '../components/models'
export const useLoginStore = defineStore('login', {
  state: () => ({
    user: String,
    password: String,
    terminal: Number,
    sessionId: String,
    chaveUsuario: Number
  }),
  getters: {},
  actions: {
    async login (dados: Login) {
      if (dados.user && dados.password) {
        const dadosEnvio = {
          metodo: 'login',
          parametros: {
            nome: dados.user,
            senha: dados.password,
            chaveTerminal: dados.terminal,
            prevenda: dados.prevenda
          }
        }
        let response: any
        try {
          window.localStorage.clear()
          response = await api.postData('', dadosEnvio)
          this.sessionId = response.data.sessionId
          this.chaveUsuario = response.data.chaveUsuario
          window.localStorage.setItem('session', response.data.sessionId)
          window.localStorage.setItem(
            'chaveUsuario',
            JSON.parse(response.data.result.replace('\\"', '"')).chaveUsuario
          )
        } catch (e) {
          return e
        }
      }
    }
  }
})
