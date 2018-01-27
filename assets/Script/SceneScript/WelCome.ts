import GameController from "../Controller/GameController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Welcome extends cc.Component
{
    @property(cc.Label)
    startLable: cc.Label = null;

    onLoad (): void
    {
        this.startLable.node.once(cc.Node.EventType.TOUCH_START, this.onStartLabelClick, this);
    }

    private onStartLabelClick(event: cc.Event) : void
    {
        GameController.getInstance().loadScene("Scene_Level1");
    }
}
