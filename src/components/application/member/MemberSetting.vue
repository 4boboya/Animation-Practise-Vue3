<template>
  <div class="text-11px dark:text-white">
    <div class="grid grid-cols-7 pt-3">
      <div class="search-bar">
        <div class="search-bar-label">帳號</div>
        <input class="search-bar-input" type="text" v-model="searchAccount" />
      </div>
      <div class="search-bar">
        <div class="search-bar-label">狀態</div>
        <select class="search-bar-input" v-model="selectStatus">
          <option
            v-for="(item, index) in MemberStatusSelect"
            :key="index"
            :value="item.value"
          >
            {{ item.name }}
          </option>
          <option :value="-1">不選擇</option>
        </select>
      </div>
      <div class="col-span-1 text-right pr-4">
        <button class="search-btn" @click="getMemberData()">搜尋</button>
      </div>
    </div>
    <Table @nextPage="nextPage"
      :tabledata="state.pageData"
      :tableRow="MemberTable"
      :tablePageRows="pageRows"
      :tableTotalPage="totalPage"
      :tablePageIndex="pageIndex">
      <template v-slot:status="{ data }">
        <template v-for="(item, index) in MemberStatusSelect" :key="index">
          <span v-if="item.value == data.status" >
            {{item.name}}
          </span>
        </template>
      </template>
      <template v-slot:updatePWD="{ data }">
        <button
          class="update-btn w-14"
          @click="controlModal(true, data, '修改密碼')"
        >
          修改密碼
        </button>
      </template>
      <template v-slot:updateRank="{ data }">
        <button
          class="update-btn w-14"
          @click="controlModal(true, data, '修改權限')"
        >
          修改權限
        </button>
      </template>
      <template v-slot:updateData="{ data }">
        <button
          class="update-btn w-14"
          @click="controlModal(true, data, '修改資料')"
        >
          修改資料
        </button>
      </template>
    </Table>
    <Modal
      :modalStatus="modalStatus"
      :modalLabel="modalLabel"
      :modalTitle="modalTitle"
      @closeModal="controlModal(false)"
    >
      <template v-slot:password>
        <div class="grid grid-cols-6">
          <div class="modal-label">新密碼</div>
          <input
            class="modal-input"
            type="password"
            placeholder="新密碼"
            :class="inputIsNull.password ? 'border-red-500' : ''"
            v-model="state.updateData.password"
          />
        </div>
      </template>
      <template v-slot:checkPassword>
        <div class="grid grid-cols-6">
          <div class="modal-label">確認新密碼</div>
          <input
            class="modal-input"
            type="password"
            placeholder="確認新密碼"
            :class="inputIsNull.checkPassword ? 'border-red-500' : ''"
            v-model="state.updateData.checkPassword"
          />
        </div>
      </template>
      <template v-slot:rank>
        <div class="grid grid-cols-6">
          <div class="modal-label">權限</div>
          <Listbox class="col-span-5" @ID="setRank" :listbox="MemberRankSelect" :selected="selected"/>
        </div>
      </template>
      <template v-slot:username>
        <div class="grid grid-cols-6">
          <div class="modal-label">使用者名稱</div>
          <input
            class="modal-input"
            type="text"
            placeholder="使用者名稱"
            :class="inputIsNull.username ? 'border-red-500' : ''"
            v-model="state.updateData.userName"
          />
        </div>
      </template>
      <template v-slot:status>
        <div class="grid grid-cols-6">
          <div class="modal-label">狀態</div>
          <Listbox class="col-span-5" @ID="setStatus" :listbox="MemberStatusSelect" :selected="selected"/>
        </div>
      </template>
      <template v-slot:submit>
        <div class="text-right px-3">
          <button class="modal-btn modal-green-btn" @click="submit()">
            送出
          </button>
        </div>
      </template>
    </Modal>
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
.search-btn {
  @apply border border-blue-gray rounded-xl w-14 hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
.modal-label {
  @apply col-span-1 text-center dark:text-gray-rice font-bold;
}
.modal-input {
  @apply w-full col-span-5 border rounded-xl px-3 py-1 bg-gray-tab;
}
.update-btn {
  @apply border border-blue-gray rounded-xl hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
.modal-btn {
  @apply px-2 py-1 rounded-3xl border bg-gray-rice hover:text-white hover:border-white dark:text-white;
}
.modal-green-btn {
  @apply border-green-500 text-green-500 hover:bg-green-500 dark:bg-green-500;
}
</style>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
import { MemberTable } from "@/config/application/Table";
import { MemberStatusSelect, MemberRankSelect } from "@/config/application/Select";
import { MemberModal } from '@/model/modal'
import { Select } from '@/model/list'
import { CheckData, CheckPassword } from "@/library/application/CheckData"
import { MemberUpdatePWDLabel, MemberUpdateRankLabel, MemberUpdateDataLabel } from "@/config/application/Modal";
import { GetMembersData, UpdateMemberExpertData, UpdateMemberExpertPassword, UpdateMemberExpertRank } from "@/apis/BackendService";
export default defineComponent({
  setup() {
    const store = useStore();
    const today = new Date();
    const pageRows = ref<number>(20);
    let pageIndex = ref<number>(0);
    let searchAccount = ref<string>("");
    let selectStatus = ref<number>(-1);
    let totalPage = ref<number>();
    let modalStatus = ref<boolean>(false);
    let modalTitle = ref<string>("");
    let selected = reactive({} as Select);
    let modalLabel = reactive({} as MemberModal);
    let modalSelect = reactive([] as any);
    const state = reactive({
      MemberData: [] as any,
      pageData: [] as any,
      updateData: {} as any,
      reqData: {} as any,
    });
    const inputIsNull = reactive({
      password: false,
      checkPassword: false,
      username: false,
    });
    const getMemberData = async (nextPage:boolean = false) => { //取得資料
      store.commit("Render/UpdateLoading", true);
      !nextPage ? pageIndex.value = 0 : '';
      state.reqData = {}
      state.reqData.rank = 5
      state.reqData.pageSize = pageRows.value
      state.reqData.pageIndex = pageIndex.value
      state.reqData.account = searchAccount
      selectStatus.value != -1 ? state.reqData.status = selectStatus.value : '';
      await GetMembersData(state.reqData).then((res: any) => {
        totalPage.value = res.totalPage
        pageIndex.value = res.index - 1
        state.pageData.length = 0
        state.pageData.push(res.members)
        store.commit("Render/UpdateLoading", false);
      });
    };
    const nextPage = async(index: number) => { //切頁
      pageIndex.value = index
      await getMemberData(true)
    }
    const controlModal = (status: boolean,data: any = null,title: string = null as any) => { //modal 開關及內容
      if (status) {
        let label;
        resetData()
        state.updateData.authkey = data.authkey
        if (title == "修改密碼") {
          label = MemberUpdatePWDLabel;
        } else if (title == "修改權限") {
          label = MemberUpdateRankLabel;
          MemberRankSelect.forEach((item: any) => {
            modalSelect.push(item)
            if (item.value == data.rank){
              selected = Object.assign(selected, item);
            }
          })
        } else if (title == "修改資料") {
          label = MemberUpdateDataLabel;
          state.updateData.userName = data.userName;
          MemberStatusSelect.forEach((item: any) => {
            modalSelect.push(item)
            if (item.value == data.status){
              selected = Object.assign(selected, item);
            }
          })
        }
        modalTitle.value = title;
        modalLabel = Object.assign(modalLabel, label); // 重新賦予資料 Object.assign 第一欄必填自己 否則reactive屬性消失
      }
      modalStatus.value = status;
    };
    const resetData = () => { //清除資料
      modalSelect.length = 0
      Object.keys(modalLabel).map(key=>{ // 清除 modalLabel 全部資料
        delete modalLabel[key as keyof MemberModal];
      })
      Object.keys(selected).map(key=>{ // 清除 selected 全部資料
        delete selected[key as keyof Select];
      })
    }
    const checkData = () => { //確認資料
      let notNull = true;
      if (modalTitle.value == "修改密碼") {
        const passwordNotNull = CheckData(state.updateData.password)
        const checkPasswordNotNull = CheckData(state.updateData.checkPassword)
        inputIsNull.password = !passwordNotNull;
        inputIsNull.checkPassword = !checkPasswordNotNull;
        if (!passwordNotNull || !checkPasswordNotNull){
          notNull = false;
        }
      } else if (modalTitle.value == "修改資料") {
        const usernameNotNull = CheckData(state.updateData.userName)
        inputIsNull.username = !usernameNotNull;
        if (!usernameNotNull){
          notNull = false;
        }
      }
      return notNull;
    };
    const checkPassword = () => { //確認密碼
      const result = CheckPassword(state.updateData.password, state.updateData.checkPassword)
      if (!result.status){
        controlHint(result.hint.message, result.hint.label, result.hint.bgcolor)
      }
      return result.status
    }
    const setRank = (rank: any) => { //設定權限至更新資料
      state.updateData.rank = rank.value;
    };
    const setStatus = (status: any) => { //設定狀態至更新資料
      state.updateData.status = status.value;
    };
    const submit = async() => { //送出資料觸發事件
      if (checkData()){
        store.commit("Render/UpdateLoading", true);
        if (modalTitle.value == "修改密碼") {
          if (checkPassword()){
            await UpdateMemberExpertPassword(state.updateData).then((res:any)=>{
              setHint(res)
            }).catch((err:any)=>{
              controlHint(err, "失敗", "bg-red-500",)
            })
          }
        } else if (modalTitle.value == "修改權限") {
          await UpdateMemberExpertRank(state.updateData).then((res:any)=>{
            setHint(res)
          }).catch((err:any)=>{
            controlHint(err, "失敗", "bg-red-500",)
          })
        } else if (modalTitle.value == "修改資料") {
          await UpdateMemberExpertData(state.updateData).then((res:any)=>{
            setHint(res)
          }).catch((err:any)=>{
            controlHint(err, "失敗", "bg-red-500",)
          })
        }
      }
    };
    const setHint = (res: any) => { //回傳提示視窗
      if (res.code == 10000){
        getMemberData()
        controlHint(res.message, "成功", "bg-green-500")
        controlModal(false)
        state.updateData = {}
      }else{
        controlHint(res.message, "失敗", "bg-red-500")
      }
    }
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
    getMemberData();
    return {
      state,
      MemberTable,
      pageRows,
      totalPage,
      pageIndex,
      today,
      searchAccount,
      selectStatus,
      modalLabel,
      modalStatus,
      modalTitle,
      MemberStatusSelect,
      inputIsNull,
      getMemberData,
      nextPage,
      controlModal,
      setRank,
      setStatus,
      submit,
      MemberRankSelect,
      selected,
    };
  },
});
</script>