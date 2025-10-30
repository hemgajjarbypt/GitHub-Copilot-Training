/**
 * Utility module for array operations
 * Provides functions to generate arrays, calculate stats,
 * filter, sort, and transform arrays.
 */

// Generate an array of random integers
function generateRandomArray(length, max = 100) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * max));
    }
    return arr;
}

// Calculate sum of array elements
function calculateSum(arr) {
    return arr.reduce((a, b) => a + b, 0);
}

// Calculate average of array elements
function calculateAverage(arr) {
    if (arr.length === 0) return 0;
    return calculateSum(arr) / arr.length;
}

// Find the maximum value in an array
function findMax(arr) {
    return Math.max(...arr);
}

// Find the minimum value in an array
function findMin(arr) {
    return Math.min(...arr);
}

// Filter out even numbers
function filterEven(arr) {
    return arr.filter(x => x % 2 === 0);
}

// Filter out odd numbers
function filterOdd(arr) {
    return arr.filter(x => x % 2 !== 0);
}

// Sort array ascending
function sortAscending(arr) {
    return [...arr].sort((a, b) => a - b);
}

// Sort array descending
function sortDescending(arr) {
    return [...arr].sort((a, b) => b - a);
}

// Map array to squares
function squareElements(arr) {
    return arr.map(x => x * x);
}

// Map array to cubes
function cubeElements(arr) {
    return arr.map(x => x ** 3);
}

// Reverse array
function reverseArray(arr) {
    return [...arr].reverse();
}

// Shuffle array (Fisher-Yates)
function shuffleArray(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// Remove duplicates from array
function uniqueArray(arr) {
    return [...new Set(arr)];
}

// Count occurrences of each element
function countOccurrences(arr) {
    const counts = {};
    arr.forEach(x => {
        counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
}

// Find median
function findMedian(arr) {
    if (!arr.length) return 0;
    const sorted = sortAscending(arr);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
}

// Generate summary statistics
function arrayStats(arr) {
    return {
        sum: calculateSum(arr),
        average: calculateAverage(arr),
        min: findMin(arr),
        max: findMax(arr),
        median: findMedian(arr),
        uniqueCount: uniqueArray(arr).length,
    };
}

// Example usage
if (require.main === module) {
    const myArray = generateRandomArray(20, 50);
    console.log("Array:", myArray);
    console.log("Sum:", calculateSum(myArray));
    console.log("Average:", calculateAverage(myArray));
    console.log("Max:", findMax(myArray));
    console.log("Min:", findMin(myArray));
    console.log("Median:", findMedian(myArray));
    console.log("Even numbers:", filterEven(myArray));
    console.log("Odd numbers:", filterOdd(myArray));
    console.log("Sorted Asc:", sortAscending(myArray));
    console.log("Sorted Desc:", sortDescending(myArray));
    console.log("Squares:", squareElements(myArray));
    console.log("Cubes:", cubeElements(myArray));
    console.log("Reversed:", reverseArray(myArray));
    console.log("Shuffled:", shuffleArray(myArray));
    console.log("Unique elements:", uniqueArray(myArray));
    console.log("Occurrences:", countOccurrences(myArray));
    console.log("Summary Stats:", arrayStats(myArray));
}

module.exports = {
    generateRandomArray,
    calculateSum,
    calculateAverage,
    findMax,
    findMin,
    filterEven,
    filterOdd,
    sortAscending,
    sortDescending,
    squareElements,
    cubeElements,
    reverseArray,
    shuffleArray,
    uniqueArray,
    countOccurrences,
    findMedian,
    arrayStats,
};
