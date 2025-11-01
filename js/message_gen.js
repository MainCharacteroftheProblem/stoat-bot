// Import the "Markov" class from js-markov
import Markov from "js-markov";

// Import helper functions
// import {} from "./helper_functions.js";

import { fetchAll } from "./sql.js";

export async function generateMessage(db, serverId, length = 2000) {
    // Import data for the message generation
    let corpus = await fetchAll(db, `SELECT messageContent FROM messages WHERE serverId = '` + serverId + `'`);

    // TODO: move this remapping to helper_functions.js???
    corpus = corpus.map(messageContent => messageContent.messageContent);


    let markov = new Markov();

    markov.addStates(corpus);
    markov.train();

    const message = markov.generateRandom(length);

    return message;
}
