import express from 'express';
import bp from 'body-parser';
import dotenv from 'dotenv';
import { createCanvas, loadImage } from 'canvas';

dotenv.config();

const MAPBOX_RGB_URL = (coord) =>
	`https://api.mapbox.com/v4/mapbox.terrain-rgb/13/543/${coord}.pngraw?access_token=${process.env.MAPBOX_TOKEN}`;

const port = process.env.PORT || 3232;
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// app.post('/getimage', (req, res) => {
// 	console.log('getimage post');
// 	console.log(req.body);

// 	res.send({});
// });

const tiles = {};
const boundsCoords = [3615, 3616, 3617, 3618];

async function loadTile() {
	const canvas = createCanvas(256, 256);
	const ctx = canvas.getContext('2d');

	// loadImage(MAPBOX_RGB_URL(3615))
	// 	.then((img) => {
	// 		ctx.drawImage(img, 0, 0, 256, 256);
	// 		const imageData = ctx.getImageData(0, 0, 256, 256);
	// 		console.log(imageData);
	// 	})
	// 	.catch((e) => console.log(e));

	Promise.all(boundsCoords.map((coord) => loadImage(MAPBOX_RGB_URL(coord))))
		.then((images) => {
			images.forEach((img, ind) => {
				const canvas = createCanvas(256, 256);
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, 256, 256);
				const imageData = ctx.getImageData(0, 0, 256, 256);
				tiles[boundsCoords[ind]] = imageData;
			});
		})
		.then(() => console.log(tiles));
}

loadTile();

app.listen(port, () => console.log(`App listening on port ${port}`));
