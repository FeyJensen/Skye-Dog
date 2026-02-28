import { Player } from '../../GameObject/Player';
import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { handlePlayerControls, hitChocolate, Hearts } from '../controls';

export class Level3 extends Scene {
    constructor() {
        super('Level3');
    }

    create() {
        // Health system - 3 hearts
        this.health = 3;
        this.hearts = Hearts(this, 3, 0.1, 30, 40, 40);
        this.cameras.main.setBackgroundColor(0x3cb371); 

        // Platforms - More challenging layout with smaller platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(150, 650, 'wall').setScale(0.5, 1).refreshBody(); // Smaller ground platforms
        this.platforms.create(500, 650, 'wall').setScale(0.4, 1).refreshBody();
        this.platforms.create(850, 650, 'wall').setScale(0.5, 1).refreshBody();
        this.platforms.create(325, 500, 'wall').setScale(0.4, 1).refreshBody(); // Mid platforms
        this.platforms.create(700, 380, 'wall').setScale(0.3, 1).refreshBody();
        this.platforms.create(200, 300, 'wall').setScale(0.3, 1).refreshBody();
        this.platforms.create(950, 250, 'wall').setScale(0.3, 1).refreshBody();
        this.platforms.create(500, 150, 'wall').setScale(0.25, 1).refreshBody(); // Top platform 

        // Moving platform
         this.movingPlatform = this.physics.add.image(600, 550, 'wall').setScale(0.4, 1);
         this.movingPlatform.setImmovable(true);
         this.movingPlatform.body.setAllowGravity(false);
         this.movingPlatform.setVelocityX(100);

        // Multiple Hydrants - obstacles to avoid
        this.hydrants = this.physics.add.staticGroup();
        this.hydrant1 = this.hydrants.create(500, 600, 'hydrant').setScale(0.2).refreshBody();
        this.hydrant2 = this.hydrants.create(325, 450, 'hydrant').setScale(0.2).refreshBody();
        this.hydrant3 = this.hydrants.create(700, 330, 'hydrant').setScale(0.2).refreshBody();

        // Player 
        this.player = new Player(this, 100, 600);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatform);

        this.cursors = this.input.keyboard.createCursorKeys();

        // More bones in harder-to-reach places
        this.bones = this.physics.add.staticGroup();
        this.bones.create(325, 450, 'bone').setScale(0.3).refreshBody();
        this.bones.create(700, 330, 'bone').setScale(0.3).refreshBody();
        this.bones.create(200, 250, 'bone').setScale(0.3).refreshBody();
        this.bones.create(950, 200, 'bone').setScale(0.3).refreshBody();
        this.bones.create(500, 100, 'bone').setScale(0.3).refreshBody(); 
        this.bones.create(150, 600, 'bone').setScale(0.3).refreshBody();

        this.physics.add.collider(this.bones, this.platforms);
        this.physics.add.collider(this.player, this.hydrants);
        this.physics.add.overlap(this.player, this.bones, this.collectBone, null, this);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //chocolate
        this.chocolates = this.physics.add.group();
        this.chocolates.add(this.physics.add.image(880, 160, 'chocolate').setScale(0.15));
        this.chocolates.add(this.physics.add.image(950, 110, 'chocolate').setScale(0.15));
        this.physics.add.overlap(this.player, this.chocolates, (player, chocolate) => hitChocolate(this, player, chocolate), null, this);
        

        // Timer for added challenge
        this.timeLeft = 60;
        this.timerText = this.add.text(450, 16, 'Time: 60', {
            fontSize: '32px',
            fill: '#ff0000'
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
            fill: '#000'
        });

        // Level 
        this.levelText = this.add.text(16, 56, 'LEVEL 3', {
            fontSize: '28px',
            fill: '#ffff00',
            fontStyle: 'bold'
        });

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        handlePlayerControls(this.player, this.cursors);

        // Moving platform boundaries
        if (this.movingPlatform.x >= 800) {
            this.movingPlatform.setVelocityX(-100);
        } else if (this.movingPlatform.x <= 400) {
            this.movingPlatform.setVelocityX(100);
        }

        // Hydrant removal - can remove obstacles with spacebar when near
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
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText('Time: ' + this.timeLeft);
        
        if (this.timeLeft <= 0) {
            this.scene.start('GameOver');
        }
    }

    collectBone(player, bone) {
        bone.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.bones.countActive(true) === 0) {
            this.timeEvent.remove(); // Stop timer
            this.scene.start('Level4');
        }
    }
}