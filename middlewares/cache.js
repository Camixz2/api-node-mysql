const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30 }); // Cache válido por 30 segundos

module.exports = cache;
