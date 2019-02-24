import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        schemas: JSON.parse(localStorage.getItem("schemas") || "[]"),
    },
    mutations: {
        addSchema(state, schema) {
            state.schemas.push(schema)
            localStorage.setItem("schemas", JSON.stringify(state.schemas))
        }
    },
    getters: {
        getSchemas: state => {
            return state.schemas
        },
        getSchema: state => name => {
            return state.schemas.find(function (schema) {
                return schema.name == name
            })
        },
    },
    actions: {
        addSchema(context, schema) {
            context.commit("addSchema", schema);
        },
    },
});