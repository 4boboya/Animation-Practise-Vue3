<template>
  <div class="content">
    <Tabs />
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { TradeLogTabs } from "@/config/application/Tab";
export default defineComponent({
  setup() {
    provide("tabs", TradeLogTabs);
    provide("currentTab", "BuyLog");
    provide("currentComponent", "BuyLog");
  },
});
</script>