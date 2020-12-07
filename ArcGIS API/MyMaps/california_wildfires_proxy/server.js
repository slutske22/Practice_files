import express from 'express';
import cors from 'cors';
import anywhere from 'express-cors-anywhere';
import path from 'path';

const { PORT } = process.env;
const port = PORT || 3030;

var app = express();

app.use(cors());
app.use('/proxy', anywhere());

app.get('/cors', (req, res) => {
	console.log('cors path');
	res.json({ thing: 'thing' });
});

app.get('*', (req, res) => {
	console.log('gotten');
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
