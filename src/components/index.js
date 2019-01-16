import page from './page'
import calculator from './calculator.vue'
import coin from './coin.vue'
import timer from './timer.vue'
import clock from './clock.vue'
import clock2 from './clock2.vue'
import calendar from './calendar'
import calendar2 from './calendar2'
import qiu from './qiu'
import weather from './weather'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('calculator', calculator)
        Vue.component('coin', coin)
        Vue.component('timer', timer)
        Vue.component('clock', clock)
        Vue.component('clock2', clock2)
        Vue.component('calendar', calendar)
        Vue.component('calendar2', calendar2)
        Vue.component('qiu', qiu)
        Vue.component('weather', weather)
    }
}
