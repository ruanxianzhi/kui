/*
 * Copyright 2017 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { isHeadless } from '@kui-shell/core/core/capabilities'
import { CommandRegistrar } from '@kui-shell/core/models/command'

import run from './lib/cmds/run'
import quit from './lib/cmds/quit'
import clear from './lib/cmds/clear'
import about from './lib/cmds/about/about'
import base64 from './lib/cmds/base64'
import openui from './lib/cmds/open-ui-from-terminal'
import prompt from './lib/cmds/prompt'
import sleep from './lib/cmds/sleep'
import history from './lib/cmds/history/history'
import confirm from './lib/cmds/confirm'

// import updater from './lib/admin/updater'

/**
 * This is the module
 *
 */
export default async (commandTree: CommandRegistrar) => {
  await Promise.all([
    openui(commandTree),
    run(commandTree),
    quit(commandTree),
    clear(commandTree),
    base64(commandTree),
    prompt(commandTree),
    sleep(commandTree),
    history(commandTree),
    about(commandTree),
    confirm(commandTree),
    run(commandTree)
  ])

  if (!isHeadless()) {
    await Promise.all([
      import('./lib/cmds/window').then(_ => _.default(commandTree)),
      import('./lib/cmds/screenshot').then(_ => _.default(commandTree)),
      import('./lib/cmds/theme').then(_ => _.plugin(commandTree))
    ])
  }

  // updater(commandTree) <-- disabled for now
}
