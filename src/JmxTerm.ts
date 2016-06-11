import JmxProcess from './JmxProcess';
import * as _ from 'lodash';
const spawn = require('child_process').spawn;
var config = require('config');

import {Subject} from 'rxjs';
import SimpleHost from './SimpleHost';

declare var process:any;

export class JmxTerm {
    name:string = 'jmxterm-1.0-alpha-4-uber.jar';
    process:any;
    log:Subject<any>;
    jmxProcesses:Array<JmxProcess> = [];
    bot:any;

    constructor() {
        var hosts = config.get('jmx.hosts');
        this.log = new Subject();
        this.openConnections(hosts);
        this.startOutput();
    }

    private openConnections(hosts) {
        _.forEach(hosts, (host:SimpleHost) => {
            this.open(host);
        });
    }

    private startOutput() {
        _.forEach(this.jmxProcesses, (proc:JmxProcess) => {
            proc.getOutput().subscribe(data => {
                this.log.next({
                    'bot': this.bot,
                    'msg': data
                });
            });
        });
    }

    private open(host:SimpleHost) {
        let newProcess = new JmxProcess();
        let process = spawn('java', ['-jar', this.name]);
        process.stdin.write('open ' + host.host + ':' + host.port + '\n');
        newProcess.host = host;
        newProcess.process = process;
        newProcess.started.next('started');
        this.jmxProcesses.push(newProcess);
    }


    public getAttribute(bot:any, bean: string, attr: string) {
        this.bot = bot;
        _.forEach(this.jmxProcesses, (proc:JmxProcess) => {
            proc.getAttribute(bean, attr);
        });
    }
    


}
