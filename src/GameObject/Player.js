import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dog', 0); // 0 = first frame

        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.setBounce(0.1);
        this.setCollideWorldBounds(true);
        this.setScale(.3);
        this.initAnimations();
    }

    initAnimations() {
        this.anims.create({
            key: 'left',
            frames: [{ key: 'dog', frame: 1 }],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dog', frame: 0 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'right',
            frames: [{ key: 'dog', frame: 0 }],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: [{ key: 'dog', frame: 2 }],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: [{ key: 'dog', frame: 3 }],
            frameRate: 1,
            repeat: -1
        });
    }

    moveLeft() {
        this.setVelocityX(-200);
        this.anims.play('left', true);
    }
    
    moveRight() {
        this.setVelocityX(200);
        this.anims.play('right', true);
    }

    moveDown() {
        this.setVelocityY(200);
        this.anims.play('down', true);
        this.setVelocityX(0); // Prevent horizontal movement while moving down
    }

    moveUp() {
        this.setVelocityY(-200);
        this.anims.play('up', true);
        this.setVelocityX(0); // Prevent horizontal movement while moving up
    }

    idle() {
        this.setVelocityX(0);
        this.anims.play('turn');
    }

    jump() {
        if (this.body.touching.down) {
            this.setVelocityY(-300);
        }
    }

}