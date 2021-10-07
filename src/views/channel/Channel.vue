<template>
  <div class="content">
    <Tabs />
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { ChannelSetting } from "@/config/application/Tab";
export default defineComponent({
  setup() {
    provide("tabs", ChannelSetting);
    provide("currentTab", "ChannelSetting");
    provide("currentComponent", "ChannelSetting");
  },
});
</script>