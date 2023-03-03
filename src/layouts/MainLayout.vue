<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{  turnoStore.turno.nomeTerminal  }}
          <q-badge align="middle">{{  turnoStore.turno.turnoAberto ? 'Aberto' : 'Fechado'  }}</q-badge>
        </q-toolbar-title>

        <div>
          <q-btn
              :label="turnoStore.turno.turnoAberto ? 'Fechar' : 'Iniciar' "
              color="primary"
              @click="iniciaFechaTurno"
            />
          </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          menu
        </q-item-label>
        <q-item
          clickable
          v-ripple
          @click="router.push({ path: '/recursos' }); leftDrawerOpen = !leftDrawerOpen"
        >
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>recursos</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          @click="router.push({ path: '/' }); leftDrawerOpen = !leftDrawerOpen"
        >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>logout</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTurnoStore } from 'src/stores/useTurnoStore'
import { useLoginStore } from 'src/stores/useLoginStore'

const loginStore = useLoginStore()
const turnoStore = useTurnoStore()
const router = useRouter()
const sessionId: any = loginStore.sessionId.length > 2 ? loginStore.sessionId
  : window.localStorage.getItem('session')
const chaveUsuario = Number(window.localStorage.getItem('chaveUsuario'))

const leftDrawerOpen = ref(false)
const logout = () => {
  router.push({ path: '/' })
}
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const iniciaFechaTurno = async () => {
  const funcao = turnoStore.turno.caixaAberto ? 'fechaTurno' : 'iniciaTurno'
  try {
    turnoStore.iniciaFechaTurno({
      funcao,
      sessionId,
      chaveUsuario
    })
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  try {
    turnoStore.getStatusTurno(sessionId)
  } catch (e) {
    console.log(e)
  }
})

</script>
