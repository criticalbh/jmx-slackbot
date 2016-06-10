const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

import {Subject, Observable} from 'rxjs';

declare var process:any;

export class JmxTerm {
    name:string = 'jmxterm-1.0-alpha-4-uber.jar';
    process:any;
    started:Subject<any>;

    constructor() {
        this.started = new Subject();
        // this.onStart().subscribe((a) => {
        //     console.log(a);
        // })

    }

    start():Observable<any> {
        this.process = spawn('java', ['-jar', this.name]);
        this.process.stdout.pipe(process.stdout);
        // this.process.stderr.on('data', (data) => {
        //     this.started.next(String(data));
        // });

        this.process.stderr.on('data', (d) => {
            console.log(String(d));
        });
        this.process.stdin.write('open 10.162.0.96:6002\n');
        this.process.stdin.write('bean dataSource:name=DataSource\n');
        this.process.stdin.write('get NumActive\n');


        return this.onStart();
    }

    onStart() {
        return this.started.asObservable();
        //     .filter(data => {
        //     return data.indexOf('>') > -1;
        // });
    }
}
