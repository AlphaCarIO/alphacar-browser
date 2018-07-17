<template>
      <v-toolbar color="blue lighten-1" app>
      <img src="@/assets/logo.png" width='200rem' alt="">
      <v-spacer></v-spacer>
      <v-text-field hide-details prepend-icon="search"
        single-line></v-text-field>
      <v-toolbar-items>
        <v-btn flat href="#/">{{$t("message.menu_home")}}</v-btn>
        <v-btn flat href="#/token">{{$t("message.menu_token")}}</v-btn>
        <v-btn flat href="#/search?search_type=0&search_txt=&page=1&page_size=5">{{$t("message.menu_transaction")}}</v-btn>
        <v-menu open-on-hover bottom offset-y>
          <v-btn slot="activator" color="primary" dark>
            {{ $t("message.menu_game") }}
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, index) in game_list" :key="index">
              <v-list-tile-title>
                <a :href="item.url">{{ item.title }}</a>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat href="#/">{{$t("message.menu_about_us")}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

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
      game_list: [
        { 
          title: this.$t("message.menu_game1"),
          url: "#/game"
        }, 
        { 
          title: this.$t("message.menu_game2"),
          url: "#/game"
        }
      ],
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
      
    }
  }
};
</script>