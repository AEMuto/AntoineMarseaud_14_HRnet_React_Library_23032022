const patterns = {
  date: new RegExp(
    /[0-9]{2,}\/[0-9]{2,}\/[0-9]{2,}|[0-9]{2,}-[0-9]{2,}-[0-9]{2,}/,
  ),
  onlyNumbers: new RegExp(/^\d+$/),
}

export default patterns