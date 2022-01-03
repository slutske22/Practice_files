class Cell {
	constructor(angle) {
		this.angle = angle;
		this.count = 0;
		this.cosine = Math.cos(this.angle);
	}
}

const cells = Array.from({ length: 100 }).map(
	(_, i) => new Cell(i * 180 * Math.PI)
);

cells.forEach((cell) => {
	for (i = 0; i < 100; i++) {
		const cosine = cell.cosine;
	}
});
