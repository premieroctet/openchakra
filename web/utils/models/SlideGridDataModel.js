class SlideGridDataModel {
  constructor(data, columns, rows, infinite) {
    this.data = data
    this.columns = columns
    this.rows = rows
    this.infinite = infinite
    this.gridSize = rows*columns-1
  }

  isInfinite = () => {
    return this.infinite
  }


  getPageCount = () => {
    return Math.ceil(this.data.length*1.0/this.gridSize)
  }

  getRows = () => {
    return this.rows
  }

  getColumns = () => {
    return this.columns
  }

  getData = (page, col, row) => {
    // First card is always serviceinfo
    const grid_index = row*this.columns+col

    if (grid_index==0) {
      return null
    }
    var arrayIndex=page*(this.gridSize)+grid_index-1

    arrayIndex = this.infinite ? arrayIndex%this.data.length : arrayIndex
    const d= this.data[arrayIndex]
    return d
  }
}

module.exports={SlideGridDataModel}
