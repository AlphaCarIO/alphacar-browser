<template>
  <v-container>
    <div ref="gameScreen"></div>
  </v-container>
</template>

<script>
import "pixi";
import "p2";
import Phaser from "phaser";

export default {
  mounted() {
    let self = this;
    console.log(self.$refs.gameScreen);
    self.width = self.$refs.gameScreen.clientWidth;
    self.height = self.width * document.body.clientHeight / document.body.clientWidth;
    if (self.game == null) {
      console.log('self.width:', self.width, 'self.height:', self.height);
      self.game = new Phaser.Game(self.width, self.height, Phaser.AUTO, self.$refs.gameScreen, {
        preload: function preload() {
          self.preload();
        },
        create: function create() {
          self.create();
        },
        update: function update() {
          self.update();
        },
        render: function render() {
          self.render();
        }
      });
    }
  },
  methods: {
    destroyed() {
      this.game.destroy()
    },
    preload() {
      let base_path = 'static/car_snap_assets';
      
      this.game.load.image("ball", "static/sprites/pangball.png");
		  this.game.load.spritesheet('btn-pai', base_path + '/images/btn-pai.png', 296, 296)
    },
    demo(e) {
        console.log('demo:', e.x, ' ', e.y);
    },
    create() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);

		  this.btnPai = this.game.add.button(self.width / 2, self.height / 2, 'btn-pai', null, this.game, 0, 0, 1)
		  this.btnPai.onInputDown.add(this.demo, this.game)

      /*
		  this.btnPai = this.game.add.sprite(self.width / 2, self.height / 2, 'btn-pai');
		  this.btnPai.inputEnabled = true;
      this.btnPai.events.onInputDown.add(this.demo, this.game);
      */

      this.game.stage.backgroundColor = "#124184";

      this.game.physics.p2.gravity.y = 100;
      this.game.physics.p2.restitution = 1.0;

      var group = this.game.add.physicsGroup(Phaser.Physics.P2JS);

      for (var i = 0; i < 32; i++) {
        var ball = group.create(
          this.game.world.randomX,
          this.game.rnd.between(0, 100),
          "ball"
        );
        ball.body.setCircle(16);
        ball.body.fixedRotation = true;
      }
    },
    update() {},
    render() {
		var debug = this.game.debug
		debug.inputInfo(532, 32);
		debug.spriteInputInfo(this.btnPai, 532, 170);
		debug.pointer(this.game.input.activePointer);
    }
  },
  data() {
    return {
      btnPai: null,
      game: null,
      width: 0,
      height: 0
    };
  }
};
</script>