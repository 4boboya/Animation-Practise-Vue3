
<template>
  <div class="app bg-gray-rice dark:bg-blue-gray">
    <Loading v-if="isLoading" />
    <transition name="fade" mode="out-in" appear>
      <Hint
        v-if="hintStatus"
        :hintLabel="hintData.label"
        :hintMsg="hintData.message"
        :hintBgcolor="hintData.bgcolor"
        :hintColor="hintData.color"
      />
    </transition>
    <!-- <Header /> -->
    <Sidebar v-show="currentPath != '/login'" />
    <!-- <div
      v-if="sidebarStatus && width <= 992"
      class="h-full w-full bg-black opacity-30 fixed z-10"
      @click="closeSidebar"
    /> -->
    <router-view
      class="bg-gray-rice dark:bg-blue-gray router-cont"
      :class="sidebarStatus ? 'pl-60' : 'pl-0'"
      v-slot="{ Component }"
    >
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.router-cont {
  min-height: 100vh;
  transition: all 0.2s ease-in-out;
}
.app {
  transition: all 0.2s ease-in-out;
}
</style>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getCookie } from "@/library/global/Cookies";
//reactive 只接受物件或陣列，可做深層監聽
//ref 任何型態皆可，不對物件及陣列做深層監聽
export default defineComponent({
  setup() {
    const cookieDark = getCookie("dark");
    const route = useRoute();
    const store = useStore();
    const width = ref(computed(() => store.state["Render"].Width));
    const sidebarStatus = ref(
      computed(() => store.state["Render"].SidebarStatus)
    );
    const hintStatus = ref(computed(() => store.state["Render"].HintStatus));
    const hintData = ref(computed(() => store.state["Render"].HintData));
    const isLoading = ref(computed(() => store.state["Render"].Loading));
    let currentPath = ref<string>(route.fullPath);

    // const windowWith = () => {
    //   store.commit("Render/UpdateWidth", window.innerWidth);
    // };
    // const setSidebarStatus = (status: boolean) => {
    //   store.commit("Render/UpdateSidebarStatus", status);
    // };
    const closeSidebar = () => {
      store.commit("Render/UpdateSidebarStatus", false);
    };
    const checkMode = () => {
      if (cookieDark != "") {
        store.commit("Render/UpdateDarkMode", JSON.parse(cookieDark));
      }
    };

    // windowWith();
    // window.addEventListener("resize", windowWith);

    // watch(width, (oldWidth, newWidth) => {
    //   if (newWidth <= 992) {
    //     setSidebarStatus(false);
    //   } else {
    //     setSidebarStatus(true);
    //   }
    // });
    watch(
      () => route,
      (o) => {
        currentPath.value = o.fullPath;
      },
      { deep: true }
    );

    checkMode();

    return { width, sidebarStatus, currentPath, hintStatus, hintData, isLoading, closeSidebar };
  },
});
</script>
