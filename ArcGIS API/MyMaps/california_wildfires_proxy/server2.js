import express from 'express';
import cors from 'cors';
import corsAnywhere from 'cors-anywhere';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const { PORT } = process.env;
const port = PORT || 3030;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

var app = express();

let proxy = corsAnywhere.createServer({
	originWhitelist: [], // Allow all origins
	requireHeaders: [], // Do not require any headers.
	removeHeaders: [], // Do not remove any headers.
});

app.use(cors());

app.get('/proxy/:proxyUrl*', (req, res) => {
	// req.url = req.url.replace('/proxy/', '/');
	req.url = req.url.replace('/proxy/https:/', '/https://');
	proxy.emit('request', req, res);
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
