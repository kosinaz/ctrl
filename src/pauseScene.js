import Button from './button.js';

/**
 * Represent the pause modal of the level scene.
 *
 * @export
 * @class PauseScene
 * @extends {Phaser.Scene}
 */
export default class PauseScene extends Phaser.Scene {
  /**
   * Creates an instance of PauseScene.
   * @memberof PauseScene
   */
  constructor() {
    super('PauseScene');
  }

  /**
   * Creates the content of the PauseScene.
   *
   * @param {*} data
   * @memberof PauseScene
   */
  create(data) {
    this.opened = true;
    this.bg = this.add.graphics();
    this.bg.fillStyle(0x000000);
    this.bg.fillRect(0, 0, 1024, 576);
    this.bg.setAlpha(0.75);
    this.wastedtext = this.add.text(512, 128, `Wasted`, {
      fontSize: '80px',
      fontFamily: 'font',
      align: 'center',
      lineSpacing: 8,
    });
    this.wastedtip = this.add.text(512, 380, `You have been discovered!
Press F to resume 
from the last safe position!`, {
      fontSize: '24px',
      fontFamily: 'font2',
      align: 'center',
      lineSpacing: 8,
    });
    this.wastedtext.setOrigin(0.5, 0);
    this.wastedtip.setOrigin(0.5, 0);
    this.wastedtext.visible = false;
    this.wastedtip.visible = false;
    if (data.wasted) {
      this.wastedtext.visible = true;
      this.wastedtip.visible = true;
    }
    this.help = this.add.text(512, 128,
        `Use A and D to move and Space to jump!
Use your mouse to select a wall or floor segment!
Use Ctrl + C to copy and Ctrl + V to paste!
You have limited number of times to use Ctrl!
Press F to restart the level!`
        , {
          fontSize: '24px',
          fontFamily: 'font2',
          align: 'center',
          lineSpacing: 16,
        });
    this.help.setOrigin(0.5, 0);
    this.help.visible = false;
    if (data.first) {
      this.help.visible = true;
    }
//     const timeline = this.add.line(0, 0, -50, -50, 0, 0, 0xffffff);
//     timeline.setOrigin(0);
//     const timetext = this.add.text(0, 4, `Finish the mission
// before the time runs out
// to prevent rerouting`, {
//       fontSize: '20px',
//       fontFamily: 'font2',
//       align: 'center',
//       lineSpacing: 8,
//     });
//     timetext.setOrigin(0.5, 0);
//     this.timehint = this.add.container(680, 126, [
//       timeline,
//       timetext,
//     ]);
//     const newhorizonsline = this.add.line(0, 0, 120, 154, 170, 204, 0xffffff);
//     newhorizonsline.setOrigin(0);
//     const newhorizonstext = this.add.text(170, 210, `Control New Horizons
// with WASD or arrows
// to evade the asteroids`, {
//       fontSize: '20px',
//       fontFamily: 'font2',
//       align: 'center',
//       lineSpacing: 8,
//     });
//     newhorizonstext.setOrigin(0.5, 0);
//     this.newhorizonshint = this.add.container(430, 166, [
//       newhorizonsline,
//       newhorizonstext,
//     ]);
//     const photosline1 = this.add.line(0, 0, -48, -98, 0, -50, 0xffffff);
//     photosline1.setOrigin(0);
//     const photosline2 = this.add.line(0, 0, -67, 117, 0, 50, 0xffffff);
//     photosline2.setOrigin(0);
//     const photostext = this.add.text(0, 0, `Take photos
// with Space or Enter
// for science and stars`, {
//       fontSize: '20px',
//       fontFamily: 'font2',
//       align: 'center',
//       lineSpacing: 8,
//     });
//     photostext.setOrigin(0.5);
//     const photoshint = this.add.container(165, 325, [
//       photosline1,
//       photosline2,
//       photostext,
//     ]);
    const pause = new Button(this, 40, 40, 'sprites', 'pause');
    pause.on('click', () => {
      if (!this.opened) {
        this.open();
      } else {
        this.close();
      }
    });
    this.input.keyboard.on('keydown-ESC', (event) => {
      event.preventDefault();
      if (!this.opened) {
        this.open();
      } else {
        this.cameras.main.fadeOut(300);
      }
    });
    this.input.keyboard.on('keydown-PAUSE', (event) => {
      event.preventDefault();
      if (!this.opened) {
        this.open();
      } else {
        this.close();
      }
    });
    const play = new Button(this, 0, 0, 'sprites', 'playon');
    play.on('click', () => {
      this.close();
    });
    this.input.keyboard.on('keydown-ENTER', (event) => {
      event.preventDefault();
      this.close();
    });
    this.input.keyboard.on('keydown-SPACE', (event) => {
      event.preventDefault();
      this.close();
    });
    this.input.keyboard.on('keydown-F', (event) => {
      event.preventDefault();
      this.scene.stop('LevelScene');
      this.scene.start('LevelScene', {
        level: data.level,
        first: true,
      });
    });
    const close = new Button(this, -96, 0, 'sprites', 'close');
    close.on('click', () => {
      this.cameras.main.fadeOut(300);
    });
    const restart = new Button(this, 96, 0, 'sprites', 'restart');
    restart.once('click', () => {
      this.scene.stop('LevelScene');
      this.scene.start('LevelScene', {
        level: data.level,
        first: true,
      });
    });
    const buttons = this.add.container(512, 528, [play, close, restart]);
    this.window = this.add.container(0, 576, [
      this.bg,
      this.wastedtext,
      this.wastedtip,
      this.help,
      // photoshint,
      // this.timehint,
      buttons,
    ]);
    this.open();
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.stop('LevelScene');
      this.scene.start('MenuScene', {
        level: data.level,
      });
    });
  }
  /**
   *
   *
   * @memberof PauseScene
   */
  close() {
    this.opened = false;
    this.tweens.add({
      duration: 150,
      targets: this.window,
      y: 576,
      onComplete: () => {
        this.window.visible = false;
        this.scene.resume('LevelScene');
      },
    });
  }
  /**
   *
   *
   * @memberof PauseScene
   */
  open() {
    // const newhorizons = this.scene.get('LevelScene').newhorizons;
    // if (this.maskgraphics) {
    //   this.maskgraphics.destroy();
    // }
    // this.maskgraphics = this.make.graphics();
    // this.maskgraphics.fillCircle(512, 288, 50);
    // this.maskgraphics.fillCircle(0, 64, 200);
    // this.maskgraphics.fillCircle(70, 506, 70);
    // this.maskgraphics.fillCircle(512, -85, 200);
    // this.bg.mask = this.maskgraphics.createGeometryMask();
    // this.bg.mask.setInvertAlpha();
    // this.newhorizonshint.x = 512;
    // this.newhorizonshint.y = 288;
    this.scene.pause('LevelScene');
    this.opened = true;
    this.window.visible = true;
    this.tweens.add({
      duration: 150,
      targets: this.window,
      y: 0,
    });
  }
}
