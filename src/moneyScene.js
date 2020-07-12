import Profile from './profile.js';

/**
 * Represent the pause modal of the level scene.
 *
 * @export
 * @class MoneyScene
 * @extends {Phaser.Scene}
 */
export default class MoneyScene extends Phaser.Scene {
  /**
   * Creates an instance of MoneyScene.
   * @memberof MoneyScene
   */
  constructor() {
    super('MoneyScene');
  }

  /**
   * Creates the content of the MoneyScene.
   *
   * @param {*} data
   * @memberof MoneyScene
   */
  create(data) {
    this.moneytext = this.add.text(512, 32, `$0`, {
      fontSize: '28px',
      fontFamily: 'font',
      align: 'center',
      lineSpacing: 8,
    });
    this.moneytext.setOrigin(0.5, 0);
  }

  /**
   *
   *
   * @memberof MoneyScene
   */
  update() {
    this.moneytext.text = '$' + Profile.money;
    if (Profile.money >= 150000000) {
      this.moneytext.text += `
Contractual Amount Collected!
Return to the start location!`;
    }
  }
}
