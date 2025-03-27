<script setup>
import {faBars, faXmark, faCalculator,  faFileLines} from "@fortawesome/free-solid-svg-icons";
</script>

<template>
  <input type="checkbox" id="sidebar_check">

  <div class="btn_open">
    <label for="sidebar_check">
      <fa_icon :icon="faBars"></fa_icon>
    </label>
  </div>

  <div class="sidebar_menu">
    <div class="btn_close">
      <label for="sidebar_check">
        <fa_icon :icon="faXmark"></fa_icon>
      </label>
    </div>

    <div class="logo" @click="$router.push({ name: 'Home' })">
      <img alt="Logo" class="logoImg" src="@/assets/logo.png">
    </div>

    <div class="menu">
      <div class="menu-item" @click="$router.push({ name: 'AccountingPaper' })">
        <span class="icon">
          <fa_icon :icon="faFileLines"></fa_icon>
        </span>
        Акт выполненных работ
      </div>
      <div class="menu-item" @click="$router.push({ name: 'SignageCalc' })">
        <span class="icon">
          <fa_icon :icon="faCalculator"></fa_icon>
        </span>
        Калькулятор вывесок
      </div>
    </div>
  </div>

  <div class="home">
    <div class="bg"></div>
    <div class="wrapper">
      <router-view/>
    </div>
  </div>

</template>

<style scoped>
#sidebar_check {
  display: none;
}

.btn_open, .btn_close{
  color: #5874C6;
  position: absolute;
  font-weight: 700;
  line-height: 60px;
  cursor: pointer;
  z-index: 999;
}

.btn_open label, .btn_close label{
  cursor: pointer;
}

.btn_open {
  font-size: 26px;
  left: 16px;
  opacity: 1;
  transition: all 0.3s linear;
}

.btn_close {
  font-size: 31px;
  left: 240px;
  opacity: 0;
  transition: all 0.3s linear;
}

.sidebar_menu {
  position: fixed;
  height: 100vh;
  width: 280px;
  left: -280px;
  z-index: 990;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(110, 113, 128, 0.2), 0 6px 20px 0 rgba(184, 202, 248, 0.9);
  transition: all 0.2s linear;
}

.sidebar_menu .menu {
  top: 100px;
  width: 100%;
}

.sidebar_menu .menu .menu-item {
  margin-top: 6px;
  padding: 14px 20px;
  cursor: pointer;
  color: #5874C6;
  font-size: 16px;
  position: relative;
  text-align: left;
  font-weight: bold;
  transition: all 0.3s linear;
}

.sidebar_menu .menu .menu-item .icon {
  font-size: 30px;
  padding-right: 10px;
  position: relative;
  top: 6px;
}

.sidebar_menu .menu .menu-item:hover {
  border-left: 1px solid #5874C6;
  box-shadow: 0 0 4px rgba(88, 116, 198, 0.5);
}

.sidebar_menu .logo {
  margin-top: 50px;
  padding: 10px;
  cursor: pointer;
}

.sidebar_menu .logo .logoImg {
  width: 100%;
}

#sidebar_check:checked ~ .sidebar_menu {left: 0;}
#sidebar_check:checked ~ .btn_open {opacity: 0;}
#sidebar_check:checked ~ .sidebar_menu .btn_close {opacity: 1;}

@media print {
  .sidebar_menu {
    display: none !important;
  }
  .btn_open {
    display: none !important;
  }
}

#element::-webkit-scrollbar {
  display: none;
}

.wrapper {
  position: relative;
  height: max-content;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -999;
}

.home {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

@media (max-width: 425px) {
  .wrapper {
    width: 335px;
  }
  .bg {
    background-color: #fff;
  }
}

@media (min-width: 760px) {
  .wrapper {
    width: 700px;
    max-height: 95%;
    box-shadow: 0 4px 8px 0 rgba(110, 113, 128, 0.2), 0 6px 20px 0 rgba(184, 202, 248, 0.9);
  }
  .bg {
    background-color: #fff;
  }
}
</style>
