<template>
  <div class="content">
    <Tabs />
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { MemberExpertTabs } from "@/config/application/Tab";
export default defineComponent({
  setup() {
    provide("tabs", MemberExpertTabs);
    provide("currentTab", "ExpertSetting");
    provide("currentComponent", "ExpertSetting");
  },
});
</script>