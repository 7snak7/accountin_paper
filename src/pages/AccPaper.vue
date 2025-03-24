<script setup>
import html2pdf from 'html2pdf.js'
import InputText from '@/components/InputText.vue'
import DelBtn from '@/components/DelBtn.vue'
import RoundedButton from '@/components/RoundedButton.vue'
import { onMounted, ref } from 'vue'
import AddBtn from '@/components/AddBtn.vue'
import DeleteBtn from '@/components/DeleteBtn.vue'
import InputDate from '@/components/InputDate.vue'
import InputCheckBox from '@/components/InputCheckBox.vue'
import InputTextDropDown from '@/components/InputTextDropDown.vue'
import { ResponsiblePersonService } from '@/services/responsiblePerson'
import { AnixShopService } from '@/services/anixShop'

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
const anixShops = ref([])
const responsible = ref('')
const responsiblePersons = ref([])
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

onMounted(() => {
  ResponsiblePersonService
      .allPersons()
      .then(data => {
        responsiblePersons.value = data.data._embedded.responsiblePersons.sort(function(a, b) {
          return (a.id>b.id) ? 1 : -1
        }).map((person) => {
          return person.name
        })
      })
  AnixShopService
      .anixShops()
      .then(data => {
        anixShops.value = data.data._embedded.anixShops.sort(function(a, b) {
          return (a.name.toLowerCase()>b.name.toLowerCase()) ? 1 : -1
        }).map((shop) => {
          return shop.name
        })
      })
})
</script>

<template>
  <div>
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
        <td style="width:60%; text-align: center">
          <h3>Затребовал</h3>
          <InputTextDropDown
              :option="anixShops.filter( function( el ) {return shops.indexOf( el ) < 0} )"
              style="width: 100%"
              v-for="(shop, index) in shops"
              :key="index"
              v-model="shops[index]"
              autofocus
          />
        </td>
        <td style="width:40%; text-align: center">
          <h3>Ответственный</h3>
          <InputTextDropDown
              :option="responsiblePersons"
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
      <InputText style="width: 60px" v-model="works[index].col"/>
      <InputText v-if="visiblePrice" style="width: 60px" v-model="works[index].price"/>
    </div>
    <add-btn class="add-btn" @click="addWorks">Добавить строку</add-btn>
    <delete-btn v-if="works.length > 1" class="del-btn" @click="delWorks">Удалить строку</delete-btn>
    <rounded-button @click="savePDF">Сохранить PDF</rounded-button>
    <rounded-button @click="printPage">Печать</rounded-button>
  </div>
</template>

<style scoped>
h3 {
  margin: 0;
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
