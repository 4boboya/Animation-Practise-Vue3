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
          class="search-btn"
          @click="getStoredLog()"
        >
          搜尋
        </button>
      </div>
    </div>
    <Table @sort="sort"
      :tabledata="state.pageData"
      :tableRow="StoredLogTable"
      :tablePageRows="pageRows">
      <template v-slot:status="{ data }">
        {{ status[data.status] }}
      </template>
    </Table>
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
.search-btn{
  @apply border border-blue-gray rounded-xl w-14 hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
</style>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch, reactive } from "vue";
import { useStore } from "vuex";
import { GetStoredData } from "@/apis/BackendService";
import { DatePicker } from "v-calendar";
import { PageData } from "@/library/application/PageData";
import { StoredLogTable } from "@/config/application/Table";
import { ObjectOfArraySort } from "@/library/application/Sort";
export default defineComponent({
  components: {
    DatePicker,
  },
  setup() {
    const { appContext } = getCurrentInstance() as any;
    const $date = appContext.config.globalProperties.$date;
    const store = useStore();
    const today = new Date();
    const pageRows = ref<number>(20);
    const status = ["失敗", "成功", "審核中"];
    let searchAccount = ref<string>("");
    let startDate = ref<Date>(new Date());
    let endDate = ref<Date>(new Date());
    let sortLog = ref<string>("");
    const state = reactive({
      storedData: [] as any,
      pageData: [] as any,
    });
    const getStoredLog = async () => {
      store.commit("Render/UpdateLoading", true);
      const reqData = {
        account: searchAccount.value,
        startDate: $date.DateToString(startDate.value),
        endDate: $date.DateToString(endDate.value),
      };
      await GetStoredData(reqData).then((res: any) => {
        state.storedData = res;
        state.pageData = PageData(state.storedData, pageRows.value);
        store.commit("Render/UpdateLoading", false);
      });
    };
    const sort = (key: string) => {
      const sort = ObjectOfArraySort(state.storedData, key, sortLog.value);
      state.storedData = sort.data;
      sortLog.value = sort.sortLog;
      state.pageData = PageData(state.storedData, pageRows.value );
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
    // watch(searchAccount, () => {
    //   state.pageData = PageData(
    //     searchAccount.value == ""
    //       ? state.storedData
    //       : state.storedData.filter(filterAccount),
    //     pageRows.value
    //   );
    // });
    getStoredLog();
    return {
      startDate,
      endDate,
      state,
      StoredLogTable,
      pageRows,
      today,
      searchAccount,
      status,
      getStoredLog,
      sort,
    };
  },
});
</script>