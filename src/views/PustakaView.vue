<template>
  <div id="main" class="container is-max-desktop p-32 mt-5">
    <page-header></page-header>
    <!-- <h1 class="is-size-5 mb-5 has-text-weight-bold"><i class="fa-regular fa-nfc-magnifying-glass"></i></h1> -->

    <div class="columns is-multiline">
      <div class="column is-full is-hidden-touch">
          <div class="field has-addons has-addons-left">
              <p class="control">
                  <v-select class="v-tahun" v-model="s_tahun" :options="['2023','2022','2021']"></v-select>
              </p>
              <p class="control">
                  <v-select class="v-kantor" v-model="s_kantor" placeholder="Seluruh kantor.." :options="['KPUBC Soekarno Hatta','KPUBC Tanjung Priok','KPPBC TMP A Jakarta']"></v-select>
              </p>
              <p class="control">
                <input class="input" type="text" placeholder="Text input">
              </p>
              <p class="control">
                  <a class="button is-info">
                    <i class="fa-regular fa-magnifying-glass-arrow-right"></i>
                  </a>
              </p>
          </div>
      </div>

      <div class="column is-full is-hidden-desktop">
          <v-select class="v-tahun-s" v-model="s_tahun" :options="['2023','2022','2021']"></v-select>
          <v-select class="v-kantor-s mt-2" v-model="s_kantor" placeholder="Seluruh kantor.." :options="['KPUBC Soekarno Hatta','KPUBC Tanjung Priok','KPPBC TMP A Jakarta']"></v-select>
          <a class="button is-outlined is-danger mt-2">
            <i class="fa-regular fa-magnifying-glass-arrow-right"></i>
          </a>
      </div>
    </div>
    <div class="mt-2 columns is-multiline">
      <div class="column is-half-tablet is-half-desktop is-half-widescreen">
          <div class="is-size-5 has-text-weight-bold mb-4">Getting Started</div>
          <div class="is-relative">
            <span>Test</span>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
  name: 'Pustaka',
  components: {
    vSelect
  },
  data() {
    return {
      s_tahun: 2023,
      s_kantor: null,
    }
  }
}
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";
</style>

<style>
.v-tahun {
    width: 121px !important;
}
.v-kantor {
    width: 300px !important;
}
.v-tahun-s {
    width: 121px !important;
}
.v-kantor-s {
    width: 100% !important;
}

::placeholder {
    color: rgb(172, 170, 170) !important;
}
.v-kantor > .vs__dropdown-toggle {
    border-radius: 0 !important;
    border-left: 0 !important;
}
.v-tahun > .vs__dropdown-toggle, .v-tahun-s > .vs__dropdown-toggle {
    border-radius: 4px 0 0 4px !important;
}
.vs__search, .vs__search:focus {
    padding: 0.17em 0.5em !important;
}
.vs__selected {
    padding: 0 0.3em !important;
}
.vs__dropdown-menu li {
    padding-left: 0.55em !important;
}
/* .vs__no-options {
    text-align: left !important;
    padding-left: 8px !important;
}
.vs__clear {
    margin-bottom: 1px;
} */
</style>
  