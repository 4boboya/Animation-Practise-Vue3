<template>
  <div class="text-11px dark:text-white">
    <div class="grid grid-cols-7 pt-3">
      <div class="search-bar">
        <div class="search-bar-label">標題</div>
        <input class="search-bar-input" type="text" v-model="searchTitle" />
      </div>
      <div class="search-bar">
        <div class="search-bar-label">起始</div>
        <DatePicker
          class="col-span-5"
          v-model="startDate"
          mode="dateTime"
        >
          <template v-slot="{ inputValue, togglePopover }">
            <input
              class="search-bar-input"
              :value="inputValue"
              @click="togglePopover"
            />
          </template>
        </DatePicker>
        <button class="col-span-1 search-clear-btn" @click="startDate = null">clear</button>
      </div>
      <div class="search-bar">
        <div class="search-bar-label">結束</div>
        <DatePicker
          class="col-span-5"
          v-model="endDate"
          mode="dateTime"
        >
          <template v-slot="{ inputValue, togglePopover }">
            <input
              class="search-bar-input"
              :value="inputValue"
              @click="togglePopover"
            />
          </template>
        </DatePicker>
        <button class="col-span-1 search-clear-btn" @click="endDate = null">clear</button>
      </div>
      <div class="search-btn-bar">
        <button class="search-btn w-14" @click="getAdvertising()">搜尋</button>
      </div>
      <div class="search-bar">
        <div class="search-bar-label">狀態</div>
        <select class="search-bar-input" v-model="searchEnabled">
          <option
            v-for="(item, index) in AdvertingEnabledSelect"
            :key="index"
            :value="item.value"
          >
            {{ item.name }}
          </option>
          <option :value='999'>不選擇</option>
        </select>
      </div>
      <div class="search-bar">
        <div class="search-bar-label">創建</div>
        <select class="search-bar-input" v-model="searchCreatedby">
          <option
            v-for="(item, index) in AdvertingCreatedBySelect"
            :key="index"
            :value="item.value"
          >
            {{ item.name }}
          </option>
          <option :value='null'>不選擇</option>
        </select>
      </div>
      <div class="add-btn-bar">
        <button class="search-btn w-14" @click="controlModal(true,null,'新增廣告')">新增</button>
      </div>
    </div>
    <Table @sort="sort" 
      :tabledata="state.pageData"
      :tableRow="AdvTable"
      :tablePageRows="pageRows"
    >
      <template v-slot:createdby="{data}">
        <template v-for="(item, index) in AdvertingCreatedBySelect" :key="index">
          <span v-if="item.value == data.createdBy" >
            {{item.name}}
          </span>
        </template>
      </template>
      <template v-slot:enabled="{data}">
        <template v-for="(item, index) in AdvertingEnabledSelect" :key="index">
          <span v-if="item.value == data.enabled" >
            {{item.name}}
          </span>
        </template>
      </template>
      <template v-slot:action="{data}">
        <template v-for="(item, index) in AdvertingActionSelect" :key="index">
          <span v-if="item.value == data.action" >
            {{item.name}}
          </span>
        </template>
      </template>
      <template v-slot:starttime="{data}">
        {{ $date.UnixToDateTimeString(data.startTime) }}
      </template>
      <template v-slot:closetime="{data}">
        {{ $date.UnixToDateTimeString(data.closeTime) }}
      </template>
      <template v-slot:update="{data}">
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
      :modalLabel="cutStatus ? CutImgLabel : AdvDataLabel"
      :modalTitle="cutStatus? '裁切圖片' : modalTitle"
      @closeModal="controlModal(false)"
    >
      <template v-slot:title>
        <div class="grid grid-cols-6">
          <div class="modal-label">標題</div>
          <input
            class="modal-input"
            :class="inputIsNull.title ? 'border-red-500' : ''"
            type="text"
            placeholder="標題"
            v-model="state.updateData.title"
          />
        </div>
      </template>
      <template v-slot:createdby>
        <div class="grid grid-cols-6">
          <div class="modal-label">創建</div>
          <Listbox
            class="col-span-5"
            @ID="setCreatedBy"
            :listbox="AdvertingCreatedBySelect"
            :selected="typeSelected"
          />
        </div>
      </template>
      <template v-slot:enabled>
        <div class="grid grid-cols-6">
          <div class="modal-label">狀態</div>
          <Listbox
            class="col-span-5"
            @ID="setEnabled"
            :listbox="AdvertingEnabledSelect"
            :selected="enabledSelected"
          />
        </div>
      </template>
      <template v-slot:seq>
        <div class="grid grid-cols-6">
          <div class="modal-label">優先度</div>
          <input
            class="modal-input"
            :class="inputIsNull.seq ? 'border-red-500' : ''"
            type="number"
            max="99"
            min="0"
            step="1"
            placeholder="優先度"
            v-model="state.updateData.seq"
          />
        </div>
      </template>
      <template v-slot:action>
        <div class="grid grid-cols-6">
          <div class="modal-label">操作模式</div>
          <Listbox
            class="col-span-5"
            @ID="setAction"
            :listbox="AdvertingActionSelect"
            :selected="actionSelected"
          />
        </div>
      </template>
      <template v-slot:path>
        <div class="grid grid-cols-6">
          <div class="modal-label">廣告連結</div>
          <input
            class="modal-input"
            :class="inputIsNull.url ? 'border-red-500' : ''"
            type="text"
            placeholder="廣告連結"
            v-model="state.updateData.url"
          />
        </div>
      </template>
      <template v-slot:starttime>
        <div class="grid grid-cols-6 w-full">
          <div class="modal-label">開始時間</div>
          <DatePicker
            class="col-span-5"
            v-model="state.updateData.startTime"
            mode="dateTime"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="modal-input"
                :class="inputIsNull.startTime ? 'border-red-500' : ''"
                :value="inputValue"
                readonly
                v-on="inputEvents"
              />
            </template>
          </DatePicker>
        </div>
      </template>
      <template v-slot:closetime>
        <div class="grid grid-cols-6 w-full">
          <div class="modal-label">關閉時間</div>
          <DatePicker
            class="col-span-5"
            v-model="state.updateData.closeTime"
            mode="dateTime"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="modal-input"
                :class="inputIsNull.closeTime ? 'border-red-500' : ''"
                :value="inputValue"
                readonly
                v-on="inputEvents"
              />
            </template>
          </DatePicker>
        </div>
      </template>
      <template v-slot:url>
        <div class="grid grid-cols-6 w-full">
          <div class="modal-label">廣告圖片</div>
          <div class="modal-upload">
            <input
              type="file"
              accept="image/*"
              style="width: 80px"
              @change="uploadImg"
            />
            <span v-if="inputIsNull.img" class=" text-red-500 font-bold">請上傳圖片</span>
            <img :src="state.updateData.path" />
          </div>
        </div>
      </template>
      <template v-slot:submit>
        <div class="text-right px-3">
          <button class="modal-btn modal-green-btn" @click="modalTitle.includes('新增') ? createAdvertising() : updateAdvertising()">
            送出
          </button>
        </div>
      </template>
      <template v-slot:cutImg>
        <vue-picture-cropper
          :boxStyle="{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f8f8',
            margin: 'auto',
          }"
          :img="img"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: 16 / 9,
            preview: preview,
          }"
        />
      </template>
      <template v-slot:result>
        <div class="text-right px-3">
          <button class="modal-btn modal-green-btn" @click="cut()">確認</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
input {
  outline: unset !important;
}
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
.modal-upload {
  @apply w-full col-span-5 px-3 py-1;
}
.search-btn {
  @apply border border-blue-gray rounded-xl hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
.search-bar {
  @apply col-span-7 lg:col-span-2 grid grid-cols-8 pt-1 dark:text-blue-gray;
}
.search-btn-bar {
  @apply col-span-1 text-right pt-1 pr-10;
}
.search-bar-label {
  @apply col-span-2 dark:text-white;
}
.search-bar-input {
  @apply col-span-5 h-4 w-full;
}
.search-clear-btn{
  @apply rounded-sm border bg-gray-rice hover:text-white hover:border-white dark:text-white border-red-700 text-red-700 hover:bg-red-700 dark:bg-red-700;
}
.add-btn-bar {
  @apply col-end-8 col-span-1 text-right pt-1 pr-10;
}
.update-btn {
  @apply border border-blue-gray rounded-xl hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
:deep(.v3dp__clearable) {
  position: absolute;
  top: -2px;
  right: -122px;
  left: unset;
}
:deep(i) {
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  color: #ff0000;
  padding: 10px;
}
</style>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch, reactive, computed } from "vue";
import { useStore } from "vuex";
import { GetLeftAdv, EditAdv, CreateAdv, } from "@/apis/BackendService";
import { DatePicker } from "v-calendar";
import { AdvTable } from "@/config/application/Table";
import { AdvDataLabel, CutImgLabel } from "@/config/application/Modal";
import { GetAdvReq, UpdateAdvData } from "@/model/adv";
import { Select } from "@/model/list"
import { PageData } from "@/library/application/PageData";
import { ObjectOfArraySort } from "@/library/application/Sort";
import { CheckData } from "@/library/application/CheckData"
import VuePictureCropper, { cropper } from "vue-picture-cropper";
import { AdvertingEnabledSelect, AdvertingCreatedBySelect, AdvertingActionSelect } from "@/config/application/Select";
export default defineComponent({
  components: { VuePictureCropper, DatePicker },
  setup() {
    const store = useStore();
    const imgUrl = ref(computed(() => store.state["Root"].ImgUrl));
    const { appContext } = getCurrentInstance() as any;
    const $date = appContext.config.globalProperties.$date;
    const pageRows = ref<number>(20);
    const img = ref<string>("");
    const type = ref<string>("left")
    const imgFile = ref<File | null>(null);
    let modalStatus = ref(false);
    let modalTitle = ref<string>("");
    let searchTitle = ref<string>("");
    let searchEnabled = ref<number>(999);
    let searchCreatedby = ref<string | null>(null);
    let typeSelected = ref<Select | null>(null)
    let enabledSelected = ref<Select | null>(null)
    let actionSelected = ref<Select | null>(null)
    let startDate = ref<Date | null>(null);
    let endDate = ref<Date | null>(null);
    let sortLog = ref<string>("");
    let cutStatus = ref<boolean>(false);
    const state = reactive({
      advertisingData: [] as any,
      pageData: [] as any,
      updateData: {} as UpdateAdvData,
      reqData: {} as GetAdvReq,
    });
    const inputIsNull = reactive({
      title:false,
      seq:false,
      url:false,
      startTime:false,
      closeTime:false,
      img:false,
    });

    const getAdvertising = async () => {
      store.commit("Render/UpdateLoading", true);
      setReqData();
      await GetLeftAdv(state.reqData).then((res: any) => {
        state.advertisingData = res;
        state.pageData = PageData(state.advertisingData, pageRows.value);
      }).catch(()=>{
        store.commit("Render/UpdateLoading", false);
      });
      store.commit("Render/UpdateLoading", false);
    };

    const setReqData = () => {
      state.reqData = {} as GetAdvReq;
      searchTitle.value != "" ? state.reqData.title = searchTitle.value : '';
      state.reqData.enabled = searchEnabled.value;
      state.reqData.createby = searchCreatedby.value
      startDate.value != null ? state.reqData.startTime = $date.DateTimeToUnix(startDate.value) : "";
      endDate.value != null ? state.reqData.closeTime = $date.DateTimeToUnix(endDate.value) : "";
    };

    const sort = (key: string) => {
      store.commit("Render/UpdateLoading", true);
      const sort = ObjectOfArraySort(state.advertisingData, key, sortLog.value);
      state.advertisingData = sort.data;
      sortLog.value = sort.sortLog;
      state.pageData = PageData(state.advertisingData, pageRows.value);
      store.commit("Render/UpdateLoading", false);
    };

    const createAdvertising = async () => {
      if (checkData()){
        store.commit("Render/UpdateLoading", true);
        const formData = await setFormData()
        await CreateAdv(formData).then((res: any) => {
          postApiSuccess(res)
        }).catch((err) => {
          controlHint(err, "失敗", "bg-red-500")
          store.commit("Render/UpdateLoading", false);
        })
      }
    }

    const updateAdvertising = async () => {
      if (checkData()){      
        store.commit("Render/UpdateLoading", true);
        const formData = await setFormData()
        formData.append("ID",state.updateData.id)
        await EditAdv(formData).then((res: any) => {
          postApiSuccess(res)
        }).catch((err) => {
          controlHint(err, "失敗", "bg-red-500")
          store.commit("Render/UpdateLoading", false);
        })
      }
    }

    const postApiSuccess = (res: any) => {
      if (res.code == 10000){
        controlModal(false);
        controlHint(res.message, "成功", "bg-green-500")
        getAdvertising()
      } else {
        controlHint(res.message, "失敗", "bg-red-500")
      }
    }

    const setFormData = async () => {
      let formData = new FormData();
      imgFile.value != null ? formData.append("File", imgFile.value) : '';
      // formData.append("File", file);
      formData.append("Url", state.updateData.url);
      formData.append("Title", state.updateData.title);
      formData.append("CreatedBy", state.updateData.createdBy);
      formData.append("Action", state.updateData.action);
      formData.append("Seq", state.updateData.seq.toString());
      formData.append("Enabled", state.updateData.enabled);
      formData.append("StartTime", $date.DateTimeToUnix(state.updateData.startTime));
      formData.append("CloseTime", $date.DateTimeToUnix(state.updateData.closeTime));
      formData.append("Type",type.value);
      return formData
    }

    const checkData = () => {
      let notNull = true;
      inputIsNull.title = !CheckData(state.updateData.title)
      inputIsNull.seq = !CheckData(state.updateData.seq)
      inputIsNull.url = !CheckData(state.updateData.url)
      inputIsNull.startTime = !CheckData(state.updateData.startTime)
      inputIsNull.closeTime = !CheckData(state.updateData.closeTime)
      inputIsNull.img = !CheckData(state.updateData.path)
      Object.keys(inputIsNull).forEach(key => {
        if(inputIsNull[key as keyof typeof inputIsNull]){
          notNull = false;
        }
      })
      return notNull;
    }

    const controlModal = (status: boolean, data: any = null, title: string = '') => {
      if (status) {
        modalTitle.value = title;
        if (data != null) {
          state.updateData = JSON.parse(JSON.stringify(data));
          state.updateData.startTime = $date.UnixToDateTime(state.updateData.startTime)
          state.updateData.closeTime = $date.UnixToDateTime(state.updateData.closeTime)
          state.updateData.path = `${imgUrl.value}${state.updateData.path}`
          for (let i in AdvertingEnabledSelect){
            if (AdvertingEnabledSelect[i].value == data.enabled){
              enabledSelected.value = AdvertingEnabledSelect[i]
            }
          }
          for (let i in AdvertingCreatedBySelect){
            if (AdvertingCreatedBySelect[i].value == data.createdBy){
              typeSelected.value = AdvertingCreatedBySelect[i]
            }
          }
          for (let i in AdvertingActionSelect){
            if (AdvertingActionSelect[i].value == data.action){
              actionSelected.value = AdvertingActionSelect[i]
            }
          }
        }
      } else {
        state.updateData = {} as UpdateAdvData
        imgFile.value = null;
        typeSelected.value = null;
        enabledSelected.value = null;
        actionSelected.value = null;
        Object.keys(inputIsNull).forEach(key => {
          inputIsNull[key as keyof typeof inputIsNull] = false;
        })
      }
      modalStatus.value = status;
    };

    const setCreatedBy = (createdBy: any) => {
      state.updateData.createdBy = createdBy.value;
    }
    const setEnabled = (enabled: any) => {
      state.updateData.enabled = enabled.value;
    }
    const setAction = (action: any) => {
      state.updateData.action = action.value;
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

    const startDateCheck = (start: any, end: any, from?: String) => {
      if (start != null) {
        start.setSeconds(0)
        if (end != null){
          if (start > end) {
            end = start;
          } else if (from != "create" && start < $date.diff_type_date(end, 31)) {
            end = $date.diff_type_date(start, -30);
          }
          end.setSeconds(59);
        }
      }
      return {start, end};
    }

    const endDateCheck = (start: any, end: any, from?: String) => {
      if (end != null) {
        end.setSeconds(59)
        if (start != null){
          if (end < start) {
            start = end;
          } else if (from != "create" && end > $date.diff_type_date(start, -31)) {
            start = $date.diff_type_date(end, 30);
          }
          start.setSeconds(0);
        }
      }
      return {start, end};
    }

    watch(startDate, () => {
      let {start, end} = startDateCheck(startDate.value,endDate.value)
      startDate.value = start
      endDate.value = end
    });
    watch(endDate, () => {
      let {start, end} = endDateCheck(startDate.value,endDate.value)
      startDate.value = start
      endDate.value = end
    });
    watch(
      () => state.updateData.startTime,
      () => {
        let {start, end} = startDateCheck(state.updateData.startTime,state.updateData.closeTime,"create")
        state.updateData.startTime = start
        state.updateData.closeTime = end
      },
      {deep: true}
    )
    watch(
      () => state.updateData.closeTime,
      () => {
        let {start, end} = endDateCheck(state.updateData.startTime,state.updateData.closeTime,"create")
        state.updateData.startTime = start
        state.updateData.closeTime = end
      },
      {deep: true}
    )
    watch(
      () => state.updateData.seq,
      () => {
        if (state.updateData.seq > 99) {
          state.updateData.seq = 99
        } else if (state.updateData.seq < 1) {
          state.updateData.seq = null
        }
        if (state.updateData.seq % 1 != 0){
          state.updateData.seq = Math.floor(state.updateData.seq)
        }
      },
      { deep: true }
    )
    const uploadImg = async (imgData: any) => {
      const target  = imgData.target
      const { files } = target
      if (files) {
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          img.value = String(reader.result)
          if (file.type != 'image/gif') {
            cutStatus.value = true;
          } else {
            state.updateData.path = img.value
            imgFile.value = file
          }
        }
      } else {
        img.value = "";
        imgFile.value = null;
      }
    };
    const cut = async () => {
      state.updateData.path = cropper.getDataURL();
      imgFile.value = await cropper.getFile()
      cutStatus.value = false;
    };
    getAdvertising();
    return {
      $date,
      imgUrl,
      startDate,
      endDate,
      state,
      AdvTable,
      pageRows,
      searchTitle,
      searchEnabled,
      searchCreatedby,
      typeSelected,
      enabledSelected,
      actionSelected,
      modalStatus,
      modalTitle,
      AdvDataLabel,
      CutImgLabel,
      inputIsNull,
      img,
      AdvertingEnabledSelect,
      AdvertingCreatedBySelect,
      AdvertingActionSelect,
      cutStatus,
      controlModal,
      getAdvertising,
      createAdvertising,
      updateAdvertising,
      setCreatedBy,
      setEnabled,
      setAction,
      sort,
      uploadImg,
      cut,
    };
  },
});
</script>