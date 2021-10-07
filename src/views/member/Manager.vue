<template>
  <div class="content">
    <Tabs />
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { MemberManagerTabs } from "@/config/application/Tab";
export default defineComponent({
  setup() {
    provide("tabs", MemberManagerTabs);
    provide("currentTab", "ManagerSetting");
    provide("currentComponent", "ManagerSetting");
  },
});
</script>