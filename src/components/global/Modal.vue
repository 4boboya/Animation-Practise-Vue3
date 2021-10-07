<template>
  <div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog @close="closeModal">
        <div class="fixed inset-0 z-50 overflow-y-auto bg-backdrop">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0" />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div class="transition-child-div" style="min-height:360px">
                <DialogTitle as="h3" class="dialog-title">
                  <div
                    class="text-left px-4 font-extrabold text-blue-gray dark:text-gray-rice"
                  >
                    {{ title }}
                  </div>
                  <div class="text-right px-4">
                    <button
                      type="button"
                      class="close-btn focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 "
                      @click="closeModal"
                    >
                      X
                    </button>
                  </div>
                </DialogTitle>
                <div
                  class="mt-2"
                  :class="item == 'submit' || item == 'result' || item == 'check' || item == 'delete'? 'submit-div' : ''"
                  v-for="(item, index) in Object.keys(label)"
                  :key="index"
                >
                  <slot :name="item">{{ item }}</slot>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style scoped>
.transition-child-div {
  @apply inline-block w-2/3 p-6 pb-16 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-rice shadow-xl rounded-2xl dark:bg-blue-modal;
}
.dialog-title {
  @apply grid grid-cols-2 text-lg font-medium leading-6 text-gray-900;
}
.close-btn {
  @apply inline-flex justify-center px-2 py-1 text-sm font-medium border-red-700 text-red-700 bg-gray-rice border border-transparent rounded-xl hover:bg-red-700 hover:text-white hover:border-white dark:bg-red-700 dark:text-white focus:outline-none;
}
.submit-div{
  @apply absolute bottom-3;
  width: calc(100% - 2.5rem)
}
</style>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props: {
    modalStatus: Boolean,
    modalLabel: Object,
    modalTitle: String,
  },
  setup(props, context) {
    const isOpen = toRefs(props).modalStatus;
    const label = toRefs(props).modalLabel;
    const title = toRefs(props).modalTitle;
    const closeModal = () => {
      context.emit("closeModal");
    };
    return {
      isOpen,
      label,
      title,
      closeModal,
    };
  },
});
</script>