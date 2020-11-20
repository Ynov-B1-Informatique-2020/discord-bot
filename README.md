# discord-bot
## About

A discord bot made by the *Toulouse Ynov Campus B1 Informatique G2 (2020/2021)* to improve our skills in **GIT** and **JavaScript**/**NodeJS** 

>Un bot discord réalisé par la classe *Toulouse Ynov Campus B1 Informatique G2
>(2020/2021)* pour améliorer nos compétences en **GIT** et **JavaScript**/**NodeJS**

## Commands
- `about` - Gives information about the bot
- `avatar` - Bot gives the avatar of the command author
- `chuck` - Bot gives a joke related to Chuck Norris
- `date` - Bot gives the date at the desired location
- `deleteafter` - Bot deletes the message after the given delay
- `echo` - Bot sends back the arguments
- `ping` - Bot replies *pong*
- `random` - Bot gives a random number, between the specified bounds if they exist
- `sha1` - Bot encrypts the given message in SHA-1
- `twitter` - Bot gives the *Twitter* url
- `weather` - Bot gives the weather at the desired location
- `clear [amount]` - Bot delete the selected amount of messages (needs MANAGE_MESSAGES permission)

---

## Local Configuration

Rename `config.sample.json` to `config.json` and replace `<token here>` by the bot token, and change to prefix to whatever you want. 

> Renommez `config.sample.json` en `config.json` et remplacez `<token here>` par
> le token du bot, et changez le préfixe en ce que vous voulez.

To get the bot token send a message to [@zaosoula](https://github.com/zaosoula)

## Local Installation

- Install [node.js](https://nodejs.org/en/)
- Clone the repo with Github Desktop or use ``git clone``
- [cd](https://en.wikipedia.org/wiki/Cd_%28command%29) to the directory and run `npm install`
- Run `node index.js`

## Updating

To update the bot with your collaborators changes, run: `git pull && npm install`.

---


## Contributors

- Zao Soula  - [@zaosoula](https://github.com/zaosoula)

## [License - MIT](LICENSE)

Copyright (c) 2020 Zao Soula

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
