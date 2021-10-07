<template>
  <div class="login-page">
    <div class="login-card" :class="loginComponent?'login-card-show':''">
      <div class="home-div">
          <svg xmlns="http://www.w3.org/2000/svg" class="home-svg rotate-Y-0 hover:rotate-Y-360" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="$router.push('/')">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
      </div>
      <h1>LOGIN</h1>
      <div class="login-input-div focus-within:bg-main-re-gradient">
        <input type="text" class="text-gray-800 dark:text-white" placeholder="Account" />
      </div>
      <div class="login-input-div focus-within:bg-main-re-gradient">
        <input type="password" class="text-gray-800 dark:text-white" placeholder="Password" />
      </div>
      <div>
        <button class="rounded-4xl text-gray-800 border-2 border-purple-main dark:text-white hover:bg-blue-main hover:border-blue-main">login</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: 700;
  background-image: radial-gradient(circle at top left, #fd00da, #19d7f8);
  padding-top: 20px;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.home-svg{
  @apply h-8 stroke-2 home-icon opacity-40 filter hover:opacity-90 hover:drop-shadow-home-icon;
}
.home-div{
    margin-top:10px
}
.home-icon{
    margin-left: auto;
    margin-right: 30px;
    color:#C237E2;
    transition: all 1s ease;
    cursor: pointer;
}
.login-card {
  position: absolute;
  top: calc(50% - 150px);
  right: calc(50% - 200px);
  width: 400px;
  height: 350px;
  border-radius: 25px;
  text-align: center;
  transition: opacity 0.5s ease-out;
  opacity: 0;
  @apply shadow-2xl bg-gray-tab dark:bg-gray-800;
}
.login-card-show{
    opacity: 1;
}
.login-input-div {
  border: 2px solid transparent;
  margin: 20px auto;
  border-radius: 28px;
  background-origin: border-box;
  background-clip: content-box, border-box;
  transition: all 0.1s ease-out;
  @apply bg-login-gradient dark:bg-login-dark-gradient w-56 focus-within:w-72;
}
.login-card input {
  background: none;
  text-align: center;
  padding: 14px 20px;
  width: 100%;
  outline: none;
}
.login-card button {
  padding: 10px 20px;
  font-weight: 600;
  outline: none;
  transition: all 0.15s ease-out;
}
</style>


<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let loginComponent = ref<boolean>(false);
    setTimeout(()=>{
      loginComponent.value = true;
    })
    
    return { loginComponent };
  },
});
</script>
