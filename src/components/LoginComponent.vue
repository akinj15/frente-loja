<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6 text-center ">LOGIN</div>
    </q-card-section>
    <q-card-section>
      <q-input class="q-my-sm" outlined dense v-model="user" label="Login" type="text" />
      <q-input class="q-my-sm" outlined dense v-model="password" label="Password" type="password" />
      <q-input class="q-my-sm" outlined dense v-model="terminal" label="Terminal" type="text" />
      <q-checkbox v-model="prevenda" label="Prevenda" />
    </q-card-section>
    <q-card-section class="row justify-center " >
      <q-btn
        dense
        label="login"
        color="secondary"
        icon="login"
        @click="logar"
        class="full-width"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoginStore } from 'src/stores/useLoginStore'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const loginStore = useLoginStore()
const user = ref('')
const password = ref('')
const terminal = ref('')
const prevenda = ref(false)
const $q = useQuasar()
async function logar () {
  $q.loading.show()

  try {
    await loginStore.login({
      user: user.value, password: password.value, terminal: terminal.value, prevenda: prevenda.value
    })
    $q.loading.hide()
    if (loginStore.sessionId.length) {
      router.push({ path: '/recursos' })
    }
  } catch (e) {
    $q.loading.hide()
    return e
  }
}

</script>
