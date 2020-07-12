import Button from './button.js';
import Profile from './profile.js';

/**
 * Represent the victory cutscene.
 *
 * @export
 * @class WinScene
 * @extends {Phaser.Scene}
 */
export default class WinScene extends Phaser.Scene {
  /**
   * Creates an instance of WinScene.
   * @memberof WinScene
   */
  constructor() {
    super('WinScene');
  }

  /**
   * Creates the content of the WinScene.
   *
   * @param {*} data
   * @memberof WinScene
   */
  create(data) {
    this.cameras.main.fadeIn(100);
    const bg = this.add.image(512, 288, 'bg');
    bg.setDisplaySize(1024, 576);
    const text = this.add.text(512, 160, 'Mission\nAccomplished!', {
      fontSize: '56px',
      fontFamily: 'font',
      align: 'center',
    }).setOrigin(0.5, 0);
    if (Profile.money === 400000000) {
      text.text += '\n\nFLAWLESS\nPERFORMANCE!';
    }
    this.scene.get('MusicScene').play(2);
    const play = new Button(this, 512, 528, 'sprites', 'playon');
    play.once('click', () => {
      play.disableInteractive();
      this.cameras.main.fadeOut(300);
    });
    this.input.keyboard.on('keydown', (event) => {
      event.preventDefault();
      if (event.key === 'Enter') {
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
