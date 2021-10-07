<template>
  <div>
    <Listbox v-model="selectedPerson">
      <div class="relative mt-1">
        <ListboxButton
          class="
            listbox-btn
            focus-visible:ring-2
            focus-visible:ring-opacity-75
            focus-visible:ring-white
            focus-visible:ring-offset-orange-300
            focus-visible:ring-offset-2
            focus-visible:border-indigo-500
          "
        >
          <span class="block truncate">{{ selectedPerson.name }}</span>
          <span class="select-icon">
            <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions class="listbox-option">
            <ListboxOption
              v-for="person in list"
              :key="person.name"
              :value="person"
              class="hover:bg-gray-rice"
              as="template"
              @click="changeSelect(person)"
            >
              <li class="cursor-default select-none relative py-2 pl-10 pr-4">
                <span>{{ person.name }}</span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<style scoped>
.listbox-btn {
  @apply relative w-full py-2 pl-3 pr-10 text-left bg-gray-tab rounded-xl shadow-md cursor-default border focus:outline-none sm:text-sm;
}
.listbox-option {
  @apply absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm;
}
.select-icon {
  @apply absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none;
}
</style>

<script lang="ts">
import { defineComponent, watch,  PropType, toRef } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { SelectorIcon } from "@heroicons/vue/solid";
import { List, Select } from "@/model/list";
export default defineComponent({
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    SelectorIcon,
  },
  props: {
    selected: {} as PropType<Select>,
    listbox: Array as PropType<Array<List>>,
  },
  setup(props, context) {
    const list = toRef(props,'listbox') as any;
    const select = toRef(props,'selected') as any;
    let selectedPerson = select.value == undefined || select.value == null ? list.value[0] : JSON.parse(JSON.stringify(select.value));

    const returnID = () => {
      context.emit("ID", selectedPerson);
    };

    const changeSelect = (selected: any) => {
      selectedPerson = JSON.parse(JSON.stringify(selected))
      returnID();
    };

    watch(selectedPerson, () => {
      returnID();
    });

    returnID();
    return {
      selectedPerson,
      list,
      changeSelect,
    };
  },
});
</script>