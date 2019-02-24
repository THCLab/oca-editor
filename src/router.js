import Vue from "vue"
import Router from "vue-router"
import Schema from "./Schema.vue"
import CreateSchema from "./CreateSchema"

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: CreateSchema },
        { path: '/schema', component: Schema }
    ]
})