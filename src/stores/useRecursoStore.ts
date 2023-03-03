import { defineStore } from 'pinia'
import api from '../boot/axios'
import { Recurso } from 'src/models/Recurso'
export const useRecursoStore = defineStore('recurso', {
  state: () => ({
    recursos: [],
    recurso: Recurso
  }),
  getters: {},
  actions: {
    async getRecursos (valor: string, sessionId: string) {
      if (valor && sessionId) {
        const dadosEnvio = {
          metodo: 'consultaRecursos',
          sessionId,
          parametros: {
            valor
          }
        }
        let response: any
        try {
          response = await api.postData('', dadosEnvio)
          this.recursos = JSON.parse(response.data.result.replace('\\"', '"'))
        } catch (e) {
          console.log(e)
          return e
        }
      }
    },
    async iniciaRecurso (dados: any) {
      this.recurso = dados
    }
  }
})
