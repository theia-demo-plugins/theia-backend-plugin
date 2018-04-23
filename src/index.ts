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
const disposables: theia.Disposable[] = [];

export function start() {
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
}

export function stop() {
    while (disposables.length) {
        const disposable = disposables.pop();
        disposable.dispose();
    }
}