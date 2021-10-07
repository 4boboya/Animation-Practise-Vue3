<template>
  <div class="text-11px dark:text-white">
    <div class="create-btn-bar">
      <button class="create-btn" @click="controlModal(true, data, '新增討論區')" >
        新增
      </button>
    </div>
    <template v-for="(item, index) in state.parentPageData" :key="index">
      <Table
        @sort="sort"
        :tabledata="item"
        :tableRow="ForumSettingTable"
        :tablePageRows="pageRows"
        :pageShow="false"
      >
        <template v-slot:delete="{data}">
          <button class="update-btn w-12" @click="controlModal(true, data, '刪除確認')" >
            刪除
          </button>
        </template>
        <template v-slot:update="{data}">
          <button class="update-btn w-12" @click="controlModal(true, data, '編輯父討論區')" >
            編輯
          </button>
        </template>
        <template v-slot:child>
          <button class="update-btn w-12" @click="childShow[index] = !childShow[index]" >
            V
          </button>
        </template>
      </Table>
      <Table
        v-if="childShow[index]"
        @sort="sort"
        :tabledata="state.childPageData[item[0][0].forumID]"
        :tableRow="ForumSettingTable"
        :tablePageRows="pageRows"
        :theadShow="false"
        :pageShow="false"
      >
        <template v-slot:delete="{ data }">
          <button class="update-btn w-12" @click="controlModal(true, data, '刪除確認')" >
            刪除
          </button>
        </template>
        <template v-slot:update="{ data }">
          <button class="update-btn w-12" @click="controlModal(true, data, '編輯子討論區')" >
            編輯
          </button>
        </template>
      </Table>
    </template>
    <Modal
      :modalStatus="modalStatus"
      :modalLabel="modalLabel"
      :modalTitle="modalTitle"
      @closeModal="controlModal(false)"
    >
      <template v-slot:title>
        <div class="grid grid-cols-6">
          <div class="modal-label">討論版名稱</div>
          <input
            class="modal-input"
            placeholder="討論版名稱"
            :class="inputIsNull.title ? 'border-red-500' : ''"
            v-model="state.updateData.title"
          />
        </div>
      </template>
      <template v-slot:parent>
        <div class="grid grid-cols-6">
          <div class="modal-label">父層討論區</div>
          <Listbox class="col-span-5" @ID="setParentForum" :listbox="parentForumSelect" :selected="forumSelected"/>
        </div>
      </template>
      <template v-slot:enabled>
        <div class="grid grid-cols-6">
          <div class="modal-label">狀態</div>
          <Listbox class="col-span-5" @ID="setEnabled" :listbox="ForumEnabledSelect" :selected="enabledSelected"/>
        </div>
      </template>
      <template v-slot:color>
        <div class="grid grid-cols-6">
          <div class="modal-label">顏色</div>
          <div 
            class="col-span-5 grid grid-cols-5 px-2 py-1 border rounded-xl bg-gray-tab text-center"
            :class="inputIsNull.color ? 'border-red-500' : ''"
          >
              <div class="col-span-4">
                <input
                    class="modal-input border-transparent"
                    type="text"
                    v-model="state.updateData.color"
                />
              </div>
              <div class="text-right col-span-1">
                <input
                    class="modal-input border-transparent"
                    type="color"
                    v-model="state.updateData.color"
                />
              </div>
          </div>
        </div>
      </template>
      <template v-slot:icon>
        <div class="grid grid-cols-6">
          <div class="modal-label">icon</div>
          <div 
            class="col-span-5 grid grid-cols-5 px-2 py-1 border rounded-xl bg-gray-tab text-center"
            :class="inputIsNull.icon ? 'border-red-500' : ''"
          >
              <div class="col-span-4">
                <input
                    class="modal-input border-transparent"
                    type="text"
                    v-model="state.updateData.icon"
                />
              </div>
              <div class="col-span-1 p-1">
                <a class="border-2 rounded-3xl px-2 py-1" href="https://fontawesome.com/v5.15/icons?d=gallery&p=2" target="_blank">icon選單</a>
              </div>
          </div>
        </div>
      </template>
      <template v-slot:data>
        <div class="grid grid-cols-6">
          <div class="modal-label">預刪除討論區</div>
          <div class="col-span-5 px-2 py-1 rounded-xl bg-gray-tab text-center">
            {{ state.updateData.title }}
          </div>
        </div>
      </template>
      <template v-slot:submit>
        <div class="text-right px-3">
          <button class="modal-btn modal-green-btn" @click="createData()">
            新增
          </button>
        </div>
      </template>
      <template v-slot:result>
        <div class="text-right px-3">
          <button class="modal-btn modal-green-btn" @click="updateData()">
            送出
          </button>
        </div>
      </template>
      <template v-slot:delete>
        <div class="text-right px-3">
          <button class="modal-btn modal-red-btn" @click="deleteData()">
            刪除
          </button>
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
.modal-label {
  @apply col-span-1 text-center dark:text-gray-rice font-bold;
}
.modal-input {
  @apply w-full col-span-5 border rounded-xl px-3 py-1 bg-gray-tab;
}
.update-btn {
  @apply border border-blue-gray rounded-xl hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
.create-btn-bar{
  @apply w-full text-right pt-3 px-10;
}
.create-btn{
  @apply border border-blue-gray rounded-xl w-14 hover:bg-blue-gray hover:text-gray-tab dark:border-gray-tab dark:hover:text-blue-gray dark:hover:bg-gray-tab;
}
</style>

<script lang="ts">
import { defineComponent, ref,  reactive } from "vue";
import { useStore } from "vuex";
import { GetForumList } from "@/apis/BackendService";
import { ForumSettingTable } from "@/config/application/Table";
import { ForumParentUpdataLabel, ForumChildUpdataLabel, ForumCreateLabel, ForumDeleteLabel } from "@/config/application/Modal";
import { ForumEnabledSelect } from "@/config/application/Select";
import { Select } from "@/model/list";
import { CheckColor, CheckData } from "@/library/application/CheckData"
// import { PageData } from "@/library/application/PageData";
export default defineComponent({
  setup() {
    const store = useStore();
    const pageRows = ref<number>(1000);
    const today = new Date();
    let modalStatus = ref<boolean>(false);
    let modalTitle = ref<String>('')
    let modalLabel = ref()
    let forumSelected = ref<Select | null>(null)
    let enabledSelected = ref<Select | null>(null)

    const parentForumSelect = reactive([] as Select[]);
    const childShow = reactive([] as Boolean[])
    const state = reactive({
      updateData: {} as any,
      parentPageData: {} as any,
      childPageData: {} as any,
    });
    const inputIsNull = reactive({
      title: false,
      color: false,
      icon: false,
    });

    const getParentForum = async () => {
      store.commit("Render/UpdateLoading", true);
      await GetForumList({}).then((res: any) => {
        res.forEach((item: any) => {
          if (item.is_Cat == 1) {
            parentForumSelect.push({ value: item.forumID, name: item.title })
            childShow.push(false)
            state.parentPageData[item.forumID] = [[item]]
          }
        });
      });
      store.commit("Render/UpdateLoading", false);
    };

    const getChildForum = async () => {
      store.commit("Render/UpdateLoading", true);
      await GetForumList({}).then((res: any) => {
        res.forEach((item: any) => {
          if (item.is_Cat == 0) {
            if (state.childPageData[item.parentID] == undefined) {
              state.childPageData[item.parentID] = [[item]]
            } else {
              state.childPageData[item.parentID][0].push(item)
            }
          }
        });
      });
      store.commit("Render/UpdateLoading", false);
    };

    const controlModal = (status: boolean, data: any = null, title: string) => {
      if (status) {
        modalTitle.value = title;
        if (title == "編輯父討論區") {
          state.updateData = JSON.parse(JSON.stringify(data));
          ForumEnabledSelect.forEach((item: any) => {
            if (item.value == data.expert_Only) {
              enabledSelected.value = item
            }
          })
          modalLabel.value = ForumParentUpdataLabel
        } else if (title == "編輯子討論區") {
          state.updateData = JSON.parse(JSON.stringify(data));
          ForumEnabledSelect.forEach((item: any) => {
            if (item.value == data.expert_Only) {
              enabledSelected.value = item
            }
          })
          parentForumSelect.forEach((item: any) => {
            if (item.value == data.parentID) {
              forumSelected.value = item
            }
          })
          modalLabel.value = ForumChildUpdataLabel
        } else if (title == "新增討論區") {
          modalLabel.value = ForumCreateLabel
        } else if (title == "刪除確認") {
          state.updateData = data;
          modalLabel.value = ForumDeleteLabel
        }
      } else {
          state.updateData = {} as any
          Object.keys(inputIsNull).forEach((key: any) => {
              inputIsNull[key as keyof typeof inputIsNull] = false
          })
      }
      modalStatus.value = status;
    };
    const setParentForum = (forum: any) => {
        state.updateData.parentID = forum.value
    }
    const setEnabled = (enabled: any) => {
        state.updateData.status = enabled.value
    }
    const createData = () => {
        const notNull = checkData()
        console.log(notNull)
        console.log(state.updateData)
    }
    const updateData = () => {
        const notNull = checkData()
        console.log(notNull)
        console.log(state.updateData)
    }
    const deleteData = () => {
        console.log(state.updateData)
    }
    const checkData = () => {
        let notNull = true
        inputIsNull.color = !CheckColor(state.updateData.color)
        inputIsNull.title = !CheckData(state.updateData.title)
        inputIsNull.icon = !CheckData(state.updateData.icon)
        Object.keys(inputIsNull).forEach((key: any) => {
            if (inputIsNull[key as keyof typeof inputIsNull]){
                notNull = false;
            }
        })
        return notNull;
    }

    // const controlHint = (message: string, label: string, bgcolor: string) => {
    //   //開關 設定提示視窗
    //   store.commit("Render/UpdateLoading", false);
    //   const hint = {
    //     status: true,
    //     color: "text-white",
    //     message: message,
    //     label: label,
    //     bgcolor: bgcolor,
    //   };
    //   store.commit("Render/SetHint", hint);
    //   setTimeout(() => {
    //     hint.status = false;
    //     store.commit("Render/SetHint", hint);
    //   }, 5000);
    // };

    getParentForum();
    getChildForum();
    return {
      childShow,
      state,
      ForumSettingTable,
      ForumEnabledSelect,
      parentForumSelect,
      pageRows,
      today,
      modalStatus,
      modalTitle,
      modalLabel,
      inputIsNull,
      forumSelected,
      enabledSelected,
      controlModal,
      setParentForum,
      setEnabled,
      updateData,
      createData,
      deleteData,
    };
  },
});
</script>