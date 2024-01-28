<template>
  <header class="sticky top-0 shadow-lg bg-theme-secondary">
    <nav class="container flex flex-col items-center gap-4 py-6 text-white sm:flex-row">
      <div class="flex items-center gap-3">
        <i class="text-2xl fa-solid fa-clock"></i>
        <p class="text-2xl">Digital Analog Clock</p>
      </div>
    </nav>
  </header>

  <div class="container mt-8 text-center">
    <p class="mb-4 text-4xl font-bold">Current Time: {{ currentTime }}</p>
    <p class="text-lg">Current Date: {{ currentDate }}</p>
  </div>

  <div class="container">
    <canvas ref="canvas" width="400" height="400" style="background-color:#333"></canvas>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  const currentTime = ref(getCurrentTime());
  const currentDate = ref(getCurrentDate());
  
  const canvas = ref(null);
  let ctx;

  onMounted(() => {
    ctx = canvas.value.getContext('2d');
    
    const intervalId = setInterval(() => {
      drawClock();
      currentTime.value = getCurrentTime();
    }, 1000);

    // Store the interval ID for later cleanup
    ctx.intervalId = intervalId;
  });

  onUnmounted(() => {
    // Clear the interval using the stored ID
    clearInterval(ctx.intervalId);
  });


  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
  }

  function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString();
  }

  function drawClock() {
    try {
      if (!ctx) return;
      const centerX = canvas.value.width / 2;
      const centerY = canvas.value.height / 2;
      const radius = canvas.value.width / 2 - 10; // Adjust as needed
  
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  
      // Draw clock face
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#333'; // Adjust as needed
      ctx.fill();
      ctx.stroke();
  
      // Draw clock notches
      ctx.beginPath();
      for (let n = 1; n <= 60; n++) {
        const angle = (n * 6 * Math.PI) / 180; // Each notch is 6 degrees
        const notchLength = n % 5 === 0 ? 15 : 5; // Longer notch every 5th
        const startX = centerX + Math.cos(angle) * (radius - notchLength);
        const startY = centerY + Math.sin(angle) * (radius - notchLength);
        const endX = centerX + Math.cos(angle) * radius;
        const endY = centerY + Math.sin(angle) * radius;
  
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
      }
      ctx.strokeStyle = 'white'; // Adjust as needed
      ctx.stroke();
  
      // Get current time
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
  
      // Draw clock hands
      drawClockHand(centerX, centerY, hours * 30 + minutes * 0.5, radius * 0.6, 8, 'white');
      drawClockHand(centerX, centerY, minutes * 6 + seconds * 0.1, radius * 0.8, 4, 'white');
      drawClockHand(centerX, centerY, seconds * 6, radius * 0.9, 2, 'red'); // Adjust color as needed
    } catch (error){
      console.error("error: ", error);
    }
  }

  function drawClockHand(x, y, angle, length, width, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    const endX = x + length * Math.cos((angle - 90) * (Math.PI / 180));
    const endY = y + length * Math.sin((angle - 90) * (Math.PI / 180));
    ctx.lineTo(endX, endY);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
</script>
