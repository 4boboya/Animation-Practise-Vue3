<template>
  <div class="text-11px dark:text-white">
    <div class="grid grid-cols-9 pt-3">
      <div class="search-bar">
        <div class="search-bar-label">球種</div>
        <select class="search-bar-input" v-model="searchGameType">
          <option v-for="(item, index) in GameTypeSelect" :key="index" :value="item.value" >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="search-bar">
        <div class="search-bar-label">日期</div>
        <DatePicker class="col-span-5" v-model="searchDate" mode="date">
          <template v-slot="{ inputValue, togglePopover }">
            <input class="search-bar-input" :value="inputValue" @click="togglePopover" />
          </template>
        </DatePicker>
      </div>
      <div class="search-bar">
        <div class="search-bar-label">頻道</div>
        <select class="search-bar-input" v-model="searchChannel">
          <option v-for="(item, index) in ChannelEnabledSelect" :key="index" :value="item.value" >
            {{ item.name }}
          </option>
          <option :value="-1">不選擇</option>
        </select>
      </div>
      <div class="search-bar">
        <div class="search-bar-label">訊號</div>
        <select class="search-bar-input" v-model="searchSignal">
          <option v-for="(item, index) in ChannelSignalSelect" :key="index" :value="item.value" >
            {{ item.name }}
          </option>
          <option :value="-1">不選擇</option>
        </select>
      </div>
      <div class="col-span-1 text-right pr-10">
        <button class="search-btn" :disabled="pageDisabled" @click="getChannelData()">搜尋</button>
      </div>
      <div class="add-btn-bar">
        <button class="search-btn" @click="updateStatus ? (setUpdateStatus(false)) : (controlModal(true,'create'))" >
          {{ updateStatus ? "取消" : "新增" }}
        </button>
      </div>
      <div class="update-btn-bar">
        <button class="search-btn" @click="updateStatus ? (controlModal(true,'updateCheck')) : (setUpdateStatus(true))" >
          {{ updateStatus ? "儲存" : "編輯" }}
        </button>
      </div>
    </div>
    <Table @sort="sort"
      :tabledata="state.pageData"
      :tableRow="ChannelTable"
      :tablePageRows="pageRows"
      :pageDisabled="pageDisabled"
    >
      <template v-slot:status="{ data }">
        <template v-for="(item, index) in MemberStatusSelect" :key="index">
          <span v-if="item.value == data.status">
            {{ item.name }}
          </span>
        </template>
      </template>
      <template v-slot:enabled="{ data, index }">
        <select class="text-black" v-if="updateStatus" v-model="state.backData[pageIndex][index].enabled">
          <option :value="1">開啟</option>
          <option :value="0">關閉</option>
        </select>
        <template v-else>
          <template v-for="(item, index) in ChannelEnabledSelect" :key="index">
            <span v-if="item.value == data.enabled">
              {{item.name}}
            </span>
          </template>
        </template>
      </template>
      <template v-slot:url="{ data, index }">
        <input class="text-black" v-if="updateStatus" type="text" v-model="state.backData[pageIndex][index].url">
        <span v-else>
          {{data.url}}
        </span>
      </template>
    </Table>
    <Modal
      :modalStatus="modalStatus"
      :modalLabel="modalLabel"
      :modalTitle="modalTitle"
      @closeModal="controlModal(false)"
    >
      <template v-slot:channelID>
        <div class="grid grid-cols-6">
          <div class="modal-label">channel ID</div>
          <input
            class="modal-input"
            type="text"
            placeholder="channel ID"
            :class="inputIsNull.channelID ? 'border-red-500' : ''"
            v-model="state.createData.ChannelID"
          />
        </div>
      </template>
      <template v-slot:date>
        <div class="grid grid-cols-6">
          <div class="modal-label">日期</div>
          <DatePicker class="col-span-5" v-model="state.createData.DateTime" mode="dateTime" >
            <template v-slot="{ inputValue, inputEvents }">
              <input class="modal-input" :class="inputIsNull.date ? 'border-red-500' : ''" :value="inputValue" readonly v-on="inputEvents" />
            </template>
          </DatePicker>
        </div>
      </template>
      <template v-slot:url>
        <div class="grid grid-cols-6">
          <div class="modal-label">訊號源</div>
          <input
            class="modal-input"
            type="text"
            placeholder="訊號源"
            v-model="state.createData.Url"
          />
        </div>
      </template>
      <template v-slot:enabled>
        <div class="grid grid-cols-6">
          <div class="modal-label">狀態</div>
          <Listbox class="col-span-5" @ID="setEnabled" :listbox="ChannelEnabledSelect" />
        </div>
      </template>
      <template v-slot:gameType>
        <div class="grid grid-cols-6">
          <div class="modal-label">球種</div>
          <Listbox class="col-span-5" @ID="setGameType" :listbox="GameTypeSelect" />
        </div>
      </template>
      <template v-slot:league>
        <div class="grid grid-cols-6">
          <div class="modal-label">聯盟</div>
          <input
            class="modal-input"
            type="text"
            placeholder="聯盟"
            :class="inputIsNull.league ? 'border-red-500' : ''"
            v-model="state.createData.League"
          />
        </div>
      </template>
      <template v-slot:team_H>
        <div class="grid grid-cols-6">
          <div class="modal-label">主隊</div>
          <input
            class="modal-input"
            type="text"
            placeholder="主隊"
            :class="inputIsNull.teamH ? 'border-red-500' : ''"
            v-model="state.createData.Team_H"
          />
        </div>
      </template>
      <template v-slot:team_A>
        <div class="grid grid-cols-6">
          <div class="modal-label">客隊</div>
          <input
            class="modal-input"
            type="text"
            placeholder="客隊"
            :class="inputIsNull.teamA ? 'border-red-500' : ''"
            v-model="state.createData.Team_A"
          />
        </div>
      </template>
      <template v-slot:submit>
        <div class="text-right px-3">
          <button class="modal-btn modal-green-btn" @click="createData()">
            送出
          </button>
        </div>
      </template>
      <template v-slot:data>
        <Table
          class="dark:text-white"
          @sort="sort"
          :tabledata="state.checkPageData"
          :tableRow="ChannelTable"
          :tablePageRows="10"
        >
          <template v-slot:status="{ data }">
            <template v-for="(item, index) in MemberStatusSelect" :key="index">
              <span v-if="item.value == data.status">
                {{ item.name }}
              </span>
            </template>
          </template>
          <template v-slot:enabled="{ data }">
            <template v-for="(item, index) in ChannelEnabledSelect" :key="index">
              <span v-if="item.value == data.enabled">
                {{item.name}}
              </span>
            </template>
          </template>
        </Table>
      </template>
      <template v-slot:check>
        <div class="text-right px-3">
          <button class="modal-btn modal-green-btn" @click="updateData()">
            確認
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.search-bar {
  @apply col-span-9 lg:col-span-2 grid grid-cols-7 dark:text-blue-gray;
}
.search-bar-label {
  @apply col-span-2 dark:text-white;
}
.search-bar-input {
  @apply col-span-5 h-4 w-full;
}
.search-btn {
  @apply border border-blue-gray rounded-xl w-14 hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
.add-btn-bar {
  @apply col-end-9 col-span-1 text-right pt-1 pr-10;
}
.update-btn-bar {
  @apply col-end-10 col-span-1 text-right pt-1 pr-10;
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
.modal-date-input {
  @apply w-full bg-transparent;
}
</style>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import { DatePicker } from "v-calendar";
import { ChannelTable } from "@/config/application/Table";
import { GameTypeSelect, ChannelEnabledSelect, ChannelSignalSelect } from "@/config/application/Select";
import { ChannelCreateLabel, ChannelUpdateCheckLabel } from "@/config/application/Modal";
import { GetChannel, CreateChannel, UpdateChannel } from "@/apis/BackendService";
import { PageData } from "@/library/application/PageData";
import { CheckData } from "@/library/application/CheckData"
import { ObjectOfArraySort } from "@/library/application/Sort";
export default defineComponent({
  components: { DatePicker },
  setup() {
    const { appContext } = getCurrentInstance() as any;
    const $date = appContext.config.globalProperties.$date;
    const store = useStore();
    const pageRows = ref<number>(20);
    let pageIndex = ref<number>(0);
    let updateStatus = ref<boolean>(false);
    let searchGameType = ref<string>("BS");
    let searchDate = ref<Date>();
    let searchChannel = ref<number>(-1);
    let searchSignal = ref<number>(-1);
    let modalStatus = ref<boolean>(false);
    let modalTitle = ref<string>("");
    let modalLabel = ref();
    let pageDisabled = ref<boolean>(false);
    let sortLog = ref<string>("");
    const state = reactive({
      channelData: [] as any,
      pageData: [] as any,
      backData: [] as any,
      checkPageData: [] as any,
      createData: {} as any,
      updateData: [] as any,
      reqData: {} as any,
    });
    const inputIsNull = reactive({
      channelID: false,
      league: false,
      teamH: false,
      teamA: false,
      date: false,
    });

    const getChannelData = async () => { //取得資料
      store.commit("Render/UpdateLoading", true);
      pageIndex.value = 0
      state.reqData.gameType = searchGameType.value;
      state.reqData.date = searchDate.value != undefined ? $date.DateToString(searchDate.value) : searchDate.value;
      state.reqData.channelSwitch = searchChannel.value;
      state.reqData.signalStatus = searchSignal.value;
      await GetChannel(state.reqData).then((res: any) => {
        state.channelData = res
        state.pageData = PageData(state.channelData, pageRows.value)
        state.backData = JSON.parse(JSON.stringify(state.pageData))
      }).catch((err: any) => {
        controlHint(err, "錯誤", "bg-red-500")
      });
      store.commit("Render/UpdateLoading", false);
    };
    const controlModal = ( status: boolean, title?: string ) => {//modal 開關及內容
      modalStatus.value = status;
      if (!status) {
        Object.keys(inputIsNull).forEach(key => {
          inputIsNull[key as keyof typeof inputIsNull] = false;
        })
      }
      if (title == "create"){
        modalLabel.value = ChannelCreateLabel
        modalTitle.value = "新增頻道";
      } else if (title == "updateCheck"){
        setUpdateData()
        state.checkPageData = PageData(state.updateData,pageRows.value)
        modalLabel.value = ChannelUpdateCheckLabel
        modalTitle.value = "確認修改資料";
      }
    };
    const createData = async () => { //送出資料觸發事件
      if (checkData()) {
      store.commit("Render/UpdateLoading", true);
        await CreateChannel(state.createData).then((res: any) => {
          postApiSuccess(res)
        }).catch((err:any)=>{
          controlHint(err, "失敗", "bg-red-500")
        })
      store.commit("Render/UpdateLoading", false);
      }
    };
    const checkData = () => {//確認資料
      let notNull = true;
      inputIsNull.channelID = !CheckData(state.createData.ChannelID)
      inputIsNull.league = !CheckData(state.createData.League)
      inputIsNull.teamH = !CheckData(state.createData.Team_H)
      inputIsNull.teamA = !CheckData(state.createData.Team_A)
      inputIsNull.date = !CheckData(state.createData.DateTime)
      Object.keys(inputIsNull).forEach(key => {
        if(inputIsNull[key as keyof typeof inputIsNull]){
          notNull = false;
        }
      })
      return notNull;
    };
    const updateData = async () => { 
      controlModal(false)
      store.commit("Render/UpdateLoading", true);
      await UpdateChannel(state.updateData).then((res: any)=>{
        postApiSuccess(res)
        updateStatus.value = false
      }).catch((err:any)=>{
        controlHint(err, "失敗", "bg-red-500")
      })
      setUpdateStatus(false)
      getChannelData();
    }
    const setUpdateData = () => {
      state.updateData = [] as any;
      state.pageData[pageIndex.value].forEach((data: any,index: number) => {
        JSON.stringify(state.pageData[pageIndex.value][index])
        JSON.stringify(state.backData[pageIndex.value][index])
        if (JSON.stringify(state.pageData[pageIndex.value][index]) != JSON.stringify(state.backData[pageIndex.value][index])){
          state.updateData.push(state.backData[pageIndex.value][index])
        }
      })
    }
    const setUpdateStatus = (status: boolean) => {
      updateStatus.value = status;
      pageDisabled.value = status;
      if (!status){
        state.backData = JSON.parse(JSON.stringify(state.pageData))
      } 
    }
    const sort = (key: string) => {
      const sort = ObjectOfArraySort(state.channelData, key, sortLog.value);
      state.channelData = sort.data;
      sortLog.value = sort.sortLog;
      state.pageData = PageData(state.channelData , pageRows.value );
      state.backData = JSON.parse(JSON.stringify(state.pageData))
    };
    const setEnabled = (enabled: any) => {
      state.createData.Enabled = enabled.value;
    };
    const setGameType = (gameType: any) => {
      state.createData.GameType = gameType.value;
    };
    const postApiSuccess = (res: any) => {
      if (res.code == 10000){
        controlModal(false);
        controlHint(res.message, "成功", "bg-green-500")
        getChannelData()
      } else {
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
    watch(
      () => state.createData.DateTime,
      () => { 
        state.createData.Date = $date.DateToString(state.createData.DateTime);
        state.createData.GTime = $date.TimeToString(state.createData.DateTime);
      },
      { deep: true }
    )
    getChannelData();
    return {
      state,
      ChannelTable,
      pageRows,
      ChannelCreateLabel,
      updateStatus,
      searchGameType,
      searchDate,
      searchChannel,
      searchSignal,
      modalStatus,
      modalTitle,
      modalLabel,
      pageDisabled,
      GameTypeSelect,
      ChannelEnabledSelect,
      ChannelSignalSelect,
      inputIsNull,
      pageIndex,
      getChannelData,
      controlModal,
      createData,
      setEnabled,
      setGameType,
      updateData,
      setUpdateStatus,
      sort,
    };
  },
});
</script>