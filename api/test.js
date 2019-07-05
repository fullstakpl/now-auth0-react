module.exports = async (req, res) => {
  const data = [
    {text: 'test data'},
    {text: 'another test data'}
  ]

  res.status(200).json({ data })
}
