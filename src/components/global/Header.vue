<template>
  <div class="header">
    <div class="col-span-1">
      <svg
        v-if="currentPath != '/login'"
        xmlns="http://www.w3.org/2000/svg"
        class="side-icon dark:filter z-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="sidebarContrl()"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="
            sidebarStatus ? 'M4 6h13M4 12h16M4 18h7' : 'M4 6h16M4 12h16M4 18h16'
          "
        />
      </svg>
    </div>
    <div class="col-span-10 text-center">
      <h1
        class="filter drop-shadow-header-shadow-dark"
        @click="$router.push('/').catch((err) => {})"
      >
        前端站台後臺工具
      </h1>
    </div>
    <div v-if="currentPath != '/login'" class="col-span-1">
      <span class="login-btn-span bg-btn-gradient hover:login-btn-drop-shadow">
        <button @click="$router.push('/login').catch((err) => {})">登入</button>
      </span>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: 700;
  background-image: radial-gradient(circle at top left, #fd00da, #19d7f8);
  padding-top: 20px;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header {
  user-select: none;
  transition: all 0.2s ease-in-out !important;
  @apply sticky w-screen bg-blue-light-10 backdrop-filter backdrop-blur-md z-50 grid grid-cols-12 top-0 h-20 inset-x-0 shadow-lg dark:bg-blue-gray-10;
}
.side-icon {
  cursor: pointer;
  @apply text-blue-gray stroke-2 absolute h-8 w-auto left-6 top-6 filter dark:hover:drop-shadow-header-shadow-dark hover:drop-shadow-header-shadow-light dark:text-purple-main;
}
.login-btn-span {
  position: absolute;
  top: 25%;
  right: 1%;
  color: #fff;
  border: 2px solid transparent;
  border-radius: 20px;
  background-origin: border-box;
  background-clip: content-box, border-box;
}
.login-btn-span button {
  padding: 4px 14px;
  display: block;
}
</style>


<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch, ref } from "vue";
import { useRoute } from "vue-router";

import { useStore } from "vuex";
//reactive 只接受物件或陣列，可做深層監聽
//ref 任何型態皆可，不對物件及陣列做深層監聽
export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      sidebarStatus: computed(() => store.state["Render"].SidebarStatus),
    });
    let currentPath = ref<string>(route.fullPath);

    const sidebarContrl = () => {
      store.commit("Render/UpdateSidebarStatus");
    };

    watch(
      () => route,
      (o) => {
        currentPath.value = o.fullPath;
      },
      { deep: true }
    );

    return { ...toRefs(state), sidebarContrl, currentPath };
  },
});
</script>