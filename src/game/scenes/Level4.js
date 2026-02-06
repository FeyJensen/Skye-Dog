import { Player } from '../../GameObject/Player';
import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Level4 extends Scene {
    constructor() {
        super('Level4');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x2e8b57); // Darker green for final level

        // Ultra-challenging platform layout - vertical maze style
        this.platforms = this.physics.add.staticGroup();
        // Ground level
        this.platforms.create(100, 680, 'wall').setScale(0.3, 1).refreshBody();
        this.platforms.create(1100, 680, 'wall').setScale(0.3, 1).refreshBody();
        
        // Ascending platforms (zigzag pattern)
        this.platforms.create(300, 600, 'wall').setScale(0.25, 1).refreshBody();
        this.platforms.create(900, 550, 'wall').setScale(0.25, 1).refreshBody();
        this.platforms.create(200, 480, 'wall').setScale(0.25, 1).refreshBody();
        this.platforms.create(1000, 400, 'wall').setScale(0.25, 1).refreshBody();
        this.platforms.create(400, 320, 'wall').setScale(0.25, 1).refreshBody();
        this.platforms.create(800, 250, 'wall').setScale(0.2, 1).refreshBody();
        this.platforms.create(600, 170, 'wall').setScale(0.2, 1).refreshBody(); // Top center

        // Two moving platforms for extra challenge
        this.movingPlatform1 = this.physics.add.image(500, 480, 'wall').setScale(0.3, 1);
        this.movingPlatform1.setImmovable(true);
        this.movingPlatform1.body.setAllowGravity(false);
        this.movingPlatform1.setVelocityY(-80);

        this.movingPlatform2 = this.physics.add.image(700, 350, 'wall').setScale(0.3, 1);
        this.movingPlatform2.setImmovable(true);
        this.movingPlatform2.body.setAllowGravity(false);
        this.movingPlatform2.setVelocityX(120);

        // Hydrant obstacles
        this.hydrants = this.physics.add.staticGroup();
        this.hydrant1 = this.hydrants.create(300, 550, 'hydrant').setScale(0.2).refreshBody();
        this.hydrant2 = this.hydrants.create(900, 500, 'hydrant').setScale(0.2).refreshBody();
        this.hydrant3 = this.hydrants.create(400, 270, 'hydrant').setScale(0.2).refreshBody();
        this.hydrant4 = this.hydrants.create(800, 200, 'hydrant').setScale(0.2).refreshBody();

        // Dangerous moving chocolates!
        this.chocolates = this.physics.add.group();
        
        this.chocolate1 = this.chocolates.create(400, 600, 'chocolate').setScale(0.15);
        this.chocolate1.setVelocityX(150);
        this.chocolate1.setBounce(1);
        this.chocolate1.setCollideWorldBounds(true);
        
        this.chocolate2 = this.chocolates.create(700, 400, 'chocolate').setScale(0.15);
        this.chocolate2.setVelocityY(-120);
        this.chocolate2.setBounce(1);
        this.chocolate2.setCollideWorldBounds(true);
        
        this.chocolate3 = this.chocolates.create(500, 250, 'chocolate').setScale(0.15);
        this.chocolate3.setVelocityX(-180);
        this.chocolate3.setVelocityY(100);
        this.chocolate3.setBounce(1);
        this.chocolate3.setCollideWorldBounds(true);

        // Player starts at bottom left
        this.player = new Player(this, 100, 630);
        this.physics.add.collider(this.player, this.platforms);
        
        // Chocolate collision - hurts the player!
        this.physics.add.overlap(this.player, this.chocolates, this.hitChocolate, null, this);
        this.physics.add.collider(this.player, this.movingPlatform1);
        this.physics.add.collider(this.player, this.movingPlatform2);

        this.cursors = this.input.keyboard.createCursorKeys();

        // 8 bones scattered throughout - must get them all!
        this.bones = this.physics.add.staticGroup();
        this.bones.create(100, 630, 'bone').setScale(0.3).refreshBody();
        this.bones.create(300, 550, 'bone').setScale(0.3).refreshBody();
        this.bones.create(900, 500, 'bone').setScale(0.3).refreshBody();
        this.bones.create(200, 430, 'bone').setScale(0.3).refreshBody();
        this.bones.create(1000, 350, 'bone').setScale(0.3).refreshBody();
        this.bones.create(400, 270, 'bone').setScale(0.3).refreshBody();
        this.bones.create(800, 200, 'bone').setScale(0.3).refreshBody();
        this.bones.create(600, 120, 'bone').setScale(0.3).refreshBody(); // Victory bone at top!

        this.physics.add.collider(this.bones, this.platforms);
        this.physics.add.collider(this.player, this.hydrants);
        this.physics.add.overlap(this.player, this.bones, this.collectBone, null, this);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Tighter timer - 45 seconds!
        this.timeLeft = 45;
        this.timerText = this.add.text(1050, 16, 'Time: 45', {
            fontSize: '32px',
            fill: '#ff0000',
            fontStyle: 'bold'
        });
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff',
            fontStyle: 'bold'
        });

        // Level indicator
        this.levelText = this.add.text(16, 56, 'LEVEL 4', {
            fontSize: '28px',
            fill: '#ffff00',
            fontStyle: 'bold'
        });

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.moveLeft();
        }
        else if (this.cursors.right.isDown) {
            this.player.moveRight();
        }
        else if (this.cursors.down.isDown) {
            this.player.moveDown();
        }
        else if (this.cursors.up.isDown) {
            this.player.moveUp();
        }
        else {
            this.player.idle;
        }

        // Moving platform 1 - vertical movement
        if (this.movingPlatform1.y <= 300) {
            this.movingPlatform1.setVelocityY(80);
        } else if (this.movingPlatform1.y >= 550) {
            this.movingPlatform1.setVelocityY(-80);
        }

        // Moving platform 2 - horizontal movement
        if (this.movingPlatform2.x >= 900) {
            this.movingPlatform2.setVelocityX(-120);
        } else if (this.movingPlatform2.x <= 500) {
            this.movingPlatform2.setVelocityX(120);
        }

        // Hydrant removal system
        if (this.hydrant1 && this.hydrant1.active && Phaser.Math.Distance.Between(
            this.player.x, this.player.y, this.hydrant1.x, this.hydrant1.y
        ) < 100 && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.hydrant1.disableBody(true, true);
        }
        if (this.hydrant2 && this.hydrant2.active && Phaser.Math.Distance.Between(
            this.player.x, this.player.y, this.hydrant2.x, this.hydrant2.y
        ) < 100 && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.hydrant2.disableBody(true, true);
        }
        if (this.hydrant3 && this.hydrant3.active && Phaser.Math.Distance.Between(
            this.player.x, this.player.y, this.hydrant3.x, this.hydrant3.y
        ) < 100 && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.hydrant3.disableBody(true, true);
        }
        if (this.hydrant4 && this.hydrant4.active && Phaser.Math.Distance.Between(
            this.player.x, this.player.y, this.hydrant4.x, this.hydrant4.y
        ) < 100 && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.hydrant4.disableBody(true, true);
        }

        if (this.cursors.up.isDown) {
            this.player.jump();
        }
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText('Time: ' + this.timeLeft);
        
        // Flash timer when under 10 seconds
        if (this.timeLeft <= 10) {
            this.timerText.setColor(this.timeLeft % 2 === 0 ? '#ff0000' : '#ffff00');
        }
        
        if (this.timeLeft <= 0) {
            this.scene.start('GameOver');
        }
    }

    hitChocolate(player, chocolate) {
        // Flash screen red
        this.cameras.main.shake(200, 0.01);
        this.cameras.main.flash(200, 255, 0, 0);
        
        // Game over when hit by chocolate
        this.timeEvent.remove();
        this.time.delayedCall(300, () => {
            this.scene.start('GameOver');
        });
    }

    collectBone(player, bone) {
        bone.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.bones.countActive(true) === 0) {
            this.timeEvent.remove(); // Stop timer
            this.scene.start('Level5');
        }
    }
}
