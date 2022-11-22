import Game from "../engine/Game.js";
import Time from "../engine/Time.js";
import Component from "../engine/Component.js";

class DeathControllerComponent extends Component {
    constructor(parent) {
        super(parent);
        this.timeOnScreen = 0;
        this.RestartTime = 5;
    }
    update(ctx){
        this.timeOnScreen += Time.secondsBetweenFrame;
        if (this.timeOnScreen >= this.RestartTime){
            Game.changeScene(0);
        }
    }
}

export default DeathControllerComponent;