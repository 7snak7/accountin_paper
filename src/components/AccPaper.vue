<script>
  export default {
    name: "AccPaper",
    data() {
      return {
        shop: '',
        inputs: ['','','','','','',''],
        col: ['','','','','','',''],
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
    <div class="shop">Затребовал</div>
    <div class="list">
      <div>№</div>
      <div>Наименование</div>
      <div>Кол-во</div>
      <div>Цена</div>
      <div>Сумма</div>

      <div>1</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <div>2</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <div>3</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <div>4</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <div>5</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <div>6</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <div>7</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
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
    width: 140mm;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    gap: 3mm;
    padding: 5mm;
    background-color: white;
    border: 1px solid black;
    grid-template-columns: 60mm 20mm 50mm;
    grid-template-rows: 3mm 3mm 3mm auto 3mm 3mm;
  }
  .head {
    grid-column: 1/3;
  }
  .logo {
    grid-row: 1/3;
    grid-column: 3/4;
  }
  .shop, .received, .released {
    grid-column: 1/4;
  }
  .list {
    grid-column: 1/4;
    display: grid;
    grid-template-columns: 8mm auto 18mm 18mm 18mm;
    border: 1px solid black;
  }
  .list div {
    border: 1px solid black;
  }
  .logo {
    text-align: right;
    float: right;
  }
  img {
    max-width: 100%;
  }

</style>