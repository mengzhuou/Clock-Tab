<template>
   <div class="flex-grow" :class="{ 'bg-theme-secondary': darkMode }">
    <header class="sticky top-0 shadow-lg" :class="{ 'bg-theme-secondary': darkMode }">
      <nav class="container flex flex-col items-center justify-between gap-4 py-6 font-bold text-black sm:flex-row">
        <div class="flex items-center gap-3">
          <i class="text-2xl fa-solid fa-clock"></i>
          <p class="text-2xl">Digital Analog Clock</p>
        </div>
        <div class="flex items-center ml-6">
          <label class="switch">
            <input type="checkbox" v-model="darkMode" @click="toggleDarkMode">
            <span class="slider"></span>
          </label>
          <span class="ml-2">{{ darkMode ? 'Dark Mode' : 'Light Mode' }}</span>
        </div>
      </nav>
    </header>
  
    <div :class="{ 'bg-theme-secondary': darkMode }">
      <div class="container mt-8 text-center" >
        <p class="mb-4 text-4xl font-bold">{{ currentTime }}</p>
        <p class="mb-6 text-2xl font-semibold">{{ currentDate }}</p>
        <canvas ref="canvas" width="350" height="350" style="background-color: transparent; border: 2px solid #000000;"></canvas>
      </div>
    </div>

    <footer>
      <div className="footer-text" >
        Designed with &#10084; by 
      </div>
      <div className="footer-find-me">
        <a href="https://mengzhuou.github.io/">Mengzhu Ou</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  const currentTime = ref(getCurrentTime());
  const currentDate = ref(getCurrentDate());
  
  const canvas = ref(null);
  let ctx;
  let darkMode = ref(false);

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

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
  }

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
      const canvasValue = canvas.value;
      const centerX = canvasValue.width / 2;
      const centerY = canvasValue.height / 2;
      const radius = canvasValue.width / 2 - 10; 
  
      // Clear the canvas
      ctx.clearRect(0, 0, canvasValue.width, canvasValue.height);
  
      // Draw clock face
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'transparent'; 
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
      ctx.strokeStyle = 'black'; 
      ctx.stroke();
  
      // Get current time
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      drawClockHour(centerX, centerY, hours, hours * 30 + minutes * 0.5, radius * 0.6, 8, 'white');
      drawClockMinute(centerX, centerY, minutes, minutes * 6 + seconds * 0.1, radius * 0.8, 4, 'white');
      drawClockSecond(centerX, centerY, seconds, seconds * 6, radius * 0.9, 2, 'red'); 
    } catch (error){
      console.error("error: ", error);
    }
  }

  function drawClockHour(x, y, hour, angle, length, width, color) {
    // const lineLengths = [-10, -50, -90]; 
    const lineLengths = [0, -35, -70]; 

    for (let i = 0; i < lineLengths.length; i++) {
      const currentLength = length + lineLengths[i];
      drawHourTextAlongLine(x, y, hour.toString(), angle, currentLength, width, color);
    }
  }

  function drawClockMinute(x, y, minute, angle, length, width, color) {
    const lineLengths = [0, -35, -70, -105]; 

    for (let i = 0; i < lineLengths.length; i++) {
      const currentLength = length + lineLengths[i];
      drawMinuteTextAlongLine(x, y, minute.toString(), angle, currentLength, width, color);
    }
  }

  function drawClockSecond(x, y, second, angle, length, width, color) {
    const lineLengths = [0, -35, -70, -105, -140];
    
    for (let i = 0; i < lineLengths.length; i++) {
      const currentLength = length + lineLengths[i];
      drawSecondTextAlongLine(x, y, second.toString(), angle, currentLength, width, color);
    }
  }

  function drawHourTextAlongLine(x, y, text, angle, length, width, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    const endX = x + length * Math.cos((angle - 90) * (Math.PI / 180));
    const endY = y + length * Math.sin((angle - 90) * (Math.PI / 180));
    const chosenText = text.toString(); 
    const textX = endX - 5;
    const textY = endY + 5; 
    ctx.font = 'bold 16px Times New Roman';
    ctx.fillStyle = 'green'; 
    ctx.fillText(chosenText, textX, textY);
  }
  function drawMinuteTextAlongLine(x, y, text, angle, length, width, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    const endX = x + length * Math.cos((angle - 90) * (Math.PI / 180));
    const endY = y + length * Math.sin((angle - 90) * (Math.PI / 180));
    const chosenText = text.toString(); 
    const textX = endX - 5;
    const textY = endY + 5; 
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = 'blue'; 
    ctx.fillText(chosenText, textX, textY);
  }
  function drawSecondTextAlongLine(x, y, text, angle, length, width, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    const endX = x + length * Math.cos((angle - 90) * (Math.PI / 180));
    const endY = y + length * Math.sin((angle - 90) * (Math.PI / 180));
    const chosenText = text.toString(); 
    const textX = endX - 5;
    const textY = endY + 5; 
    ctx.font = 'bold 16px Verdana';
    ctx.fillStyle = 'red'; 
    ctx.fillText(chosenText, textX, textY);
  }
</script>


<style scoped>

.flex-grow {
  flex-grow: 1;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #000000;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ffffff;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.bg-theme-secondary.dark-mode {
  background-color: #333; 
  color: #fff; 
}


footer {
  background-color: rgb(233, 227, 227);
  color: rgb(0, 0, 0);
  position: fixed;
  left: 0;
  bottom: 0;
  height: 30px;
  width: 100%;
  text-align: center;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer .footer-text {
  font-size: 20px;
  display: inline-block;
}

footer .footer-find-me {
  font-size: 20px;
  color: rgb(0, 0, 0);
  margin-left: 10px;
  display: inline-block;
  border: 1px dashed rgb(0, 0, 0);
  transition: border-color 0.3s ease;
}

footer .footer-find-me a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}

footer .footer-find-me a:hover {
  text-decoration:none;
  border-color: rgb(0, 0, 0);
}

</style>