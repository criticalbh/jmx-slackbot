import SimpleHost from './SimpleHost';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
export default class JmxProcess {
    process:any;
    host:SimpleHost;
    started:Subject<any>;
    private output:Subject<any>;


    constructor() {
        this.started = new Subject();
        this.output = new Subject();
        
        this.started.subscribe(() => {
            let lineBuffer = '> *' + this.host.alias + '* : ';
            this.process.stdout.on('data', (d) => {
                let data = d.toString();
                lineBuffer += data;
                if (data.indexOf(';') > -1) {
                    this.output.next(lineBuffer);
                    lineBuffer = '> *' + this.host.alias + '* : ';
                }
            });
        })
    }

    public getOutput():Observable<any> {
        return this.output.asObservable().filter(o => {
            return o.length > 0;
        });
    }

    public executeCmd(cmd:string) {
        this.process.stdin.write(cmd + '\n');
    }

    public getAttribute(bean:string, attribute:string) {
        this.process.stdin.write('bean ' + bean + '\n');
        this.process.stdin.write('get ' + attribute + '\n');
    }
}