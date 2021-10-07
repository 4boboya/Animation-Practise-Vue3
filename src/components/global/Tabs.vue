<template>
  <div class="tabs" style="min-height: calc(100vh - 115px)">
    <div
      v-for="item in tabs"
      :key="item.index"
      class="tab-title"
      :class="
        state.currentTab == item.key
          ? 'bg-gray-tab dark:bg-gray-800 dark:text-white '
          : 'text-gray-400 bg-gray-rice dark:bg-blue-gray'
      "
      style="top: -36px"
      :style="{ left: `${item.index * 116}px` }"
      @click="changeTab(item.key)"
    >
      {{ item.name }}
    </div>
    <suspense>
      <template #default>
        <component :is="state.currentComponent" />
      </template>
      <template #fallback>
        Loading...
      </template>
    </suspense>
  </div>
</template>

<style scoped>
.tabs {
  @apply relative min-h-3/4 w-11/12 top-80px left-5% pb-50px rounded-b-lg rounded-tr-lg transition-all duration-200 bg-gray-tab dark:bg-gray-800;
}
.tab-title {
  @apply px-6 pt-2 font-bold text-base absolute rounded-t-lg cursor-pointer border-2 whitespace-nowrap	 transition-all duration-200 border-gray-tab dark:border-gray-800;
}
</style>

<script lang="ts">
import { defineComponent, inject, reactive, defineAsyncComponent } from "vue";
export default defineComponent({
  components: {
    ForumSetting: defineAsyncComponent(() => import("@/components/application/forums/ForumSetting.vue")),
    TopicAudit: defineAsyncComponent(() => import("@/components/application/forums/TopicAudit.vue")),
    TopicSetting: defineAsyncComponent(() => import("@/components/application/forums/TopicSetting.vue")),
    BuyLog: defineAsyncComponent(() => import("@/components/application/trade/BuyLog.vue")),
    StoredLog: defineAsyncComponent(() => import("@/components/application/trade/StoredLog.vue")),
    ExpertSetting: defineAsyncComponent(() => import("@/components/application/member/ExpertSetting.vue")),
    ManagerSetting: defineAsyncComponent(() => import("@/components/application/member/ManagerSetting.vue")),
    MemberSetting: defineAsyncComponent(() => import("@/components/application/member/MemberSetting.vue")),
    TopAdvSetting: defineAsyncComponent(() => import("@/components/application/advertise/TopAdvSetting.vue")),
    LeftAdvSetting: defineAsyncComponent(() => import("@/components/application/advertise/LeftAdvSetting.vue")),
    RightAdvSetting: defineAsyncComponent(() => import("@/components/application/advertise/RightAdvSetting.vue")),
    FloatAdvSetting: defineAsyncComponent(() => import("@/components/application/advertise/FloatAdvSetting.vue")),
    ChannelSetting: defineAsyncComponent(() => import("@/components/application/channel/ChannelSetting.vue")),
  },
  setup() {
    const tabs = inject("tabs");
    const state = reactive({
      currentTab: inject("currentTab"),
      currentComponent: inject("currentComponent"),
    });
    const changeTab = (tab: string) => {
      state.currentTab = tab;
      state.currentComponent = tab;
    };
    return { tabs, state, changeTab };
  },
});
</script>