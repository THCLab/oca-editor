<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="main-layout">
      <form-builder type="template" v-model="formData"></form-builder>
    </div>
    <div class="text-right mt-3" style="margin: 0px 20px;">
      <button class="btn btn-default" @click="resetForm">Reset</button>
      <button class="btn btn-primary" @click="saveForm">Save</button>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import FormBuilder from 'v-form-builder';
import {get_form, update_form, save_form} from "./persistence";

export default {
  name: "App",
  components: {
    FormBuilder
  },
  data: () => ({
    name: "testName",
    formData: null,
    id: "",
  }),
  computed: {
    getName() {
      return this.name
    }
  },
  methods: {
    resetForm() {
      this.formData.type = "";
      this.formData.sections = [];
    },
    loadOldForm() {
      let data = get_form(this.name);
      try {
        this.formData = JSON.parse(data);
      } catch(e) {
        SethPhatToaster.error("Incorrect JSON model");
      }
    },
    saveForm() {
      if (this.name === "") {
        SethPhatToaster.error("Please input your form config title");
        return;
      }
      if (this.id !== "") {
        update_form(this.id, this.name, this.formData);
      } else {
        save_form(this.name, this.formData);
      }
      SethPhatToaster.success("ok");
    }
  },
  created() {
    this.loadOldForm();
  },
  beforeDestroy() {
    this.formData = null;
  }
};
</script>
