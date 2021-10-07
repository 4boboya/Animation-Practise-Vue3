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
        <button class="search-audit-btn w-14" @click="getAuditTopic()">
          搜尋
        </button>
      </div>
    </div>
    <Table @sort="sort"
      :tabledata="state.pageData"
      :tableRow="TopicAuditTable"
      :tablePageRows="pageRows">
      <template v-slot:audit="{ data }">
        <button
          class="search-audit-btn w-12"
          @click="controlModal(true, data)"
        >
          審核
        </button>
      </template>
    </Table>
    <Modal
      :modalStatus="modalStatus"
      :modalLabel="TopicAuditModalLabel"
      :modalTitle="'審核貼文'"
      @closeModal="controlModal(false)"
    >
      <template v-slot:title>
        <div class="grid grid-cols-6">
          <div class="modal-label">標題</div>
          <div class="col-span-5 px-2 py-1 rounded-xl bg-gray-tab text-center">
            {{ state.updateData.title }}
          </div>
        </div>
      </template>
      <template v-slot:cont>
        <div class="grid grid-cols-6">
          <div class="modal-label">內文</div>
          <div
            class="modal-content"
            v-html="state.updateData.body"
          ></div>
        </div>
      </template>
      <template v-slot:forum>
        <div class="grid grid-cols-6">
          <div class="modal-label">討論區</div>
          <Listbox class="col-span-5" @ID="setForumID" :listbox="forum"/>
        </div>
      </template>
      <template v-slot:price>
        <div class="grid grid-cols-6">
          <div class="modal-label">原始價格</div>
          <input
            class="modal-input"
            type="number"
            placeholder="原始價格 (必填)"
            :class="inputIsNull.price ? 'border-red-500' : ''"
            v-model="state.reqData.Price"
          />
        </div>
      </template>
      <template v-slot:discount>
        <div class="grid grid-cols-6">
          <div class="modal-label">優惠價格</div>
          <input
            class="modal-input"
            type="number"
            placeholder="優惠價格"
            v-model="state.reqData.Discount"
          />
        </div>
      </template>
      <template v-slot:content>
        <div class="grid grid-cols-6">
          <div class="modal-label">說明欄</div>
          <input
            class="modal-input"
            type="text"
            placeholder="說明欄 (必填)"
            :class="inputIsNull.reason ? 'border-red-500' : ''"
            v-model="state.reqData.Reason"
          />
        </div>
      </template>
      <template v-slot:result>
        <div class="grid grid-cols-2">
          <div class="text-left px-2">
            <button
              class="modal-btn modal-red-btn"
              @click="auditTopicResult(0)"
            >
              未通過
            </button>
          </div>
          <div class="text-right px-3">
            <button
              class="modal-btn modal-green-btn"
              @click="auditTopicResult(1)"
            >
              通過
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.modal-btn {
  @apply px-2 py-1 rounded-3xl border bg-gray-rice hover:text-white hover:border-white dark:text-white;
}
.modal-red-btn {
  @apply border-red-700 text-red-700 hover:bg-red-700 dark:bg-red-700;
}
.modal-green-btn {
  @apply border-green-500 text-green-500 hover:bg-green-500 dark:bg-green-500;
}
.modal-content {
  @apply px-2 py-1 rounded-xl bg-gray-tab text-center max-h-96 overflow-auto col-span-5;
}
.modal-label {
  @apply col-span-1 text-center dark:text-gray-rice font-bold;
}
.modal-input {
  @apply w-full col-span-5 border rounded-xl px-3 py-1 bg-gray-tab;
}
.search-audit-btn {
  @apply border border-blue-gray rounded-xl hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
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
import { GetAuditTopic, GetForumList, UpdateAuditTopic } from "@/apis/BackendService";
import { DatePicker } from "v-calendar";
import { TopicAuditTable } from "@/config/application/Table";
import { TopicAuditModalLabel } from "@/config/application/Modal";
import { TopicAuditReq } from "@/model/topic";
import { List } from "@/model/list";
import { PageData } from "@/library/application/PageData";
import { ObjectOfArraySort } from "@/library/application/Sort";
import { CheckData } from "@/library/application/CheckData"
export default defineComponent({
  components: { DatePicker },
  setup() {
    const { appContext } = getCurrentInstance() as any;
    const $date = appContext.config.globalProperties.$date;
    const store = useStore();
    const pageRows = ref<number>(20);
    const today = new Date();
    let modalStatus = ref(false);
    let forum: List[] = [];
    let searchAccount = ref<string>("");
    let startDate = ref<Date>(new Date());
    let endDate = ref<Date>(new Date());
    let sortLog = ref<string>("");

    const state = reactive({
      auditTopicData: [] as any,
      pageData: [] as any,
      updateData: {} as any,
      reqData: {} as TopicAuditReq,
    });
    const inputIsNull = reactive({
      price: false,
      reason: false,
    });

    const getForumList = async () => {
      await GetForumList({}).then((res: any) => {
        res.forEach((item: any) => {
          if (item.is_Cat == 0 && item.expert_Only != 1) {
            forum.push({ id: item.forumID, name: item.title });
          }
        });
      });
    };
    const getAuditTopic = async () => {
      store.commit("Render/UpdateLoading", true);
      const reqData = {
        account: searchAccount.value,
        startDate: $date.DateToString(startDate.value),
        endDate: $date.DateToString(endDate.value),
      };
      await GetAuditTopic(reqData).then((res: any) => {
        state.auditTopicData = res;
        state.pageData = PageData(state.auditTopicData, pageRows.value);
        store.commit("Render/UpdateLoading", false);
      });
    };

    const sort = (key: string) => {
      const sort = ObjectOfArraySort(state.auditTopicData, key, sortLog.value);
      state.auditTopicData = sort.data;
      sortLog.value = sort.sortLog;
      state.pageData = PageData(state.auditTopicData, pageRows.value);
    };
    const controlModal = (status: boolean, data: any = null) => {
      if (status) {
        state.updateData = data;
      } else {
        state.reqData = {} as TopicAuditReq
      }
      modalStatus.value = status;
    };
    const auditTopicResult = async (result: number) => {
      state.reqData.TopicID = state.updateData.topicID;
      state.reqData.Result = result;
      state.reqData.User_Email = state.updateData.user_Email;
      (state.reqData.Price == undefined || state.reqData.Price == "") && result == 0 ? state.reqData.Price = 1 : ''
      if (checkData()) {
        store.commit("Render/UpdateLoading", true);
        await UpdateAuditTopic(state.reqData).then((res: any) => {
            if (res.code == 200) {
              controlModal(false);
              controlHint(res.message,'成功','bg-green-500')
              getAuditTopic();
              state.reqData = {} as TopicAuditReq;
            } else {
              controlHint(res.message,'失敗','bg-red-500')
            }
          })
          .catch((err: any) => {
            controlHint(err,'失敗','bg-red-500')
          });
      }
      store.commit("Render/UpdateLoading", false);
    };
    const setForumID = (ID: any) => {
      state.reqData.TargetForumID = ID.id;
    };
    const checkData = () => {
      let notNull = true;
      const priceNotNull = CheckData(state.reqData.Price)
      const reasonNotNull = CheckData(state.reqData.Reason)
      if (state.reqData.Result == 1) {
        inputIsNull.price = !priceNotNull;
        if (!priceNotNull){
          notNull = false;
        } else {
          if (!CheckData(state.reqData.Discount)){
            state.reqData.Discount = state.reqData.Price;
          }
        }
      }
      inputIsNull.reason = !reasonNotNull;
      if (!reasonNotNull){
        notNull = false;
      }
      return notNull;
    };
    const controlHint = (message:string, label:string, bgcolor:string) => { //開關 設定提示視窗
      store.commit("Render/UpdateLoading", false);
      const hint = {
        status: true,
        color: "text-white",
        message: message,
        label: label,
        bgcolor: bgcolor,
      }
      store.commit("Render/SetHint", hint);
      setTimeout(() => {
        hint.status = false
        store.commit("Render/SetHint", hint);
      }, 5000);
    }
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
    
    getForumList();
    getAuditTopic();
    return {
      startDate,
      endDate,
      state,
      TopicAuditTable,
      pageRows,
      today,
      searchAccount,
      modalStatus,
      TopicAuditModalLabel,
      forum,
      inputIsNull,
      controlModal,
      getAuditTopic,
      auditTopicResult,
      setForumID,
      sort,
    };
  },
});
</script>