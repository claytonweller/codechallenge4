
const useFile = require('../useFile.js')

// const useDirections = (method) =>{
// 	fs.readFile('./directions.txt')
// 		.then(data => method(data))
// 		.catch(err => console.log(err));
// }

const dataToArray = (data) => Array.from(data.toString())

const finalFloor = (data) => {

	let arr = dataToArray(data)
	let floor = 0;
	arr.map(direction => {
		if (direction === '('){
			floor++;
		} else {
			floor--;
		};
	});
	return 'final floor ' + floor
}

const firstBasement = (data) =>{
	let arr = dataToArray(data)
	let floor = 0;
	let firstFound = false;
	arr.map((direction, i) => {
		if (direction === '('){
			floor++;
		} else {
			floor--;
		};

		if(floor === -1 && firstFound === false){
			firstFound = true;
			return `first Basement ${i+1}`
		}
	});
}

useFile(firstBasement, './day1/directions.txt')
useFile(finalFloor, './day1/directions.txt')