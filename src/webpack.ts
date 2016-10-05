import * as vscode from "vscode";
import * as fs from "fs";
import { EventEmitter } from "events";

export class ProgressChange extends EventEmitter {
    
}

export class ProgressWatcher {
    watcher: vscode.FileSystemWatcher;
    event = new ProgressChange();
    
    initializeWacher() {
        let tempFile = "/tmp/webpack-progress";
        let watcher = vscode.workspace.createFileSystemWatcher(tempFile, false, false, true);
        watcher.onDidChange( uri => {
            var content = fs.readFileSync(tempFile).toString();
            var percentage = parseInt(content);
            this.event.emit("progressChange", percentage);
        });
        watcher.onDidCreate( uri => {
            console.log(uri.fsPath);
        });
    }
}

export class WebpackProgress {
     private statusBarItem: vscode.StatusBarItem;
     
     updateProgress(percentage) {
         if(!this.statusBarItem) {
             this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
             this.statusBarItem.text = `Webpack ${percentage}%`;
         }
     }
     
     dispose() {
         this.statusBarItem.dispose();
     }
}