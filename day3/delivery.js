const useFile = require ('../useFile.js')

const dataToArray = (data) => Array.from(data.toString())
const stringToArray = (string) => Array.from(string)
const characterToCoordinate = (direction) =>{
	switch (direction){
		case 'v':return [0,-1]
		case '<':return [-1,0]
		case '>':return [1,0]
		case '^':return [0,1]
	}
}
const coordinateArray = (arr) => arr.map(direction => characterToCoordinate(direction))
const removeDuplicates = (arr) => {
	let i = 0;
	while(i<arr.length-1){
		if(arr[i][0] === arr[i+1][0] && arr[i][1] === arr[i+1][1]){
			arr.splice(i,1)
		} else {
			i++;
		}
	}
	return arr
} 


const arrayFromData = (data) =>{
	let startingArray = dataToArray(data)
	let coordinateMoves = coordinateArray(startingArray)
	return coordinateMoves

}

const totalHousesVisited = (data) =>{
	let coordinateMoves = arrayFromData(data)
	let vistedHouses = []
	const newPosition = (movement, oldPosition) => {	
		let position = [oldPosition[0]+movement[0], oldPosition[1]+movement[1]]
		vistedHouses.push(movement)
		return position
	}
	const finalPosition = (arr) => arr.reduce(newPosition)
	const allLocations = (arr) => vistedHouses.push(finalPosition(arr))
	allLocations (coordinateMoves)
	vistedHouses.sort()
	removeDuplicates(vistedHouses)

	return 'Santa Solo: '+ vistedHouses.length

}

useFile(totalHousesVisited, './input.txt')

const santaCoordinates = (arr) => arr.map((coordinate,i)=>{
	if(i%2===0){
		return coordinate
	} else {
		return [0,0]
	}
})
const roboCoordinates = (arr) => arr.map((coordinate,i)=>{
	if(i%2===1){
		return coordinate
	} else {
		return [0,0]
	}
})



const santaHouses = (coordinateMoves) =>{	
	let santaArr = santaCoordinates(coordinateMoves)
	let vistedHouses = []
	const newPosition = (movement, oldPosition) => {	
		let position = [oldPosition[0]+movement[0], oldPosition[1]+movement[1]]
		vistedHouses.push(movement)
		return position
	}
	const finalPosition = (arr) => arr.reduce(newPosition)
	const allLocations = (arr) => vistedHouses.push(finalPosition(arr))
	allLocations (santaArr)
	vistedHouses.sort()
	removeDuplicates(vistedHouses)
	return vistedHouses
}

const roboHouses = (coordinateMoves) =>{
	let roboArr = roboCoordinates(coordinateMoves)
	let vistedHouses = []
	const newPosition = (movement, oldPosition) => {	
		let position = [oldPosition[0]+movement[0], oldPosition[1]+movement[1]]
		vistedHouses.push(movement)
		return position
	}
	const finalPosition = (arr) => arr.reduce(newPosition)
	const allLocations = (arr) => vistedHouses.push(finalPosition(arr))
	allLocations (roboArr)
	vistedHouses.sort()
	removeDuplicates(vistedHouses)
	return vistedHouses	
}


const roboSantaTotal = (data) =>{
	let coordinateMoves = arrayFromData(data)
	let santaArr = santaHouses(coordinateMoves)
	let roboArr = roboHouses(coordinateMoves)
	let vistedHouses = santaArr.concat(roboArr)
	vistedHouses.sort()
	removeDuplicates(vistedHouses)

	return 'Santa + Robo: ' + vistedHouses.length

}


useFile(roboSantaTotal, './input.txt')

