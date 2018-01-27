const {ccclass, property} = cc._decorator;

@ccclass
export default class PhysicsInitialzier extends cc.Component
{
    onLoad () : void
    {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = new cc.Vec2(0, -320 * 5);
    }
}
