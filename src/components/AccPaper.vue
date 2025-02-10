<script setup>
import html2pdf from 'html2pdf.js'
import InputText from '@/components/elements/InputText.vue'
import DelBtn from '@/components/elements/DelBtn.vue'
import RoundedButton from '@/components/elements/RoundedButton.vue'
import { ref } from 'vue'
import AddBtn from '@/components/elements/AddBtn.vue'
import DeleteBtn from '@/components/elements/DeleteBtn.vue'
import InputDate from '@/components/elements/InputDate.vue'
import InputCheckBox from '@/components/elements/InputCheckBox.vue'

const blank = ref(null)
blank.value = undefined
const printForm = ref(null)
printForm.value = undefined

const date = ref(null)
const today = new Date()
const day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate()
const month = (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)
date.value = today.getFullYear()+'-'+month+'-'+ day
const shops = ref([''])
const responsible = ref(null)
// const responsibleOption = ref([ 'Селезнев Лев',
//                                       'Миллер Максим',
//                                       'Гаджиев Анар',
//                                       'Блезнюк Евгений',
//                                       'Фёдоров Юрий',
//                                       'Успенская Ольга',
//                                       'Отдел маркетинга',
//                                       'Отдел корпоративной культуры',])
const works = ref([ { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' },
                          { name: '', col: '', price: '' }])
const copies = ref(3)
const score = ref(null)
score.value = ''
const visiblePrice = ref(false)
const visibleSignatureAndStamp = ref(true)
const stampIpOrOOO = ref(false)

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

</script>

<template>
  <div class="bg"></div>
  <div id="noPrint">
    <div class="wrapper">
      <div >
        <div style="display: inline-block;">
          <label class="label">Цены</label>
          <InputCheckBox v-model="visiblePrice"/>
        </div>
        <div style="display: inline-block; margin-left: 20px">
          <label class="label">Печать и подпись</label>
          <InputCheckBox v-model="visibleSignatureAndStamp"/>
        </div>
        <div style="display: inline-block; margin-left: 20px">
          <label class="label">ИП/ООО</label>
          <InputCheckBox v-model="stampIpOrOOO"/>
        </div>
        <br>
        <div style="display: inline-block;">
          <label for="copies" class="label">Копии </label>
          <input id="copies" style="width: 50px" type="number" class="input" v-model="copies">
        </div>
        <div style="display: inline-block;">
          <label for="score" class="label">Счет </label>
          <input id="score" style="width: 50px" type="number" class="input" v-model="score">
        </div>
        <div style="display: inline-block;">
          <input-date style="margin: 10px" v-model="date"/>
        </div>
      </div>
      <div class="form">
        <table style="width:100%;">
          <tr>
            <td style="width:70%; text-align: center">
              <h3>Магазин</h3>
              <InputText
                  style="width: 100%"
                  v-for="(shop, index) in shops"
                  :key="index"
                  v-model="shops[index]"
                  autofocus
              />
            </td>
            <td style="width:30%; text-align: center">
              <h3>Ответственный</h3>
              <InputText
                  style="width: 100%"
                  v-model="responsible"
              />
            </td>
          </tr>
        </table>
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
        <template v-if="stampIpOrOOO">
          <div class="head">Передаточный акт</div>
          <div class="logo"><img alt="Logo" class="logoImg" src="../assets/logo_ooo.png"></div>
        </template>
        <template v-else>
          <div class="head">Акт выполненных работ</div>
          <div class="logo"><img alt="Logo" src="../assets/logo.png"></div>
        </template>
        <div v-if="date===''" class="data">"__"____________20__г.</div>
        <div v-else class="data">{{ getDate() }} г.</div>
        <div v-if="score===''" class="number"><span style="color: red;">№_____</span></div>
        <div v-else class="number">№ {{ score }}</div>
        <div class="shop">Затребовал <span class="shopName">{{ shop }}</span></div>
        <div class="responsible">Ответ-ный <span class="responsibleName">{{ responsible }}</span></div>
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
        <img v-if="visibleSignatureAndStamp" class="signature" alt="signature" src="../assets/signature.png">
        <template v-if="stampIpOrOOO">
          <img v-if="visibleSignatureAndStamp" class="stamp" alt="stamp" src="../assets/stamp_ooo.png">
        </template>
        <template v-else>
          <img v-if="visibleSignatureAndStamp" class="stamp" alt="stamp" src="../assets/stamp.png">
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signature {
  position:absolute;
  bottom: 20px;
  left: 220px;
  width: 30%;
}

.stamp {
  position:absolute;
  bottom: 2px;
  left: 50px;
  width: 20%;
  opacity: 0.75;
}

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
  position:relative;
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

.logoImg {
  height: 60px;
  float: right;
}

.received, .released {
  text-align: left;
  grid-column: 1/4;
  position: relative;
}

.shop {
  text-align: left;
  grid-column: 1/1;
  position: relative;
}
.responsible {
  text-align: left;
  grid-column: 2/4;
  position: relative;
}

.shopName, .responsibleName {
  padding-left: 30px;
}

.shop::before, .received::before, .released::before, .responsible::before {
  content: '';
  position: absolute;
  background-color: black;
  width: 165px;
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

.responsible::before {
  width: 365px;
  left: 82px;
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
