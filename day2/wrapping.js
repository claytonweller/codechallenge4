const useFile = require ('../useFile.js')

///this chunk is to convert the data into usable arrays
const dataToString = (data) => data.toString()
const separatePresentsString = (string) => string.split('\r\n')
const dataToPresents = (data) => separatePresentsString(dataToString(data))
const separatePresentParameters = (present) => present.split('x')
const allPresentsParameters = (arr) => arr.map(present => separatePresentParameters(present))


//this reducer is useful for summing over and array
const addTwoValues = (accumulator, currentValue) => accumulator + currentValue
const addAllValues = (arr) => arr.reduce(addTwoValues)


///This chunk is to find the ammount of ribbon needed

const ascendingSort = (arr) => arr.sort((a, b) => a - b)
const ribbonAround = (arr) => 2* arr[0]+ 2* arr[1]
const presentVolume = (arr) => arr[0]*arr[1]*arr[2]
const ribbonBow = (arr) => presentVolume(arr)
const totalRibon = (arr) => ribbonBow(arr) + ribbonAround(arr)
const individualRibbons = (arr) => arr.map(present =>{
	let sorted = ascendingSort(present)
	let ribbon = totalRibon(sorted)
	return ribbon
})


const allTheRibbon = (data) =>{

	let presents = dataToPresents(data)
	let dimensionArray = allPresentsParameters(presents)
	let totals = individualRibbons(dimensionArray)
	let grandTotal = addAllValues(totals)
	return grandTotal
} 


useFile(allTheRibbon, './presentList.txt')


///this Chunk is for the totall Wrapping paper required

const areaCalculation = (arr) =>{
	let side1 = arr[0]*arr[1]
	let side2 = arr[0]*arr[2]
	let side3 = arr[1]*arr[2]
	return [side1,side2,side3,side1,side2,side3]
}
const allPresentsSA = (arr) => arr.map(present => areaCalculation(present))
const findSmallestSide = (arr) => {
	if (arr[0] <= arr[1] && arr[0]<=arr[2]){
		return arr[0]
	} else if (arr[1]<=arr[0] && arr[1]<=arr[2]){
		return arr[1]
	} else if (arr[2]<=arr[1] && arr[2]<=arr[0]){
		return arr[2]
	}
}
const ammendSmallestSide = (arr) => {
	let smallestSide = findSmallestSide(arr)
	arr.push(smallestSide)
	return arr
}
const ammendAllPresents =(arr) => arr.map(present => ammendSmallestSide(present))
const addEachPresent = (arr) => arr.map(present => addAllValues(present))



const wrappingTotal = (data) => {
	let presents = dataToPresents(data)
	let dimensionArray = allPresentsParameters(presents)
	let areaArray = allPresentsSA(dimensionArray)
	let areaArrayAmmended = ammendAllPresents(areaArray)
	let individualTotals = addEachPresent(areaArrayAmmended)
	let grandTotal = addAllValues(individualTotals)
	return grandTotal
}


// useFile(wrappingTotal, './presentList.txt')




