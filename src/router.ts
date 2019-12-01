import Vue from "vue"
import Router from "vue-router"
import SchemaList from "./SchemaList.vue"
import CreateSchema from "./CreateSchema.vue"
import Schema from "./Schema.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: CreateSchema },
        { path: '/schemas', component: SchemaList },
        { path: "/schemas/:name", component: Schema, props: true }
    ]
})
