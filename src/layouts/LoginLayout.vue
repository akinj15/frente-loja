<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="row justify-center items-center altura">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

</script>

<style scoped>
.altura{
  padding-top: 15vh;
}
</style>
