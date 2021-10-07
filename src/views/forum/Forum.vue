<template>
  <div class="content">
    <Tabs />
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { ForumForumTabs } from "@/config/application/Tab";
export default defineComponent({
  setup() {
    provide("tabs", ForumForumTabs);
    provide("currentTab", "ForumSetting");
    provide("currentComponent", "ForumSetting");
  },
});
</script>