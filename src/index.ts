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
        id: 'simple-backend-plugin-command',
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

    export const CreateTerminalWithHelpArgs: theia.Command = {
        id: "backend-plugin-terminal-created-with-help-args",
        label: "Create terminal with help arguments Server plugin"
    }

    export const CreateTerminalWithOptions: theia.Command = {
        id: "backend-plugin-terminal-created-with-help-options",
        label: "Create terminal with help options Server plugin"
    }

    export const SendTextToTheTerminal: theia.Command = {
        id: "backend-plugin-send-text-to-the-terminal",
        label: "Send text to the terminal Server plugin"
    }

    export const HidePanelWithTerminal: theia.Command = {
        id: "backend-plugin-hide-terminal-panel",
        label: "Hide terminal panel after 3 sec Server plugin"
    }

    export const ShowTerminalWithDelay: theia.Command = {
        id: "backend-plugin-show-terminal-with-delay",
        label: "Show terminal after 3 sec Server plugin"
    }

    export const DisposeTerminal: theia.Command = {
        id: "backend-plugin-dispose-terminal",
        label: "Dispose terminal after 3 sec Server plugin"
    }

    export const SibscribeToOnDidCloseTeminalEvent: theia.Command = {
        id: "backend-plugin-subscibe-on-did-close-terminal-event",
        label: "Subscribe to onDidCloseTerminal event Server plugin"
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
    disposables.push(theia.commands.registerCommand(Commands.CreateTerminalWithHelpArgs, () => {
        const terminal = theia.window.createTerminal("Sh Terminal", "sh", ["-l"]);
        terminal.show();
    }));

    disposables.push(theia.commands.registerCommand(Commands.CreateTerminalWithOptions, () => {
        const termOptions: theia.TerminalOptions = {
            name: "Test terminal",
            shellPath: "/bin/bash",
            shellArgs: ["-l"],
            env: {"HELLO": "Hello Theia."},
            // cwd: "/home/user/projects/che" // any existed absolute path or url to the folder
        }
        const terminal = theia.window.createTerminal(termOptions);
        terminal.show();
    }));

    disposables.push(theia.commands.registerCommand(Commands.SendTextToTheTerminal, () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        terminal.sendText("clear && echo Theia plugin terminal.\n");
    }));

    disposables.push(theia.commands.registerCommand(Commands.HidePanelWithTerminal, () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        setTimeout(function() {
            terminal.hide();
        }, 3000);
    }));

    disposables.push(theia.commands.registerCommand(Commands.ShowTerminalWithDelay, () => {
        const terminal = createTerminalWithOptions();
        setTimeout(function() {
            terminal.show();
        }, 3000);
    }));

    disposables.push(theia.commands.registerCommand(Commands.DisposeTerminal, () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        setTimeout(function() {
            terminal.dispose();
        }, 3000);
    }));

    disposables.push(theia.commands.registerCommand(Commands.SibscribeToOnDidCloseTeminalEvent, () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        terminal.processId.then(id => {
            theia.window.onDidCloseTerminal(async (term) => {
                const curId = await term.processId;
                if (curId === id) {
                    console.log("Terminal closed, id: ", id);
                }
            }, id);
        });
    }));
}

function createTerminalWithOptions(): theia.Terminal {
    const termOptions: theia.TerminalOptions = {
        name: "Test terminal",
        shellPath: "/bin/bash"
    }
    return theia.window.createTerminal(termOptions);
}

export function stop() {
    while (disposables.length) {
        const disposable = disposables.pop();
        disposable.dispose();
    }
}
