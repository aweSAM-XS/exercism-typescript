interface Input {
  maxFactor: number;
  minFactor?: number;
}

interface Palindromes {
  smallest: {
      value: number | null;
      factors: number[][] | undefined;
  };
  largest: {
      value: number | null;
      factors: number[][] | undefined;
  };
}

function createRange(params: Input) {
  const range: number[] = [];
  params.minFactor ? null : (params.minFactor = 0);
  if (params.maxFactor >= params.minFactor) {
      for (let i = params.minFactor; i <= params.maxFactor; i++) {
          range.push(i);
      }
      return range;
  } else {
      throw new Error('min must be <= max');
  }
}

function createProducts(range: number[]) {
  const productList: number[] = [];
  for (let i = range[0]; i <= range[range.length - 1]; i++) {
      for (let j = range[0]; j <= range[range.length - 1]; j++) {
          let product = i * j;
          if (isPalindrome(product)) {
              productList.push(product);
          }
      }
  }
  productList.sort((a, b) => a - b);
  const uniqueProductList = Array.from(new Set(productList));
  return uniqueProductList;
}

function isPalindrome(num: number): boolean {
  let numString = num.toString();
  let numStringReverse = numString.split('').reverse().join('');
  return numString == numStringReverse;
}

function minMaxPalindromes(products: number[]) {
  let minPalindrome: number | null;
  let maxPalindrome: number | null;
  if (products.length > 0) {
      minPalindrome = Math.min(...products);
      maxPalindrome = Math.max(...products);
  } else {
      minPalindrome = null;
      maxPalindrome = null;
  }
  return {
      smallest: { value: minPalindrome, factors: undefined },
      largest: { value: maxPalindrome, factors: undefined },
  };
}

function generateFactors(num: number, range: number[]) {
  let factors: number[][] = [];

  for (let x of range) {
      if (num % x == 0 && x <= Math.sqrt(num)) {
          if (range.includes(num / x)) {
              let pair = [x, num / x];
              factors.push(pair);
          }
      }
  }
  return factors;
}

export function generate(params: Input): Palindromes {
  let range = createRange(params);
  let products = createProducts(range);
  let minMaxPalindrome: Palindromes = minMaxPalindromes(products);
  if (
      typeof minMaxPalindrome.smallest.value == 'number' &&
      typeof minMaxPalindrome.largest.value == 'number'
  ) {
      minMaxPalindrome.largest.factors = generateFactors(
          minMaxPalindrome.largest.value,
          range
      );
      minMaxPalindrome.smallest.factors = generateFactors(
          minMaxPalindrome.smallest.value,
          range
      );
  }
  return minMaxPalindrome;
}