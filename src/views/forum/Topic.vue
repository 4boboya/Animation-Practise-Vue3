<template>
  <div class="content">
    <Tabs />
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { ForumTopicTabs } from "@/config/application/Tab";
export default defineComponent({
  setup() {
    provide("tabs", ForumTopicTabs);
    provide("currentTab", "TopicAudit");
    provide("currentComponent", "TopicAudit");
  },
});
</script>