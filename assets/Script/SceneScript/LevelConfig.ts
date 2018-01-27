const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelConfig extends cc.Component
{
    @property(cc.Vec2)
    positionPlayer: cc.Vec2 = cc.v2();

}
