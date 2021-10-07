<template>
  <div class="content">
    <Tabs />
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { AdvertiseSetting } from "@/config/application/Tab";
export default defineComponent({
  setup() {
    provide("tabs", AdvertiseSetting);
    provide("currentTab", "TopAdvSetting");
    provide("currentComponent", "TopAdvSetting");
  },
});
</script>