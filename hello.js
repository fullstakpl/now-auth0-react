

module.exports = (req, res) => {
  res.status(200).json({ message: 'Siemanko!', createdAt: new Date() })
}
