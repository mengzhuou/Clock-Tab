<template>
  <header class="sticky top-0 shadow-lg bg-theme-secondary">
    <nav class="container flex flex-col items-center gap-4 py-6 text-white sm:flex-row">
      <div class="flex items-center gap-3">
        <i class="text-2xl fa-solid fa-clock"></i>
        <p class="text-2xl">Digital Analog Clock</p>
      </div>
    </nav>

  </header>
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

