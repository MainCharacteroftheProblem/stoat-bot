// Import the "Client" class from stoat.js
import { Client } from "stoat.js";

// Import the values declared in your config.json token.json files
import config from "./config/config.json" with { type: "json" };
import token from "./config/token.json" with { type: "json" };

// Import name, tip, and message generator functions
import { generateName } from "./js/name_gen.js";
import { generateTip } from "./js/tip_gen.js";
import { generateMessage } from "./js/message_gen.js";

// import { } from "./js/economy.js";


// Import helper functions
import { getRandomBool, turnSQLCountRequestIntoNumber } from "./js/helper_functions.js";

// Import database functions
import sqlite3 from "sqlite3";
import { runSqlStatement, fetchFirst, fetchAll } from "./js/sql.js";

const millisecondsInDay = 86400000;
const guysEmoji = ":01JSNH2X24JE86FRCAVTW6778H:";

const db = new sqlite3.Database("./data/db.db");
// Create user table if it doesn't exist (level and optout are currently unused)
runSqlStatement(db,
        `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        nameTimer INTEGER DEFAULT 0,
        level INTEGER DEFAULT null,
        bot BOOLEAN DEFAULT false,
        optout BOOLEAN DEFAULT false)`,
        null);

// Create server table if it doesn't exist
runSqlStatement(db,
        `CREATE TABLE IF NOT EXISTS servers (
        id TEXT PRIMARY KEY,
        replyProbability DECIMAL DEFAULT 2.0,
        maxMessagesThatCanBeStored INTEGER DEFAULT ` + config.maxMessagesThatCanBeStoredBot + `,
        markovReplysDisabled BOOLEAN DEFAULT false)`,
        null);

// Create messages table if it doesn't exist
runSqlStatement(db,
        `CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        serverId TEXT DEFAULT null,
        authorId TEXT DEFAULT null,
        messageContent TEXT DEFAULT null)`,
        null);

if (config.connectBotToStoat) {
    // Create a new client instance
    let client = new Client();
  


    // TODO: adapted code from https://github.com/uzkbwza/discord-bot (early hmmbot)
    // const reactWords = [heart]
    // message.react(encodeURIComponent("❌"));


    // Once your client is ready, this code will be executed (only once)
    client.on("ready", async () => {
        console.info(`Logged in as ${client.user.username}!`); // This returns "Logged in as *Your bot's name*!" in the console
        // "Online" | "Idle" | "Focus" | "Busy" | "Invisible" | null | undefined
        client.api.patch("/users/@me", { status: { text: "test test", presence: "Online" } });
    });

    // Reply to messages and commands
    client.on("messageCreate", async (message) => {
        const messageContentLowercase = message.content.toLowerCase();

        if (messageContentLowercase === config.prefix + "ping") {
            message.reply("pong! :ping_pong:");
        } else if (messageContentLowercase === config.prefix + "help") {
            // TODO
            message.reply("Commands:\n\n"
            + "help\nping\nname\ntip\ngen"
            + "\n\nThe command prefix is: " + config.prefix);
        } else if (messageContentLowercase === config.prefix + "logout") {
            // ONLY USE THIS when it continues running even though you exited your bash script (via ctrl+C)
            if (token.dev_id == message.authorId) {
                console.info("Logging out...");
                client.logout;
            } else {
                message.reply("Only devs can shut ME down!!!");
            }
        } else if (messageContentLowercase === config.prefix + "name") {
            let replyMessage = null;

            const currentTime = new Date().getTime();

            const nameTimer = await fetchFirst(db, `SELECT nameTimer FROM users WHERE id = '` + message.authorId + `'`);

            if (nameTimer.nameTimer == NaN || nameTimer.nameTimer + millisecondsInDay < currentTime) {

                const mascotHorrorMode = getRandomBool(0.05);

                const newName = generateName();

                // Guys, what one is your favorite? Huggy Wuggy, Seek, scary Blue, Zumbo Sauce, Banban, Nabnab… Um, I forgot his name, the frog dude, and, um, yeah. Snow Seline, Banbalina, Stinger Flynn, Opila Bird, and Awesome Huggy Wuggy. This is, uh, me but like I don’t wanna use it. Blue and, uh, I mean, um, Kissy Missy, Killy Willy, um, Choo Choo Charles, right, Boxy Boo but like not evil, and we have evil Boxy Boo. We have Squid Game Huggy Wuggy. We have baby Huggy Wuggy, and Blue, and Freddy Fazbear, oinky oink oink. We have creepy Green. We have happy Huggy Wuggy. Look how happy he is, and we have "What the hell?" We have nobody cares Huggy Wuggy.
                if (mascotHorrorMode) {
                    replyMessage = "Guys, what one is your favorite? " + newName + ", " + generateName() + ", " + generateName() + ", " + generateName() + ", " + generateName() + ", " + generateName() + "... Um, I forgot his name, " + generateName() + ", and, um, yeah.";

                    if (getRandomBool(25)) {
                        replyMessage += " " + generateName() + ", " + generateName() + ", " + generateName() + ", " + generateName() + ", " + generateName() + ", and " + generateName() + ".";

                        if (getRandomBool(25)) {
                            replyMessage += " This is, uh, me but like I don't wanna use it.";
                        }
                    }
                } else {
                    replyMessage = "Your new name is: " + newName;
                }

                // TODO: idk if this bot check actually works
                runSqlStatement(db,
                `INSERT OR REPLACE INTO users(id, nameTimer, bot) VALUES(?, ?, ?)`,
                [message.authorId, currentTime, message.author.bot != undefined ? true : false]);
                
            } else {
                const remainingTime = (nameTimer.nameTimer - currentTime) + millisecondsInDay;
                // TODO: add a function in helper_functions.js for turning milliseconds into readable time
                replyMessage = "You have " + remainingTime + " milliseconds left before you can choose a new name!"; 
            }


            // TODO: check if we have necessary perms and if so, automatically rename

            // message.channel.sendMessage(replyMessage);
            message.reply(replyMessage);
        } else if (messageContentLowercase === config.prefix + "massname") {
            if (token.dev_id == message.authorId) {
                message.reply("Your new names are:" + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName()
                );
            } else {
                message.reply("You don't have permission for this, so stop asking!");
            }
        } else if (messageContentLowercase === config.prefix + "consolename") {
            if (token.dev_id == message.authorId) {
                console.log("Your new names are:" + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName() + '\n' +
                    generateName()
                );
            } else {
                message.reply("You *definitely* don't have permission for this, so please stop asking!");
            }
        } else if (messageContentLowercase === config.prefix + "tip") {
            // TODO: set this on a timer?
            message.reply(generateTip());
        } else {
            // check that the message isn't from the bot, otherwise it'll will start learning from itself (bad) or ping itself into unhandled rejection (also bad)
            if (message.authorId != client.user.id) {

                let messageAskedForReply = false;

                // log message, but only if it isn't ".gen" (other commands are excluded by nature of this being an else statement)
                if (messageContentLowercase != config.prefix + "gen") {
                    // Insert new message into database
                    runSqlStatement(db,
                        `INSERT OR REPLACE INTO messages(id, serverId, authorId, messageContent) VALUES(?, ?, ?, ?)`,
                        [message.id, message.server.id, message.authorId, message.content]);

                    // TODO: only run this when the bot starts up or when a new server is joined? (for performance)
                    runSqlStatement(db,
                        `INSERT OR REPLACE INTO servers(id) VALUES (?)`,
                        [message.server.id]);

                    // grab number of stored messages and the max number of messages that can be stored
                    let numberOfStoredMessages = await fetchAll(db, `SELECT COUNT(*) FROM messages WHERE serverId = '` + message.server.id + `'`);
                    let maxMessagesThatCanBeStoredServer = await fetchFirst(db, `SELECT maxMessagesThatCanBeStored FROM servers WHERE id = '` + message.server.id + `'`);

                    // turn the weird data that sql returns into plain numbers
                    numberOfStoredMessages = turnSQLCountRequestIntoNumber(numberOfStoredMessages);
                    
                    // Delete oldest message if it goes over the max number of messages
                    if (numberOfStoredMessages > maxMessagesThatCanBeStoredServer.maxMessagesThatCanBeStored) {
                        runSqlStatement(db,
                            `DELETE TOP ` + (numberOfStoredMessages - maxMessagesThatCanBeStoredServer.maxMessagesThatCanBeStored) + ` FROM messages WHERE id = ` + message.server.id + `)`,
                            null);              
                    }

                }

                // reply to messages if the message is ".gen" or if the message mentioned the bot
                if (messageContentLowercase == config.prefix + "gen" || message.mentioned) messageAskedForReply = true;

                const replyProbability = await fetchFirst(db, `SELECT replyProbability FROM servers WHERE id = '` + message.server.id + `'`);
               
                // Send/reply to messages
                if (getRandomBool(replyProbability.replyProbability) || messageAskedForReply) {
                    const newMessage = await generateMessage(db, message.server.id);

                    if (messageAskedForReply) {
                        message.reply(newMessage);
                    } else {
                        message.channel.sendMessage(newMessage);
                    }
                }
            }

        }
            
    });

    // Log in to Revolt with your client's token
    client.loginBot(token.bot_token);
}