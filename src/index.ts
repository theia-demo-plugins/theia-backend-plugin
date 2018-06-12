/*
 * Copyright (c) 2018-2018 Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

import * as theia from '@wiptheia/plugin';
import * as _ from 'lodash';
import {initEditorsCommands} from './editor';
const disposables: theia.Disposable[] = [];

export function start() {
    initEditorsCommands();
    const command: theia.Command = {
        id: 'simple-plugin-command',
        label: 'Command from simple server plugin'
    };
    disposables.push(
        theia.commands.registerCommand(command, (...args: any[]) => {
            console.log(`>>> Simple plugin command handler was called with arguments: `, args);

            if (typeof (_ as any).all === 'function') {
                console.log('>>> Lodash v3 is present');
            }
        })
    );

    const informationMessageTestCommand = {
        id: 'backend-plugin-information-message-command',
        label: "Test Information Message Server Plugin Item"
    };
    disposables.push(theia.commands.registerCommand(informationMessageTestCommand, (...args: any[]) => {
        theia.window.showInformationMessage('Information message!');
    }));

    const informationModalMessageTestCommand = {
        id: 'backend-plugin-information-modal-message-command',
        label: "Test Information Modal Message Server Plugin Item"
    };
    disposables.push(theia.commands.registerCommand(informationModalMessageTestCommand, (...args: any[]) => {
        theia.window.showInformationMessage('Information modal message!', {modal: true}, {title: 'action1'},
            {title: 'action2', isCloseAffordance: true}, {title: 'action3'}).then(action => {
            console.log('>>> resolve', action);
        });
    }));

    const warningMessageTestCommand = {
        id: 'backend-plugin-warning-message-command',
        label: "Test Warning Message Server Plugin Item"
    };
    disposables.push(theia.commands.registerCommand(warningMessageTestCommand, (...args: any[]) => {
        theia.window.showWarningMessage('Warning message!');
    }));

    const warningModalMessageTestCommand = {
        id: 'backend-plugin-warning-modal-message-command',
        label: "Test Warning Modal Message Server Plugin Item"
    };
    disposables.push(theia.commands.registerCommand(warningModalMessageTestCommand, (...args: any[]) => {
        theia.window.showWarningMessage('Warning modal message!', {modal: true});
    }));

    const errorMessageTestCommand = {
        id: 'backend-plugin-error-message-command',
        label: "Test Error Message Server Plugin Item"
    };
    disposables.push(theia.commands.registerCommand(errorMessageTestCommand, (...args: any[]) => {
        theia.window.showErrorMessage('Error message!');
    }));

    const errorModalMessageTestCommand = {
        id: 'backend-plugin-error-modal-message-command',
        label: "Test Error Modal Message Server Plugin Item"
    };
    disposables.push(theia.commands.registerCommand(errorModalMessageTestCommand, (...args: any[]) => {
        theia.window.showErrorMessage('Error modal message!', {modal: true});
    }));

    const statusBarMessageTestCommandTimeout = {
        id: 'backend-plugin-error-status_bar-message-command-timeout',
        label: "Test Status Bar Message With Timeout 5s"
    };
    disposables.push(theia.commands.registerCommand(statusBarMessageTestCommandTimeout, (...args: any[]) => {
        theia.window.setStatusBarMessage('$(dashboard) test status bar message message timeout 5s!', 5000);
    }));

    const statusBarMessageTestCommandPromise = {
        id: 'backend-plugin-error-status_bar-message-command-promise',
        label: "Test Status Bar Message With Promise 5s"
    };
    disposables.push(theia.commands.registerCommand(statusBarMessageTestCommandPromise, (...args: any[]) => {
        const promise = new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 5000);
        });

        theia.window.setStatusBarMessage('$(dashboard) test status bar message message promise 5s!', promise);
    }));

    const statusBarMessageTestCommandDisposable = {
        id: 'backend-plugin-error-status_bar-message-command-disposable',
        label: "Test Status Bar Message With Disposable 5s"
    };
    disposables.push(theia.commands.registerCommand(statusBarMessageTestCommandDisposable, (...args: any[]) => {
        const disposable = theia.window.setStatusBarMessage('$(dashboard) test status bar message message promise 5s!');
        setTimeout(() => disposable.dispose(), 5000);
    }));

    const statusBarItemCommand = {
        id: 'backend-plugin-error-status_bar_item-command',
        label: "Test Status Bar Item With Timeout 15s"
    };
    disposables.push(theia.commands.registerCommand(statusBarItemCommand, (...args: any[]) => {
        const item = theia.window.createStatusBarItem(theia.StatusBarAlignment.Right, 99);
        item.text = 'Test Configure Excludes';
        item.tooltip = 'To enable project-wide ... language features, exclude large folders.';
        item.color = '#A5DF3B';
        item.show();
        setTimeout(() => item.dispose(), 15000);
    }));
}

export function stop() {
    while (disposables.length) {
        const disposable = disposables.pop();
        disposable.dispose();
    }
}
