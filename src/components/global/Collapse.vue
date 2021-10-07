<template>
  <div>
    <template v-for="(item, i) in collapse" :key="i">
      <div
        class="cursor-pointer"
        :class="item.buttonClass"
        :style="item.buttonStyle"
        @click="control(i)"
      >
        <slot :name="`button_${item.key}`" :data="item">
          {{ item.value }}
        </slot>
      </div>
      <div
        class="h-0 overflow-hidden"
        style="transition: all 0.3s ease"
        :class="item.contentClass"
        :style="item.contentStyle"
        :ref="(el) => { divs[i] = el }"
      >
        <slot :name="`content_${item.key}`">{{ item.value }}</slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef } from "vue";
import { Collapse } from "@/model/collapse";
export default defineComponent({
  props: {
    collapseList: Array as PropType<Array<Collapse>>,
  },
  setup(props) {
    const collapse = toRef(props, "collapseList");
    const divs = ref([]);

    const control = (index: number) => {
      const panel = divs.value[index] as HTMLDivElement;
      if (panel.style.height == "" || panel.style.height == "0px") {
        panel.style.height = `${panel.scrollHeight}px`;
      } else {
        panel.style.height = "0px";
      }
    };

    return { collapse, divs, control };
  },
});
</script>