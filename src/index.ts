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

import * as theia from '@theia/plugin';
import * as _ from 'lodash';
const disposables: theia.Disposable[] = [];

export namespace Commands {
    export const SimpleCommand: theia.Command = {
        id: 'simple-plugin-command',
        label: 'Command from simple server plugin'
    };

    export const InformationMessageTest = {
        id: 'backend-plugin-information-message-command',
        label: "Test Information Message Server Plugin Item"
    }

    export const InformationModalMessageTest = {
        id: 'backend-plugin-information-modal-message-command',
        label: "Test Information Modal Message Server Plugin Item"   
    };

    export const WarningMessageTest = {
        id: 'backend-plugin-warning-message-command',
        label: "Test Warning Message Server Plugin Item"        
    };

    export const WarningModalMessageTest = {
        id: 'backend-plugin-warning-modal-message-command',
        label: "Test Warning Modal Message Server Plugin Item"     
    };

    export const ErrorMessageTest = {
        id: 'backend-plugin-error-message-command',
        label: "Test Error Message Server Plugin Item"
    };

    export const ErrorModalMessageTest = {
        id: 'backend-plugin-error-modal-message-command',
        label: "Test Error Modal Message Server Plugin Item"       
    };

    export const CreateTerminalWithParams: theia.Command = {
        id: "backend-plugin-test-terminal-created-with-help-parameters-command",
        label: "Test terminal created with help parameteres"
    }

    export const CreateTerminalWithOptions: theia.Command = {
        id: "backend-plugin-test-terminal-created-with-help-options-command",
        label: "Test terminal created with help options"
    }

    export const SendTextToTheTerminal: theia.Command = {
        id: "backend-plugin-test-send-text-to-the-command",
        label: "Test send text to the terminal"
    }

    export const HideTerminal: theia.Command = {
        id: "backend-plugin-test-hide-terminal",
        label: "Test hide terminal after 5 sec"
    }

    export const SibscribeOnDidCloseTeminalEvent: theia.Command = {
        id: "backend-plugin-test-subscibe-on-did-close-terminal-event",
        label: "Test subscribe onDidCloseTerminal event"
    } 
}

export function start() {
    /*----------------- Command api ------------------*/
    disposables.push(
        theia.commands.registerCommand(Commands.SimpleCommand, (...args: any[]) => {
            console.log(`>>> Simple plugin command handler was called with arguments: `, args);

            if (typeof (_ as any).all === 'function') {
                console.log('>>> Lodash v3 is present');
            }
        })
    );

    /*----------------- Notification api ------------------*/
    disposables.push(theia.commands.registerCommand(Commands.InformationMessageTest, (...args: any[]) => {
        theia.window.showInformationMessage('Information message!');
    }));

    disposables.push(theia.commands.registerCommand(Commands.InformationModalMessageTest, (...args: any[]) => {
        theia.window.showInformationMessage('Information modal message!', {modal: true}, {title: 'action1'},
            {title: 'action2', isCloseAffordance: true}, {title: 'action3'}).then(action => {
            console.log('>>> resolve', action);
        });
    }));

    disposables.push(theia.commands.registerCommand(Commands.WarningMessageTest, (...args: any[]) => {
        theia.window.showWarningMessage('Warning message!');
    }));

    disposables.push(theia.commands.registerCommand(Commands.WarningModalMessageTest, (...args: any[]) => {
        theia.window.showWarningMessage('Warning modal message!', {modal: true});
    }));

    disposables.push(theia.commands.registerCommand(Commands.ErrorMessageTest, (...args: any[]) => {
        theia.window.showErrorMessage('Error message!');
    }));

    disposables.push(theia.commands.registerCommand(Commands.ErrorModalMessageTest, (...args: any[]) => {
        theia.window.showErrorMessage('Error modal message!', {modal: true});
    }));

    /*----------------- Terminal api ------------------*/
    disposables.push(theia.commands.registerCommand(Commands.CreateTerminalWithParams, () => {
        const terminal = theia.window.createTerminal("Bash Terminal", "sh", ["-l"]);
        terminal.processId.then(id => {
                    theia.window.onDidCloseTerminal(async (term) => {
                        const curId = await term.processId;
                        if (curId === id) {
                            console.log("Terminal closed ", id);
                        }
                    }, id);
                });
        terminal.show();
    }));

    disposables.push(theia.commands.registerCommand(Commands.CreateTerminalWithOptions, () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        }));
    
    disposables.push(theia.commands.registerCommand(Commands.SendTextToTheTerminal, () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        terminal.sendText("Theai plugin terminal.");
    }));

    disposables.push(theia.commands.registerCommand(Commands.HideTerminal, () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        setTimeout(function() {
            terminal.hide();
        }, 5000);
    }));

    disposables.push(theia.commands.registerCommand(Commands.SibscribeOnDidCloseTeminalEvent, () => {
        const terminal = createTerminalWithOptions();
        terminal.processId.then(id => {
                    theia.window.onDidCloseTerminal(async (term) => {
                        const curId = await term.processId;
                        if (curId === id) {
                            console.log("Terminal closed ", id);
                        }
                    }, id);
                });
        terminal.show();
    }));
}

export function stop() {
    while (disposables.length) {
        const disposable = disposables.pop();
        disposable.dispose();
    }
}

function createTerminalWithOptions(): theia.Terminal {
    const termOptions: theia.TerminalOptions = {
        name: "Test terminal",
        shellPath: "sh",
        shellArgs: ["-l"],
        env: {"TERM":"xterm-256color"},
        // cwd: "/path/to/workspace" todo we need get workspace path from api
    }
    return theia.window.createTerminal(termOptions);
}

// todo Seems quick pick samples missed up.