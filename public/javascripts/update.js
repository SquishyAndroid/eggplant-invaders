function update () {

  //move player left on button press
  if (left && player.body.velocity.x > -maxVelocity) {
    player.body.velocity.x -= 20;
  } else {
    //slow down
    if (player.body.velocity.x > 0){
      player.body.velocity.x -= 4;
    }
  }

  //move player right on button press
  if (right && player.body.velocity.x < maxVelocity) {
    player.body.velocity.x += 20;
  } else {
    //slow down
    if (player.body.velocity.x < 0){
      player.body.velocity.x += 4;
    }
  }

  // Firing?
  if (fireBullet.isDown && player.alive) {
    fireBullet();
  }

  // Handle aliens dropping bombs
  handleBombs(0);

  game.physics.arcade.overlap(bullets, aliens, bulletHitsAlien, null, this);
  game.physics.arcade.overlap(bombs, player, bombHitsPlayer, null, this);
}