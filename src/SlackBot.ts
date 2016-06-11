import {Subject} from 'rxjs/Subject';
import BotMsg from './BotMsg';
var config = require('config');
var Botkit:any = require('botkit');

export default class SlackBot {
    controller:any;
    beans:Subject<any>;
    getBeans: Subject<any>;
    constructor() {
        var dbConfig = config.get('bot.slackToken');
        this.beans = new Subject();
        this.getBeans = new Subject();
        this.controller = Botkit.slackbot({
            debug: false
        });

        this.controller.spawn({
            token: dbConfig
        }).startRTM();

        this.handleBeans();
    }

    public handleBeans() {
        this.controller.hears('get (.*), (.*)', ['direct_message', 'direct_mention', 'mention'], (bot:any, message:any) => {
            var arg = message.match[1];
            var arg2 = message.match[2];
            let msg:BotMsg = new BotMsg(bot, message, {'bean': arg, 'attr': arg2});
            this.beans.next(msg);
        });
        this.controller.hears('set (.*)', ['direct_message', 'direct_mention', 'mention'], (bot:any, message:any) => {
            return bot.reply(message, 'I\'m sorry. I\'m afraid I can\'t do that.');
        });
    }

}
