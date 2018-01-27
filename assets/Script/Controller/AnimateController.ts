const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimateController extends cc.Component
{
    @property(cc.Vec2)
    moveSpeed: cc.Vec2 = cc.v2();

    @property
    rotateSpeed: number = 0;

    @property
    duration: number = 0;

    @property
    backAndForwardDuration: number = 0;

    private _elapsed: number = 0;
    private _backAndForwardElapsed: number = 0;
    private _moveDirection = 1;

    update (dt: number) : void
    {
        if(this.duration > 0)
        {
            this._elapsed += dt;

            if(this._elapsed >= this.duration)
            {
                return;
            }
        }

        // rotate
        let rotate = this.rotateSpeed * dt;
        this.node.rotation += rotate;

        if(this.backAndForwardDuration > 0)
        {
            this._backAndForwardElapsed += dt;
            
            if(this._backAndForwardElapsed > this.backAndForwardDuration)
            {
                this._moveDirection = -this._moveDirection;
                this._backAndForwardElapsed = 0;
            }
        }

        // move
        let distanceX = this.moveSpeed.x * this._moveDirection *dt;
        let distanceY = this.moveSpeed.y * this._moveDirection * dt;
        this.node.x += distanceX;
        this.node.y += distanceY;
    }
}
