<template>
  <div class="container">
    <div id='gameScreen'></div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import "pixi";
import "p2";
import Phaser from "phaser";
/* eslint-enable no-unused-vars */

export default {
  name: "Game",
  props: {
    width: Number,
    height: Number
  },
  mounted() {
    let self = this;
    if (self.game == null) {
      self.game = new Phaser.Game(self.width, self.height, Phaser.AUTO, self.$el, {
        preload: function preload() {
          self.preload();
        },
        create: function create() {
          self.create();
        },
        update: function update() {
          self.update();
        }
      });
    }
  },
  methods: {
    preload() {
      this.game.load.image("ball", "static/sprites/pangball.png");
    },
    create() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);

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
    render() {}
  },
  data() {
    return {
      game: null
    };
  }
};
</script>