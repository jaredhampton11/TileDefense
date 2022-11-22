import PrefabCircle from "../engine/prefabs/PrefabCircle.js";
import PrefabTextSmall from "../engine/prefabs/PrefabTextSmall.js";
import PrefabEmpty from "../engine/prefabs/PrefabEmpty.js";
import Scene from "../engine/Scene.js"
import PrefabRectangle from "../engine/prefabs/PrefabRectangle.js";
import Input from "../engine/Input.js";

import ControllerComponent from "./ControllerComponent.js"
import DeathControllerComponent from "./DeathControllerComponent.js"
import PrefabTextLarge from "../engine/prefabs/PrefabTextLarge.js";
import Game from "../engine/Game.js";

class MainScene extends Scene {
  constructor() {
    super();
  }
  start() {
    //let plantID = 0;
    let deathMSG = new PrefabTextLarge("death", 250, 250, "Game Over", "white");
    //let continueMSG = new PrefabTextSmall("continue", 250, 400, "Left click to try again");
    this.gameObjects.push(deathMSG);
    //this.gameObjects.push(continueMSG);



    this.gameObjects.push(new PrefabEmpty("ControllerDeath").addComponent(new DeathControllerComponent()));
  }
}

export default MainScene;