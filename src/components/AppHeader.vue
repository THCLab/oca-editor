<template>
  <header>
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">
        SBO
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Create Schema</b-nav-item>
          <b-nav-item to="/schemas">Schemas</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right no-caret>
            <template slot="button-content">
              <font-awesome-layers full-width class="fa-2x">
                <font-awesome-icon :icon="['fas', 'language']"></font-awesome-icon>
              </font-awesome-layers>
            </template>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">DE</b-dropdown-item>
            <b-dropdown-item href="#">IT</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapGetters({
    })
  },
  methods: {
  }
};
</script>


<style lang="scss" scoped>
header {
  margin-bottom: 3rem;
}
</style>
