class SlideGridDataModel {
  constructor(data, columns, rows, infinite) {
    this.data = data
    this.columns = columns
    this.rows = rows
    this.infinite = infinite
    this.gridSize = rows*columns
  }

  isInfinite() {
    return this.infinite
  }

  getGridSize() {
    return this.columns*this.rows
  }

  getPageCount() {
    return Math.ceil(this.data.length*1.0/this.getGridSize())
  }

  getRows() {
    return this.rows
  }

  getColumns() {
    return this.columns
  }

  getDataIndex(page, col, row) {
    const grid_index = row*this.getColumns()+col
    var arrayIndex=page*(this.getGridSize())+grid_index
    arrayIndex = this.infinite ? arrayIndex%this.data.length : arrayIndex
    return arrayIndex
  }

  getData(page, col, row) {
    // First card is always serviceinfo
    const arrayIndex = this.getDataIndex(page, col, row)
    const d= this.data[arrayIndex]
    return d
  }
}

module.exports={SlideGridDataModel}
