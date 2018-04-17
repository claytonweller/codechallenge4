const fs = require ('fs')


fs.readFile('./directions.txt', (err, data) =>{
	console.time('timer')
	if(err){
		console.log(err)
	}
	// let string = 
	let arr = Array.from(data.toString())
	let i = 0

	arr.map(direction => {
		if (direction === '('){
			i++
		} else {
			i--
		}
	})

	console.log('map', i)
	console.timeEnd('timer');

})