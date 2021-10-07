<template>
  <div class="content">
    <Tabs />
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { MemberMemberTabs } from "@/config/application/Tab";
export default defineComponent({
  setup() {
    provide("tabs", MemberMemberTabs);
    provide("currentTab", "MemberSetting");
    provide("currentComponent", "MemberSetting");
  },
});
</script>