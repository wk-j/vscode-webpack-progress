'use strict';
import * as vscode from 'vscode';
import { 
    ProgressWatcher, 
    WebpackProgress 
} from "./webpack";

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "webpack-progress" is now active!');

    let progress = new WebpackProgress();
    let watcher = new ProgressWatcher();
    watcher.initializeWacher();
    watcher.event.on("progressChange", (percentage) => {
        console.log(percentage);
        progress.updateProgress(percentage);
    });
    
    context.subscriptions.push(progress);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
