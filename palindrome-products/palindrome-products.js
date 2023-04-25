"use strict";
exports.__esModule = true;
exports.generate = void 0;
function createRange(max, min) {
    var range = [];
    if (max < min) {
        throw new Error('min must be <= max');
    }
    for (var i = min; i <= max; i++) {
        range.push(i);
    }
    return range;
}
function createrange(max, min) {
    var range = [];
    if (max < min) {
        throw new Error('min must be <= max');
    }
    for (var i = min; i <= max; i++) {
        range.push(i);
    }
    return range;
}
function createProducts(range) {
    var productList = [];
    for (var i = range[0]; i <= range[range.length - 1]; i++) {
        for (var j = i; j <= range[range.length - 1]; j++) {
            var product = i * j;
            if (isPalindrome(product)) {
                productList.push(product);
            }
        }
    }
    return productList;
}
function isPalindrome(num) {
    var numString = num.toString();
    var numStringReverse = numString.split('').reverse().join('');
    return numString === numStringReverse;
}
function minMaxPalindromes(products) {
    var minPalindrome;
    var maxPalindrome;
    if (products.length > 0) {
        minPalindrome = Math.min.apply(Math, products);
        maxPalindrome = Math.max.apply(Math, products);
    }
    else {
        minPalindrome = null;
        maxPalindrome = null;
    }
    return {
        smallest: { value: minPalindrome, factors: [] },
        largest: { value: maxPalindrome, factors: [] }
    };
}
function generateFactors(num, range) {
    var factors = [];
    for (var _i = 0, range_1 = range; _i < range_1.length; _i++) {
        var x = range_1[_i];
        if (num % x === 0 && x <= Math.sqrt(num)) {
            if (range.includes(num / x)) {
                var pair = [x, num / x];
                factors.push(pair);
            }
        }
    }
    return factors;
}
function generate(_a) {
    var maxFactor = _a.maxFactor, _b = _a.minFactor, minFactor = _b === void 0 ? 0 : _b;
    var range = createRange(maxFactor, minFactor);
    var products = createProducts(range);
    var minMaxPalindrome = minMaxPalindromes(products);
    if (typeof minMaxPalindrome.smallest.value == 'number' &&
        typeof minMaxPalindrome.largest.value == 'number') {
        minMaxPalindrome.largest.factors = generateFactors(minMaxPalindrome.largest.value, range);
        minMaxPalindrome.smallest.factors = generateFactors(minMaxPalindrome.smallest.value, range);
    }
    else {
        minMaxPalindrome.largest.factors = [];
        minMaxPalindrome.smallest.factors = [];
    }
    return minMaxPalindrome;
}
exports.generate = generate;
var palindromes = generate({
    maxFactor: 9
});
console.log(palindromes);
console.log(palindromes.smallest.factors);
console.log(palindromes.largest.factors);
