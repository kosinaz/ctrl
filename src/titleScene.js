import Button from './button.js';
import Profile from './profile.js';

/**
 * Represent the title screen of the game.
 *
 * @export
 * @class TitleScene
 * @extends {Phaser.Scene}
 */
export default class TitleScene extends Phaser.Scene {
  /**
   * Creates an instance of TitleScene.
   * @memberof TitleScene
   */
  constructor() {
    super('TitleScene');
  }

  /**
   *
   *
   * @param {*} data
   * @memberof TitleScene
   */
  create(data) {
    this.cameras.main.fadeIn(100);
    const bg = this.add.image(512, 288, 'bg');
    bg.setDisplaySize(1024, 576);
    this.add.text(512, 256, 'Control\nTheir\nReality\nLtd', {
      fontSize: '64px',
      fontFamily: 'font',
      align: 'center',
      lineSpacing: 24,
    }).setOrigin(0.5);
    this.scene.run('InfoScene');
    this.scene.run('MusicScene');
    const play = new Button(this, 512, 528, 'sprites', 'playon');
    play.once('click', () => {
      play.disableInteractive();
      this.cameras.main.fadeOut(300);
    });
    this.input.keyboard.on('keydown', (event) => {
      event.preventDefault();
      if (event.key === '0') {
        this.add.text(8, 568, 'gode mode on', {
          fontSize: '16px',
          fontFamily: 'font',
        }).setOrigin(0, 1);
        Profile.progress = 15;
        Profile.invincible = true;
      } else {
        this.cameras.main.fadeOut(300);
      }
    });
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene', {
        level: 0,
      });
    });
  }
}
