export default class Utils
{
    public static normalToTan(normal: cc.Vec2) : number
    {
        if(normal.x === 0)
        {
            return NaN;
        }

        return normal.y / normal.x;
    }

    public static isInRange(left: number, bottom: number, width: number, height: number, point: cc.Vec2) : boolean
    {
        let right = left + width;
        let top = bottom + height;

        return (left <= point.x && point.x <= right) && (bottom <= point.y && point.y <= top);
    }

    public static instantiate(prefab: cc.Prefab, parent: cc.Node) : cc.Node
    {
        let node = cc.instantiate(prefab);

        if(parent === null)
        {
            node.parent = null;
        }
        else
        {
            parent.addChild(node);
        }

        return node;
    }
}
