<script setup>

</script>

<template>

  <div class="sidebar_menu">
    <i class="fa fa-bars" aria-hidden="true"></i>
    <div class="logo" @click="$router.push({ name: 'Home' })">
      <img alt="Logo" class="logoImg" src="@/assets/logo.png">
    </div>
    <div class="menu">
      <div class="menu-item" @click="$router.push({ name: 'AccountingPaper' })">Акт выполненных работ</div>
      <div class="menu-item" @click="$router.push({ name: 'SignageCalc' })">Расчет стоимости вывесок</div>
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
.sidebar_menu {
  position: fixed;
  height: 100vh;
  width: 260px;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(110, 113, 128, 0.2), 0 6px 20px 0 rgba(184, 202, 248, 0.9);

}

.sidebar_menu .menu {
  position: absolute;
  top: 100px;
  width: 100%;
}

.sidebar_menu .menu .menu-item {
  margin-top: 6px;
  padding: 14px 20px;
  cursor: pointer;
  color: #5874C6;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s linear;
}

.sidebar_menu .menu .menu-item:hover {

  border-left: 1px solid #5874C6;
  box-shadow: 0 0 4px rgba(88, 116, 198, 0.5);
}

.sidebar_menu .logo {
  padding: 10px;
  cursor: pointer;
}

.sidebar_menu .logo .logoImg {
  width: 100%;
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

.wrapper {
  position: relative;
  height: max-content;
  overflow: scroll;
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
</style>
