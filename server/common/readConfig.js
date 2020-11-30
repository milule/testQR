module.exports = () => {
	return JSON.parse(require('fs').readFileSync(__dirname + '/DatabaseConfig.json')).AccountKey
}