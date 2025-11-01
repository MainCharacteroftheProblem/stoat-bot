// Import the "Markov" class from js-markov
import Markov from "js-markov";

// Import helper functions
// import {} from "./helper_functions.js";

// Import the data for the tip generation command
import corpus from "../data_static/tips_input_corpus.json" with { type: "json" };

export function generateTip(useAppendedText = true, length = 2000) {
    const appendedText = "Tip: ";
    let markov = new Markov();

    markov.addStates(corpus);
    markov.train();

    const tip = markov.generateRandom(length);

    return useAppendedText ? appendedText + tip : tip;
}