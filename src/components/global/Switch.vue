<template>
  <button
    class="switch rounded-5xl w-16 h-8"
    :class="switchStatus ? switchOnColor : switchOffColor"
  >
    <div class="grid grid-cols-2 relative top-35rem left-5px">
      <div :class="switchStatus ? 'text-gray-100' : 'text-gray-800'">
        <slot name="on">
          <div class="h-5 w-5 relative left-3px"></div>
        </slot>
      </div>
      <div :class="switchStatus ? 'text-gray-100' : 'text-gray-800'">
        <slot name="off">
          <div class="h-5 w-5"></div>
        </slot>
      </div>
    </div>
    <div
      class="relative ctrl-btn rounded-5xl bg-gray-400 -top-4"
      :style="{ left: switchStatus ? '4px' : '31px' }"
    />
  </button>
</template>

<style scoped>
.switch {
  transition: all 0.5s ease;
}
.ctrl-btn {
  position: relative;
  width: 40%;
  height: 78%;
  transition: left 0.5s ease;
}
</style>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    onColor: {
      type: String,
      default: "bg-blue-200",
    },
    offColor: {
      type: String,
      default: "bg-white",
    },
    status: Boolean,
  },
  setup(props) {
    const switchOnColor = toRefs(props).onColor;
    const switchOffColor = toRefs(props).offColor;
    const switchStatus = toRefs(props).status;
    return { switchOnColor, switchOffColor, switchStatus };
  },
});
</script>