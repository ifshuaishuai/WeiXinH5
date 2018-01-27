import Utils from "../Utils/Utils";
import Log from "../Utils/Log";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component
{
    @property
    moveSpeed: number = 500;

    private _initial: boolean;

    private _jumpAction: cc.Action;

    private _canvas: cc.Canvas = null;

    private _downTouchs: Map<number, boolean> = null;       // true 右， false 左
    private _downKeyboard: Map<number, boolean> = null;      // true 右， false 左

    update (dt: number)
    {
        if(!this._initial)
        {
            return;
        }

        let speedX = this.getSpeedHorizontal();

        this.node.x += (speedX * this.moveSpeed * dt);
    }

    private getSpeedHorizontal() : number
    {
        let speed = 0;

        if(this._downTouchs.size > 0)
        {
            this._downTouchs.forEach((value: boolean, key: number) => 
            {
                speed += (value ? 1 : -1);
            });
        }

        if(this._downKeyboard.size > 0)
        {
            this._downKeyboard.forEach((value: boolean, key: number) => 
            {
                speed += (value ? 1 : -1);
            });
        }

        if(speed === 0)
        {
            return 0;
        }
        else
        {
            return speed / Math.abs(speed);
        }
    }

    // 注册事件
    public registerEvents () : void
    {
        this._downTouchs = new Map<number, boolean>();
        this._downKeyboard = new Map<number, boolean>();

        this._canvas = cc.find("Canvas").getComponent(cc.Canvas);
        this.setTouchEvent();

        this.setKeyEvent();

        this._initial = true;
    }

    // 删除所有事件
    public destroyEvents() : void
    {
        this._downTouchs = null;
        this._downKeyboard = null;

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this._canvas.node.off(cc.Node.EventType.TOUCH_START, this.onTouchDown, this)
        this._canvas.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchCancel, this)
        this._canvas.node.off(cc.Node.EventType.TOUCH_END, this.onTouchUp, this)

        this._initial = false;
    }

    private setKeyEvent() : void
    {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    private setTouchEvent(): void
    {
        this._canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchDown, this)
        this._canvas.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
        this._canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchUp, this)
    }

    private onKeyDown(event) : void
    {
        let keyCode: number = event.keyCode;
        
        switch(keyCode)
        {
            case cc.KEY.a:
                this._downKeyboard.set(keyCode, false);
                break;
            
            case cc.KEY.d:
                this._downKeyboard.set(keyCode, true);
                break;

            default:
                break;
        }
    }

    private onKeyUp(event) : void
    {
        let keyCode: number = event.keyCode;
        switch(keyCode)
        {
            case cc.KEY.a:
                this._downKeyboard.delete(keyCode);
                break;

            case cc.KEY.d:
                this._downKeyboard.delete(keyCode);
                break;

            default:
                break;
        }
    }

    private onTouchDown(event: cc.Event.EventTouch) : void
    {
        let width = this._canvas.node.width;
        let height = this._canvas.node.height;

        let touchs = event.getTouches();
        let length = touchs.length;

        for(let i=0; i<length; ++i)
        {
            let touch = touchs[i];
            let touchId: number = touch["__instanceId"];
            let point: cc.Vec2 = touch["_point"];

            if(Utils.isInRange(width/2, 0, width/2, height, point))
            {
                this._downTouchs.set(touchId, true);
            }
            else
            {
                this._downTouchs.set(touchId, false);
            }
        }

    }

    private onTouchCancel(event: cc.Event.EventTouch) : void
    {
        this.removeTouchEvent(event);
    }

    private onTouchUp(event: cc.Event.EventTouch) : void
    {
        this.removeTouchEvent(event);
    }

    private removeTouchEvent(event: cc.Event.EventTouch) : void
    {
        let touchs = event.getTouches();
        let length = touchs.length;

        for(let i=0; i<length; ++i)
        {
            let touch = touchs[i];
            let touchId: number = touch["__instanceId"];

            this._downTouchs.delete(touchId);
        }
    }
}
