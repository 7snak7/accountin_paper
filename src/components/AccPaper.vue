<script>

  export default {
    name: "AccPaper",
    data() {
      return {
        shops: ['Аникс Офелия', 'Аникс Октябрьский', 'Аникс Амурский'],
        works: [{ name: 'Изготовление и монтаж светового бокса Аникс', col: '1', price: '26000'},
                { name: 'Изготовление и монтаж светового бокса Пекарня', col: '2', price: '24000'},
                { name: 'Изготовление и монтаж светового бокса Супермаркет', col: '2', price: '32000'},
                { name: 'Изготовление и монтаж светового бокса ХВ', col: '1', price: '10000'},
                { name: 'Изготовление и монтаж комплекта наклеек на входную зону', col: '2', price: '500'},
                { name: 'Изготовление и монтаж Режима работ', col: '1', price: '300'},
        ],
        copies: 3,
        visiblePrice: false,
        blankHeight: '',
      }
    },
    mounted() {
      this.blankHeight = document.querySelector('.container').clientHeight;
      let emptyElement = 0;
      if (this.blankHeight <= 227) {
        emptyElement = 6;
      }else if (this.blankHeight <= 250) {
        emptyElement = 5;
      }else if (this.blankHeight <= 273) {
        emptyElement = 4;
      }else if (this.blankHeight <= 296) {
        emptyElement = 3;
      }else if (this.blankHeight <= 319) {
        emptyElement = 2;
      }else if (this.blankHeight <= 342) {
        emptyElement = 1;
      }
      for (let i=0; i<emptyElement; i++) {
        this.works.push({name: '', col: '', price: ''});
      }
    },
  }
</script>

<template>
  <div class="shopBlank" v-for="shop in shops" :key="shop">
    <div class="container" v-for="n in copies" :key="n">
      <div class="head">Акт выполненных работ</div>
      <div class="logo"><img alt="Logo" src="../assets/logo.png"></div>
      <div class="data">"__"____________20__г.</div>
      <div class="number">№____</div>
      <div class="shop">Затребовал <span class="shopName">{{ shop }}</span></div>
      <table class="list">
        <tr class="headList">
          <td>№</td>
          <td>Наименование</td>
          <td>Кол-во</td>
          <td v-if="visiblePrice">Цена</td>
          <td v-if="visiblePrice">Сумма</td>
        </tr>
        <tr v-for="(work, index) in works" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ work.name }}</td>
          <td>{{ work.col }}</td>
          <td v-if="visiblePrice">{{ work.price }}</td>
          <td v-if="visiblePrice">{{ work.price*work.col }}</td>
        </tr>
      </table>
      <div class="released">Отпустил</div>
      <div class="received">Получил</div>
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
    padding: 0;
    size: A4;
  }
  .shopBlank {
    margin-top: 3mm;
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
.shopBlank {
  page-break-before: always;
  margin-top: 5mm;
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
  position: relative;
}
.shopName {
  padding-left: 20mm;
}
.shop::before, .received::before, .released::before {
  content: '';
  position: absolute;
  background-color: black;
  width: 165mm;
  height: 1px;
  bottom: -1mm;
  left: 25mm;
}
.released::before {
  width: 170mm;
  left: 20mm;
}
.received::before {
  width: 172mm;
  left: 18mm;
}
.released::after, .received::after {
  content: '(должность, подпись, расшифровка)';
  position: absolute;
  font-size: 2.5mm;
  bottom: -3.5mm;
  left: 75mm;
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
  padding-left: 3mm;
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