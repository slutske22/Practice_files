const chalk = require('chalk');

console.log('this\n\n');

let i = 0;

let interval = setInterval(() => {
	process.stdout.write(chalk.green(`clock: ${new Date()}\r`));
	i++;
	if (i === 5) {
		clearInterval(interval);
		console.log('\n\ndone');
	}
}, 1000);