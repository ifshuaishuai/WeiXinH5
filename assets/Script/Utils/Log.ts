export default class Log
{
    public static d(message: string) : void
    {
        console.debug(message);
    }

    public static w(message: string) : void
    {
        console.log(`warnning: ${message}`);
    }

    public static e(message: string) : void
    {
        console.error(message);
    }
}
