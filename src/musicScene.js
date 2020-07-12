import Button from './button.js';

/**
 * Represents the music controller.
 *
 * @export
 * @class MusicScene
 * @extends {Phaser.Scene}
 */
export default class MusicScene extends Phaser.Scene {
  /**
   * Creates an instance of MusicScene.
   * @memberof MusicScene
   */
  constructor() {
    super('MusicScene');
  }

  /**
   * Creates the content of the MusicScene.
   *
   * @memberof MusicScene
   */
  create() {
    this.volume = 1;
    this.menu = this.sound.add('menu', {
      loop: true,
      volume: 0,
    });
    this.level = this.sound.add('level', {
      loop: true,
      volume: 0,
    });
    this.win = this.sound.add('win', {
      loop: true,
      volume: 0,
    });
    const musicbutton = new Button(this, 0, 0, 'sprites', 'music');
    musicbutton.on('click', () => {
      if (this.fadeout) {
        this.fadeout.stop();
      }
      if (this.fadein) {
        this.fadein.stop();
      }
      if (this.volume === 0) {
        this.volume = 0.3;
      } else if (this.volume === 0.3) {
        this.volume = 0.6;
      } else if (this.volume === 0.6) {
        this.volume = 1;
      } else if (this.volume === 1) {
        this.volume = 0;
      }
      if (this.current) {
        this.current.volume = this.volume;
      }
      musicbar1.visible = this.volume > 0;
      musicbar2.visible = this.volume > 0.3;
      musicbar3.visible = this.volume > 0.6;
    });
    const musicbar1 = this.add.image(24, 0, 'sprites', 'audiobar');
    musicbar1.visible = this.volume > 0;
    const musicbar2 = this.add.image(36, 0, 'sprites', 'audiobar');
    musicbar2.visible = this.volume > 0.3;
    const musicbar3 = this.add.image(48, 0, 'sprites', 'audiobar');
    musicbar3.visible = this.volume > 0.6;
    this.add.container(936, 40, [
      musicbar1,
      musicbar2,
      musicbar3,
      musicbutton,
    ]);
  }
  /**
   *
   *
   * @param {number} music
   * @memberof MusicScene
   */
  play(music) {
    if (this.fadeout) {
      this.fadeout.stop();
    }
    if (this.fadein) {
      this.fadein.stop();
    }
    if (this.current === [this.menu, this.level, this.win][music]) {
      return;
    }
    const previous = this.current;
    if (previous && this.volume > 0) {
      this.fadeout = this.tweens.add({
        targets: previous,
        volume: 0,
        duration: 500,
        onComplete: () => {
          previous.stop();
        },
      });
    }
    const next = [this.menu, this.level, this.win][music];
    next.volume = 0;
    next.play();
    this.current = next;
    this.fadein = this.tweens.add({
      targets: next,
      volume: this.volume,
      duration: 2000,
    });
  }
}
