import { Scene } from 'phaser';

export class YouWin extends Scene {
    constructor() {
        super('YouWin');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x87ceeb);

        this.add.text(512, 300, 'You Win!', {
            fontFamily: 'Arial Black',
            fontSize: 64,
            color: '#fff',
            stroke: '#000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const restartButton = this.add.text(512, 400, 'Restart', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}