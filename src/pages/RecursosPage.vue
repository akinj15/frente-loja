<template>
  <q-page class="row q-pa-md">
    <q-card class="col-12">
      <q-card-section class="row q-px-md">
        <div class="col-11">
          <q-input
            dense
            outlined
            label="Pesquisar recurso"
            v-model="campoPesquisa"
            @keyup.enter="pesquisar"
          />
        </div>
        <div class="col-1 q-pl-md">
          <q-btn
              round
              dense
              flat
              icon="search"
              color="primary"
              @click="pesquisar"
            />
        </div>
      </q-card-section>
      <q-card-section class="q-px-md">
        <q-table
          class=""
          title="recursos"
          :columns="columns"
          :rows="recursoStore.recursos"
          virtual-scroll
          :rows-per-page-options="[0]"
          @row-click="onCickRecruso"
          style="height: 450px;"
        />
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialog" persistent>
      <AdcionarRecurso></AdcionarRecurso>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRecursoStore } from 'src/stores/useRecursoStore'
import { useQuasar } from 'quasar'
import AdcionarRecurso from 'src/components/AdcionarRecurso.vue'
const $q = useQuasar()

const recursoStore = useRecursoStore()

const campoPesquisa = ref('')
const dialog = ref(false)
const sessionId: any = window.localStorage.getItem('session')
const columns = [
  { name: 'nome', align: 'left', label: 'Nome', field: 'nome', sortable: true },
  {
    name: 'chave',
    label: 'chave',
    align: 'left',
    field: 'chave',
    sortable: true
  },
  { name: 'unitario', align: 'left', label: 'unitario', field: 'unitario' },
  { name: 'codigo', align: 'left', label: 'Codigo', field: 'codigo', sortable: true },
  { name: 'unidMedida', align: 'left', label: 'unidMedida', field: 'unidMedida' }
]

const pesquisar = async () => {
  $q.loading.show()

  await recursoStore.getRecursos(campoPesquisa.value, sessionId)
  $q.loading.hide()
}

const onCickRecruso = async (evt: any, row: any) => {
  console.log(row)
  recursoStore.iniciaRecurso(row)
  dialog.value = !dialog.value
  return true
}

</script>
