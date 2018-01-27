export default class Assert
{
    public static isNull(obj: any, message?: string) : void
    {
        if(obj !== null)
        {
            let msg = message ? `obj !== null ${message}` : `obj !== null`;
            console.error(msg);
        }
    }

    public static isNotNull(obj: any, message?: string) : void
    {
        if(obj === null)
        {
            let msg = message ? `obj === null ${message}` : `obj === null`;
            console.error(msg);
        }
    }

    public static areEqual(expect: any, got: any, message?: string) : void
    {
        if(expect !== got)
        {
            let msg = message ? `expect: ${expect} but got: ${got} ${message}` : `expect: ${expect} but got: ${got}`;
            console.error(msg);
        }
    }

    public static areNotEqual(expect: any, got: any, message?: string) : void
    {
        if(expect === got)
        {
            let msg = message ? `expect: ${expect} === got: ${got} ${message}` : `expect: ${expect} === got: ${got}`;
            console.error(msg);
        }
    }
}
