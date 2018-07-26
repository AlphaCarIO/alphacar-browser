<template>
<v-container>
  <v-layout>
    <v-spacer/>
    <v-flex class="text-lg-center" style="width:320px; height:504px;" ref="gameScreen">
      <div id="shan"></div>
    </v-flex>
    <v-spacer/>
  </v-layout>
</v-container>
</template>

<script>
import "pixi";
import "p2";
import Phaser from "phaser";
import Car from "@/game_js/car_snap"

export default {
  mounted() {
    let self = this;
    console.log(self.$refs.gameScreen);
    self.width = self.$refs.gameScreen.clientWidth;
    self.height = self.width * document.body.clientHeight / document.body.clientWidth;
    let scale = 2;
    self.width = 320 * scale;
    self.height = 504 * scale;
    if (self.game == null) {
      console.log('self.width:', self.width, 'self.height:', self.height);
      //self.game = new Phaser.Game(self.width, self.height, Phaser.CANVAS, 'gameScreen');
      self.game = new Phaser.Game(self.width, self.height, Phaser.CANVAS, self.$refs.gameScreen);

      self.game.state.add('boot', Car.Boot)
      self.game.state.add('preloader', Car.Preloader)
      self.game.state.add('menu', Car.Menu)
      self.game.state.add('game', Car.Game)
      self.game.state.start('boot')
    }
  },
  methods: {
    destroyed() {
      this.game.destroy()
    },
  },
  data() {
    return {
      game: null,
      width: 0,
      height: 0
    };
  }
};
</script>