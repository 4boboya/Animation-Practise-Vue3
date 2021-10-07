<template>
  <div class="fixed right-3 top-8 z-100">
    <div class="max-w-md mx-auto">
      <RadioGroup>
        <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
        <div class="space-y-2">
          <RadioGroupOption>
            <div class="radio-group-option" :class="bgcolor">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel as="p" class="font-medium" :class="color">
                      {{ label }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      class="inline"
                      :class="color"
                    >
                      <span> {{ msg }}</span>
                    </RadioGroupDescription>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>

<style scoped>
.radio-group-option {
  @apply relative flex px-5 py-4 rounded-lg shadow-md focus:outline-none opacity-80;
}
</style>

<script lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";
import { toRefs, defineComponent } from "vue";

export default defineComponent({
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  },
  props: {
    hintLabel: String,
    hintMsg: String,
    hintBgcolor: String,
    hintColor: String,
  },
  setup(props) {
    const label = toRefs(props).hintLabel;
    const msg = toRefs(props).hintMsg;
    const bgcolor = toRefs(props).hintBgcolor;
    const color = toRefs(props).hintColor;

    return { label, msg, bgcolor, color };
  },
});
</script>
