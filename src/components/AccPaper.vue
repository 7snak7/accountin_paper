<script>

</script>

<template>
  <div class="paper">
    <div class="head">
      <h3>Акт выполненных работ</h3>
      <div class="data">"__"____________20__г.</div>
      <div class="number">№____</div>
    </div>
    <div class="logo"><img alt="Logo" src="../assets/logo.png"></div>

    <div class="shop">
      Затребовал
      <input class="inputName" type="text">
    </div>
    <table class="list">
      <tr class="head-list">
        <td>№</td>
        <td>Наименование</td>
        <td>Кол-во</td>
        <td>Цена</td>
        <td>Сумма</td>
      </tr>
      <tr v-for="n in 7" :key="n">
        <td>{{ n }}</td>
        <td><input class="inputName" type="text"></td>
        <td><input type="text" class="col"></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
  .paper {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    border: 1px solid black;
    padding: 10pt;
  }
  .head {
    text-align: left;
    float: left;
    text-transform: uppercase;
    width: 60%;
    padding: 0px 30px;
  }
  .data {
    text-align: left;
    float: left;
    width: 70%;
  }
  .number {
    text-align: right;
    float: right;
    width: 30%;
  }
  .logo {
    text-align: right;
    float: right;
    width: 40%;
    padding: 30px 20px;
  }
  img {
    max-width: 100%;
  }
  .shop {
    text-align: left;
    float: left;
    width: 100%;
    margin: 10px 0px;
    position: relative;
  }
  .shop::before {
    content: '';
    position: absolute;
    background-color: black;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
  }
  .list {
    border-collapse: collapse;
    width: 100%;
  }
  .list td {
    border-style: solid;
    border-width: 2px;
    border-color: black;
    padding: 2pt
  }
  .head-list td {
    padding: 6pt;
    font-weight: bold;
    font-size: 12pt;
  }
  .inputName {
    font-size: 12pt;
    width: 300px;
    border-style: none;
    //background-color: lightgray;
  }
  .col {
    font-size: 12pt;
    width: 90%;
    border-style: none;
    //background-color: lightgray;
  }
</style>