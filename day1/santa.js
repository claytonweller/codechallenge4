
const useFile = require('../useFile.js')

const dataToArray = (data) => Array.from(data.toString())

const finalFloor = (data) => {
	console.time('Final floor')
	let arr = dataToArray(data)
	let floor = 0;
	arr.map(direction => {
		if (direction === '('){
			floor++;
		} else {
			floor--;
		};
	});
	console.timeEnd('Final floor')
	return 'Final floor: ' + floor

}

const firstBasement = (data) =>{
	console.time('Basement')
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
			console.log('First Basement:', i+1)
			console.timeEnd('Basement')
		}
	});
}

useFile(firstBasement, './directions.txt')
useFile(finalFloor, './directions.txt')