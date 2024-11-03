<script setup>
import html2pdf from 'html2pdf.js'
import InputText from '@/components/elements/InputText.vue'
import DelBtn from '@/components/elements/DelBtn.vue'
import RoundedButton from '@/components/elements/RoundedButton.vue'
import { ref } from 'vue'
import AddBtn from '@/components/elements/AddBtn.vue'
import DeleteBtn from '@/components/elements/DeleteBtn.vue'
import InputDate from '@/components/elements/InputDate.vue'

const blank = ref(null)
blank.value = undefined
const printForm = ref(null)
printForm.value = undefined

const date = ref(null)
const today = new Date()
const day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate()
date.value = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ day
const shops = ref([''])
const works = ref([ { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' }])
const copies = ref(3)
const visiblePrice = ref(false)

function getDate () {
  const months = [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря" ];
  const dateSplit = date.value.split('-')
  return dateSplit[2] + ' ' + months[dateSplit[1]-1] + ' ' + dateSplit[0];
}

function addShop () {
  shops.value.push('')
}

function delShop () {
  shops.value.pop()
}

function addWorks () {
  works.value.push({ name: '', col: '', price: '' })
}

function delWorks () {
  works.value.pop()
}

function delWorksFromId (id) {
  works.value.splice(id, 1)
  works.value.push({ name: '', col: '', price: '' })

}

function printPage () {
  window.print()
}

function savePDF () {
  let fileName = shops.value[0] === '' ? 'Unnamed.pdf' : shops.value[0]
  if (shops.value.length > 1) {
    fileName = ''
    for (let shop of shops.value) {
      fileName += shop + '_'
    }
    fileName = fileName.slice(0,-1)
    fileName += '.pdf'
  }
  const options = {
    margin: 4,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
    jsPSF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all' }
  }
  printForm.value.style.display = 'block'
  html2pdf()
    .from(printForm.value)
    .set(options)
    .save()
    .then(() => {
      printForm.value.style.display = 'none'
    })
}

function priceOn () {
  const indicator = document.querySelector('.indicator')
  indicator.style.left = '100px'
  visiblePrice.value = true
}

function priceOff () {
  const indicator = document.querySelector('.indicator')
  indicator.style.left = '0'
  visiblePrice.value = false
}
</script>

<template>
  <div class="bg"></div>
  <div id="noPrint">
    <div class="wrapper">
      <div class="wrapper-inner">
        <div class="btn-wrapper">
          <div class="indicator"></div>
          <button class="toggle-btn" @click="priceOff">Нет цены</button>
          <button class="toggle-btn" @click="priceOn">Есть цена</button>
        </div>
        <div>
          <input type="number" class="input" v-model="copies">
          <label class="label">Копии</label>
          <input-date v-model="date"/>
        </div>
      </div>
      <div class="form">
        <h3>Магазин</h3>
        <InputText
            style="width: 100%"
            v-for="(shop, index) in shops"
            :key="index"
            v-model="shops[index]"
            autofocus
        />
        <add-btn class="add-btn" @click="addShop">Добавить магазин</add-btn>
        <delete-btn v-if="shops.length > 1" class="del-btn" @click="delShop">Удалить магазин</delete-btn>
        <h3>Выполненные работы</h3>
        <div
            v-for="(work, index) in works" :key="index"
            class="work"
        >
          <del-btn v-if="works.length > 1" @click="delWorksFromId(index)">X</del-btn>
          <InputText style="flex: 1" v-model="works[index].name"/>
          <InputText style="width: 30px" v-model="works[index].col"/>
          <InputText v-if="visiblePrice" style="width: 45px" v-model="works[index].price"/>
        </div>
        <add-btn class="add-btn" @click="addWorks">Добавить строку</add-btn>
        <delete-btn v-if="works.length > 1" class="del-btn" @click="delWorks">Удалить строку</delete-btn>
        <rounded-button @click="savePDF">Сохранить PDF</rounded-button>
        <rounded-button @click="printPage">Печать</rounded-button>
      </div>
    </div>
  </div>
  <div ref="printForm" id="printArea">
    <div class="shopBlank" v-for="shop in shops" :key="shop">
      <div ref="blank" class="container" v-for="n in copies" :key="n">
        <div class="head">Акт выполненных работ</div>
        <div class="logo"><img alt="Logo" src="../assets/logo.png"></div>
        <div v-if="date===''" class="data">"__"____________20__г.</div>
        <div v-else class="data">{{ getDate() }} г.</div>
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
            <td v-if="visiblePrice">{{
                (work.price.replace(/,/g, '.').replace(/[^\d.-]/g, "")
                * work.col.replace(/,/g, '.').replace(/[^\d.-]/g, "") > 0)
                ? (work.price.replace(/,/g, '.').replace(/[^\d.-]/g, "")
                * work.col.replace(/,/g, '.').replace(/[^\d.-]/g, "")).toFixed(2)
                +work.price.replace(/[0-9]/g, '')  : '' }}</td>
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
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
}

#noPrint {
  width: 100%;
  height: 100%;
  padding: 10px 0;
  margin: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
}

h3 {
  margin: 0;
}

.wrapper {
  position: relative;
  width: 330px;
  height: max-content;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
}

.wrapper-inner {
  display: grid;
  gap: 10px;
  grid-template-columns: 220px 100px;
  justify-content: center;
}

.btn-wrapper {
  position: relative;
  width: 200px;
  margin: 15px auto;
  border-radius: 30px;
  box-shadow: 0 0 20px 9px #d3e7fa;
}
.toggle-btn {
  position: relative;
  padding: 10px 23px;
  font-size: 11px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.indicator {
  position: absolute;
  width: 100px;
  height: 100%;
  background: #628bb5;
  border-radius: 30px;
  top: 0;
  left: 0;
  transition: 0.5s;
}

.form {
  position: relative;
  transition: 0.5s;
  padding-bottom: 15px;
}

.work {
  display: flex;
  gap: 2px;
}

.input {
  margin-top: 10px;
  padding: 2px;
  height: 18px;
  width: 30px;
  background: none;
  outline: none;
  border: 1px solid #89b1d8;
  border-radius: 5px;
  resize: none;
}
.input:focus {
  border: 1px solid #000000;
}
.label {
  font-size: 12px;
  margin-left: 5px;
  color: #628bb5;
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

  #noPrint, #noPrint *, .bg {
    display: none;
  }

  #printArea {
    display: block !important;
  }

  .shopBlank {
    padding-top: 0 !important;
    margin-top: 0 !important;
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
  width: 64px;
}

img {
  max-width: 100%;
}
</style>
