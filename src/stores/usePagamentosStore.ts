import { defineStore } from 'pinia'
import api from '../boot/axios'
export const useTurnoStore = defineStore('turno', {
  state: () => ({
    turno: {}
  }),
  getters: {},
  actions: {
    async getStatusTurno (sessionId: string) {
      if (sessionId) {
        const dadosEnvio = {
          metodo: 'consultaStatusCaixa',
          sessionId
        }
        let response: any
        try {
          response = await api.postData('', dadosEnvio)
          this.turno = JSON.parse(response.data.result.replace('\\"', '"'))
        } catch (e) {
          console.log(e)
          return e
        }
      }
    },
    async iniciaFechaTurno (dados: any) {
      try {
        const dadosEnvio = {
          metodo: dados.funcao,
          sessionId: dados.sessionId,
          parametros: {
            chaveUsuario: dados.chaveUsuario
          }
        }
        api.postData('', dadosEnvio)
        this.getStatusTurno(dados.sessionId)
      } catch (e) {
        console.log(e)
        return e
      }
    }
  }
})
