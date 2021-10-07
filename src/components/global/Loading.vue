<template>
  <div class="vld-parent">
    <loading
      :active="true"
      :is-full-page="fullPage"
      :background-color="dark ? '#23384d' : '#ECE8E5'"
      :color="dark ? '#ECE8E5' : '#23384d'"
      loader="dots"
    ></loading>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import Loading from "vue3-loading-overlay";
import { useStore } from "vuex";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

export default {
  components: {
    Loading,
  },
  setup() {
    const store = useStore();
    const fullPage = ref(true);
    const dark: any = ref(computed(() => store.state["Render"].DarkMode));
    return { fullPage, dark };
  },
};
</script>