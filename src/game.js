import LoadScene from './loadScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';
import LevelScene from './levelScene.js';
import PauseScene from './pauseScene.js';
import WinScene from './winScene.js';
import MusicScene from './musicScene.js';
import SelectScene from './selectScene.js';
import UpgradeScene from './upgradeScene.js';
import InfoScene from './infoScene.js';
import MoneyScene from './moneyScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#444',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 2100},
      // debug: true,
    },
  },
  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    width: 1024,
    height: 576,
  },
  scene: [
    LoadScene,
    TitleScene,
    MenuScene,
    LevelScene,
    PauseScene,
    WinScene,
    MusicScene,
    SelectScene,
    UpgradeScene,
    InfoScene,
    MoneyScene,
  ],
});
