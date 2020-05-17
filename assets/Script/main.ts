// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property
    score: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.scoreLabel.string = this.score.toString();
    }

    start () {

    }

    // update (dt) {}
}
