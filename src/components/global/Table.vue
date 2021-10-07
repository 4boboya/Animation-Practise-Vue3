<template>
  <div class="overflow-auto">
    <div class="px-4">
      <table class="w-full mt-3 text-left text-11px">
        <thead v-show="thead">
          <tr>
            <th style="width:30px">#</th>
            <th
              class="select-none relative"
              :class="item.sort ? 'cursor-pointer' : 'cursor-default'"
              :style="item.thStyle"
              v-for="(item, index) in table"
              :key="index"
              @click="item.sort && !disabled ? sort(item.key) : ''"
            >
              {{ item.name }}
              <span v-if="item.sort" class="absolute right-2">
                <SelectorIcon
                  class="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:bg-gray-300 dark:hover:bg-blue-gray"
            v-for="(item, index) in data[currentPage]"
            :key="index"
          >
            <td style="width:30px">
              <slot name="tag">
                {{ pageIndex * pageRows + index + 1 }}
              </slot>
            </td>
            <td :style="item2.thStyle" v-for="(item2, index2) in table" :key="index2">
              <slot :name="item2.key" :data="item" :index="index">
                {{ item[item2.key] }}
              </slot>
            </td>
          </tr>
          <tr
            class="text-center"
            v-if="data == undefined || data == null || data.length <= 0 || data[currentPage] == null || data[currentPage].length <= 0"
          >
            <td :colspan="table.length+1">沒資料</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="data.length > 0 && page" class="absolute w-full bottom-12px">
      <button 
        class="page-btn disabled:cursor-default disabled:bg-gray-400" 
        :disabled="pageIndex == 0 || disabled" 
        @click="totalPage == undefined ? changePage(pageIndex - 1) : nextPage(pageIndex - 1)"
      >
        &lt;
      </button>
      <span v-if="pageIndex >= 3">
        ...
      </span>
      <button
        v-show="Math.abs(pageIndex - index) < 3"
        class="page-btn"
        :class="index == pageIndex ? 'click-page-btn' : ''"
        v-for="(item, index) in totalPage == undefined ? data : totalPage"
        :key="index"
        :disabled="disabled"
        @click="totalPage == undefined ? changePage(index) : nextPage(index)"
      >
        {{ index + 1 }}
      </button>
      <span v-if="data.length - pageIndex > 3 || totalPage - pageIndex > 3">
        ...
      </span>
      <button 
        class="page-btn disabled:cursor-default disabled:bg-gray-400"
        :disabled="(totalPage == undefined ? pageIndex + 1 == data.length : pageIndex + 1 == totalPage) || disabled" 
        @click="totalPage == undefined ? changePage(pageIndex + 1) : nextPage(pageIndex + 1)"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
td {
  border-bottom: 1px solid #d1d1d1;
  padding-inline: 6px;
  padding-block: 8px;
}
th {
  border-bottom: 2px solid #d1d1d1;
  font-weight: 700;
  padding: 6px;
}
.page-btn {
  @apply border border-blue-gray rounded-xl w-7 mx-0.5 hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
.click-page-btn {
  @apply border-blue-gray bg-blue-gray text-gray-tab dark:border-gray-tab dark:text-blue-gray dark:bg-gray-tab;
}
</style>

<script lang="ts">
import { defineComponent, ref, watch, toRef } from "vue";
import { SelectorIcon } from "@heroicons/vue/solid";
export default defineComponent({
  components: {
    SelectorIcon,
  },
  props: {
    tabledata: [],
    tableRow: {},
    tablePageRows: Number,
    tableTotalPage: Number,
    tablePageIndex: Number,
    pageDisabled: Boolean,
    theadShow: {
      type: Boolean,
      default: true,
    },
    pageShow: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const data = toRef(props,'tabledata')
    const table = toRef(props,'tableRow')
    const pageRows = toRef(props,'tablePageRows')
    const totalPage = toRef(props,'tableTotalPage')
    const disabled = toRef(props,'pageDisabled')
    const thead = toRef(props,'theadShow')
    const page = toRef(props,'pageShow')
    let pageIndex = toRef(props,'tablePageIndex').value == undefined ? ref(0) : toRef(props,'tablePageIndex')
    let currentPage = ref(0); // 第幾筆data
    // let pageIndex = ref(0); // 第幾頁
    // const state = reactive({
    //   data: inject("data"), // 資料
    //   table: inject("table"), // 表格欄位
    //   pageRows: inject("pageRows"), // 每頁幾個
    //   totalPage: inject("totalPage"), // 總共幾頁 (後端切頁傳入 前端切頁不用傳)
    //   pageIndex: inject("pageIndex"), // 第幾頁 (後端切頁傳入 前端切頁不用傳)
    // });

    // currentPage.value = state.pageIndex != undefined ? Number(state.pageIndex) : currentPage.value;

    const changePage = (page: number) => { // 前端切頁
      currentPage.value = page;
      pageIndex.value = page;
    };
    const nextPage = (page: number) => { // 後端切頁
      context.emit("nextPage", page);
    };
    const sort = (key: string) => {
      context.emit("sort", key);
    };
    watch(
      () => data,
      () => {
        currentPage.value = 0;
        pageIndex.value = toRef(props,'tablePageIndex').value == undefined ? 0 : pageIndex.value;
      },
      { deep: true }
    );
    return {
      data,
      table,
      pageRows,
      totalPage,
      // state,
      thead,
      page,
      disabled,
      status,
      currentPage,
      pageIndex,
      changePage,
      nextPage,
      sort,
    };
  },
});
</script>