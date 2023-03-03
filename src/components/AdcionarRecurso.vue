<template>
  <q-card style="min-width: 300px; max-width: 500px;">
    <q-card-section>
      <div class="text-h6">INCLUIR: {{ recursoStore.recurso.nome }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row items-center no-wrap">
        <div class="text-h6 col-6">
          Valor Unitario
        </div>
        <q-input class=" col-6" dense label="Valor Unitario" v-model="recursoStore.recurso.unitario" disable/>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="row items-center no-wrap">
        <div class="text-h6 col-6">
          Quantidade
        </div>
          <q-input class="text-h6 col-6" dense label="Quantidade" v-model="recursoStore.recurso.quantidade" autofocus />
      </div>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Add" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRecursoStore } from 'src/stores/useRecursoStore'

const recursoStore = useRecursoStore()

</script>
