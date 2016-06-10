import 'rxjs';
var Botkit:any = require('botkit');
import {JmxTerm} from './JmxTerm';
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

class Application {
    constructor() {
        // var controller:any = Botkit.slackbot({
        //     debug: false
        //     //include "log: false" to disable logging
        //     //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
        // });
        // controller.spawn({
        //     token: 'xoxb-19738009890-DCk3W0IevwGRfTZR3FevhCOS'
        // }).startRTM();
        // controller.hears('hello', ['direct_message', 'direct_mention', 'mention'], function (bot: any, message: any) {
        //
        //     bot.reply(message, 'Hello yourself.');
        //
        // });
        //



        
        let a = new JmxTerm();
        a.start();

    }
}

let app = new Application();