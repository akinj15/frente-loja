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
      <q-card style="min-width: 150px">
        <q-card-section>
          <div class="text-h6">INCLUIR: {{ recursoStore.recurso.nome }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="campoRecursoUnitario" disable/>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense v-model="campoRecursoquantidade" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoginStore } from 'src/stores/useLoginStore'
import { useRecursoStore } from 'src/stores/useRecrusoStore'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const loginStore = useLoginStore()
const recursoStore = useRecursoStore()

const campoRecursoUnitario = ref(null)
const campoRecursoquantidade = ref(null)
const campoPesquisa = ref('')
const dialog = ref(false)

const columns = [
  {
    name: 'chave',
    label: 'chave',
    align: 'left',
    field: 'chave',
    sortable: true
  },
  { name: 'nome', align: 'left', label: 'Nome', field: 'nome', sortable: true },
  { name: 'unitario', align: 'left', label: 'unitario', field: 'unitario' },
  { name: 'codigo', align: 'left', label: 'Codigo', field: 'codigo', sortable: true },
  { name: 'unidMedida', align: 'left', label: 'unidMedida', field: 'unidMedida' }
]

const pesquisar = async () => {
  $q.loading.show()
  const sessionId: any = loginStore.sessionId.length > 2 ? loginStore.sessionId
    : window.localStorage.getItem('session')
  await recursoStore.getRecursos(campoPesquisa.value, sessionId)
  $q.loading.hide()
}

const onCickRecruso = async (evt: any, row: any) => {
  console.log(row)
  recursoStore.iniciaRecurso(row)
  campoRecursoUnitario.value = row.unitario
  dialog.value = !dialog.value
  return true
}

</script>
