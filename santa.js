const fs = require ('fs')


fs.readFile('./directions.txt', (err, data) =>{
	console.time('timer')
	if(err){
		console.log(err);
	};
	let arr = Array.from(data.toString());
	let floor = 0;

	arr.map(direction => {
		if (direction === '('){
			floor++;
		} else {
			floor--;
		};
	});

	console.log('map', floor);
	console.timeEnd('timer');

})