export function handlePlayerControls(player, cursors) {
    // Initialize persistent direction if not set
    if (!player.lastDirection) {
        player.lastDirection = null;
    }

    if (cursors.left.isDown) {
        player.lastDirection = 'left';
    } else if (cursors.right.isDown) {
        player.lastDirection = 'right';
    } else if (cursors.down.isDown) {
        player.lastDirection = 'down';
    } else if (cursors.up.isDown) {
        player.lastDirection = 'up';
    }

    // Move in the last direction pressed
    switch (player.lastDirection) {
        case 'left':
            player.moveLeft();
            break;
        case 'right':
            player.moveRight();
            break;
        case 'down':
            player.moveDown();
            break;
        case 'up':
            player.moveUp();
            break;
        default:
            player.idle();
    }

    if (cursors.up.isDown) {
        player.jump();
    }
}

export function hitChocolate(scene, player, chocolate) {
    // Disable the chocolate temporarily to prevent multiple hits
    chocolate.disableBody(true, true);
    // Lose a heart
    scene.health--;
    // Remove heart from display
    if (scene.hearts[scene.health]) {
        scene.hearts[scene.health].destroy();
    }
    // Flash screen red
    scene.cameras.main.shake(200, 0.01);
    scene.cameras.main.flash(200, 255, 0, 0);
    // Check if dead
    if (scene.health <= 0) {
        scene.timeEvent.remove();
        scene.time.delayedCall(300, () => {
            scene.scene.start('GameOver');
        });
    } else {
        // Re-enable chocolate after brief delay
        scene.time.delayedCall(2000, () => {
            if (chocolate.body) {
                chocolate.enableBody(true, chocolate.x, chocolate.y, true, true);
            }
        });
    }
}

export function Hearts(scene, heartCount = 3, scale = 0.1, margin = 30, spacing = 40, y = 40) {
    const camWidth = scene.cameras.main.width;
    const hearts = [];
    for (let i = 0; i < heartCount; i++) {
        const heart = scene.add.image(camWidth - margin - (i * spacing), y, 'heart').setScale(scale).setScrollFactor(0);
        hearts.push(heart);
    }
    return hearts;
}
