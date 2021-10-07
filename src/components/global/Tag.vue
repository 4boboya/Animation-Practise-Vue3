<template>
  <div class="text-left">
    <span
      class="border border-gray-700 px-1 m-1"
      v-for="(item, index) in tagData"
      :key="index"
    >
      {{ item.value }}
      <a class="cursor-pointer text-xs" @click="deletaTag(item.id)">X</a>
    </span>
    <span>
      <button class="bg-purple-700 text-white px-1 ml-1" @click="controlPanel()">
        <div class="relative" style="transition: all 0.3s ease" :class="addTagPanel ? 'rotate-Z-45' : ''">
          +
        </div>
      </button>
      <span v-show="addTagPanel" class="relative top-7 -left-12 px-1 py-1 bg-gray-tab">
        <span v-for="(item, index) in select" :key="index">
          <slot :name="item.key"></slot>
        </span>
      </span>
    </span>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, PropType, toRef, ref, watch } from "vue";
import { TagList, TagSelect } from "@/model/tag";
export default defineComponent({
  props: {
    TagSelect: Array as PropType<Array<TagSelect>>,
    TagValue: String,
  },
  setup(props, context) {
    const select = toRef(props, "TagSelect");
    const newTagValue = toRef(props, "TagValue");
    const addTagPanel = ref(false);
    const tagData = reactive([] as TagList[]);

    const controlPanel = () => {
      addTagPanel.value = !addTagPanel.value;
    };
    const addTag = () => {
      console.log(newTagValue.value);
      const newTag = {
        id: tagData.length == 0 ? 0 : tagData[tagData.length - 1].id + 1,
        value: newTagValue.value,
      } as TagList;
      tagData.push(newTag);
      addTagPanel.value = false;
    };
    const deletaTag = (id: number) => {
      tagData.forEach((item: TagList, index: number) => {
        console.log(item);
        console.log(id);
        if (item.id == id) {
          tagData.splice(index, 1);
        }
      });
    };

    watch(
      () => newTagValue,
      () => {
        if (newTagValue.value != ''){
          addTag();
        }
      },
      { deep: true }
    );
    watch(
      () => addTagPanel,
      () => {   
        context.emit("PanelStatus", addTagPanel.value);
      },
      { deep: true }
    );
    
    return { tagData, select, addTagPanel, controlPanel, deletaTag };
  },
});
</script>