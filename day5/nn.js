const useFile = require ('../useFile.js')

// --- Day 5: Doesn't He Have Intern-Elves For This? ---
// Santa needs help figuring out which strings in his text file are naughty or nice.

// A nice string is one with all of the following properties:

// It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
// It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
// It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
// For example:

// ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
// aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
// jchzalrnumimnmhp is naughty because it has no double letter.
// haegwjzuvuyypxyu is naughty because it contains the string xy.
// dvszwmarrgswjxmb is naughty because it contains only one vowel.
// How many strings are nice?

const dataToString = (data) => data.toString()
const separateEntryString = (string) => string.split('\r\n')
const dataToArray = (data) => separateEntryString(dataToString(data))

///Checks for the first year

const doubleLetterCheck = (string) => {
	let i = 0
	let passes = false

	while (i < string.length-1 && passes === false){
		if(string[i] === string[i+1]){		
			passes = true
		}
		i++
	}
	return passes
}
const noBadPairsCheck = (string) =>{
	let passes = true
	if(string.includes('ab') || 
		string.includes('cd') ||
		string.includes('pq') ||
		string.includes('xy')
		){
		passes = false
	}
	return passes
}
const vowelsCheck = (string) =>{
	let passes = false
	let i = 0
	let vowels = 0
	while (i < string.length && vowels < 3){

		if(string[i] === 'a' ||
			string[i] === 'e' ||
			string[i] === 'i' ||
			string[i] === 'o' ||
			string[i] === 'u'
			){
			vowels++
		}
		if(vowels === 3){
			passes = true
		}
		i++
	}
	return passes
}

const allChecks1 = (string) =>{
	let passArr = []
	passArr[0] = vowelsCheck(string)
	passArr[1] = noBadPairsCheck(string)
	passArr[2] = doubleLetterCheck(string)
	if(passArr.includes(false)){
		return false
	} else {
		return true
	}
}

////checks for year 2

const checkPairRepeat =(string) =>{
	let i = 0
	let j = 0
	let pair = ''
	let passes = false
	while(i<string.length-1 && passes === false){
		pair = string[i]+string[i+1]
		while(j<string.length-3 && passes === false){
			compare = string[j+2]+string[j+3]
			if(compare === pair){
				passes = true
			}
			j++
		}
		i++
		j=i
	}
	return passes
}

const checkPairSandwich = (string) =>{
	let i = 0
	let passes = false
	while(i<string.length-2 && passes === false){
		if(string[i] === string[i+2]){
			passes = true
		}
		i++
	}
	return passes
}

const allChecks2 = (string) =>{
	let passArr = []
	passArr[0] = checkPairRepeat(string)
	passArr[1] = checkPairSandwich(string)
	if(passArr.includes(false)){
		return false
	} else {
		return true
	}
}

// let test = ['qjhvhtzxzqqjkmpb',
// 'xxyxx',
// 'uurcxstgmygtbstg', 
// 'ieodomkazucvgmuy',]

// console.log(test.map(string => checkPairSandwich(string)))
// console.log(test.map(string => checkPairRepeat(string)))

/// These iterate over the whole listt and count the passing groups.

const checkAllEntries = (arr, checks) => arr.map(entry => checks(entry))

const countPasses = (arr) => {
	let i = 0
	let count = 0
	while(i < arr.length){
		if(arr[i] === true) {
			count++
		}
	console.log(count)
	i++
	}
	return count
}
const countPassingEntries = (arr, checks) => countPasses(checkAllEntries(arr, checks))
const niceCount1 = (data)=>{
	let arr = dataToArray(data)
	let passingCount =  countPassingEntries(arr, allChecks1)
	return passingCount
}
const niceCount2 = (data) =>{
	let arr = dataToArray(data)
	let passingCount = countPassingEntries(arr, allChecks2)
}

// useFile(niceCount1, './input.txt')
useFile(niceCount2, './input.txt')