// Import the "Markov" class from js-markov
import Markov from "js-markov";

// Import helper functions
import { getRandomInteger, getRandomBool, uppercaseFirstLetters, lowercaseFirstLetters, swapCase, reverseString, remapCharacters } from "./helper_functions.js";

// Import the data for the name generation command
import corpus from "../data_static/name_input_corpus.json" with { type: "json" };

const linedCharacterMap = {
    "a": "𝕒",
    "b": "𝕓",
    "c": "𝕔",
    "d": "𝕕",
    "e": "𝕖",
    "f": "𝕗",
    "g": "𝕘",
    "h": "𝕙",
    "i": "𝕚",
    "j": "𝕛",
    "k": "𝕜",
    "l": "𝕝",
    "m": "𝕞",
    "n": "𝕟",
    "o": "𝕠",
    "p": "𝕡",
    "q": "𝕢",
    "r": "𝕣",
    "s": "𝕤 ",
    "t": "𝕥",
    "u": "𝕦",
    "v": "𝕧",
    "w": "𝕨",
    "x": "𝕩",
    "y": "𝕪",
    "z": "𝕫",
    "A": "𝔸",
    "B": "𝔹",
    "C": "ℂ",
    "D": "𝔻",
    "E": "𝔼",
    "F": "𝔽",
    "G": "𝔾",
    "H": "ℍ",
    "I": "𝕀",
    "J": "𝕁",
    "K": "𝕂",
    "L": "𝕃",
    "M": "𝕄",
    "N": "ℕ",
    "O": "𝕆",
    "P": "ℙ",
    "Q": "ℚ",
    "R": "ℝ",
    "S": "𝕊",
    "T": "𝕋",
    "U": "𝕌",
    "V": "𝕍",
    "W": "𝕎",
    "X": "𝕏",
    "Y": "𝕐",
    "Z": "ℤ"
}

const flippedCharacterMap = {
    "a": "ɐ",
    "b": "q",
    "c": "ɔ",
    "d": "p",
    "e": "ǝ",
    "f": "ⅎ",
    "g": "ƃ",
    "h": "ɥ",
    "i": "ᴉ",
    "j": "ɾ",
    "k": "ʞ",
    "l": "ʅ",
    "m": "ɯ",
    "n": "u",
    "o": "o",
    "p": "d",
    "q": "b",
    "r": "ɹ",
    "s": "s",
    "t": "ʇ",
    "u": "n",
    "v": "ʌ",
    "w": "ʍ",
    "x": "x",
    "y": "ʎ",
    "z": "z",
    "A": "Ɐ",
    "B": "B",
    "C": "C",
    "D": "D",
    "E": "E",
    "F": "ᖶ",
    "G": "ᘓ",
    "H": "H",
    "I": "I",
    "J": "ᒉ",
    "K": "K",
    "L": "Γ",
    "M": "W",
    "N": "И",
    "O": "O",
    "P": "b",
    "Q": "⥀",
    "R": "ᖉ",
    "S": "Ƨ",
    "T": "ꓕ",
    "U": "ꓵ",
    "V": "Λ",
    "W": "M",
    "X": "X",
    "Y": "⅄",
    "Z": "Z"
}

const boxCharacterMap = {
    "a": "🄰",
    "b": "🄱",
    "c": "🄲",
    "d": "🄳",
    "e": "🄴",
    "f": "🄵",
    "g": "🄶",
    "h": "🄷",
    "i": "🄸",
    "j": "🄹",
    "k": "🄺",
    "l": "🄻",
    "m": "🄼",
    "n": "🄽",
    "o": "🄾",
    "p": "🄿",
    "q": "🅀",
    "r": "🅁",
    "s": "🅂",
    "t": "🅃",
    "u": "🅄",
    "v": "🅅",
    "w": "🅆",
    "x": "🅇",
    "y": "🅈",
    "z": "🅉"
}

const filledBoxCharacterMap = {
    "a": "🅰",
    "b": "🅱",
    "c": "🅲",
    "d": "🅳",
    "e": "🅴",
    "f": "🅵",
    "g": "🅶",
    "h": "🅷",
    "i": "🅸",
    "j": "🅹",
    "k": "🅺",
    "l": "🅻",
    "m": "🅼",
    "n": "🅽",
    "o": "🅾",
    "p": "🅿",
    "q": "🆀",
    "r": "🆁",
    "s": "🆂",
    "t": "🆃",
    "u": "🆄",
    "v": "🆅",
    "w": "🆆",
    "x": "🆇",
    "y": "🆈",
    "z": "🆉"
}

const circleCharacterMap = {
    "a": "ⓐ",
    "b": "ⓑ",
    "c": "ⓒ",
    "d": "ⓓ",
    "e": "ⓔ",
    "f": "ⓕ",
    "g": "ⓖ",
    "h": "ⓗ",
    "i": "ⓘ",
    "j": "ⓙ",
    "k": "ⓚ",
    "l": "ⓛ",
    "m": "ⓜ",
    "n": "ⓝ",
    "o": "ⓞ",
    "p": "ⓟ",
    "q": "ⓠ",
    "r": "ⓡ",
    "s": "ⓢ",
    "t": "ⓣ",
    "u": "ⓤ",
    "v": "ⓥ",
    "w": "ⓦ",
    "x": "ⓧ",
    "y": "ⓨ",
    "z": "ⓩ",
    "1": "①",
    "2": "②",
    "3": "③",
    "4": "④",
    "5": "⑤",
    "6": "⑥",
    "7": "⑦",
    "8": "⑧",
    "9": "⑨",
    "0": "⓪"
}

const filledCircleCharacterMap = {
    "a": "🅐",
    "b": "🅑",
    "c": "🅒",
    "d": "🅓",
    "e": "🅔",
    "f": "🅕",
    "g": "🅖",
    "h": "🅗",
    "i": "🅘",
    "j": "🅙",
    "k": "🅚",
    "l": "🅛",
    "m": "🅜",
    "n": "🅝",
    "o": "🅞",
    "p": "🅟",
    "q": "🅠",
    "r": "🅡",
    "s": "🅢",
    "t": "🅣",
    "u": "🅤",
    "v": "🅥",
    "w": "🅦",
    "x": "🅧",
    "y": "🅨",
    "z": "🅩"
}

const notLatinCharacterMap = {
    "a": "闩",
    "b": "⻏",
    "c": "⼕",
    "d": "ᗪ",
    "e": "🝗",
    "f": "ﾁ",
    "g": "Ꮆ",
    "h": "卄",
    "i": "讠",
    "j": "丿",
    "k": "长",
    "l": "㇄",
    "m": "爪",
    "n": "𝓝",
    "o": "ㄖ",
    "p": "尸",
    "q": "Ɋ",
    "r": "尺",
    "s": "丂",
    "t": "セ",
    "u": "ㄩ",
    "v": "ᐯ",
    "w": "山",
    "x": "〤",
    "y": "丫",
    "z": "Ⲍ"
}

const smallcapsCharacterMap = {
    "a": "🇦",
    "b": "🇧",
    "c": "🇨",
    "d": "🇩",
    "e": "🇪",
    "f": "🇫​​​​",
    "g": "🇬",
    "h": "🇭",
    "i": "🇮",
    "j": "🇯",
    "k": "🇰",
    "l": "🇱",
    "m": "🇲",
    "n": "🇳",
    "o": "🇴",
    "p": "🇵",
    "q": "🇶",
    "r": "🇷",
    "s": "🇸​​​​",
    "t": "🇹",
    "u": "🇺",
    "v": "🇻",
    "w": "🇼",
    "x": "🇽",
    "y": "🇾​​​​​",
    "z": "🇿",
}

const freakyCharacterMap = {
    "a": "𝓪",
    "b": "𝓫",
    "c": "𝓬",
    "d": "𝓭",
    "e": "𝓮",
    "f": "𝓯",
    "g": "𝓰",
    "h": "𝓱",
    "i": "𝓲",
    "j": "𝓳",
    "k": "𝓴",
    "l": "𝓵",
    "n": "𝓷",
    "m": "𝓶",
    "o": "𝓸",
    "p": "𝓹",
    "q": "𝓺",
    "r": "𝓻",
    "s": "𝓼",
    "t": "𝓽",
    "u": "𝓾",
    "v": "𝓿",
    "w": "𝔀",
    "x": "𝔁",
    "y": "𝔂",
    "z": "𝔃",
    "Q": "𝓠",
    "W": "𝓦",
    "E": "𝓔",
    "R": "𝓡",
    "T": "𝓣",
    "Y": "𝓨",
    "U": "𝓤",
    "I": "𝓘",
    "O": "𝓞",
    "P": "𝓟",
    "A": "𝓐",
    "S": "𝓢",
    "D": "𝓓",
    "F": "𝓕",
    "G": "𝓖",
    "H": "𝓗",
    "J": "𝓙",
    "K": "𝓚",
    "L": "𝓛",
    "Z": "𝓩",
    "X": "𝓧",
    "C": "𝓒",
    "V": "𝓥",
    "B": "𝓑",
    "N": "𝓝",
    "M": "𝓜",
    "1": "𝟣",
    "2": "𝟤",
    "3": "𝟥",
    "4": "𝟦",
    "5": "𝟧",
    "6": "𝟨",
    "7": "𝟩",
    "8": "𝟪",
    "9": "𝟫"
}

function getRandomFreakyEmoji () {
    let freakyChar = "";
    switch (getRandomInteger(0,2)) {
        case 0:
            freakyChar = "❤️"
            break;
        case 1:
            freakyChar = "💦"
            break;
        default:
            freakyChar = "👅"
            break;
    }

    return freakyChar;
}

function getRandomGlorpEmoji () {
    let glorpChar = "";
    switch (getRandomInteger(0,5)) {
        case 0:
            glorpChar = "🌌"
            break;
        case 1:
            glorpChar = "🚀"
            break;
        case 2:
            glorpChar = "📡"
            break;
        case 3:
            glorpChar = "☄️"
            break;
        case 4:
            glorpChar = "🌟"
            break;
        default:
            glorpChar = "👽"
            break;
    }

    return glorpChar;
}


export function generateName(minLenth = 1, maxLength = 70) {

    var newName = "";
    var markov = new Markov();
    var valid = false;

    markov.addStates(corpus);
    markov.train();

    // TODO: make it so that if it goes through x iterations without finding a valid name, it spits out a failsafe
    while (!valid) {
        let mustHaveSpace = getRandomBool(60);
        let forceUppercase = getRandomBool(20);
        // const forceCaseHomogeity = getRandomBool(50);

        let replaceSpacesWithOtherCharactersOrRemoveThem = getRandomBool(4.5);

        let shuffleSyllables = getRandomBool(10) && !mustHaveSpace;

        let alsoForceSuperHomogiety = getRandomBool(80);
        let forceLowercase = getRandomBool(20);
        let forceSwappingCase = getRandomBool(0.75);
        let generatedLength = getRandomInteger(4, 55);

        // TODO: also generate a "home planet" in a separate function. if freak mode is also activated, the planet corpus will also have an extra list of "freaky planet names" to use
        let glorpMode = getRandomBool(0.05);
        // TODO: also generate a "signature laugh" in a separate function. if freak mode is also activated, the laugh will have a tilde (~).
        let gnomeMode = getRandomBool(0.05);
        // TODO: also generate a "freak level" in a separate function. the freak level will raise with each vulgar word and emoji
        let freakMode = getRandomBool(0.05);
        // TODO: also generate a "signature catchphrase" in a separate function. if freak mode is also activated, the catchphrase corpus will also have an extra list of "freaky catchphrases" to use
        // let cowboyMode = getRandomBool(0.05);

        // TODO: remove this line when you finish glorpMode
        if (glorpMode) glorpMode = false;

        let hasSpecialMode = (glorpMode || gnomeMode || freakMode);
        let hasWeirdCharacters = getRandomBool(18);
        let zalgo = getRandomBool(0.15);

        // TODO...?
        let blacklisted = false;

        // generate name
        newName = markov.generateRandom(generatedLength);

        // skip if we asked for spaces and there's no space
        // this check fails if there IS a space, but at the beginning of the name (eg. " mario"). regardless, this is unlikely to happen if your input corpus is set up correctly
        if (mustHaveSpace && (newName.indexOf(' ') <= 0)) {
            valid = false;
            continue;
        }

        // skip if the name is of an invalid length,  or if it's blacklisted (currently there's no blacklist)
        if ((newName.length < minLenth) || (newName.length > maxLength) || blacklisted) {
            valid = false;
            continue;
        }


        // TODO: move this to a function in helper_functions.js
        if (shuffleSyllables) {
            const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
            function syllabify(words) {
                return words.match(syllableRegex);
            }
            // hacky check
            let syllableArray = syllabify(newName + "");
            if (syllableArray != null) 
                // apparently this shuffle function isn't unreliable in terms of randomness
                newName = syllableArray.sort(() => Math.random() - 0.5).toString().replace(/,/g, '');
        }

        if (forceSwappingCase) {
            newName = swapCase(newName);
        } else {
            if (forceLowercase) {
                if (alsoForceSuperHomogiety) {
                    newName = newName.toLowerCase();
                } else {
                    newName = lowercaseFirstLetters(newName);
                }
            }

            if (forceUppercase) {
                if (alsoForceSuperHomogiety) {
                    newName = newName.toUpperCase();
                } else {
                    newName = uppercaseFirstLetters(newName);
                }
            }

        }



        if (replaceSpacesWithOtherCharactersOrRemoveThem) {
            switch (getRandomInteger(0,3)) {
                case 0:
                    newName = newName.replace(/ /g, "-")
                    break;
                case 1:
                    newName = newName.replace(/ /g, "_")
                    break;
                case 2:
                    newName = newName.replace(/ /g, "")
                    break;
                default:
                    newName = newName.replace(/ /g, ".")
                    break;
            }

        }






        if ((newName.toLowerCase().indexOf('glorp') + newName.toLowerCase().indexOf('bogos') + newName.toLowerCase().indexOf('binted')) >= -2) {
            glorpMode = true;
        }

        if (newName.toLowerCase().indexOf('freak') >= 0) {
            freakMode = true;
        }

        if (glorpMode) {
            // TODO: "glorpify" using regex
            // "glorp zazoglah beelow zazo blarm",
            // "ZAZOBLAH GAGO-BEAM",

            if(getRandomBool(30)) {

                if(getRandomBool(85)) newName += " ";
                newName += getRandomGlorpEmoji();
                if(getRandomBool(75)) newName += " ";
                if(getRandomBool(25)) newName += getRandomGlorpEmoji();
                if(getRandomBool(25)) {
                    if(getRandomBool(90)) newName += " ";
                    newName += getRandomGlorpEmoji(); 
                }

            }
        }

        if (freakMode) {
            newName = remapCharacters(newName, freakyCharacterMap, false);

            if(getRandomBool(95)) {

                if(getRandomBool(85)) newName += " ";
                newName += getRandomFreakyEmoji();
                if(getRandomBool(75)) newName += " ";
                if(getRandomBool(25)) newName += getRandomFreakyEmoji();
                if(getRandomBool(25)) {
                    if(getRandomBool(90)) newName += " ";
                    newName += getRandomFreakyEmoji(); 
                }

            }

        }






        if (hasWeirdCharacters && !hasSpecialMode) {
            switch (getRandomInteger(0,7)) {
                case 0:
                    newName = remapCharacters(newName, linedCharacterMap, false);
                    break;
                case 1:
                    if (getRandomBool(85)) newName = reverseString(newName);
                    newName = remapCharacters(newName, flippedCharacterMap, false);
                    break;
                case 2:
                    newName = remapCharacters(newName, boxCharacterMap, true);
                    break;
                case 3:
                    newName = remapCharacters(newName, filledBoxCharacterMap, true);
                    break;
                case 4:
                    newName = remapCharacters(newName, circleCharacterMap, true);
                    break;
                case 5:
                    newName = remapCharacters(newName, filledCircleCharacterMap, true);
                    break;
                // broken on revolt?
                case 6:
                    newName = remapCharacters(newName, smallcapsCharacterMap, true);
                    break;
                default:
                    newName = remapCharacters(newName, notLatinCharacterMap, true);
                    break;
            }
        }



        if (zalgo) {
            // newName = zalgo(newName);
        }

        

        valid = true;

    }

    return newName;
}