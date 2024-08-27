<script>

</script>

<template>
  <div>
    <div class="head">Акт выполненных работ</div>
    <div class="data">"__"____________20__г.</div>
    <div class="number">№____</div>
    <div class="logo"><img alt="Logo" src="../assets/logo.png"></div>
    <div class="shop">Затребовал______________________________________</div>
    <table class="list">
      <tr class="head-list">
        <td>№</td>
        <td>Наименование</td>
        <td>Количество</td>
        <td>Цена</td>
        <td>Сумма</td>
      </tr>
      <tr v-for="n in 7" :key="n">
        <td>{{n}}</td>

        <td><input class="inputName" type="text"></td>
        <td><input type="text" class="col"></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
  .head {
    text-align: left;
    text-transform: uppercase;
  }
  img {
    max-width: 30%;
    align: right;
  }
  .list {
    border-collapse: collapse;
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
    width: 250pt;
    border-style: none;
  }
  .col {
    font-size: 12pt;
    width: 90%;
    border-style: none;
  }
</style>