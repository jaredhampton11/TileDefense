import Component from "../engine/Component.js"
import Game from "../engine/Game.js"
import GameObject from "../engine/GameObject.js"
import Input from "../engine/Input.js"
import PrefabCircle from "../engine/prefabs/PrefabCircle.js"
import PrefabRectangle from "../engine/prefabs/PrefabRectangle.js"
import Collisions from "../engine/Collisions.js"
import PrefabTextLarge from "../engine/prefabs/PrefabTextLarge.js"
import PrefabTextSmall from "../engine/prefabs/PrefabTextSmall.js"

import Time from "../engine/Time.js"


class ControllerComponent extends Component {
  constructor(parent) {
    super(parent);
    this.velocity = 0;
    this.jumpTimer = 0;
    this.jumpStep = 1;
    this.plantID = 0;
    this.plantIDs = [];
    this.timeSinceFire = 0;
    this.timeSinceSpawn = 0;
    this.timeToSpawn = 1;
    this.difficulty = 0.5;
    this.timeSinceDifficultyIncrease = 0;
    this.damage = 100;
    this.energy = 100;
    this.gameStart = true;
    
  }
  update(ctx) {

    let sun = Game.findByNameOne("sun");
    sun.getComponent("Text").text = "Energy:" + this.energy;

    if (Input.getMouseButtonDown(0) > 0) {
      var posX = Input.getMousePositionX();
      var posY = Input.getMousePositionY();
      //console.log("(" + posX + ", " + posY + ")");
      if (posX >= 50 && posX <= 1400 && posY >= 50 && posY <= 800) {
        let relPosX = Math.floor((posX - 50) / 150);
        let relPosY = Math.floor((posY - 50) / 150);

        let columnMult = relPosX
        this.plantID = relPosY;
        this.plantID = columnMult * 5 + relPosY;

        let exists = false;
        for (var i = 0; i < this.plantIDs.length; i++) {
          if (this.plantIDs[i] === this.plantID) {
            exists = true;
            break;
          }
        }

        if (exists === false && this.energy >= 50) {

          this.plantIDs.push(this.plantID);
          let plant = new PrefabRectangle("plant", (relPosX) * 150 + 75, (relPosY) * 150 + 75, 100, 100, "yellow", "black", 500, 100);
          plant.getComponent("RectangleDraw").fillStyle = "yellow";
          plant.layer = 0;
          Game.scene().gameObjects.push(plant);
          this.energy -= 50;
        }

      }
    }

    if (Input.getMouseButtonDown(2) > 0) {
      var posX = Input.getMousePositionX();
      var posY = Input.getMousePositionY();
      //console.log("(" + posX + ", " + posY + ")");
      if (posX >= 50 && posX <= 1400 && posY >= 50 && posY <= 800) {
        let relPosX = Math.floor((posX - 50) / 150);
        let relPosY = Math.floor((posY - 50) / 150);

        let columnMult = relPosX
        this.plantID = relPosY;
        this.plantID = columnMult * 5 + relPosY;

        let exists = false;
        for (var i = 0; i < this.plantIDs.length; i++) {
          if (this.plantIDs[i] === this.plantID) {
            exists = true;
            break;
          }
        }

        if (exists === false && this.energy >= 100) {

          this.plantIDs.push(this.plantID);
          let plant = new PrefabRectangle("plant", (relPosX) * 150 + 75, (relPosY) * 150 + 75, 100, 100, "cyan", "black", 1000, 150);
          plant.getComponent("RectangleDraw").fillStyle = "cyan";
          plant.layer = 0;
          Game.scene().gameObjects.push(plant);
          this.energy -= 100;
        }

      }
    }



    if (this.timeSinceSpawn > this.timeToSpawn) {
      let yRand = Math.floor(Math.random() * 5);
      let zombieStrength = Math.round(Math.random());
      if (zombieStrength === 0) {
        let enemy = new PrefabRectangle("Zombie", 1425, yRand * 150 + 75, 100, 100, "red", "black", 300, 100);
        enemy.getComponent("RectangleDraw").fillStyle = "red";
        enemy.layer = 1;
        Game.scene().gameObjects.push(enemy);
      }
      else
      {
        let enemy = new PrefabRectangle("Zombie", 1425, yRand * 150 + 75, 100, 100, "DarkRed", "black", Math.min(600,Math.max(100,100 * this.difficulty)), 1000);
        enemy.getComponent("RectangleDraw").fillStyle = "DarkRed";
        enemy.layer = 1;
        Game.scene().gameObjects.push(enemy);
      }
      this.timeSinceSpawn = 0;
      this.timeToSpawn = Math.random() * 3 / this.difficulty + 1;
    }

    if (this.timeSinceFire > 3) {
      for (var i = 0; i < this.plantIDs.length; i++) {
        let fire = false;

        for (let enemy of Game.findByName("Zombie")) {
          enemy = enemy.getComponent("Rectangle");
          let lane = this.plantIDs[i] % 5;
          if (lane === Math.floor((enemy.y - 50) / 150)) {
            fire = true;
            break;
          }
        }
        if (fire === true) {
          let pelletY = this.plantIDs[i] % 5;
          let pelletX = (this.plantIDs[i] - pelletY) / 5;
          pelletY *= 150;
          pelletX *= 150;
          pelletY += 125;
          pelletX += 125;
          let pellet = new PrefabCircle("pellet", pelletX, pelletY, 10);
          pellet.getComponent("CircleDraw").fillStyle = "blue";
          pellet.layer = 2;
          Game.scene().gameObjects.push(pellet);
        }
      }
      this.timeSinceFire = 0;
    }

    for (let pellet of Game.findByName("pellet")) {
      pellet = pellet.getComponent("Circle");
      pellet.x += 500 * Time.secondsBetweenFrame;
    }

    this.timeSinceFire += Time.secondsBetweenFrame;
    this.timeSinceSpawn += Time.secondsBetweenFrame;

    for (let enemy of Game.findByName("Zombie")) {
      let zombie = enemy.getComponent("Rectangle");
      zombie.x -= 100 * Time.secondsBetweenFrame;
      for (let pellet of Game.findByName("pellet")) {
        let pellet1 = pellet.getComponent("Circle");
        if (Collisions.inCollision(zombie, pellet1)) {
          enemy.health -= this.damage;
          if (enemy.health <= 0) {
            enemy.markForDelete = true;
            this.energy += 50;
          }
          pellet.markForDelete = true;
        }
      }
      for (let plant of Game.findByName("plant")) {
        let plant1 = plant.getComponent("Rectangle");
        if (Collisions.inCollision(zombie, plant1)) {
          zombie.x += 100 * Time.secondsBetweenFrame;
          plant.health -= enemy.damage * Time.secondsBetweenFrame;

          if (plant.health <= 0) {
            plant.markForDelete = true;
            let tempPosX = Math.floor((plant1.x - 50) / 150);
            let tempPosY = Math.floor((plant1.y - 50) / 150);

            let tempColumnMult = tempPosX
            let tempPlantID = tempPosY;
            tempPlantID = tempColumnMult * 5 + tempPosY;
            this.plantIDs.splice(this.plantIDs.indexOf(tempPlantID));
          }
        }
      }
      if (zombie.x <= 50) {
        Game.changeScene(1);
      }
    }

    if (this.timeSinceDifficultyIncrease > 10) {
      this.difficulty *= 1.25;
      this.timeSinceDifficultyIncrease = 0;
    }
    this.timeSinceDifficultyIncrease += Time.secondsBetweenFrame;




  }

}

export default ControllerComponent;
