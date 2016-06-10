import 'rxjs';
var Botkit:any = require('botkit');
import {JmxTerm} from './JmxTerm';


class Application {
    constructor() {
        let a = new JmxTerm();
        a.start();

    }
}

new Application();