import express from 'express';
import bp from 'body-parser';
import dotenv from 'dotenv';
import { createCanvas, loadImage, createImageData } from 'canvas';

dotenv.config();

const MAPBOX_RGB_URL = `https://api.mapbox.com/v4/mapbox.terrain-rgb/13/543/3615.pngraw?access_token=${process.env.MAPBOX_TOKEN}`;

const port = process.env.PORT || 3232;
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// app.post('/getimage', (req, res) => {
// 	console.log('getimage post');
// 	console.log(req.body);

// 	res.send({});
// });

async function loadTile() {
	const canvas = createCanvas(256, 256);
	const ctx = canvas.getContext('2d');
	loadImage(MAPBOX_RGB_URL)
		.then((img) => {
			ctx.drawImage(img, 0, 0, 256, 256);
			const imageData = ctx.getImageData(0, 0, 256, 256);
			console.log(imageData);
		})
		.catch((e) => console.log(e));
}

loadTile();

app.listen(port, () => console.log(`App listening on port ${port}`));
