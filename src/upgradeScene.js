import Button from './button.js';
import Profile from './profile.js';

/**
 * Represents the upgrade scene.
 *
 * @export
 * @class UpgradeScene
 * @extends {Phaser.Scene}
 */
export default class UpgradeScene extends Phaser.Scene {
  /**
   * Creates an instance of UpgradeScene.
   * @memberof UpgradeScene
   */
  constructor() {
    super('UpgradeScene');
  }

  /**
   * Creates the content of the UpgradeScene.
   *
   * @memberof UpgradeScene
   */
  create() {
    let opened = false;
    this.add.image(88, 536, 'sprites', 'starcounter');
    const starcounter = this.add.text(110, 536, Profile.star + '★', {
      fontSize: '24px',
      fontFamily: 'font',
    });
    starcounter.setOrigin(0.5);
    const upgrade = new Button(this, 40, 536, 'sprites', 'upgrade');
    upgrade.on('click', () => {
      if (!opened) {
        window.visible = true;
        opened = true;
        this.tweens.add({
          duration: 50,
          targets: window,
          x: 120,
        });
      } else {
        opened = false;
        this.tweens.add({
          duration: 50,
          targets: window,
          x: -96,
          onComplete: () => {
            window.visible = false;
          },
        });
      }
    });
    const ralphborder = this.add.image(0, 0, 'sprites', 'upgradeborder');
    const ralphbutton = new Button(this, -64, 24, 'sprites', 'ralph');
    const ralphtext = this.add.text(0, -20, Profile.range + '★ 🡆 1⛶', {
      fontSize: '24px',
      fontFamily: 'font',
    });
    ralphtext.setOrigin(0.5);
    const ralphbars = this.add.container(0, 22);
    for (let i = 0; i < 5; i += 1) {
      const bar = this.add.image(i * 15 - 29.5, 0, 'sprites', 'audiobar');
      ralphbars.add(bar);
      if (Profile.range - 2 < i) {
        bar.visible = false;
      }
    }
    ralphbutton.on('click', () => {
      if (Profile.range === 6 || Profile.star < Profile.range) {
        return;
      }
      Profile.star -= Profile.range;
      Profile.range += 1;
      localStorage.setItem('star', Profile.star);
      localStorage.setItem('range', Profile.range);
      starcounter.text = Profile.star + '★';
      if (Profile.range === 6) {
        ralphtext.text = 'MAX';
      } else {
        ralphtext.text = Profile.range + '★ 🡆 1⛶';
      }
      ralphbars.list[Profile.range - 2].visible = true;
    });
    const ralph = this.add.container(0, -112, [
      ralphborder,
      ralphtext,
      ralphbutton,
      ralphbars,
    ]);
    const rtgborder = this.add.image(0, 0, 'sprites', 'upgradeborder');
    const rtgbutton = new Button(this, -64, 24, 'sprites', 'rtg');
    const rtgtext = this.add.text(0, -20, Profile.photo + '★ 🡆 3🖾', {
      fontSize: '24px',
      fontFamily: 'font',
    });
    rtgtext.setOrigin(0.5);
    const rtgbars = this.add.container(0, 22);
    for (let i = 0; i < 5; i += 1) {
      const bar = this.add.image(i * 15 - 29.5, 0, 'sprites', 'audiobar');
      rtgbars.add(bar);
      if (Profile.photo - 2 < i) {
        bar.visible = false;
      }
    }
    rtgbutton.on('click', () => {
      if (Profile.photo === 6 || Profile.star < Profile.photo) {
        return;
      }
      Profile.star -= Profile.photo;
      Profile.photo += 1;
      localStorage.setItem('star', Profile.star);
      localStorage.setItem('photo', Profile.photo);
      starcounter.text = Profile.star + '★';
      if (Profile.photo === 6) {
        rtgtext.text = 'MAX';
      } else {
        rtgtext.text = Profile.photo + '★ 🡆 3🖾';
      }
      rtgbars.list[Profile.photo - 2].visible = true;
    });
    const rtg = this.add.container(0, 0, [
      rtgborder,
      rtgtext,
      rtgbutton,
      rtgbars,
    ]);
    const vbsdcborder = this.add.image(0, 0, 'sprites', 'upgradeborder');
    const vbsdcbutton = new Button(this, -64, 24, 'sprites', 'vbsdc');
    const vbsdctext = this.add.text(0, -20, Profile.time + '★ 🡆 1:00', {
      fontSize: '24px',
      fontFamily: 'font',
    });
    vbsdctext.setOrigin(0.5);
    const vbsdcbars = this.add.container(0, 22);
    for (let i = 0; i < 5; i += 1) {
      const bar = this.add.image(i * 15 - 29.5, 0, 'sprites', 'audiobar');
      vbsdcbars.add(bar);
      if (Profile.time - 2 < i) {
        bar.visible = false;
      }
    }
    vbsdcbutton.on('click', () => {
      if (Profile.time === 6 || Profile.star < Profile.time) {
        return;
      }
      Profile.star -= Profile.time;
      Profile.time += 1;
      localStorage.setItem('star', Profile.star);
      localStorage.setItem('time', Profile.time);
      starcounter.text = Profile.star + '★';
      if (Profile.time === 6) {
        vbsdctext.text = 'MAX';
      } else {
        vbsdctext.text = Profile.time + '★ 🡆 1:00';
      }
      vbsdcbars.list[Profile.time - 2].visible = true;
    });
    const vbsdc = this.add.container(0, 112, [
      vbsdcborder,
      vbsdctext,
      vbsdcbutton,
      vbsdcbars,
    ]);
    const bg = this.add.image(0, 0, 'sprites', 'sidepanel').setAlpha(0.99);
    const window = this.add.container(-96, 288, [
      bg,
      ralph,
      rtg,
      vbsdc,
    ]);
    window.visible = false;
    if (Profile.star > 0) {
      window.visible = true;
      opened = true;
      this.tweens.add({
        duration: 50,
        targets: window,
        x: 120,
      });
    }
  }
}
