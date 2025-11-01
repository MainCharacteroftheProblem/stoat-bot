# stoat-bot

Simple javascript [stoat.chat](https://stoat.chat) bot, featuring:

Markov-based name generation, inspired by, and using some corpus data from, ivysly's [hmmmmmm bot](https://ivysly.com/misc/bots.html) (outdated repos [here](https://github.com/uzkbwza/discord-bot) and [here](https://github.com/uzkbwza/namer))

Markov-based message generation, inspired by [nMarkov](https://nmarkov.xyz/)

Markov-based tip generation

## Setting up

In `/config/`, you'll need to create a `token.json` file, following the format of `config.json`. Include two values: ```bot_token``` (your bot token) and ```dev_id``` (your user id). 

In `/data_static/`, you'll need to create two files: `name_input_corpus.json` and `tips_input_corpus`. Follow the format provided by `EXAMPLE_input_corpus.json`.

## Running the bot

To start, run

```node index.js```

in the bash console
