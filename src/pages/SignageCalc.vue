<script setup>
import {ref, onMounted, reactive} from 'vue'
import { SignagePriceService } from '@/services/signagePriceService'
import RoundedButton from '@/components/RoundedButton.vue'

const dropArea = ref(null)
const fileSelectorInput = ref(null)
const files = ref([])
const signageService = new SignagePriceService()

onMounted(() => {
  fileSelectorInput.value.onchange = () => {
    [...fileSelectorInput.value.files].forEach(file => {
      if (validateFileType(file.name)) {
        addFile(file)
      }
    })
  }

  // Drag and drop handlers
  dropArea.value.ondragover = (e) => {
    e.preventDefault()
    const hasValidFiles = [...e.dataTransfer.items].some(item => validateFileType(item.type))
    if (hasValidFiles) {
      dropArea.value.classList.add('drag-over-effect')
    }
  }

  dropArea.value.ondragleave = () => {
    dropArea.value.classList.remove('drag-over-effect')
  }

  dropArea.value.ondrop = (e) => {
    e.preventDefault()
    dropArea.value.classList.remove('drag-over-effect')

    const droppedFiles = e.dataTransfer.items
        ? [...e.dataTransfer.items]
            .filter(item => item.kind === 'file')
            .map(item => item.getAsFile())
        : [...e.dataTransfer.files]

    droppedFiles.forEach(file => {
      if (validateFileType(file.type || file.name)) {
        addFile(file)
      }
    })
  }
})

function fileSelectorClick() {fileSelectorInput.value.click()}

function validateFileType(name) {
  const extension = name.split('.').pop().toLowerCase()
  return extension === 'plt'
}

function addFile(file) {
  const fileItem = reactive({
    id: Date.now(),
    name: file.name,
    size: (file.size / (1024 * 1024)).toFixed(2),
    progress: 0,
    status: 'uploading', // 'uploading', 'complete', 'error'
    file: file,
    data: {},
  })

  files.value.unshift(fileItem)
  uploadFile(fileItem)
}

async function uploadFile(fileItem) {
  try {
    const formData = new FormData()
    formData.append('files', fileItem.file)

    const onUploadProgress = (progressEvent) => {
      if (progressEvent.lengthComputable) {
        fileItem.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      }
    }

    const response = await signageService.calcPrice(formData, onUploadProgress)
    fileItem.data = response.data[0]
    console.log(fileItem)
    fileItem.status = 'complete'
  } catch (error) {
    console.error('File upload failed:', error)
    fileItem.status = 'error'
    fileItem.error = error.message || 'Upload failed'
  }
}

function removeFile(index) {
  files.value.splice(index, 1)
}

// function getFileIcon(name) {
//   const extension = name.split('.').pop().toLowerCase()
//   return `${extension}.png`
// }
</script>

<template>
  <div class="header-section">
    <h1>Загрузите файл</h1>
    <p>Загрузите *.plt файл для просчета стоимости вывески</p>
  </div>

  <div class="drop-section" ref="dropArea">
      <div class="cloud-icon">
        <img src="@/assets/icons/cloud.png" alt="cloud">
      </div>
      <span>Перетащите сюда plt файлы</span>
      <span>ИЛИ</span>
      <rounded-button @click="fileSelectorClick">Просмотр файлов</rounded-button>
      <input
          type="file"
          class="file-selector-input"
          multiple
          ref="fileSelectorInput"
          accept=".plt"
      >
  </div>

  <div class="list-section" v-if="files.length > 0">
    <div class="list-title">Загруженные файлы</div>
    <div class="list">
      <div
          v-for="(file, index) in files"
          :key="file.id"
          class="file-item"
          :class="file.status"
      >
        <div class="row">
          <div class="col">
            <img src="@/assets/icons/plt.png" alt="">
          </div>

          <div class="col">
            <div class="file-name">
              <div class="name">{{ file.name }}</div>
              <span v-if="file.status === 'uploading'">{{ file.progress }}%</span>
              <span v-else-if="file.status === 'error'" class="error-text">{{ file.error }}</span>
            </div>

            <div class="file-progress" v-if="file.status === 'uploading'">
              <span :style="{ width: file.progress + '%' }"></span>
            </div>

            <div class="file-size">{{ file.size }} MB</div>
          </div>

          <div class="col">
            <svg
                v-if="file.status === 'uploading'"
                xmlns="http://www.w3.org/2000/svg"
                class="cross"
                height="20"
                width="20"
                @click="removeFile(index)"
            >
              <path d="m5.979 14.917-.854-.896 4-4.021-4-4.062.854-.896 4.042 4.062 4-4.062.854.896-4 4.062 4 4.021-.854.896-4-4.063Z"/>
            </svg>

            <svg
                v-if="file.status === 'complete'"
                xmlns="http://www.w3.org/2000/svg"
                class="tick"
                height="20"
                width="20"
            >
              <path d="m8.229 14.438-3.896-3.917 1.438-1.438 2.458 2.459 6-6L15.667 7Z"/>
            </svg>

            <svg
                v-if="file.status === 'error'"
                xmlns="http://www.w3.org/2000/svg"
                class="error-icon"
                height="20"
                width="20"
                @click="removeFile(index)"
            >
              <path d="M10 11.063 7.104 14 6 12.896 8.938 10 6 7.104 7.104 6 10 8.938 12.896 6 14 7.104 11.063 10 14 12.896 12.896 14Z"/>
            </svg>
          </div>
        </div>
        <div v-if="file.status === 'complete'" class="">
          <table class="table">
            <thead>
            <tr>
              <th>Стоимость</th>
              <th>{{ file.data.totalPrice }} р</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="heading" colspan="2">Размеры</td>
            </tr>
            <tr>
              <td>Ширина</td>
              <td>{{ file.data.width }} м</td>
            </tr>
            <tr>
              <td>Высота</td>
              <td>{{ file.data.height }} м</td>
            </tr>
            <tr>
              <td>Площадь</td>
              <td>{{ file.data.area }} м<sup>2</sup></td>
            </tr>
            <tr>
              <td>Габаритная площадь</td>
              <td>{{ file.data.dimensions }} м<sup>2</sup></td>
            </tr>
            <tr>
              <td>Длинна борта</td>
              <td>{{ file.data.boardLength }} м</td>
            </tr>
            <tr>
              <td class="heading" colspan="2">Цены</td>
            </tr>
            <tr>
              <td>Сборка</td>
              <td>{{ file.data.assembly }} р</td>
            </tr>
            <tr>
              <td>Борт</td>
              <td>{{ file.data.board }} р</td>
            </tr>
            <tr>
              <td>Пластик на дно букв</td>
              <td>{{ file.data.pvh4 }} р</td>
            </tr>
            <tr>
              <td>Полистирол</td>
              <td>{{ file.data.polystyrene }} р</td>
            </tr>
            <tr>
              <td>Клей</td>
              <td>{{ file.data.glue }} р</td>
            </tr>
            <tr>
              <td>ШВВП</td>
              <td>{{ file.data.shvvp }} р</td>
            </tr>
            <tr>
              <td>Рама</td>
              <td>{{ file.data.frame }} р</td>
            </tr>
            <tr>
              <td>Печать на лица букв</td>
              <td>{{ file.data.print }} р</td>
            </tr>
            <tr>
              <td>Диоды</td>
              <td>{{ file.data.diodes }} р</td>
            </tr>
            <tr>
              <td>Блок питания</td>
              <td>{{ file.data.powerUnit }} р</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  border: none;
  margin-bottom: 20px;
}
.table thead th {
  font-weight: bold;
  text-align: center;
  border: none;
  padding: 10px 15px;
  color: white;
  background: #5874C6;
  font-size: 18px;
}
.table thead th:first-child {
  border-radius: 8px 0 0 8px;
}
.table thead th:last-child {
  border-radius: 0 8px 8px 0;
}
.table tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}
.table tbody tr:nth-child(even){
  background: #F1F6FF;
}
.table tbody tr td:first-child {
  border-radius: 8px 0 0 8px;
}
.table tbody tr td:last-child {
  border-radius: 0 8px 8px 0;
  text-align: right;
}
.table tbody tr td.heading {
  font-weight: bold;
  text-align: center;
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 8px;
}

.header-section {
  padding: 25px 0px;
}

.header-section h1 {
  font-weight: 500;
  font-size: 1.7rem;
  text-transform: uppercase;
  color: #707EA0;
  margin: 0px;
  margin-bottom: 8px;
}

.header-section p {
  margin: 5px;
  font-size: 0.95rem;
  color: #707EA0;
}

.drop-section {
  min-height: 250px;
  border: 1px dashed #A8B3E3;
  background-image: linear-gradient(180deg, white, #F1F6FF);
  margin: 5px 35px 35px 35px;
  border-radius: 12px;
  position: relative;
}

.drop-section div.col:first-child {
  opacity: 1;
  visibility: visible;
  transition-duration: 0.2s;
  transform: scale(1);
  width: 200px;
  margin: auto;
}

.drop-section div.col:last-child {
  font-size: 40px;
  font-weight: 700;
  color: #c0cae1;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 200px;
  height: 55px;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.6);
  transition-duration: 0.2s;
}

.drag-over-effect div.col:first-child {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: scale(1.1);
}

.drag-over-effect div.col:last-child {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.drop-section .cloud-icon {
  margin-top: 25px;
  margin-bottom: 20px;
}

.drop-section span {
  display: block;
  margin: auto;
  color: #707EA0;
  margin-bottom: 10px;
}

.drop-section input {
  display: none;
}

.list-section {
  text-align: left;
  margin: 0px 35px;
  padding-bottom: 20px;
}

.list-section .list-title {
  font-size: 0.95rem;
  color: #707EA0;
}

.file-item {
  margin: 15px 0px;
  padding-top: 4px;
  padding-bottom: 2px;
  border-radius: 8px;
  transition-duration: 0.2s;
  box-shadow: #E3EAF9 0px 0px 4px 0px, #E3EAF9 0px 12px 16px 0px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  transition-duration: 0.2s;
}

.file-item .col {
  flex: .1;
}

.file-item .col:nth-child(1) {
  flex: .15;
  text-align: center;
}

.file-item .col:nth-child(2) {
  flex: .75;
  text-align: left;
  font-size: 0.9rem;
  color: #3e4046;
  padding: 8px 10px;
}

.file-item .col:nth-child(2) .name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 250px;
  display: inline-block;
}

.file-item .col .file-name span {
  color: #707EA0;
  float: right;
}

.file-item .col .file-name .error-text {
  color: #ff4444;
}

.file-progress {
  width: 100%;
  height: 5px;
  margin-top: 8px;
  border-radius: 8px;
  background-color: #dee6fd;
}

.file-progress span {
  display: block;
  width: 0%;
  height: 100%;
  border-radius: 8px;
  background-image: linear-gradient(120deg, #6b99fd, #9385ff);
  transition-duration: 0.4s;
}

.file-size {
  font-size: 0.75rem;
  margin-top: 3px;
  color: #707EA0;
}

.cross,
.tick,
.error-icon {
  fill: #8694d2;
  background-color: #dee6fd;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  cursor: pointer;
}

.tick {
  fill: #50a156;
  background-color: transparent;
}

.error-icon {
  fill: #ff4444;
  background-color: transparent;
}

.file-item.complete .file-progress,
.file-item.complete .cross {
  display: none;
}

.file-item.uploading .tick,
.file-item.uploading .error-icon {
  display: none;
}

.file-item.error .file-progress,
.file-item.error .tick {
  display: none;
}

@media (max-width: 425px) {

}

@media (min-width: 760px) {

}
</style>
