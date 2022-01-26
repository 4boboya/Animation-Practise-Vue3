<template>
  <div>
    email template
    <Tag
      class="pl-8"
      :TagSelect="tagSelect"
      :TagValue="tagValue"
      @PanelStatus="controlPanel"
    >
      <template v-slot:stock>
        <select v-if="stock == ''" v-model="stock">
          <option value="SAM20">SAM20</option>
          <option value="SAM60">SAM60</option>
          <option value="SAM120">SAM120</option>
        </select>
        <span v-else> {{ stock }} </span>
      </template>
      <template v-if="stock != ''" v-slot:condition>
        <select v-if="condition == ''" v-model="condition">
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
        </select>
        <span v-else class="ml-1"> {{ condition }} </span>
      </template>
      <template v-if="condition != ''" v-slot:scope>
        <input type="number" class="w-12" v-model="scope" />
      </template>
      <template v-if="condition != ''" v-slot:submit>
        <button class="ml-1" @click="addTag()">確定</button>
      </template>
    </Tag>
    <div class="grid grid-cols-3 gap-4" style="margin-bottom: 20px">
      <div>
        <span v-tooltip.topleft="'123'" class="bg-gray-300">topleft</span>
      </div>
      <div>
        <span v-tooltip.top="'123'" class="bg-gray-300">top</span>
      </div>
      <div>
        <span v-tooltip.topright="'123'" class="bg-gray-300">topright</span>
      </div>
      <div>
        <span v-tooltip.lefttop="'123'" class="bg-gray-300">lefttop</span>
      </div>
      <div></div>
      <div>
        <span v-tooltip.righttop="'123'" class="bg-gray-300">righttop</span>
      </div>
      <div>
        <span v-tooltip.left="'123'" class="bg-gray-300">left</span>
      </div>
      <div></div>
      <div>
        <span v-tooltip.right="'123'" class="bg-gray-300">right</span>
      </div>
      <div>
        <span v-tooltip.leftbottom="'123'" class="bg-gray-300">leftbottom</span>
      </div>
      <div></div>
      <div>
        <span v-tooltip.rightbottom="'123'" class="bg-gray-300"
          >rightbottom</span
        >
      </div>
      <div>
        <span v-tooltip.bottomleft="'123'" class="bg-gray-300">bottomleft</span>
      </div>
      <div>
        <span v-tooltip.bottom="'123'" class="bg-gray-300">bottom</span>
      </div>
      <div>
        <span v-tooltip.bottomright="'123'" class="bg-gray-300"
          >bottomright</span
        >
      </div>
    </div>
    <button v-collapse="'col1'" class="bg-gray-400 text-white w-full">
      Turn on full screen animation
    </button>
    <div id="col1" class="bg-blue-400 collapse-cont">
      <button class="open-btn" @click="(openColl = true), collCount++">
        open
      </button>
      <div
        class="coll"
        :class="openColl ? 'coll-open' : collCount > 0 ? 'coll-close' : ''"
        style="overflow: hidden"
      >
        <span>
          123
          <button @click="openColl = false">X</button>
        </span>
      </div>
    </div>
    <button
      v-collapse="'col2'"
      class="bg-gray-500 text-white w-full"
      style="width: 100%"
    >
      div border infinite spin
    </button>
    <div id="col2" class="bg-blue-500 collapse-cont">
      <div class="relative" style="height: 120px">
        <span class="spin_div_cont"> test.. </span>
        <div class="div_1 spin_div"></div>
        <div class="div_2 spin_div"></div>
        <div class="div_3 spin_div"></div>
      </div>
    </div>
    <button
      v-collapse="'col3'"
      class="bg-gray-600 text-white w-full"
      style="width: 100%"
    >
      before after random color
    </button>
    <div id="col3" class="before-after-bgcolor collapse-cont">
      <div class="card">
        <div class="back"></div>
      </div>
      <button @click="changeColor()">change</button>
    </div>
    <button
      v-collapse="'col4'"
      class="bg-gray-700 text-white w-full"
      style="width: 100%"
    >
      animation input
    </button>
    <div id="col4" class="bg-blue-700 collapse-cont">
      <div class="input-box">
        <input class="input" />
        <div class="handle"></div>
        <div class="cancel"></div>
      </div>
    </div>
    <button
      v-collapse="'col5'"
      class="bg-gray-800 text-white w-full"
      style="width: 100%"
    >
      ring to cube animation
    </button>
    <div id="col5" class="bg-blue-800 collapse-cont">
      <div class="box-side">
        <div class="box">
          <div class="box-cont">
            <div class="plan" :class="cube ? 'cube-one' : 'ring-one'">1</div>
            <div class="plan" :class="cube ? 'cube-two' : 'ring-two'">2</div>
            <div class="plan" :class="cube ? 'cube-three' : 'ring-three'">
              3
            </div>
            <div class="plan" :class="cube ? 'cube-four' : 'ring-four'">4</div>
            <div class="plan" :class="cube ? 'cube-five' : 'ring-five'">5</div>
            <div class="plan" :class="cube ? 'cube-six' : 'ring-six'">6</div>
            <div class="plan" :class="cube ? 'cube-seven' : 'ring-seven'">
              7
            </div>
            <div class="plan" :class="cube ? 'cube-eight' : 'ring-eight'">
              8
            </div>
            <div class="plan" :class="cube ? 'cube-nine' : 'ring-nine'">9</div>
            <div class="plan" :class="cube ? 'cube-ten' : 'ring-ten'">10</div>
            <div class="plan" :class="cube ? 'cube-eleven' : 'ring-eleven'">
              11
            </div>
            <div class="plan" :class="cube ? 'cube-twelve' : 'ring-twelve'">
              12
            </div>
          </div>
        </div>
        <button class="ctrl-cude" @click="cube = !cube">change</button>
      </div>
    </div>
    <button
      v-collapse="'col6'"
      class="bg-gray-900 text-white w-full"
      style="width: 100%"
    >
      canvas drawing test
    </button>
    <div id="col6" class="bg-blue-900 collapse-cont">
      <div class="h-5 w-full">
        <button class="bg-gray-300" @click="rubberStatus = false">Pen</button>
        <button class="bg-gray-300" @click="rubberStatus = true">Rubber</button>
        <input v-model="lineSize" type="number" placeholder="line size" />
        <input v-model="lineColor" type="color" placeholder="color" />
        <button class="bg-gray-300" @click="claerCanvas">Clear</button>
      </div>
      <canvas
        :ref="(el) => { canvasRef = el } "
        @mousemove="draw"
        @mousedown="beginDrawing"
        @mouseup="stopDrawing"
      />
    </div>
    <button
      v-collapse="'col7'"
      class="bg-gray-800 text-white w-full"
      style="width: 100%"
    >
      toggle btn open
    </button>
    <div
      id="col7"
      class="bg-blue-800 collapse-cont"
      :class="toggleStatus ? 'toggle-active' : ''"
      @click="toggleStatus = !toggleStatus"
    >
      <div class="toggle-btn">
        <span />
        <span />
        <span />
      </div>
    </div>
    <button
      v-collapse="'col8'"
      class="bg-gray-700 text-white w-full"
      style="width: 100%"
    >
      grid test
    </button>
    <div id="col8" class="collapse-cont">
      <div class="grid-col8">
        <div class="grid-red bg-red-200"></div>
        <div class="grid-green bg-green-200"></div>
        <div class="grid-yellow bg-yellow-200"></div>
        <div class="grid-blue bg-blue-200"></div>
        <div class="grid-purple bg-purple-200"></div>
      </div>
    </div>
    <button
      v-collapse="'col9'"
      class="bg-gray-600 text-white w-full"
      style="width: 100%"
    >
      flex test
    </button>
    <div id="col9" class="collapse-cont">
      <div class="flex-col9">
        <div class="flex-red bg-red-200"></div>
        <div class="flex-green bg-green-200"></div>
        <div class="flex-yellow bg-yellow-200"></div>
        <div class="flex-blue bg-blue-200"></div>
        <div class="flex-purple bg-purple-200"></div>
        <div class="flex-red bg-red-200"></div>
        <div class="flex-green bg-green-200"></div>
        <div class="flex-yellow bg-yellow-200"></div>
        <div class="flex-blue bg-blue-200"></div>
        <div class="flex-purple bg-purple-200"></div>
      </div>
    </div>
    <button
      v-collapse="'col10'"
      class="bg-gray-500 text-white w-full"
      style="width: 100%"
    >
      grid template areas
    </button>
    <div id="col10" class="collapse-cont">
      <div class="grid-col10">
        <div class="grid-red-10 bg-red-200"></div>
        <div class="grid-green-10 bg-green-200"></div>
        <div class="grid-yellow-10 bg-yellow-200"></div>
        <div class="grid-blue-10 bg-blue-200"></div>
        <div class="grid-purple-10 bg-purple-200"></div>
      </div>
    </div>
    <button
      v-collapse="'col11'"
      class="bg-gray-400 text-white w-full"
      style="width: 100%"
    >
      svg animation
    </button>
    <div id="col11" class="collapse-cont">
      <svg class="stroke ani" height="400" width="100%" >
        <g>
          <circle cx="200" cy="200" r="10"/>
          <circle cx="200" cy="200" r="20"/>
          <circle cx="200" cy="200" r="30"/>
          <circle cx="200" cy="200" r="40"/>
          <circle cx="200" cy="200" r="50"/>
          <circle cx="200" cy="200" r="60"/>
          <circle cx="200" cy="200" r="70"/>
          <circle cx="200" cy="200" r="80"/>
          <circle cx="200" cy="200" r="90"/>
          <circle cx="200" cy="200" r="100"/>
          <circle cx="200" cy="200" r="110"/>
          <circle cx="200" cy="200" r="120"/>
          <circle cx="200" cy="200" r="130"/>
          <circle cx="200" cy="200" r="140"/>
          <circle cx="200" cy="200" r="150"/>
          <circle cx="200" cy="200" r="160"/>
        </g>
      </svg>
      <svg class="stroke ani" style="margin-left: 20px" height="400" width="100%" >
        <g>
          <path d="M0 0 C13 1, 27 18, 0 20 V20 C30 21, 30 40, 0 40 Z"></path>
          <circle cx="35" cy="30" r="10"/>
          <path d="M50 0 C63 1, 77 18, 50 20 V20 C80 21, 80 40, 50 40 Z"></path>
          <circle cx="85" cy="30" r="10"/>
        </g>
      </svg>
    </div>
    <button
      v-collapse="'col12'"
      class="bg-gray-300 text-white w-full"
      style="width: 100%"
    >
      grid auto
    </button>
    <div id="col12" class="collapse-cont">
      <div class="grid-auto">
        <div class="bg-red-200"></div>
        <div class="bg-green-200"></div>
        <div class="bg-yellow-200"></div>
        <div class="bg-blue-200"></div>
        <div class="bg-purple-200"></div>
      </div>
    </div>
    <button
      v-collapse="'col13'"
      class="bg-gray-400 text-white w-full"
      style="width: 100%"
    >
      canvas clock test
    </button>
    <div id="col13" class="collapse-cont" style="background-color: #111111">
      <div class="now-time"> {{nowTime}} </div>
      <canvas :ref="(el) => { canvasRefT = el } " style="transform: scaleY(-1)"/> <!-- canvas 上下顛倒 -->
    </div>
    <div v-draggable class="relative" style="height: 120px; z-index: 9999">
      <span class="spin_div_cont_2"> 我可以移動 </span>
      <div class="div_1 spin_div" style="border-color: #313a54"></div>
      <div class="div_2 spin_div" style="border-color: #313a54"></div>
      <div class="div_3 spin_div" style="border-color: #313a54"></div>
    </div>
  </div>
</template>

<style>
:root {
  --before-color: #2563eb;
  --card-color: #154ecb;
  --err-color: #ee1f1f;
}
</style>
<style scoped>
#col13 {
  position: relative;
}
.now-time {
  position: absolute;
  background-color: #111111;
  color: #DEDEDE;
  font-weight: bold;
  font-size: 24px;
  z-index: 1;
  left: 50%;
  top: 140px;
  transform: translateX(-50%);
}
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 5fr));
  min-height: 200px;
}
.stroke {
  stroke-dashoffset: 2000;
  stroke-dasharray: 2000;
  fill: none;
  stroke: black;
  stroke-width: 1px;
}

.ani {
  animation: circle-draw 20s linear infinite
}

@keyframes circle-draw {
  80% {
    stroke-dashoffset: 0;
  }
}
.flex-col9 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
}
.flex-red {
  width: 150px;
  height: 120px;
  order: 2;
}
.flex-green {
  width: 70px;
  height: 75px;
  order: 0;
}
.flex-yellow {
  width: 240px;
  height: 220px;
  order: 0;
}
.flex-blue {
  width: 50px;
  height: 130px;
  order: 2;
}
.flex-purple {
  width: 190px;
  height: 180px;
  order: 1;
}
.grid-col10 {
  display: grid;
  grid-template-columns: 30% 15% 35% 7fr 3fr;
  grid-template-rows: 100px 150px 200px 250px 300px;
  grid-template-areas:
    ". . _red _red ."
    "_green . _yellow _yellow ."
    "_green . _yellow _yellow _blue"
    "_green . . . _blue"
    "_purple _purple . . _blue";
  background-color: transparent;
}
.grid-red-10 {
  grid-area: _red;
}
.grid-green-10 {
  grid-area: _green;
}
.grid-yellow-10 {
  grid-area: _yellow;
}
.grid-blue-10 {
  grid-area: _blue;
}
.grid-purple-10 {
  grid-area: _purple;
}
.grid-col8 {
  display: grid;
  grid-template-columns: [col_1] 30% [col_2] 15% [col_3] 35% [col_4] 7fr [col_5] 3fr [col_6];
  grid-template-rows: [row_1] 100px [row_2] 150px [row_3] 200px [row_4] 250px [row_5];
  background-color: transparent;
}
.grid-red {
  grid-column: col_2/ col_4;
  grid-row: row_1 / row_2;
}
.grid-green {
  grid-column: col_1/ col_4;
  grid-row: row_2 / row_4;
}
.grid-yellow {
  grid-column: col_5/ col_6;
  grid-row: row_1 / row_4;
}
.grid-blue {
  grid-column: col_3/ col_5;
  grid-row: row_3 / row_5;
}
.grid-purple {
  grid-column: col_1/ col_2;
  grid-row: row_3 / row_5;
}
.toggle-btn {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 10%;
  background-color: #dedede;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}
.toggle-btn span {
  position: absolute;
  border-radius: 10px;
  background-color: #6d32db;
}
.toggle-btn span:nth-child(1) {
  transform: translateY(-35px);
  width: 70px;
  height: 20px;
  left: 25px;
  transition: all 0.25s ease-in-out;
  transition-delay: 0.2s;
}
.toggle-btn span:nth-child(2) {
  width: 100px;
  height: 20px;
  transition: all 0.25s ease-in-out;
}
.toggle-btn span:nth-child(3) {
  transform: translateY(35px);
  width: 50px;
  height: 20px;
  left: 25px;
  transition: all 0.25s ease-in-out;
  transition-delay: 0.2s;
}
.toggle-active span:nth-child(1) {
  transform: translateY(0px) rotateZ(45deg);
  width: 108px;
  left: 22px;
  background-color: var(--err-color);
}
.toggle-active span:nth-child(2) {
  transform: translateX(150px);
}
.toggle-active span:nth-child(3) {
  transform: translateY(0px) rotateZ(-45deg);
  width: 108px;
  left: 22px;
  background-color: var(--err-color);
}
.before-after-bgcolor {
  background-color: var(--before-color);
}
.box-side {
  perspective-origin: 50% 145px;
  perspective: 2000px;
  width: 100%;
  height: 370px;
  position: relative;
}
.box {
  transform-style: preserve-3d;
}
.ctrl-cude {
  margin-top: 100px;
  padding: 5px 10px;
  background-color: #5e6987;
  color: #d2d6df;
  position: absolute;
  bottom: 0px;
}
.box-cont {
  width: 200px;
  position: relative;
  height: 200px;
  margin: 70px auto;
  transform-style: preserve-3d;
  animation: ring-spin 20s linear infinite;
}
.plan {
  position: absolute;
  height: 200px;
  width: 200px;
  border: 1px solid white;
  border-radius: 12px;
  box-sizing: border-box;
  text-align: center;
  font-family: Times, serif;
  font-size: 124pt;
  color: black;
  background-color: rgba(255, 255, 255, 0.6);
  transition: transform 2s, opacity 2s;
  backface-visibility: visible;
}
@keyframes ring-spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.ring-one {
  transform: translateZ(380px);
}
.ring-two {
  transform: rotateY(30deg) translateZ(380px);
}
.ring-three {
  transform: rotateY(60deg) translateZ(380px);
}
.ring-four {
  transform: rotateY(90deg) translateZ(380px);
}
.ring-five {
  transform: rotateY(120deg) translateZ(380px);
}
.ring-six {
  transform: rotateY(150deg) translateZ(380px);
}
.ring-seven {
  transform: rotateY(180deg) translateZ(380px);
}
.ring-eight {
  transform: rotateY(210deg) translateZ(380px);
}
.ring-nine {
  transform: rotateY(240deg) translateZ(380px);
}
.ring-ten {
  transform: rotateY(270deg) translateZ(380px);
}
.ring-eleven {
  transform: rotateY(300deg) translateZ(380px);
}
.ring-twelve {
  transform: rotateY(330deg) translateZ(380px);
}
.cube-one {
  opacity: 0.5;
  transform: scale3d(1.2, 1.2, 1.2) rotateX(90deg) translateZ(100px);
}
.cube-two {
  opacity: 0.5;
  transform: scale3d(1.2, 1.2, 1.2) translateZ(100px);
}
.cube-three {
  opacity: 0.5;
  transform: scale3d(1.2, 1.2, 1.2) rotateY(90deg) translateZ(100px);
}
.cube-four {
  opacity: 0.5;
  transform: scale3d(1.2, 1.2, 1.2) rotateY(180deg) translateZ(100px);
}
.cube-five {
  opacity: 0.5;
  transform: scale3d(1.2, 1.2, 1.2) rotateY(-90deg) translateZ(100px);
}
.cube-six {
  opacity: 0.5;
  transform: scale3d(1.2, 1.2, 1.2) rotateX(-90deg) translateZ(100px);
}
.cube-seven {
  opacity: 0.5;
  transform: scale3d(0.8, 0.8, 0.8) rotateX(90deg) translateZ(100px);
}
.cube-eight {
  opacity: 0.5;
  transform: scale3d(0.8, 0.8, 0.8) translateZ(100px);
}
.cube-nine {
  opacity: 0.5;
  transform: scale3d(0.8, 0.8, 0.8) rotateY(90deg) translateZ(100px);
}
.cube-ten {
  opacity: 0.5;
  transform: scale3d(0.8, 0.8, 0.8) rotateY(180deg) translateZ(100px);
}
.cube-eleven {
  opacity: 0.5;
  transform: scale3d(0.8, 0.8, 0.8) rotateY(-90deg) translateZ(100px);
}
.cube-twelve {
  opacity: 0.5;
  transform: scale3d(0.8, 0.8, 0.8) rotateX(-90deg) translateZ(100px);
}
.collapse-cont {
  height: 0px;
  overflow: hidden;
  transition: height 0.3s ease-out;
}
.spin_div {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 10px;
  left: calc(50% - 50px);
  border: 1px solid #dedede;
  background: transparent;
}
.spin_div_cont {
  position: absolute;
  top: 45px;
  left: calc(50% - 25px);
  color: #dedede;
  font-weight: 700;
  font-size: 20px;
}
.spin_div_cont_2 {
  position: absolute;
  font-weight: 700;
  color: #313a54;
  top: 50px;
  left: calc(50% - 39px);
  white-space: nowrap;
  font-size: unset;
  user-select: none;
}
.div_1 {
  animation: spin 3s linear infinite;
  border-radius: 69% 31% 27% 73% / 46% 36% 64% 54%;
}
.div_2 {
  animation: re_spin 3s linear infinite;
  border-radius: 40% 60% 74% 26% / 29% 77% 23% 71%;
}
.div_3 {
  animation: spin 1.5s linear infinite;
  border-radius: 64% 36% 40% 60% / 29% 49% 51% 71%;
}
@keyframes spin {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
@keyframes re_spin {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}
.card {
  position: relative;
  margin-block: 10px;
  margin-inline: auto;
  height: 150px;
  width: 120px;
  background-color: var(--card-color);
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  box-shadow: 0px 7px 0px 0px #dedede;
  overflow: hidden;
}
.card::before {
  position: absolute;
  content: "";
  width: 155%;
  height: 140%;
  top: -115px;
  left: -75%;
  background: linear-gradient(transparent, #dedede70);
  transform: rotateZ(-40deg);
  filter: blur(25px);
}
.back {
  width: 40px;
  height: 40px;
  position: relative;
  background-color: var(--before-color);
  border-bottom-left-radius: 80%;
  border-bottom-right-radius: 80%;
  left: 36%;
}
.back::after {
  position: absolute;
  content: "";
  left: -15px;
  width: 15px;
  height: 15px;
  border-radius: 0% 100% 100% 0% / 0% 100% 0% 100%;
  box-shadow: 15px -15px 0px 15px var(--before-color);
  background-color: transparent;
}
.back::before {
  position: absolute;
  content: "";
  left: 40px;
  width: 15px;
  height: 15px;
  border-radius: 100% 0% 0% 100% / 100% 0% 100% 0%;
  box-shadow: -15px -15px 0px 15px var(--before-color);
  background-color: transparent;
}
.input-box {
  position: relative;
  width: 100%;
  height: 70px;
}
.input {
  width: 40px;
  height: 40px;
  border: 5px solid #fff;
  border-radius: 50%;
  position: absolute;
  left: calc(50% - 25px);
  background-color: transparent;
  overflow: hidden;
}
.handle {
  width: 25px;
  height: 5px;
  border-radius: 25%;
  transform: rotateZ(45deg);
  position: absolute;
  left: 50%;
  top: 39px;
  background-color: #fff;
}
.input:focus ~ .handle {
  animation: moving 0.7s forwards cubic-bezier(0, 1.18, 0.89, 1.01);
}
@keyframes moving {
  0% {
    width: 25px;
  }
  60% {
    width: 28px;
  }
  100% {
    width: 0px;
    visibility: hidden;
  }
}
.input:focus {
  animation: open 1s forwards cubic-bezier(0, 1.18, 0.89, 1.01);
  animation-delay: 0.65s;
}
@keyframes open {
  0% {
    width: 35px;
    border-radius: 25px;
  }
  20% {
    border-radius: 25px;
  }
  80% {
    width: 280px;
    border-radius: 25px;
  }
  100% {
    width: 250px;
    border-radius: 25px;
  }
}
.open-btn {
  background-color: #f5f5f5;
  border-radius: 25px;
}
.coll {
  position: fixed;
  left: 0px;
  top: 50%;
  background-color: #f5f5f5;
  width: 0px;
  height: 0px;
  z-index: 999;
}
.coll-open {
  animation: open-coll 1.5s forwards cubic-bezier(0, 1.18, 0.89, 1.01);
}
@keyframes open-coll {
  0% {
    height: 5px;
  }
  50% {
    width: 100vw;
    height: 5px;
    top: 50%;
  }
  100% {
    width: 100vw;
    top: 0px;
    height: 100vh;
  }
}
.coll-close {
  animation: close-coll 1.5s forwards cubic-bezier(0, 1.18, 0.89, 1.01);
}
@keyframes close-coll {
  0% {
    width: 100vw;
    top: 0px;
    height: 100vh;
  }
  50% {
    width: 100vw;
    height: 5px;
    top: 50%;
  }
  100% {
    width: 0px;
    height: 0px;
    top: 50%;
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { TagSelect } from "@/model/tag";
export default defineComponent({
  setup() {
    const stock = ref<string>("");
    const condition = ref<string>("");
    const scope = ref<number>(0);
    const tagValue = ref<string>("");
    const openColl = ref<boolean>(false);
    const collCount = ref<number>(0);
    const cube = ref<boolean>(false);
    const colorArray = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", ];
    const canvasRef = ref<HTMLCanvasElement>();
    const canvasRefT = ref<HTMLCanvasElement>();
    const ctx = ref<CanvasRenderingContext2D>();
    const ctxT = ref<CanvasRenderingContext2D>();
    const drawing = ref<boolean>(false);
    const mouseX = ref<number>(0);
    const mouseY = ref<number>(0);
    const lineSize = ref<number>(6);
    const lineColor = ref<string>("#000000");
    const rubberStatus = ref<boolean>(false);
    const toggleStatus = ref<boolean>(false);
    const time = ref<number>(0);
    const nowTime = ref<string>("");
    const width = ref<number>(0);
    const interval = ref<number>();

    const tagSelect = reactive([
      { key: "stock" },
      { key: "condition" },
      { key: "scope" },
      { key: "submit" },
    ] as TagSelect[]);

    const addTag = () => {
      tagValue.value = `${stock.value} ${condition.value} ${scope.value}`;
      reset();
    };

    const reset = () => {
      stock.value = "";
      condition.value = "";
      scope.value = 0;
    };

    const controlPanel = (status: boolean) => {
      if (!status) {
        reset();
      }
    };

    const changeColor = () => {
      let color = "#";
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 6; i++) {
          const index = Math.floor(Math.random() * colorArray.length);
          color += colorArray[index];
        }
        if (j == 0)
          document.documentElement.style.setProperty("--before-color", color);
        else document.documentElement.style.setProperty("--card-color", color);
        color = "#";
      }
    };

    const setCanvas = () => {
      const canvas = canvasRef.value as HTMLCanvasElement;
      canvas.width = canvas.parentElement?.offsetWidth as number;
      canvas.height = 500;
      ctx.value = canvas.getContext("2d") as CanvasRenderingContext2D;
    };
    const draw = (e: MouseEvent) => {
      if (drawing.value) {
        ctx.value?.beginPath();
        ctx.value!.strokeStyle = rubberStatus.value ? "#1E3A8A" : lineColor.value;
        ctx.value!.lineWidth = lineSize.value;
        ctx.value?.moveTo(mouseX.value, mouseY.value);
        ctx.value?.lineTo(e.offsetX, e.offsetY);
        ctx.value?.stroke();
        ctx.value?.closePath();
        mouseX.value = e.offsetX;
        mouseY.value = e.offsetY;
      }
    };
    const beginDrawing = (e: MouseEvent) => {
      mouseX.value = e.offsetX;
      mouseY.value = e.offsetY;
      drawing.value = true;
    };
    const stopDrawing = () => {
      drawing.value = false;
    };

    const claerCanvas = () => {
      canvasRef.value!.height = canvasRef.value!.height;
    };
    const setCanvasT = () => {
      const canvas = canvasRefT.value as HTMLCanvasElement;
      canvas.width = canvas.parentElement?.offsetWidth as number;
      canvas.height = 1000;
      ctxT.value = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctxT.value?.restore();
      ctxT.value?.translate(canvas.width/2, 500) //移動畫布

      interval.value = setInterval(() => {
        drawT(canvas.width);
      }, 10)
    };
    const drawT = (ww: number) => {
      // 清除背景，方形覆蓋
      ctxT.value!.fillStyle = "#111";
      ctxT.value!.beginPath(); //調整清除畫布的初始位置
      ctxT.value?.rect(-2000,-2000,4000,4000);
      ctxT.value?.fill();

      ctxT.value!.strokeStyle = "rgba(255, 255, 255, 0.05)"; //邊框顏色
      ctxT.value!.lineWidth = 1; //線條寬度
      //坐標軸
      ctxT.value?.moveTo(-ww/2, 0)
      ctxT.value?.lineTo(ww/2, 0)
      ctxT.value?.moveTo(0, -500)
      ctxT.value?.lineTo(0, 500)
      ctxT.value?.stroke() //繪製邊框
      //弧線
      var r = 200; //半徑
      var n = 200; //點數量，足夠多就變圓
      const degToPI = Math.PI*2/360; //弧度

      ctxT.value!.beginPath(); //調整清除畫布的初始位置
      // 繪製波浪圈
      for (var i = 0; i <= n; i++) {
        const new_r = r + 2 * Math.sin(2 * Math.PI * i / 10 + time.value / 20)
        const deg = i * (360/n) * degToPI; //第i個角 * 間距(角度) * 每角度弧度
        ctxT.value?.lineTo(new_r*Math.cos(deg), new_r*Math.sin(deg)) //x = 半徑*cosθ, y = 半徑*sinθ 極座標 <-> 一般座標 θ = atan2(y, x), 半徑 = (X^2+Y^2)^(1/2)
      }
      ctxT.value!.strokeStyle = "#FFF"; //邊框顏色
      ctxT.value?.stroke() //繪製邊框

      //繪製內圈
      r = 230;
      n = 300;
      for (i = 0; i <= n; i++) {
        const deg = i * (360/n) * degToPI; //第i個角 * 間距(角度) * 每角度弧度
        const inset = i%75 == 0 ? -4 : 0; //內偏移 %75為0 3 6 9點 %25為 1 2 4 5 7 8 10 11點 %5為 每分鐘
        const len = 4 + (i%5 == 0 ? 3 : 0) + (i%75 == 0 ? 4 : 0) +(i%25 == 0 ? 8: 0);
        const opacity = len > 4 ? 1 : 0.7; // 透明度
        const start = r+inset;
        const end = r+inset+len
        ctxT.value!.beginPath(); //調整清除畫布的初始位置
        ctxT.value?.moveTo(start*Math.cos(deg), start*Math.sin(deg))
        ctxT.value?.lineTo(end*Math.cos(deg), end*Math.sin(deg))
        ctxT.value!.strokeStyle = `rgba(255, 255, 255, ${opacity})`; //邊框顏色
        ctxT.value?.stroke() //繪製邊框
      }


      // 繪製外圈
      r = 400;
      n = 60;
      for (i = 0; i <= n; i++) {
        const deg = i * (360/n) * degToPI; //第i個角 * 間距(角度) * 每角度弧度
        const inset = i%15 == 0 ? -4 : 0; //內偏移 %15為0 3 6 9點 %5為 1 2 4 5 7 8 10 11點
        const len = 6 + (i%5 == 0 ? 4:  0) +(i%15 == 0 ? 8:  0);
        const opacity = len > 4 ? 1 : 0.7; // 透明度
        const start = r+inset;
        const end = r+inset+len
        ctxT.value!.beginPath(); //調整清除畫布的初始位置
        ctxT.value?.moveTo(start*Math.cos(deg), start*Math.sin(deg))
        ctxT.value?.lineTo(end*Math.cos(deg), end*Math.sin(deg))
        ctxT.value!.strokeStyle = `rgba(255, 255, 255, ${opacity})`; //邊框顏色
        ctxT.value?.stroke() //繪製邊框
      }

      const now = new Date();
      const sec = now.getSeconds();
      const min = now.getMinutes();
      const hour = now.getHours();
      nowTime.value = `${hour <= 9 ? `0${hour}` : hour}:${min <= 9 ? `0${min}` : min}:${sec <= 9 ? `0${sec}` : sec}`
      drawPointer(400, -360 * ( (sec + now.getMilliseconds()/1000) / 60 ) , 1 );
      drawPointer(270, -360 * ( (min) / 60 ) , 2 );
      drawPointer(150, -360 * ( (hour + min / 60 ) / 12.0 ) , 4 );

      //繪製外框
      r = 300;
      n = 240;
      ctxT.value!.beginPath();
      ctxT.value!.lineWidth=4;
      for(i = 0 ; i <= n ; i++){
        //將240個點平均分布在圓周上，加上一點點時間
        const deg= 360 * (i / n) + time.value / 200;
        //如果每180度以內餘數 > 90度
        if ((deg % 180 ) < 90){
          //如果成立就預設要畫
          ctxT.value!.lineTo(
            r * Math.cos(deg * degToPI),
            r * Math.sin(deg * degToPI)
          );
        }else{
          //不成立就只移動點，不繪製
          ctxT.value!.moveTo(
            r * Math.cos(deg * degToPI),
            r * Math.sin(deg * degToPI)
          );
        }
      }
      
      //設定樣式跟繪製
      ctxT.value!.strokeStyle="#FFF";
      //將剛剛預設要畫的都畫出來
      ctxT.value!.stroke();

      time.value += 1
    }

    const drawPointer = (r: number, deg: number, lineWidth: number) => {
      const degToPI = Math.PI*2/360;
      ctxT.value?.beginPath();
      ctxT.value!.lineWidth = lineWidth;

      const secDeg = deg + 90 // 時鐘往右轉
      ctxT.value?.moveTo(0, 0)
      ctxT.value?.lineTo(
        r*0.8*Math.cos( secDeg * degToPI ),
        r*0.8*Math.sin( secDeg * degToPI )
      );

      ctxT.value?.stroke() //繪製邊框
    }

    const windowWidth = () => {
      width.value = window.innerWidth
    }

    window.addEventListener("resize", windowWidth);

    onMounted(() => {
      setCanvas();
      setCanvasT();
    });

    watch(
      width,
      (() => {
        clearInterval(interval.value);
        setCanvasT()
      })
    )

    return {
      tagSelect,
      stock,
      condition,
      scope,
      tagValue,
      openColl,
      collCount,
      cube,
      canvasRef,
      canvasRefT,
      lineSize,
      lineColor,
      rubberStatus,
      toggleStatus,
      nowTime,
      draw,
      beginDrawing,
      stopDrawing,
      addTag,
      controlPanel,
      changeColor,
      claerCanvas,
    };
  },
});
</script>