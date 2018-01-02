module.exports.write = function() {
   throw new Error('disconnected');
};

module.exports.read = function() {
   throw new Error('disconnected');
};