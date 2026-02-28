import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x87cefa);

        this.add.image(512, 384, 'background').setAlpha(0.3); 

        this.add.text(512, 200, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const quitText = this.add.text(512, 300, 'Quit', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive({ useHandCursor: true });

        quitText.on('pointerdown', () => {
            window.sceneStart('MainMenu');
        });

        quitText.on('pointerover', () => {
            quitText.setStyle({ color: '#ff0000' });
        });

        quitText.on('pointerout', () => {
            quitText.setStyle({ color: '#ffffff' });
        });

        const restartText = this.add.text(512, 400, 'Restart', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive({ useHandCursor: true });

        restartText.on('pointerdown', () => {
            this.scene.start('Game');
        });

        restartText.on('pointerover', () => {
            restartText.setStyle({ color: '#ff0000' });
        });

        restartText.on('pointerout', () => {
            restartText.setStyle({ color: '#ffffff' });
        }); 

        EventBus.emit('current-scene-ready', this);

            
    }

    changeScene ()
    {
        this.scene.start('MainMenu');
    }
}
