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
    <button v-collapse="'col1'" class="bg-gray-400 text-white w-full">Turn on full screen animation</button>
    <div id="col1" class="bg-blue-400 collapse-cont">
        <button class="open-btn" @click="openColl = true,collCount++">open</button>
        <div class="coll" :class="openColl ? 'coll-open' : collCount>0? 'coll-close':''" style="overflow: hidden">
          <span>
            123
            <button @click="openColl = false">X</button>
          </span>
        </div>
    </div>
    <button v-collapse="'col2'" class="bg-gray-500 text-white w-full" style="width:100%;">div border infinite spin</button>
    <div id="col2" class="bg-blue-500 collapse-cont">
        <div class="relative" style="height: 120px">
          <span class="spin_div_cont"> test.. </span>
          <div class="div_1 spin_div"></div>
          <div class="div_2 spin_div"></div>
          <div class="div_3 spin_div"></div>
        </div>
    </div>
    <button v-collapse="'col3'" class="bg-gray-600 text-white w-full" style="width:100%;">before after</button>
    <div id="col3" class="bg-blue-600 collapse-cont">
        <div class="card">
          <div class="back"></div>
        </div>
    </div>
    <button v-collapse="'col4'" class="bg-gray-700 text-white w-full" style="width:100%;">animation input</button>
    <div id="col4" class="bg-blue-700 collapse-cont">
        <div class="input-box">
          <input class="input" />
          <div class="handle"></div>
          <div class="cancel"></div>
        </div>
    </div>
    <button v-collapse="'col5'" class="bg-gray-800 text-white w-full" style="width:100%;">ring to cube animation</button>
    <div id="col5" class="bg-blue-800 collapse-cont">
      <div class="box-side">
        <div class="box">
          <div class="box-cont">
            <div class="plan" :class="cube ? 'cube-one':'ring-one'">1</div>
            <div class="plan" :class="cube ? 'cube-two':'ring-two'">2</div>
            <div class="plan" :class="cube ? 'cube-three':'ring-three'">3</div>
            <div class="plan" :class="cube ? 'cube-four':'ring-four'">4</div>
            <div class="plan" :class="cube ? 'cube-five':'ring-five'">5</div>
            <div class="plan" :class="cube ? 'cube-six':'ring-six'">6</div>
            <div class="plan" :class="cube ? 'cube-seven':'ring-seven'">7</div>
            <div class="plan" :class="cube ? 'cube-eight':'ring-eight'">8</div>
            <div class="plan" :class="cube ? 'cube-nine':'ring-nine'">9</div>
            <div class="plan" :class="cube ? 'cube-ten':'ring-ten'">10</div>
            <div class="plan" :class="cube ? 'cube-eleven':'ring-eleven'">11</div>
            <div class="plan" :class="cube ? 'cube-twelve':'ring-twelve'">12</div>
          </div>
        </div>
        <button class="ctrl-cude" @click="cube = !cube">change</button>
      </div>
    </div>
    <div v-draggable class="relative" style="height: 120px; z-index:9999">
      <span class="spin_div_cont_2"> 我可以移動 </span>
      <div class="div_1 spin_div" style="border-color: #313a54"></div>
      <div class="div_2 spin_div" style="border-color: #313a54"></div>
      <div class="div_3 spin_div" style="border-color: #313a54"></div>
    </div>
  </div>
</template>

<style scoped>
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
  margin-top:100px; 
  padding:5px 10px; 
  background-color: #5e6987; 
  color: #d2d6df;
  position: absolute;
  bottom: 0px
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
.ring-one{
  transform: translateZ(380px);
}
.ring-two{
  transform: rotateY(30deg) translateZ(380px);
}
.ring-three{
  transform: rotateY(60deg) translateZ(380px);
}
.ring-four{
  transform: rotateY(90deg) translateZ(380px);
}
.ring-five{
  transform: rotateY(120deg) translateZ(380px);
}
.ring-six{
  transform: rotateY(150deg) translateZ(380px);
}
.ring-seven{
  transform: rotateY(180deg) translateZ(380px);
}
.ring-eight{
  transform: rotateY(210deg) translateZ(380px);
}
.ring-nine{
  transform: rotateY(240deg) translateZ(380px);
}
.ring-ten{
  transform: rotateY(270deg) translateZ(380px);
}
.ring-eleven{
  transform: rotateY(300deg) translateZ(380px);
}
.ring-twelve{
  transform: rotateY(330deg) translateZ(380px);
}
.cube-one{
  opacity: .5;
  transform: scale3d(1.2, 1.2, 1.2) rotateX(90deg) translateZ(100px);
}
.cube-two{
  opacity: .5;
  transform: scale3d(1.2, 1.2, 1.2) translateZ(100px);
}
.cube-three{
  opacity: .5;
  transform: scale3d(1.2, 1.2, 1.2) rotateY(90deg) translateZ(100px);
}
.cube-four{
  opacity: .5;
  transform: scale3d(1.2, 1.2, 1.2) rotateY(180deg) translateZ(100px);
}
.cube-five{
  opacity: .5;
  transform: scale3d(1.2, 1.2, 1.2) rotateY(-90deg) translateZ(100px);
}
.cube-six{
  opacity: .5;
  transform: scale3d(1.2, 1.2, 1.2) rotateX(-90deg) translateZ(100px);
}
.cube-seven{
  opacity: .5;
  transform: scale3d(0.8, 0.8, 0.8) rotateX(90deg) translateZ(100px);
}
.cube-eight{
  opacity: .5;
  transform: scale3d(0.8, 0.8, 0.8) translateZ(100px);
}
.cube-nine{
  opacity: .5;
  transform: scale3d(0.8, 0.8, 0.8) rotateY(90deg) translateZ(100px);
}
.cube-ten{
  opacity: .5;
  transform: scale3d(0.8, 0.8, 0.8) rotateY(180deg) translateZ(100px);
}
.cube-eleven{
  opacity: .5;
  transform: scale3d(0.8, 0.8, 0.8) rotateY(-90deg) translateZ(100px);
}
.cube-twelve{
  opacity: .5;
  transform: scale3d(0.8, 0.8, 0.8) rotateX(-90deg) translateZ(100px);
}
.collapse-cont{
  height: 0px; 
  overflow: hidden; 
  transition: height 0.3s ease-out
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
.spin_div_cont_2{
  position: absolute;
  font-weight: 700;
  color: #313a54; 
  top: 50px; 
  left: calc(50% - 39px); 
  white-space:nowrap; 
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
  background-color: #154ecb;
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
  background-color: #2563eb;
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
  box-shadow: 15px -15px 0px 15px #2563eb;
  background-color: transparent;
}
.back::before {
  position: absolute;
  content: "";
  left: 40px;
  width: 15px;
  height: 15px;
  border-radius: 100% 0% 0% 100% / 100% 0% 100% 0%;
  box-shadow: -15px -15px 0px 15px #2563eb;
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
import { defineComponent, reactive, ref } from "vue";
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

    return {
      tagSelect,
      stock,
      condition,
      scope,
      tagValue,
      openColl,
      collCount,
      cube,
      addTag,
      controlPanel,
    };
  },
});
</script>