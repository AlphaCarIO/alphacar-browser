<template>
<div class="container">
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" size="sm">

  <a class="navbar-brand" href="#/">
    <div class="container"><b-img  width="150" src="../assets/logo.png" /></div>
  </a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#/">{{$t("message.menu_home")}}<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/">{{$t("message.menu_token")}}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/">{{$t("message.menu_transaction")}}</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{$t("message.menu_game")}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#/game">{{$t("message.menu_game1")}}</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#/game">{{$t("message.menu_game2")}}</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/">{{$t("message.menu_about_us")}}</a>
      </li>
    </ul>
    <b-select v-model="search_type" :options="search_types" class="col-2" />
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" :placeholder="input_holder" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" click="onSearch" type="submit">Search</button>
    </form>
  </div>
  <b-select v-model="lang" :options="langs" @change="onChange" class="col-1" />
</nav>
</div>
</template>

<style>

.type_s.el-select {
  width: 150px;
}

.lang_s.el-select {
  width: 110px;
}

.input-with-select .el-input-group__prepend {
  background-color: #dcdfe6;
}
</style>

<style scoped>
.vcenter {
    display: inline-block;
    vertical-align: middle;
    float: none;
}
</style>

<script>
import bus from "@/utils/event";
import * as cc from "@/config/constants"

export default {
  name: "Header",
  computed: {
    search_types: function() {
      return [
        {
          value: "0",
          text: this.$t("message.search_type_all")
        },
        {
          value: "1",
          text: this.$t("message.search_type_ubi_code")
        },
        {
          value: "2",
          text: this.$t("message.search_type_vincode")
        },
        {
          value: "3",
          text: this.$t("message.search_type_user_name")
        },
        {
          value: "4",
          text: this.$t("message.search_type_driving_license")
        }
      ]
    },
    input_holder: function() {
      return this.$t("message.PlzInput")
    }
  },
  data() {
    return {
      langs: [
        {
          value: "cn",
          text: "CN"
        },
        {
          value: "en",
          text: "EN"
        },
      ],
      search_txt: "",
      search_type: "0",
      page: 1,
      page_size: 5,
      lang: ""
    };
  },
  mounted() {

    bus.$on(cc.ON_PAGE_SIZE_CHANGE, (new_page_size) => {
      this.page_size = new_page_size;
    })
    
    bus.$on(cc.ON_PAGE_CHANGE, (new_page) => {
      this.page = new_page;
    })

    /*
    if (this.$route.path == "/search") {
      let search_type = this.$route.query.search_type.trim();
      let search_txt = this.$route.query.search_txt.trim();
      let page = parseInt(this.$route.query.page);
      let page_size = parseInt(this.$route.query.page_size);
      this.search_type = search_type;
      this.search_txt = search_txt;
      this.page = page;
      this.page_size = page_size;
    }
    */

    this.lang = this.$store.getters.lang;
    this.onChange(this.lang);

  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    onChange(val) {
      this.$i18n.locale = val;
      this.$store.dispatch('setLang', this.lang);
      bus.$emit(cc.ON_NATION_CHANGE, null);
    },

    onKeyPress: function(ev) {
      if (ev.keyCode == 13) {
        this.onSearch();
      }
    },

    fetchData() {
      if (this.$route.path != "/search") {
        this.search_type = "0";
        this.search_txt = "";
      }
    },

    onHome() {
      this.$router.push({ path: "/" });
    },

    onSearch() {
      let search_txt = this.search_txt.trim();
      let query_cond = { 
        search_type: this.search_type, 
        search_txt: search_txt, 
        page: this.page, 
        page_size: this.page_size
      }
      this.$router.push({
        path: "/search",
        query: query_cond
      });

      //bus.$emit(cc.DO_SEARCH, query_cond);
      
    }
  }
};
</script>