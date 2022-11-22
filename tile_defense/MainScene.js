import PrefabCircle from "../engine/prefabs/PrefabCircle.js";
import PrefabTextSmall from "../engine/prefabs/PrefabTextSmall.js";
import PrefabEmpty from "../engine/prefabs/PrefabEmpty.js";
import Scene from "../engine/Scene.js"
import PrefabRectangle from "../engine/prefabs/PrefabRectangle.js";
import Input from "../engine/Input.js";

import ControllerComponent from "./ControllerComponent.js"
import PrefabTextLarge from "../engine/prefabs/PrefabTextLarge.js";

class MainScene extends Scene {
  constructor() {
    super();
  }
  start() {
    //let plantID = 0;
    for (var x = 0; x < 11; x++) {
      for (var y = 0; y < 5; y++) {
        // this.gameObjects.push(new PrefabRectangle(50 + 150 * x, 50 + 150 * y, 150, 150, "green", "black"));
        if (x < 9) {
          this.gameObjects.push(new PrefabRectangle("cell", 50 + 150 * x, 50 + 150 * y, 150, 150, "green", "black"));
        }
        else {
          this.gameObjects.push(new PrefabRectangle("cell", 50 + 150 * x, 50 + 150 * y, 150, 150, "gray", "black"));
        }
        //this.gameObjects.push(new PrefabRectangle(plantID, 75 + 150 * x, 75 + 150 * y, 150 / 1.5, 150 / 1.5, "transparent", "transparent"))
        //plantID++;
      }
    }
    let energy = new PrefabTextSmall("sun", 50, 45, "Energy:100", "yellow");
    
    this.gameObjects.push(energy);

    this.gameObjects.push(new PrefabTextSmall("defenders", 175, 45, "Left click to place yellow squares for 50 energy. Right click to place cyan squares with more health for 100 energy.", "white"));

    this.gameObjects.push(new PrefabTextSmall("tip", 50, 820, "Tip: Difficulty increases every 10 seconds. Attackers spawn faster and dark red squares gain more health.", "white"));



    this.gameObjects.push(new PrefabEmpty("Controller").addComponent(new ControllerComponent()));
  }
}

export default MainScene;