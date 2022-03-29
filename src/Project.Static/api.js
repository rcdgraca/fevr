const path = require('path'),
	fs = require('fs'),
	cors = require('cors'),
	express = require('express'),
	app = express(),
	pathAPI = path.join(__dirname, 'src', 'api'),
	port = process.env.PORT || 7000

app.use(express.json())
app.use(cors())

//passsing pathAPI wth GET and callback function
fs.readdir(`${pathAPI}/get`, (error, files) => {
	//handling error
	if (error) return console.log(`Unable to scan directory: ${error}`)

	//listing all files using forEach
	files.forEach(file => app.get(`/api/get/${path.parse(file).name}`, (req, res) => res.sendFile(`${pathAPI}/get/${file}`)))
})

//passsing pathAPI wth POST and callback function
fs.readdir(`${pathAPI}/post`, (error, files) => {
	//handling error
	if (error) return console.log(`Unable to scan directory: ${error}`)

	//listing all files using forEach
	files.forEach(file => app.post(`/api/post/${path.parse(file).name}`, (req, res) => res.send(req.body)))
})

//A simple html for root - to not show 404
app.get('/', (req, res) => res.send('Home Page for API!'))

//listen the port
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))