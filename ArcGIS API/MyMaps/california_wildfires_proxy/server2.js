import express from 'express';
import cors from 'cors';
import path from 'path';
import corsAnywhere from 'cors-anywhere';

const { PORT } = process.env;
const port = PORT || 3030;

var app = express();

let proxy = corsAnywhere.createServer({
	originWhitelist: [], // Allow all origins
	requireHeaders: [], // Do not require any headers.
	removeHeaders: [], // Do not remove any headers.
});

app.use(cors());

app.get('/proxy/:proxyUrl*', (req, res) => {
	req.url = req.url.replace('/proxy/', '/'); // Strip '/proxy' from the front of the URL, else the proxy won't work.
	proxy.emit('request', req, res);
});

app.get('*', (req, res) => {
	// console.log('gotten');
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
