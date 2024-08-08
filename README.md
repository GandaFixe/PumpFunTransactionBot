# PumpFunBumpBot
Free to use bump bot for your pump fun tokens
# pump-fun-bump-bot

This bot buy and sell automatically on pump.fun and raydium. 
This bot is open-source and to support the project a fixed amount is taken off of every transaction.
it can be used to be displayed on the main page of pump.fun.

## Demo 

[![Demo](https://img.youtube.com/vi/KIq8JfL0Ws0/0.jpg)](https://www.youtube.com/watch?v=c6FyrAK1pP4)


## Download the bot

If you have git installed on your computer you can fetch the content of this repository with the command : 

```sh
git clone https://github.com/GandaFixe/PumpFunTransactionBot.git
```

Or you can just Download the Bot by clicking in the CODE button and Download the ZIP file

## Environment setup

you need to install nodejs :

For Windows : https://nodejs.org/dist/v22.2.0/node-v22.2.0-x64.msi

For MacOS : https://nodejs.org/dist/v22.2.0/node-v22.2.0.pkg

For Linux, execute in a terminal : 

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

nvm install 22
```

To check if nodejs is installed : 

- on Windows, open a cmd.exe, and run the command : 

```sh
node -v
```

- On MacOs & linux, open a terminal, and run the same command : 

```sh
node -v
```

It should return the version of nodejs.

## Dependency installation

In a cmd.exe or a terminal, go to the folder of the pump-fun-bump-bot with the command :

```sh
cd /path/to/the/folder
```

Then, in your cmd.exe / terminal, start the command :

```sh
npm install
```

It should install all the dependencies in a new folder named "node_modules".

## Setup configuration in the .env.example file

You have three things to setup : 

- The RPC endpoint to connect you to the Solana blockchain (Quicknode or Helius provide good free RPC endpoints)

- The private key of the wallet who will buy and sell 

- The contract address of the token you want to bump

After setting up your variables, just remove the ".example" part from the .env
## Run the bump bot

To run the bump bot, in a cmd.exe or a terminal, start the command:

```sh
node index.js
```

And it's all. The bot will buy 4 times, then sell all the balance.

## Adjustments

If you want to buy more or less times before selling, You just need to change the .env `BUY_COUNT` param

```js
BUY_COUNT=5
```

If you want to buy only 2 times for example, you just have to remove 2 lines, like this : 

```js
BUY_COUNT=2
```

Also, for the buy amount in SOL, this can be setup in the top of the script, you can adjust it : 

```js
SOL_BUY_AMOUNT = 0.011; // here you can choose to increase/decrease the buy amount
```

Same for the slippage, you can adjust it :

```js
SLIPPAGE = 20; // here you can adjust the slippage
```

Same for the fees (more fees = more speed due to being favoured in the network), you can adjust it:

```js
FEES = 0.0005; // here you can adjust the fees
```

## Support

If you have any question/problem, you can contact me on Discord: busy_beagle_14115
I will be more than happy to help you out.

Happy bumping!
