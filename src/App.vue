<template>
  <div id="app">
    <h1>Schema Base & Overlays</h1>
    <b-button>Import</b-button>
    <b-button>Export</b-button>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="nameGroup"
        label="Name:"
        label-for="nameInput"
        description="Name of the schema base which you are creating."
      >
        <b-form-input
          id="nameInput"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter name"
        />
      </b-form-group>

      <b-form-group id="descGroup" label="Description:" label-for="descInput">
        <b-form-input
          id="descInput"
          type="text"
          v-model="form.description"
          required
          description="Provide meaningful description for your schama base"
          placeholder="Enter description"
        />
      </b-form-group>

      <b-form-group id="versionGroup" label="Version:" label-for="versionInput">
        <b-form-input
          id="versionInput"
          type="number"
          v-model="form.version"
          required
          description="Semantic versioning for your schema."
        />
      </b-form-group>

      <b-form-group id="exampleInputGroup3" label="Food:" label-for="exampleInput3">
        <b-form-select id="exampleInput3" :options="foods" required v-model="form.food"/>
      </b-form-group>

      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      form: {
        name: "",
        description: "",
        did: "",
        version: "1",
        attr_names: []
      }
    };
  },
  components: {},
  methods: {
    onSubmit() {
      console.log("onSubmit");
    },
    onReset() {
      console.log("onReset");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
