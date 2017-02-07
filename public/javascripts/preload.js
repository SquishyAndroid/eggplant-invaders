function preload () {
  game.load.image('ship', 'images/8-bit-peach.png');
  game.load.image('bullet', 'images/8-bit-condom.png');
  game.load.image('alien', 'images/8-bit-eggplant-bigger.png');
  game.load.spritesheet('bomb', 'images/sperm.png', 28, 64);
  game.load.spritesheet('explosion', 'images/explosion.png', 80, 80);

  game.load.audio('shoot', 'sounds/shoot.wav');
  game.load.audio('explode', 'sounds/explode.wav');
  game.load.audio('bomb', 'sounds/bomb.wav');

  game.load.image('moveLeftButton', 'images/move_left_button.png');
  game.load.image('moveRightButton', 'images/move_right_button.png');
  game.load.image('fireButton', 'images/shoot_button.png');
  game.load.image('restartButton','images/restart.png');
}