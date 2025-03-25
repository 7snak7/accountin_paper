<script setup>
// eslint-disable-next-line no-undef
defineProps({
  date: { type: String },
  shops: { type: Object },
  works: { type: Object },
  copies: { type: Number },
  stampIpOrOOO: { type: Boolean },
  score: { type: Number },
  responsible: { type: String },
  visiblePrice: { type: Boolean },
  visibleSignatureAndStamp: { type: Boolean },

})
</script>

<template>
  <div class="shopBlank" v-for="shop in shops" :key="shop">
    <div ref="blank" class="container" v-for="n in copies" :key="n">
      <template v-if="stampIpOrOOO">
        <div class="head">Передаточный акт</div>
        <div class="logo"><img alt="Logo" class="logoImg" src="../../assets/logo_ooo.png"></div>
      </template>
      <template v-else>
        <div class="head">Акт выполненных работ</div>
        <div class="logo"><img alt="Logo" src="../../assets/logo.png"></div>
      </template>
      <div v-if="date===''" class="data">"__"____________20__г.</div>
      <div v-else class="data">{{ date }} г.</div>
      <div v-if="score===''" class="number"><span style="color: red;">№_____</span></div>
      <div v-else class="number">№ {{ score }}</div>
      <div class="shopAndResponsible">
        <div class="shop">Затребовал <span class="shopName">{{ shop }}</span></div>
        <div class="responsible">Ответственный <span class="responsibleName">{{ responsible }}</span></div>
      </div>
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
      <img v-if="visibleSignatureAndStamp" class="signature" alt="signature" src="../../assets/signature.png">
      <template v-if="stampIpOrOOO">
        <img v-if="visibleSignatureAndStamp" class="stamp" alt="stamp" src="../../assets/stamp_ooo.png">
      </template>
      <template v-else>
        <img v-if="visibleSignatureAndStamp" class="stamp" alt="stamp" src="../../assets/stamp.png">
      </template>
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

h3 {
  margin: 0;
}

.shopBlank {
  padding-top: 0 !important;
  margin-top: 0 !important;
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

.shopAndResponsible {
  text-align: left;
  grid-column: 1/4;
  position: relative;
  display: grid;
  grid-template-columns: 48% 52%;
}

.shopMaxSize {
  text-align: left;
  grid-column: 1/2;
  position: relative;
}

.shop {
  text-align: left;
  grid-column: 1/1;
  position: relative;
}

.responsible {
  text-align: left;
  grid-column: 2/2;
  position: relative;
}

.shopName, .responsibleName {
  margin-left: 3px;
}

.shopMaxSize::before, .shop::before, .received::before, .released::before, .responsible::before {
  content: '';
  position: absolute;
  background-color: black;
  width: 623px;
  height: 1px;
  bottom: -4px;
  left: 94px;
}

.shop::before {
  width: 242px;
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
  width: 252px;
  left: 120px;
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
