import * as vscode from "vscode";
import * as fs from "fs";
import { EventEmitter } from "events";
import * as os from "os";

export class ProgressWatcher extends EventEmitter {
    timer: NodeJS.Timer;
    initializeWacher() {
        let tempFile = `/tmp/webpack-progress`;
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
     
     updateProgress(percentage) {
         if(!this.statusBarItem) {
             this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
             this.statusBarItem.text = "Webpack 0%";
             this.statusBarItem.color = "mistyrose"
             this.statusBarItem.show();
         }
         this.statusBarItem.text = `Webpack ${percentage}%`;
     }
     
     dispose() {
         this.statusBarItem.dispose();
     }
}