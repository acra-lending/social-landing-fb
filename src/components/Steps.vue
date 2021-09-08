<template>
  <div class>
    <div class="bg-gray-300 h-1"></div>
    <div class="flex">
      <div class="flex-1" v-for="s in steps" :key="s">
        <div
          v-if="step >= s"
          class="bg-blue-900 -mt-1 h-1"
          :class="{ 'w-1/2': step == s, 'w-full': step < s }"
        ></div>
        <div
          class="-mt-3 mx-auto rounded-3xl h-5 w-5"
          :class="{ 'bg-blue-900': s <= step, 'bg-gray-300': step != s }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["steps", "step"]
};
</script>