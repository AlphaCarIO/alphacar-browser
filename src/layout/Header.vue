<template>
  <div>
    <v-toolbar v-if="isLarge" dark app>
      <img src="@/assets/logo.png" class='logo' @click="onHome" width='150rem' alt="">
      <v-spacer></v-spacer>
      <v-text-field @keypress.native="onKeyPress" v-model="search_txt" hide-details prepend-inner-icon="search"
        single-line></v-text-field>
      <v-btn light @click="onSearch">{{ $t('message.search_btn') }}</v-btn>
      <v-toolbar-items>
          <v-layout baseline v-for="(item,i) in items" :key="i">
            <v-layout style="height:100%" v-if="item.lvl == 2">
              <v-menu open-on-hover bottom offset-y>
                  <v-btn flat slot="activator">
                    {{ item.text }}
                  </v-btn>
                <v-list>
                  <v-list-tile v-for="(sub_item, j) in item.sub_items" :key="j">
                    <v-list-tile-title>
                      <v-btn bottom :to="sub_item.url">{{ sub_item.text }}</v-btn>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-layout>
            <v-layout v-else>
              <v-btn flat :to="item.url">{{ item.text }}</v-btn>
            </v-layout>
          </v-layout>
      </v-toolbar-items>
      <v-select solo class="lang_select"
            :items="langs" v-model="lang" @change="onChange"></v-select>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-expansion-panel  v-if="!isLarge" dark expand>
      <v-expansion-panel-content>
          <div slot="header">
            <img src="@/assets/logo.png" @click="onHome" width='100rem' alt="" />
          </div>
          <v-layout row child-flex justify-center align-center wrap>
            <v-spacer/>
            <v-flex xs6>
              <v-text-field v-model="search_txt" hide-details prepend-inner-icon="search"
              single-line></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-btn light @click="onSearch">{{ $t('message.search_btn') }}</v-btn>
            </v-flex>
            <v-spacer/>
          </v-layout>
          <v-layout baseline v-for="(item,i) in items" :key="i">
            <v-layout style="height:100%" v-if="item.lvl == 2">
              <v-menu open-on-hover bottom offset-y>
                <v-btn flat slot="activator">
                  {{ item.text }}
                </v-btn>
                <v-list>
                  <v-list-tile v-for="(sub_item, j) in item.sub_items" :key="j">
                    <v-list-tile-title>
                      <v-btn bottom :to="sub_item.url">{{ sub_item.text }}</v-btn>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-layout>
            <v-layout v-else>
              <v-btn flat :to="item.url">{{ item.text }}</v-btn>
            </v-layout>
          </v-layout>
      <v-select solo class="lang_select2"
            :items="langs" v-model="lang" @change="onChange"
          ></v-select>
      </v-expansion-panel-content>
    </v-expansion-panel>

  </div>

</template>

<style>

.logo:hover {
  cursor: pointer;
}

.lang_select {
  width: 20px;
}

.lang_select2 {
  width: 80px;
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
      isLarge: function() {
        let name = this.$vuetify.breakpoint.name;
        return name == 'md' || name == 'lg' || name == 'xl';
      },
      items: function() {
        return [
        { lvl:1, text: this.$t("message.menu_home"), url: '/' },
        { lvl:1, text: this.$t("message.menu_token"), url: '/token' },
        { lvl:1, text: this.$t("message.menu_transaction"), 
          url: '/search?search_type=0&search_txt=&page=1&page_size=5' },
        { lvl:2, text: this.$t("message.menu_game"), 
          sub_items: [ 
            { text: this.$t("message.menu_game_car_snap"), url: '/car_snap' },
          ] },
        { lvl:1, text: this.$t("message.menu_about_us"), 
          url: '/about_us' },
      ]
      },
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

    this.lang = this.$store.getters.lang;
    this.onChange(this.lang);

  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    onChange(val) {
      console.log(val)
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