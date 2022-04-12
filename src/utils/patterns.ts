const patterns = {
  date: new RegExp(
    /\d{2,}\/\d{2,}\/\d{2,}|\d{2,}-\d{2,}-\d{2,}/,
  ),
  onlyNumbers: new RegExp(/^\d+$/),
}

export default patterns