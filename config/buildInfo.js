const boxen = require('boxen');
const figlet = require('figlet');
const chalk = require('chalk');


const packageJson = require('../package.json');

const boxenOptions = {
    padding: {
        left: 13,
        right: 13,
        top: 1,
        bottom: 1,
    },
};


const figletOptions = {
    font: 'Slant',
    horizontalLayout: 'controlled smushing',
};


const { name, version, author, license } = packageJson;
const details = chalk.cyan(`${author} | Version ${version} | License ${license} `);



module.exports = function () {
    console.log(chalk.cyan(figlet.textSync(name, figletOptions)));
    console.log(boxen(details, boxenOptions));
};
