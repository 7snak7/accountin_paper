<script>
import html2pdf from "html2pdf.js";

  export default {
    name: "AccPaper",
    data() {
      return {
        shops: [''],
        works: [{ name: '', col: '', price: ''},
                { name: '', col: '', price: ''},
                { name: '', col: '', price: ''},
                { name: '', col: '', price: ''},
                { name: '', col: '', price: ''},
                { name: '', col: '', price: ''},
                { name: '', col: '', price: ''},],
        copies: 3,
        visiblePrice: false,
        blankHeight: '',
      }
    },
    methods: {
      savePDF() {
        const options = {
          margin: 3,
          filename: '1.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
          jsPSF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: 'avoid-all' }
        }
        const printArea = document.getElementById('printArea');
        printArea.style.display = 'block';
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
        }else if (this.blankHeight > 365) {
          this.copies = 2;
        }
        for (let i=0; i<emptyElement; i++) {
          this.works.push({name: '', col: '', price: ''});
        }
        // const noPrint = document.getElementById('noPrint');
        // noPrint.style.visibility = 'hidden';
        html2pdf()
            .from(printArea)
            .set(options)
            .save()
            .then(() => {
              printArea.style.display = 'none';
              // noPrint.style.display = '';
              // hideEl.style.visibility = "visible";
            })
      },
      priceOn() {
        const indicator = document.querySelector('.indicator');
        indicator.style.left = "110px";
        this.visiblePrice = true;
      },
      priceOff() {
        const indicator = document.querySelector('.indicator');
        indicator.style.left = "0";
        this.visiblePrice = false;
      },
    },
  }
</script>

<template>
  <div id="noPrint">
    <div class="wrapper">
      <div class="btn-wrapper">
        <div class="indicator"></div>
        <button class="toggle-btn" @click="priceOff">Нет цены</button>
        <button class="toggle-btn" @click="priceOn">Есть цена</button>
      </div>
      <div class="form">
        <h3>Магазин</h3>
        <textarea rows="1" class="input" v-for="(shop, index) in shops" :key="index" v-model="shops[index]"></textarea>
        <h3>Работы</h3>
        <textarea rows="1" class="input" v-for="(work, index) in works" :key="index" v-model="works[index].name"></textarea>
        <button class="btn" @click="savePDF">Сохранить PDF</button>
<!--        <button class="btn" @click="savePDF">Печать</button>-->
      </div>
    </div>
  </div>
  <div id="printArea">
    <div class="shopBlank" v-for="shop in shops" :key="shop">
      <div class="container" v-for="n in copies" :key="n">
        <div class="head">Акт выполненных работ</div>
        <div class="logo"><img alt="Logo" src="../assets/logo.png"></div>
        <div class="data">"__"____________20__г.</div>
        <div class="number">№____</div>
        <div class="shop">Затребовал <span class="shopName">{{ shop }}</span></div>
        <table class="list">
          <thead>
            <tr class="headList">
              <th>№</th>
              <th>Наименование</th>
              <th>Кол-во</th>
              <th v-if="visiblePrice">Цена</th>
              <th v-if="visiblePrice">Сумма</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(work, index) in works" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ work.name }}</td>
              <td>{{ work.col }}</td>
              <td v-if="visiblePrice">{{ work.price }}</td>
              <td v-if="visiblePrice">{{ (work.price*work.col > 0) ? work.price*work.col : '' }}</td>
            </tr>
          </tbody>
        </table>
        <div class="released">Отпустил</div>
        <div class="received">Получил</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#noPrint {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2c3e50;
  z-index: 1;
}
.wrapper {
  position: relative;
  width: 330px;
  height: max-content;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.btn-wrapper {
  position: relative;
  width: 220px;
  margin: 35px auto;
  border-radius: 30px;
  box-shadow: 0 0 20px 9px #d3e7fa;
}
.toggle-btn {
  position: relative;
  padding: 10px 23px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.indicator {
  position: absolute;
  width: 110px;
  height: 100%;
  background: #628bb5;
  border-radius: 30px;
  top: 0;
  left: 0;
  transition: 0.5s;
}
.form {
  position: relative;
  width: 320px;
  transition: 0.5s;
  left: 4px;
  padding-bottom: 15px;
}
.input {
  width: 100%;
  height: min-content;
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid #2c3e50;
}
.btn {
  display: block;
  width: 85%;
  background-color: #628bb5;
  font-weight: bold;
  color: #fff;
  font-size: 20px;
  margin: 10px auto;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 30px;
}
@media print {
  /* Спрятать URL при печати */
  a[href]:after { content: none; }
  /* Обнулить поля на странице */
  @page {
    margin: 0;
    padding: 0;
    size: A4;
  }
  #noPrint, #noPrint * {
    display: none;
  }
  #printArea {
    display: block !important;
  }
  .shopBlank {
    padding-top: 0 !important;
    margin-top: 3mm !important;
  }
  .container {

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
#printArea {
  display: none;
}
.shopBlank {
  page-break-before: always;
  padding-top: 5mm;
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
.list td, .list th {
  border: 1px solid black;
  font-size: 11pt;
  padding-left: 1mm;
  padding-right: 1mm;
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