import Vue from "vue"
import Router from "vue-router"
import Schema from "./Schema.vue"
import CreateSchema from "./CreateSchema.vue"
import Overlays from "@/views/Overlays.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: CreateSchema },
        { path: '/schemas', component: Schema },
        { path: "/schemas/:id", name: "schemas", component: Overlays, props: true }
    ]
})
