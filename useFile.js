const fs = require ('mz/fs')

const useDirections = (method,file) =>{
	fs.readFile(file)
		.then(data => console.log(method(data)))
		.catch(err => console.log(err));
}

module.exports = useDirections;