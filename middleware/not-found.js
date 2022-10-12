const notFound = (req, res) => res.status(404).json('Page does not exist')

module.exports = notFound;