import 'rxjs';
import {JmxTerm} from './JmxTerm';
import SlackBot from './SlackBot';
import BotMsg from './BotMsg';


class Application {
    constructor() {
        let jmxTerm = new JmxTerm();
        let bot = new SlackBot();

        bot.beans.subscribe((i:BotMsg) => {
            jmxTerm.getAttribute({
                'bot': i.bot,
                'message': i.message
            }, i.readableMsg.bean, i.readableMsg.attr);

        });

        jmxTerm.log.subscribe(data => {
            data.bot.message.text = data.msg;
            data.bot.bot.say(data.bot.message);
        });

    }
}

new Application();