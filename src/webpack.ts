import * as vscode from "vscode";
import * as fs from "fs";
import { EventEmitter } from "events";
import * as os from "os";

export class ProgressWatcher extends EventEmitter {
    timer: NodeJS.Timer;
    initializeWacher() {
        let tempFile = `${os.tmpdir()}/webpack-progress`;
        let lastModify = new Date(200,10,10);
        this.timer = setInterval(() => {
            fs.stat(tempFile, (err, state) => {
                if(!err && state.mtime > lastModify) {
                    var content = fs.readFileSync(tempFile).toString();
                    var percentage = parseInt(content);
                    this.emit("progressChange", percentage);
                    lastModify = state.mtime;
                }
            });
        }, 1000);
    }

    dispose() {
        clearInterval(this.timer);
    }
}

export class WebpackProgress {
     private statusBarItem: vscode.StatusBarItem;
     private lastPercentage: number;
     private resetTimout: any;
     private statusLabel:string = 'Webpack';

     updateProgress(percentage) {
         if(!this.statusBarItem) {
             this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
             this.statusBarItem.text = this.statusLabel;
             this.statusBarItem.show();
         }
        if (typeof this.lastPercentage === 'undefined') this.statusBarItem.text = this.statusLabel;
        else this.statusBarItem.text = typeof percentage == 'number' ? `${this.statusLabel} ${percentage}%` : this.statusLabel;
        if (percentage == 100 && typeof this.lastPercentage !== 'undefined') this.resetProgress();
        this.lastPercentage = percentage;
     }

    resetProgress() {
        this.statusBarItem.text = `${this.statusLabel} √`;
        clearTimeout(this.resetTimout);
        this.resetTimout = setTimeout(() => this.statusBarItem.text = this.statusLabel, 5000);
    }

     dispose() {
         this.statusBarItem.dispose();
     }
}