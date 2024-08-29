<script>
  export default {
    name: "AccPaper",
    data() {
      return {
        shop: '',
        inputs: ['','','','','','',''],
        col: ['','','','','','',''],
      }
    }
  }
</script>

<template>
  <div class="paper" v-for="i of 2" :key="i">
    <div class="head">
      <h3>Акт выполненных работ</h3>
      <div class="data">"__"____________20__г.</div>
      <div class="number">№____</div>
    </div>
    <div class="logo"><img alt="Logo" src="../assets/logo.png"></div>

    <div class="inputUnderline">
      Затребовал
      <input class="inputName" type="text" v-model="shop">
    </div>
    <table class="list">
      <tr class="head-list">
        <td>№</td>
        <td>Наименование</td>
        <td>Кол-во</td>
        <td>Цена</td>
        <td>Сумма</td>
      </tr>
      <tr v-for="n in 5" :key="n">
        <td>{{ n }}</td>
        <td><input class="inputName" type="text" v-model="inputs[n-1]"></td>
        <td><input type="text" class="col" v-model="col[n-1]"></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <div class="inputUnderline signature">
      Отпустил
    </div>
    <div class="inputUnderline signature">
      Получил
    </div>
  </div>
</template>

<style scoped>

  @media print {
    /* Спрятать URL при печати */
    a[href]:after { content: none; }
    /* Обнулить поля на странице */
    @page {
      margin: 0;
      size: A4;
    }
    html, body{
      height: 297mm;
      width: 210mm;
    }
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  }
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
    padding: 10px 30px;
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
  .inputUnderline {
    text-align: left;
    width: 100%;
    padding: 0px 0px;
    margin: 20px 0px;
    position: relative;
  }
  .inputUnderline input {
    position: absolute;
    width: 500px;
    left: 130px;
    bottom: 6px;
  }
  .inputUnderline::before {
    content: '';
    position: absolute;
    background-color: black;
    width: 500px;
    height: 2px;
    bottom: 4px;
    left: 130px;
  }
  .signature::after {
    content: '(должность,подпись,расшифровка)';
    font-size: 10px;
    position: absolute;
    left: 250px;
    top: 18px;
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
    width: 400px;
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