var Number = function(my) {

    const quantity = 'quantity';
    const magnitude = 'magnitude';
    
    const numbers = {
        'one': { val: 1, type: quantity },
        'two': { val: 2, type: quantity },
        'three': { val: 3, type: quantity },
        'four': { val: 4, type: quantity },
        'five': { val: 5, type: quantity },
        'six': { val: 6, type: quantity },
        'seven': { val: 7, type: quantity },
        'eight': { val: 8, type: quantity },
        'nine': { val: 9, type: quantity },
        'ten': { val: 10, type: quantity },

        'eleven': { val: 11, type: quantity },
        'twelve': { val: 12, type: quantity },
        'thirteen': { val: 13, type: quantity },
        'fourteen': { val: 14, type: quantity },
        'fifteen': { val: 15, type: quantity },
        'sixteen': { val: 16, type: quantity },
        'seventeen': { val: 17, type: quantity },
        'eighteen': { val: 18, type: quantity },
        'nineteen': { val: 19, type: quantity },
        
        'twenty': { val: 20, type: quantity },
        'thirty': { val: 30, type: quantity },
        'forty': { val: 40, type: quantity },
        'fifty': { val: 50, type: quantity },
        'sixty': { val: 60, type: quantity },
        'seventy': { val: 70, type: quantity },
        'eighty': { val: 80, type: quantity },
        'ninety': { val: 90, type: quantity },
        
        'hundred': { val: 100, type: magnitude },
        'thousand': { val: 1000, type: magnitude },
        'million': { val: 1000000, type: magnitude },
        'billion': { val: 1000000000, type: magnitude },
        'trillion': { val: 1000000000000, type: magnitude }
    };

    my.regex = function() {
        let phrases = [];
        for(var key in numbers)
            phrases.push(key + ',?');
        phrases.push('and');
        let regex = '((' + phrases.join('|') + ') ?)+';
        return new RegExp(regex, 'g');
    }();

    function _words(str) {
        return str.split(' ').map(word => {
            if(word === 'and')  return undefined;
            if(word.endsWith(','))  word = word.replace(/,$/, '');
            if(word.endsWith('s'))  word = word.replace(/s$/, '');
            
            if(isFinite(word))
                return { val: Number(word), type: quantity };
            else if(numbers.hasOwnProperty(word))
                return numbers[word];
        }).filter(word => !!word);
    }

    function _number(words) {
        let i = 0, result = 0;
        while(i < words.length) {
            if(words[i].type !== quantity)
                throw Error('No quantity at word ' + (i+1).toString());

            if(words.length > (i + 1) && words[i+1].type === magnitude)
                result += words[i++].val * words[i++].val;
            else
                result += words[i++].val;
        }
        return result;
    }

    my.parseWord = function(str) {
        return _number(_words(str));
    };

    return my;

}(Number || {});