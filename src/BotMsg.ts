export default class BotMsg {
    bot:any;
    message:any;
    readableMsg: any;


    constructor(bot:any, message:any, readableMsg:any) {
        this.bot = bot;
        this.message = message;
        this.readableMsg = readableMsg;
    }
}