const useFile = require ('../useFile.js')

// d: 72
// e: 507
// f: 492
// g: 114
// h: 65412
// i: 65079
// x: 123
// y: 456


let test = [


	'456 -> y',
	'j LSHIFT 3 -> l',
	'x AND y -> d',
	'1 AND e -> j',
	'x OR y -> e',
	'x LSHIFT 2 -> f',
	'y RSHIFT 2 -> g',
	'123 -> x',
	'NOT x -> h',
	'NOT y -> i',
	

]



const splitEntry = (entry) => entry.split(' ')


const operatorSort = (arr) => {
	let obj = {}

	if(arr.length === 3){
		obj.type = 'signal'
		obj.input = arr[0]
		obj.output = arr[2]
	} else if (arr.length === 4){
		obj.type = arr[0]
		obj.input = arr[1]
		obj.output = arr[3]
	} else {
		obj.type = arr[1]
		obj.input = {a:arr[0], b:arr[2]}
		obj.output = arr[4]
	}

	return obj

}
const splitSort = (entry) => operatorSort(splitEntry(entry))

// let nodes = {}

const createNode = (obj, nodes) =>{
	if(obj.type === 'signal'){
		nodes[obj.output]=obj.input
	} else {
		nodes[obj.output]= undefined
	}
}

const canCalculateNode = (obj, nodes) =>{
	if(obj.type === 'AND' || obj.type === 'OR'){
		if(nodes[obj.input.a] !== undefined && nodes[obj.input.b] !== undefined){
			return true
		} else if(obj.input.a === '1' && nodes[obj.input.b] !==undefined){
			return true
		} else return false 
	} else if (obj.type === 'RSHIFT' || obj.type === 'LSHIFT'){
		if(nodes[obj.input.a] !== undefined){
			return true
		} else return false
	} else if (obj.type === 'NOT'){
		if(nodes[obj.input] !== undefined){
			return true
		} else return false
	} else return false
}

const createAllNodes = (arr, nodes) => arr.map(entry => createNode(splitSort(entry), nodes))

let computeValue = (obj, nodes)=>{
	switch(obj.type){
		case 'AND':
			if(obj.input.a !== '1'){
				return nodes[obj.input.a] & nodes[obj.input.b]
			} else return '1' & nodes[obj.input.b]
		case 'OR': return nodes[obj.input.a] | nodes[obj.input.b] 
		case 'RSHIFT': return nodes[obj.input.a] >> obj.input.b 
		case 'LSHIFT': return nodes[obj.input.a] << obj.input.b 
		case 'NOT': return 65535 - nodes[obj.input] 
		default: console.log('how did we get here?')
	}
}

const calculateNode = (obj, nodes) =>{
	
	if(canCalculateNode(obj, nodes) && nodes[obj.output] === undefined){
		
		nodes[obj.output] = computeValue(obj, nodes)
	
	} else if(obj.type !== 'signal' && !canCalculateNode(obj, nodes)) {
		return false
	}
}


const createAndEvaluateNodes = (arr) =>{
	let nodes = {}
	createAllNodes(arr, nodes)
	let directions = arr.map(entry => splitSort(entry))
	let i = 0
	let pass = true
	while (i<directions.length){
		let status = calculateNode(directions[i], nodes)
		i++
		if(status === false){
			pass = false
		}
		if(pass === false && i===directions.length){
			i=0
			pass=true
		}
	}
	return nodes
}

const dataToString = (data) => data.toString()
const separateEntryString = (string) => string.split('\r\n')
const dataToArray = (data) => separateEntryString(dataToString(data))

const evaluateData = (data) =>{
	let arr = dataToArray(data)
	let nodes = createAndEvaluateNodes(arr)
	return nodes.a
}

useFile(evaluateData, './input.txt')
