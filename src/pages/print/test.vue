<template>
  <div>
    <input type="file" @change="handleFileUpload" ref="fileInput" />
    <button @click="submitFile" :disabled="!file || isUploading">
      {{ isUploading ? 'Загрузка...' : 'Отправить файл' }}
    </button>
    <div v-if="message" :class="['message', messageType]">{{ message }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FileUploader',
  data() {
    return {
      file: null,
      isUploading: false,
      message: '',
      messageType: '', // 'success' или 'error'
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.message = ''; // Сбрасываем сообщение при выборе нового файла
    },
    async submitFile() {
      if (!this.file) {
        this.showMessage('Пожалуйста, выберите файл', 'error');
        return;
      }

      this.isUploading = true;

      const formData = new FormData();
      formData.append('file', this.file); // 'file' - имя поля, может отличаться в зависимости от API

      try {
        const response = await axios.post(
            'https://api.mpp-lestnica.ru/signage/calcPrices',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                // Добавьте другие заголовки, если требуется (например, авторизацию)
                // 'Authorization': 'Bearer your_token_here'
              },
            }
        );

        this.showMessage('Файл успешно загружен!', 'success');
        console.log('Ответ сервера:', response.data);

        // Здесь можно обработать ответ сервера
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        this.showMessage(
            error.response?.data?.message || 'Произошла ошибка при загрузке файла',
            'error'
        );
      } finally {
        this.isUploading = false;
      }
    },
    showMessage(text, type) {
      this.message = text;
      this.messageType = type;
      // Автоматически скрыть сообщение через 5 секунд
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 5000);
    },
  },
};
</script>

<style scoped>
.message {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
}

.success {
  background-color: #dff0d8;
  color: #3c763d;
}

.error {
  background-color: #f2dede;
  color: #a94442;
}
</style>