const useFile = require ('../useFile.js')

const dataToString = (data) => data.toString()
const separateEntryString = (string) => string.split('\r\n')
const dataToArray = (data) => separateEntryString(dataToString(data))

///interpret a single string

const splitEntry = (string) => string.split(' ')
const entryObj = (string)=>{
	let arr = splitEntry(string)
	let obj ={
		status: '', 
		start: '',
		end: '',
	}
	if(arr[0]=== 'toggle'){
		obj.status = 'toggle'
		obj.start = arr[1]
		obj.end = arr[3]
	} else {
		obj.status = arr[1]
		obj.start = arr[2]
		obj.end = arr[4]
	}
	return obj
}


const createObjectArray = (arr) => arr.map(entry => entryObj(entry))
const dataToObjectArray = (data) => createObjectArray(dataToArray(data))
const splitEntryCooordinates = (string) => string.split(',')
const objWithCoordinates = (obj)=>{
	let start = splitEntryCooordinates(obj.start)
	let end = splitEntryCooordinates(obj.end)
	obj ={
		status:obj.status,
		start:{x:parseInt(start[0]), y:parseInt(start[1])},
		end:{x:parseInt(end[0]), y:parseInt(end[1])},
	}
	return obj
}
const createObjectCoordArray = (arr) => arr.map(obj => objWithCoordinates(obj))
const dataToCoordArray = (data) => createObjectCoordArray(dataToObjectArray(data))

const createRow = (length, value)=>{
	let i = 0
	let row = []
	while (i<length){
		row.push(value)
		i++
	}
	return row
}
const createGrid = (length, height, value)=>{
	let i = 0
	let grid = []
	let row = createRow(length, value)
	while (i<height){
		grid.push(row)
		i++
	}

	return grid
}

const turnLights = (initialGrid, start, end, value)=>{

	let updatedGrid = initialGrid.map((row,i) =>{
		
		if(i<start.y || i>end.y){
			return row
		} else {
			let newRow = row.map((light, i) => {
				if(i<start.x || i>end.x){
					return light
				} else if (value === 'toggle'){
					if(light === 0){
						return 1
					} else {
						return 0 
					}
				} else {
					return value
				}
			})
			return newRow
		}
	})
	return updatedGrid
}

const fadeLights = (initialGrid, start, end, value) =>{
	let updatedGrid = initialGrid.map((row,i) =>{
		
		if(i<start.y || i>end.y){
			return row
		} else {
			let newRow = row.map((light, i) => {
				if(i<start.x || i>end.x){
					return light
				} else if (value === 'toggle'){
					return light + 2
				} else if (value === 0 && light > 0) {
					return light - 1
				} else if (value === 0 && light === 0){
					return light
				} else if (value === 1){
					return light + 1
				}
			})
			return newRow 
		}
	})
	return updatedGrid
}

let testCommand = [
	{status: 'on', start:{x:2, y:4}, end:{x:7, y:7}},
	{status: 'off', start:{x:4, y:4}, end:{x:7, y:5}},
	{status: 'toggle', start:{x:1, y:4}, end:{x:8, y:7}},
	{status: 'toggle', start:{x:3, y:1}, end:{x:4, y:1}}
]



const interpretDirections = (grid, directions, obj) =>{
	if(obj.status === 'on'){
		return directions(grid, obj.start, obj.end, 1)
	} else if (obj.status === 'off'){
		return directions(grid, obj.start, obj.end, 0)
	} else {
		return directions(grid, obj.start, obj.end, 'toggle')
	}
}

const interpretAllDirections = (arr, directions) =>{
	let i = 0
	let grid = createGrid(1000,1000,0)
	while(i<arr.length){
		grid = interpretDirections(grid, directions, arr[i])
		i++
	}
	return grid
}



const addTwoValues = (accumulator, currentValue) => accumulator + currentValue
const addAllValues = (arr) => arr.reduce(addTwoValues)

const countLights = (grid) =>{
	let rowTotals = grid.map(row => addAllValues(row))
	let grandTotal = addAllValues(rowTotals)
	return grandTotal
}

// console.log(countLights(interpretAllDirections(testCommand, fadeLights)))

let countFromData = (data) =>{
	let coordArray = dataToCoordArray(data)
	let grid = interpretAllDirections(coordArray, fadeLights)
	console.log(grid[100])
	let grandTotal = countLights(grid)
	return grandTotal
}


// console.log(interpretAllDirections(testCommand))
// console.log(countLights(interpretAllDirections(testCommand)))


useFile(countFromData, './input.txt')