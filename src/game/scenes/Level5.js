import { Player } from '../../GameObject/Player';
import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { handlePlayerControls, hitChocolate, Hearts } from '../controls';

export class Level5 extends Scene {
    constructor() {
        super('Level5');
    }

    create() {
        // Health system - 3 hearts
        this.health = 3;
        this.hearts = Hearts(this, 3, 0.1, 30, 40, 40);
        this.cameras.main.setBackgroundColor(0x3cb371);


        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(100, 680, 'wall').setScale(0.25, 1).refreshBody();

        // Scattered tiny platforms
        this.platforms.create(250, 620, 'wall').setScale(0.2, 1).refreshBody();
        this.platforms.create(450, 560, 'wall').setScale(0.2, 1).refreshBody();
        this.platforms.create(750, 500, 'wall').setScale(0.2, 1).refreshBody();
        this.platforms.create(950, 440, 'wall').setScale(0.15, 1).refreshBody();
        this.platforms.create(800, 380, 'wall').setScale(0.15, 1).refreshBody();
        this.platforms.create(550, 320, 'wall').setScale(0.15, 1).refreshBody();
        this.platforms.create(300, 260, 'wall').setScale(0.15, 1).refreshBody();
        this.platforms.create(100, 200, 'wall').setScale(0.15, 1).refreshBody();
        this.platforms.create(900, 140, 'wall').setScale(0.15, 1).refreshBody();
        this.platforms.create(600, 80, 'wall').setScale(0.15, 1).refreshBody(); 

        // moving platforms
        this.movingPlatform1 = this.physics.add.image(350, 500, 'wall').setScale(0.25, 1);
        this.movingPlatform1.setImmovable(true);
        this.movingPlatform1.body.setAllowGravity(false);
        this.movingPlatform1.setVelocityX(150);

        this.movingPlatform2 = this.physics.add.image(650, 350, 'wall').setScale(0.25, 1);
        this.movingPlatform2.setImmovable(true);
        this.movingPlatform2.body.setAllowGravity(false);
        this.movingPlatform2.setVelocityY(-100);

        this.movingPlatform3 = this.physics.add.image(400, 180, 'wall').setScale(0.25, 1);
        this.movingPlatform3.setImmovable(true);
        this.movingPlatform3.body.setAllowGravity(false);
        this.movingPlatform3.setVelocityX(-140);

        // Hydrant 
        this.hydrants = this.physics.add.staticGroup();
        this.hydrant1 = this.hydrants.create(250, 570, 'hydrant').setScale(0.2).refreshBody();
        this.hydrant2 = this.hydrants.create(750, 450, 'hydrant').setScale(0.2).refreshBody();
        this.hydrant3 = this.hydrants.create(550, 270, 'hydrant').setScale(0.2).refreshBody();
        this.hydrant4 = this.hydrants.create(300, 210, 'hydrant').setScale(0.2).refreshBody();
        this.hydrant5 = this.hydrants.create(900, 90, 'hydrant').setScale(0.2).refreshBody();

        // CHOCOLATES!
        this.chocolates = this.physics.add.group();
        
        this.chocolate1 = this.chocolates.create(300, 500, 'chocolate').setScale(0.15);
        this.chocolate1.setVelocityX(150);
        this.chocolate1.setBounce(1);
        this.chocolate1.setCollideWorldBounds(true); //makes chocolate bounce off the edges
        
        this.chocolate2 = this.chocolates.create(600, 200, 'chocolate').setScale(0.15);
        this.chocolate2.setVelocityY(-120);
        this.chocolate2.setBounce(1);
        this.chocolate2.setCollideWorldBounds(true);
        
        this.chocolate3 = this.chocolates.create(100, 250, 'chocolate').setScale(0.15);
        this.chocolate3.setVelocityX(-180);
        this.chocolate3.setVelocityY(100);
        this.chocolate3.setBounce(1);
        this.chocolate3.setCollideWorldBounds(true);

        // Player
        this.player = new Player(this, 100, 630);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatform1);
        this.physics.add.collider(this.player, this.movingPlatform2);
        this.physics.add.collider(this.player, this.movingPlatform3);

        this.cursors = this.input.keyboard.createCursorKeys();

        // bones
        this.bones = this.physics.add.staticGroup();
        this.bones.create(100, 630, 'bone').setScale(0.3).refreshBody();
        this.bones.create(250, 570, 'bone').setScale(0.3).refreshBody();
        this.bones.create(450, 510, 'bone').setScale(0.3).refreshBody();
        this.bones.create(950, 390, 'bone').setScale(0.3).refreshBody();
        this.bones.create(800, 330, 'bone').setScale(0.3).refreshBody();
        this.bones.create(550, 270, 'bone').setScale(0.3).refreshBody();
        this.bones.create(300, 210, 'bone').setScale(0.3).refreshBody();
        this.bones.create(100, 150, 'bone').setScale(0.3).refreshBody();
        this.bones.create(900, 90, 'bone').setScale(0.3).refreshBody();
        this.bones.create(600, 30, 'bone').setScale(0.3).refreshBody(); // Ultimate victory bone!

        this.physics.add.collider(this.bones, this.platforms);
        this.physics.add.collider(this.player, this.hydrants);
        this.physics.add.collider(this.player, this.chocolates, (player, chocolate) => {
            hitChocolate(this, player, chocolate);
        }, null, this);
        this.physics.add.overlap(this.player, this.bones, this.collectBone, null, this);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Timer
        this.timeLeft = 40;
        this.timerText = this.add.text(450, 16, 'Time: 40', {
            fontSize: '36px',
            fill: '#ff0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '36px',
            fill: '#fff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        });

        // Intro level indicator
        this.introText = this.add.text(512, 350, 'ULTIMATE LEVEL 5!', {
            fontSize: '48px',
            fill: '#ffff00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Fade out level text after 2 seconds
        this.time.delayedCall(2000, () => {
            this.tweens.add({
                targets: this.introText,
                alpha: 0,
                duration: 1000
            });
        });

        // Level 
        this.levelText = this.add.text(16, 56, 'LEVEL 5', {
            fontSize: '28px',
            fill: '#ffff00',
            fontStyle: 'bold'
        });

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        handlePlayerControls(this.player, this.cursors);

        // Moving platform 1 - horizontal
        if (this.movingPlatform1.x >= 600) {
            this.movingPlatform1.setVelocityX(-150);
        } else if (this.movingPlatform1.x <= 200) {
            this.movingPlatform1.setVelocityX(150);
        }

        // Moving platform 2 - vertical
        if (this.movingPlatform2.y <= 250) {
            this.movingPlatform2.setVelocityY(100);
        } else if (this.movingPlatform2.y >= 450) {
            this.movingPlatform2.setVelocityY(-100);
        }

        // Moving platform 3 - horizontal (opposite direction)
        if (this.movingPlatform3.x <= 200) {
            this.movingPlatform3.setVelocityX(140);
        } else if (this.movingPlatform3.x >= 600) {
            this.movingPlatform3.setVelocityX(-140);
        }

        // Hydrant removal system
        const hydrants = [this.hydrant1, this.hydrant2, this.hydrant3, this.hydrant4, this.hydrant5];
        hydrants.forEach(hydrant => {
            if (hydrant && hydrant.active && Phaser.Math.Distance.Between(
                this.player.x, this.player.y, hydrant.x, hydrant.y
            ) < 100 && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                hydrant.disableBody(true, true);
            }
        });
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText('Time: ' + this.timeLeft);

        // Flash timer when under 15 seconds
        if (this.timeLeft <= 15) {
            this.timerText.setColor(this.timeLeft % 2 === 0 ? '#ff0000' : '#ffffff');
        }

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
            this.scene.start('YouWin');
        }
    }
}
