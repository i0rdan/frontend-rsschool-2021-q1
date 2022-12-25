//Pipe pattern
const minus = (n) => n - 4;
const plus = (n) => n + 4;
const multiply = (n) => n * 4;
const del = (n) => n / 4;

const pipe = (...allFunctions) => number => {
    return allFunctions.reduce((value, currF) => {
        return currF(value); 
    }, number);
}

console.log(pipe(minus, multiply)(7));

//Memo pattern
const sum = (a,b) => a + b;

let cache = {};

const memo = (value) => {
    if (value in cache) {
        console.log('Взято из кэша');
        return cache[value];
    }
    else {
        cache[value] = value;
        return value;
    }
}

let memedSum = memo(sum(1,4));
console.log(memedSum);
memedSum = memo(sum(1,4));
console.log(memedSum);

//Apply
const apply = function(fn, args) {
    return fn(...args);
};

const sumString = (string1, string2) => `${string1} ${string2}`;

console.log(apply(sumString, ['Строка1', 'Строка2']));

//Codewars 1

const multiplyAll = a => value => arr.map(x => value * x);

//Codewars 2

function arrayDiff(a, b) {
	return a.filter(x => !b.includes(x));
}

