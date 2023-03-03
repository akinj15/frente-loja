import { defineStore } from 'pinia'
import api from '../boot/axios'
export const useVendaStore = defineStore('venda', {
  state: () => ({
    venda: Number
  }),
  getters: {},
  actions: {
    async novaVenda (sessionId: string, cliente?: number, empresaConveniada?: number, politicaDeVenda?: number) {
      if (sessionId) {
        const dadosEnvio = {
          metodo: 'nova',
          sessionId,
          parametros: {
            cliente,
            empresaConveniada,
            politicaDeVenda
          }
        }
        let response: any
        try {
          response = await api.postData('', dadosEnvio)
          this.venda = JSON.parse(response.data.result.replace('\\"', '"')).chcriacao
        } catch (e) {
          console.log(e)
          return e
        }
      }
    }
  }
})
