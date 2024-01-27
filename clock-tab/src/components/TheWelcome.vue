<template>
  <div>
    <p>Current Time: {{ currentTime }}</p>
    <p>Current Date: {{ currentDate }}</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const currentTime = ref(getCurrentTime());
  const currentDate = ref(getCurrentDate());

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
  }

  function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString();
  }

  setInterval(() => {
    currentTime.value = getCurrentTime();
  }, 1000);
</script>

