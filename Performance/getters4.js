class Cell {
	constructor(x, y) {
		this.count = 0;
		this.x = x;
		this.y = y;
	}

	get neighbors() {
		if (this._neighbors) return this._neighbors;

		this.count++;

		const { x, y } = this;

		let neighbors = [];
		for (let j = -1; j <= 1; j++) {
			for (let i = -1; i <= 1; i++) {
				if (!(i === 0 && j === 0)) {
					neighbors.push(new Cell(x + i, y + j));
				}
			}
		}
		this._neighbors = neighbors;
		return this._neighbors;
	}
}

const cells = Array.from({ length: 100 }).map((_, i) => new Cell(5, 5));

cells.forEach((cell) => {
	for (i = 0; i < 100; i++) {
		cell.neighbors;
	}
});

console.log(cells[0].count);
console.log(cells[0].neighbors);
