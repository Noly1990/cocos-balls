// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CannonClass from "./cannon";
import BallClass from "./ball";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property
    score: number = 0;

    @property(cc.Node)
    cannon: cc.Node = null;

    @property
    cannonScript: CannonClass = null;

    @property(cc.Prefab)
    planePrefab: cc.Prefab = null;


    @property
    planeSpeed: number = 3;


    @property
    planeInterval: number = 500;


    @property
    planeIndex: number = 0;


    addScore(v: number) {
        this.score = this.score + v;
        this.scoreLabel.string = this.score.toString();
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.cannonScript = this.cannon.getComponent("cannon");
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            let loc = e.getLocation();
            let xx, yy;
            if (loc.x < 0) {
                xx = 0;
            } else if (loc.x > this.node.width) {
                xx = this.node.width
            } else {
                xx = loc.x
            }
            let x = this.node.width / 2 - xx;
            let y = loc.y - this.cannonScript.aY;
            if (y < 0) {
                y = 0;
            }

            let deg = Math.atan(x / y) * 180 / Math.PI;

            this.cannonScript.rotate(-deg);
        })


        setInterval(() => {
            if (this.planeSpeed < 20) {
                this.planeSpeed++;
            }
            if (this.planeInterval > 100) {
                this.planeInterval -= 20;
            }
        }, 5000);

        setInterval(() => {
            this.planeIndex++;
            const { width, height } = this.node;
            const { planeSpeed, planeIndex } = this;
            if (planeIndex % 5 == 0) {
                this.create3Plane(Math.floor(Math.random() * width), height, planeSpeed);
            } else {
                this.createPlane(Math.floor(Math.random() * width), height, planeSpeed);
            }
        }, 300)

    }

    createPlane(x: number, y: number, speed: number) {
        const plane = cc.instantiate(this.planePrefab);
        this.node.addChild(plane);
        plane.setPosition(x, y)
        const planeScript: BallClass = plane.getComponent("plane");
        planeScript.speed = speed;
    }

    create3Plane(x, y, speed) {
        for (let i = 0; i < 3; i++) {
            this.createPlane(x, y + i * 70, speed);
        }
    }

    start() {

    }

    // update (dt) {}
}
