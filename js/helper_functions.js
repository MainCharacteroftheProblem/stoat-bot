export function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomBool(chance) {
    return Math.random() * 100 < chance;
}

export function uppercaseFirstLetters(string) {
return string.split(' ').map(function(word) {
        return word.slice(0, 1).toUpperCase() + word.substr(1);
    })
    .join(' ');
}

export function lowercaseFirstLetters(string) {
return string.split(' ').map(function(word) {
        return word.slice(0, 1).toLowerCase() + word.substr(1);
    })
    .join(' ');
}

export function swapCase(string) {
    return string.split(' ').map(function(word) {
        for (let i = 0; i < word.length; i++) {
            word = i % 2 == 0 ?
                word.substring(0, i) + word.substring(i, i+1).toLowerCase() + word.substring(i + 1) :
                word.substring(0, i) + word.substring(i, i+1).toUpperCase() + word.substring(i + 1);
        }
        return word;
    })
    .join(' ');
}

export function reverseString(string) {
    let reversedStringArray = string.split("").reverse();
    return reversedStringArray.join("");
}

export function remapCharacters (string, characterMap, shouldLowercase) {
    for (let i = 0; i < string.length; i++) {
        let mappedChar = null;

        if (shouldLowercase) {
            mappedChar = characterMap[string[i].toLowerCase()];
        } else {
            mappedChar = characterMap[string[i]];
        }    

        if (mappedChar != undefined) string = string.substring(0, i) + mappedChar + string.substring(i + 1);
    }
    return string;
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// TODO: rename this function
export function turnSQLCountRequestIntoNumber(object, defaultValue = 0) {
    let newObject = object;

    // console.log(newObject);

    if ((newObject == null) || (newObject == undefined)) {
        newObject = 0;
    } else {
        newObject = Object.values(newObject[0])[0];
    }

    return newObject;
}