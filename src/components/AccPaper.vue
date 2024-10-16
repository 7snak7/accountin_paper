<script setup>
import html2pdf from 'html2pdf.js'
import InputText from './elements/InputText.vue'
import { ref } from 'vue'

const blank = ref(null)
blank.value = undefined
const printForm = ref(null)
printForm.value = undefined

const shops = ref([''])
const works = ref([{ name: '', col: '', price: '' },
  { name: '', col: '', price: '' },
  { name: '', col: '', price: '' },
  { name: '', col: '', price: '' },
  { name: '', col: '', price: '' },
  { name: '', col: '', price: '' },
  { name: '', col: '', price: '' }
])
const copies = ref(3)
const visiblePrice = ref(false)
const blankHeight = ref('')

function printPage () {
  window.print()
}

function savePDF () {
  const options = {
    margin: 4,
    filename: '1.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
    jsPSF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all' }
  }
  printForm.value.style.display = 'block'
  blankHeight.value = blank.value.clientHeight
  const emptyElement = 0
  if (blankHeight.value <= 227) {
    // emptyElement = 6
  } else if (blankHeight.value <= 250) {
    // emptyElement = 5
  } else if (blankHeight.value <= 273) {
    // emptyElement = 4
  } else if (blankHeight.value <= 296) {
    // emptyElement = 3
  } else if (blankHeight.value <= 319) {
    // emptyElement = 2
  } else if (blankHeight.value <= 342) {
    // emptyElement = 1//365
  } else if (blankHeight.value > 365) {
    copies.value = 2
  }
  for (let i = 0; i < emptyElement; i++) {
    this.works.push({ name: '', col: '', price: '' })
  }
  // const noPrint = document.getElementById('noPrint')
  // noPrint.style.visibility = 'hidden'
  html2pdf()
    .from(printForm.value)
    .set(options)
    .save()
    .then(() => {
      printForm.value.style.display = 'none'
      // noPrint.style.display = ''
      // hideEl.style.visibility = "visible"
    })
}

function priceOn () {
  const indicator = document.querySelector('.indicator')
  indicator.style.left = '110px'
  visiblePrice.value = true
}

function priceOff () {
  const indicator = document.querySelector('.indicator')
  indicator.style.left = '0'
  visiblePrice.value = false
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
        <InputText style="width: 304px" v-for="(shop, index) in shops" :key="index" v-model="shops[index]"/>
        <h3>Работы</h3>
        <div v-for="(work, index) in works" :key="index">
          <InputText style="width: 270px" v-model="works[index].name"/>
          <InputText style="width: 30px" v-model="works[index].col"/>
        </div>
        <button class="btn" @click="savePDF">Сохранить PDF</button>
        <button class="btn" @click="printPage">Печать</button>
      </div>
    </div>
  </div>
  <div ref="printForm" id="printArea">
    <div class="shopBlank" v-for="shop in shops" :key="shop">
      <div ref="blank" class="container" v-for="n in copies" :key="n">
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
            <td v-if="visiblePrice">{{ (work.price * work.col > 0) ? work.price * work.col : '' }}</td>
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
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8) inset, 1px 1px 5px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background-color: #6f9cca;
}

.btn:active {
  position: relative;
  top: 1px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
}

@media (min-width: 768px) {
  .wrapper {
    width: 335px;
  }
}

@media print {
  /* Спрятать URL при печати */
  a[href]:after {
    content: none;
  }

  /* Обнулить поля на странице */
  @page {
    margin: 15px;
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
    margin-top: 0 !important;
  }

  .container {

  }

  html, body {
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
  padding: 0;
}

.container {
  width: 718px;
  margin: 0 auto;
  display: grid;
  gap: 13px;
  padding: 18px;
  background-color: white;
  border: 1px solid black;
  grid-template-columns: 257px 200px 235px;
  grid-template-rows: 15px 15px 15px auto 15px 15px;
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
  padding-left: 30px;
}

.shop::before, .received::before, .released::before {
  content: '';
  position: absolute;
  background-color: black;
  width: 623px;
  height: 1px;
  bottom: -4px;
  left: 94px;
}

.released::before {
  width: 642px;
  left: 75px;
}

.received::before {
  width: 649px;
  left: 68px;
}

.released::after, .received::after {
  content: '(должность, подпись, расшифровка)';
  position: absolute;
  font-size: 9px;
  bottom: -14px;
  left: 283px;
}

.number, .data {
  text-align: left;
}

.list {
  grid-column: 1/4;
  border-collapse: collapse;
}

.headList {
  font-weight: bold;
}

.list td, .list th {
  border: 1px solid black;
  font-size: 11pt;
  padding-left: 3px;
  padding-right: 3px;
}

td:nth-child(1) {
  width: 20px;
}

td:nth-child(2) {
  text-align: left;
  padding-left: 10px;
}

.headList td {
  text-align: center;
}

td:nth-child(n+3) {
  width: 56px;
}

img {
  max-width: 100%;
}
</style>
