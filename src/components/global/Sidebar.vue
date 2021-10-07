<template>
  <div class="sidebar" :style="{ left: sidebarStatus ? '0px' : '-15rem' }">
    <div class="m-5">
      <!-- 深色模式控制Switch -->
      <Switch
        :onColor="'bg-gray-800'"
        :offColor="'bg-gray-100'"
        :status="darkMode"
        @click="changeMode"
      >
        <template v-slot:on>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 relative left-3px"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </template>
        <template v-slot:off>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
      </Switch>
    </div>
    <Disclosure v-for="(item, index) in SidebarData" :key="index">
      <DisclosureButton
        class="disclosure-button"
        @click="item.path != '' ? gotoPage(item.path) : ''"
      >
        <span>{{ item.name }}</span>
      </DisclosureButton>
      <div v-if="item.child.length >= 1">
        <DisclosurePanel
          class="disclosure-panel"
          v-for="(item2, index2) in item.child"
          :key="index2"
          @click="gotoPage(Object.values(item2)[0])"
        >
          {{ Object.keys(item2)[0] }}
        </DisclosurePanel>
      </div>
    </Disclosure>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  transition: all 0.2s ease-in-out;
  @apply z-40 fixed w-60 bg-blue-light-90 dark:bg-blue-gray-90 shadow-right;
}
.switch {
  transition: all 0.5s ease;
}
.ctrl-btn {
  position: relative;
  width: 40%;
  height: 78%;
  transition: left 0.5s ease;
}
.disclosure-button {
  @apply flex w-full px-4 py-2 text-xl font-bold hover:bg-purple-200 focus:outline-none dark:text-white dark:hover:bg-purple-main;
}
.disclosure-panel {
  @apply py-2 cursor-pointer hover:bg-purple-200 dark:text-white dark:hover:bg-purple-main;
}
</style>

<script lang="ts">
import { computed, defineComponent, ref, provide } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { SidebarData } from "@/config/application/Sidebar";
import { setCookie } from "@/library/global/Cookies";
//reactive 只接受物件或陣列，可做深層監聽
//ref 任何型態皆可，不對物件及陣列做深層監聽
export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const width: any = ref(computed(() => store.state["Render"].Width));
    const dark: any = ref(computed(() => store.state["Render"].DarkMode));
    const sidebarStatus = ref(
      computed(() => store.state["Render"].SidebarStatus)
    );
    let darkMode = ref<boolean>(true);
    provide("status", darkMode);
    // const sidebarContrl = () => {
    //   store.commit("Render/UpdateSidebarStatus", false);
    // };
    const darkModeContrl = (status: boolean) => {
      store.commit("Render/UpdateDarkMode", status);
    };
    const gotoPage = (path: string) => {
      router.push(path).catch((err) => {
        console.log(err);
      });
      // if (width.value <= 922) {
      //   sidebarContrl();
      // }
    };
    const changeMode = (status?: boolean) => {
      darkMode.value = typeof status == 'boolean' ? status :!dark.value;
      darkModeContrl(darkMode.value);
      const htmlTag = document.getElementsByTagName("html")[0];
      typeof status == 'boolean' ? status ? htmlTag.classList.add("dark") : htmlTag.classList.remove("dark")  : htmlTag.classList.toggle("dark");
      setCookie("dark", darkMode.value);
    };

    changeMode(dark.value)

    return {
      SidebarData,
      width,
      sidebarStatus,
      // sidebarContrl,
      gotoPage,
      darkMode,
      changeMode,
    };
  },
});
</script>
