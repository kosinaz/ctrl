import Button from './button.js';
import Profile from './profile.js';

/**
 * Represents the level select scene.
 *
 * @export
 * @class SelectScene
 * @extends {Phaser.Scene}
 */
export default class SelectScene extends Phaser.Scene {
  /**
   * Creates an instance of SelectScene.
   * @memberof SelectScene
   */
  constructor() {
    super('SelectScene');
  }

  /**
   * Creates the content of the SelectScene.
   *
   * @param {*} data
   * @memberof SelectScene
   */
  create(data) {
    let opened = false;
    const select = new Button(this, 984, 536, 'sprites', 'select');
    select.on('click', () => {
      if (!opened) {
        window.visible = true;
        opened = true;
        this.tweens.add({
          duration: 50,
          targets: window,
          x: 904,
        });
      } else {
        opened = false;
        this.tweens.add({
          duration: 50,
          targets: window,
          x: 1120,
          onComplete: () => {
            window.visible = false;
          },
        });
      }
    });
    const buttons = this.add.container(0, 0);
    for (let i = 0; i < 15; i += 1) {
      const button = new Button(this, 0, 0, 'sprites', 'mission', i + 1);
      button.on('click', () => {
        this.tweens.add({
          duration: 50,
          targets: window,
          x: 1120,
          onComplete: () => {
            window.visible = false;
            this.scene.get('MenuScene').setLevel(i, data);
          },
        });
      });
      if (Profile.progress < i) {
        button.lock();
      } else {
        if (Profile.level[i] > 0) {
          const star1 = this.add.image(0, 24, 'sprites', 'staron');
          star1.setScale(0.2);
          button.add(star1);
        }
        if (Profile.level[i] > 1) {
          const star2 = this.add.image(-12, 24, 'sprites', 'staron');
          star2.setScale(0.15);
          button.add(star2);
        }
        if (Profile.level[i] > 2) {
          const star3 = this.add.image(12, 24, 'sprites', 'staron');
          star3.setScale(0.15);
          button.add(star3);
        }
      }
      buttons.add(button);
    }
    // eslint-disable-next-line new-cap
    Phaser.Actions.GridAlign(buttons.getAll(), {
      width: 3,
      height: 5,
      cellWidth: 64,
      cellHeight: 64,
      x: -56,
      y: -120,
    });
    const bg = this.add.image(0, 0, 'sprites', 'sidepanel').setAlpha(0.99);
    const window = this.add.container(1120, 288, [bg, buttons]);
    window.visible = false;
  }
}
