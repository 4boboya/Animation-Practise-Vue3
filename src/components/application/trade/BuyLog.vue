<template>
  <div class="text-11px dark:text-white">
    <div class="grid grid-cols-7 pt-3">
      <div class="search-bar">
        <div class="search-bar-label">帳號</div>
        <input class="search-bar-input" type="text" v-model="searchAccount" />
      </div>
      <div class="search-bar">
        <div class="search-bar-label">起始</div>
        <DatePicker
          class="col-span-5"
          v-model="startDate"
          mode="date"
        >
          <template v-slot="{ inputValue, togglePopover }">
            <input
              class="search-bar-input"
              :value="inputValue"
              @click="togglePopover"
            />
          </template>
        </DatePicker>
      </div>
      <div class="search-bar">
        <div class="search-bar-label">結束</div>
        <DatePicker
          class="col-span-5"
          v-model="endDate"
          mode="date"
        >
          <template v-slot="{ inputValue, togglePopover }">
            <input
              class="search-bar-input"
              :value="inputValue"
              @click="togglePopover"
            />
          </template>
        </DatePicker>
      </div>
      <div class="col-span-1 text-right pr-4">
        <button
          class="
            border border-blue-gray
            rounded-xl
            w-14
            hover:bg-blue-gray
            hover:text-gray-tab
            dark:border-gray-tab
            dark:hover:text-blue-gray
            dark:hover:bg-gray-tab
          "
          @click="getPayLog()"
        >
          搜尋
        </button>
      </div>
    </div>
    <Table @sort="sort" 
      :tabledata="state.pageData"
      :tableRow="BuyLogTable"
      :tablePageRows="pageRows"
    />
  </div>
</template>

<style scoped>
.search-bar {
  @apply col-span-7 lg:col-span-2 grid grid-cols-7 dark:text-blue-gray;
}
.search-bar-label {
  @apply col-span-2 dark:text-white;
}
.search-bar-input {
  @apply col-span-5 h-4 w-175px;
}
</style>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch, reactive } from "vue";
import { useStore } from "vuex";
import { GetPayData } from "@/apis/BackendService";
import { DatePicker } from "v-calendar";
import { PageData } from "@/library/application/PageData";
import { BuyLogTable } from "@/config/application/Table";
import { ObjectOfArraySort } from "@/library/application/Sort";
export default defineComponent({
  components: { DatePicker, },
  setup() {
    const { appContext } = getCurrentInstance() as any;
    const $date = appContext.config.globalProperties.$date;
    const store = useStore();
    const today = new Date();
    const pageRows = ref<number>(20);
    let searchAccount = ref<string>("");
    let startDate = ref<Date>(new Date());
    let endDate = ref<Date>(new Date());
    let payData = ref();
    let sortLog = ref<string>("");
    const state = reactive({
      payData: [] as any,
      pageData: [] as any,
    });
    const getPayLog = async () => {
      store.commit("Render/UpdateLoading", true);
      const reqData = {
        account: searchAccount.value,
        startDate: $date.DateToString(startDate.value),
        endDate: $date.DateToString(endDate.value),
      };
      await GetPayData(reqData).then((res: any) => {
        state.payData = res;
        state.pageData = PageData(state.payData, pageRows.value);
        store.commit("Render/UpdateLoading", false);
      });
    };
    const sort = (key: string) => {
      const sort = ObjectOfArraySort(state.payData, key, sortLog.value);
      state.payData = sort.data;
      sortLog.value = sort.sortLog;
      state.pageData = PageData(state.payData , pageRows.value );
    };
    watch(startDate, () => {
      if (startDate.value > endDate.value) {
        endDate.value = startDate.value;
      } else if (startDate.value < $date.diff_type_date(endDate.value, 30)) {
        endDate.value = $date.diff_type_date(startDate.value, -30);
      }
    });
    watch(endDate, () => {
      if (endDate.value < startDate.value) {
        startDate.value = endDate.value;
      } else if (endDate.value > $date.diff_type_date(startDate.value, -30)) {
        startDate.value = $date.diff_type_date(endDate.value, 30);
      }
    });
    getPayLog();
    return {
      startDate,
      endDate,
      payData,
      state,
      BuyLogTable,
      pageRows,
      today,
      searchAccount,
      getPayLog,
      sort,
    };
  },
});
</script>