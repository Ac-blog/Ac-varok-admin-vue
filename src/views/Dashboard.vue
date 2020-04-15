<template>
  <div class="dashboard-container">
    <img alt="Vue logo" src="../assets/logo.png">
    <hello-world msg="Welcome to Your Vue.js App"/>
    <el-button type="primary">hello elementui</el-button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    HelloWorld,
  },
})

export default class Dashboard extends Vue {
}
</script>
