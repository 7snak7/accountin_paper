import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faXmark, faCalculator,  faFileLines} from '@fortawesome/free-solid-svg-icons'


library.add(faBars, faXmark, faCalculator,  faFileLines)

createApp(App)
    .component('fa_icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
