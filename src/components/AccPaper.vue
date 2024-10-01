<script>
  export default {
    name: "AccPaper",
    data() {
      return {
        shop: 'Аникс Офелия',
        inputs: ['Изготовление и монтаж светового бокса Аникс',
          'Изготовление и монтаж светового бокса Пекарня',
          'Изготовление и монтаж светового бокса Супермаркет',
          'Изготовление и монтаж светового бокса ХВ',
          'Изготовление и монтаж комплекта наклеек на входную зону',
          'Изготовление и монтаж Режима работ',
          'Утилизация старых боксов'],
        col: ['1','1','1','1','1','1','1'],
      }
    },
    methods:{
      movefocus: function() {

      }
    }
  }
</script>

<template>
  <div class="container" v-for="m of 3" :key="m">
    <div class="head">Акт выполненных работ</div>
    <div class="logo"><img alt="Logo" src="../assets/logo.png"></div>
    <div class="data">"__"____________20__г.</div>
    <div class="number">№____</div>
    <div class="shop">Затребовал&ensp; &ensp; &ensp; &ensp; &ensp; &ensp; {{ shop }}</div>
    <table class="list">
      <tr class="headList">
        <td>№</td>
        <td>Наименование</td>
        <td>Кол-во</td>
        <td>Цена</td>
        <td>Сумма</td>
      </tr>
      <tr v-for="n in inputs.length" :key="n">
        <td>{{ n }}</td>
        <td>&ensp;{{ inputs[n-1] }}</td>
        <td>{{ col[n-1] }}</td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <div class="released">Отпустил</div>
    <div class="received">Получил</div>
  </div>
</template>

<style scoped>

  @media print {
    /* Спрятать URL при печати */
    a[href]:after { content: none; }
    /* Обнулить поля на странице */
    @page {
      margin: 0;
      padding: 0;
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

  .container {
    width: 190mm;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    gap: 3.5mm;
    padding: 5mm;
    background-color: white;
    border: 1px solid black;
    grid-template-columns: 68mm 53mm 62mm;
    grid-template-rows: 4mm 4mm 4mm auto 4mm 4mm;
    page-break-inside: avoid;
  }
  .head {
    text-transform: uppercase;
    text-align: left;
    font-size: 6mm;
    grid-column: 1/3;
  }
  .logo {
    grid-row: 1/3;
    grid-column: 3/4;
  }
  .shop, .received, .released {
    text-align: left;
    grid-column: 1/4;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
  }
  .number, .data {
    text-align: left;
  }
  .list{
    grid-column: 1/4;
    border-collapse: collapse;
  }
  .headList{
    font-weight: bold;
  }
  .list td {
    border: 1px solid black;
    font-size: 11pt;
  }
  td:nth-child(1) {
    width: 6mm;
  }
  td:nth-child(2) {
    text-align: left;
  }
  .headList td {
    text-align: center;
  }
  td:nth-child(n+3) {
    width: 15mm;
  }
  img {
    max-width: 100%;
  }
</style>