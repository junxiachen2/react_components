const boardObj = {
  player: 1,
  padding: 10,
  row: 15,
  column: 15,
  size: 20,
  radius: 6
}
class ChessBoard {
  constructor (selector, bgSelector, obj) {
    this.selector = selector
    this.bgSelector = bgSelector
    this.obj = Object.assign(boardObj, obj)
    this.mappingArr = [] // 0代表没有走过，1为白棋，2为黑棋
    this.player = this.obj.player

    this._init()
  }
  _init () {
    this._drawBg()
    this._mapping()
  }
  _drawBg () {
    const { bgSelector } = this
    if (!bgSelector) return
    const { row, column, size, padding } = this.obj
    const ctx = bgSelector.getContext('2d')
    // 列
    for (let i = 0; i < row; i++) {
      ctx.beginPath()
      ctx.moveTo(padding + i * size, padding)
      ctx.lineTo(padding + i * size, padding + size * 14)
      ctx.stroke()
    }
    // 行
    for (let i = 0; i < column; i++) {
      ctx.beginPath()
      ctx.moveTo(padding, padding + i * size)
      ctx.lineTo(padding + size * (column - 1), padding + i * size)
      ctx.stroke()
    }
    // 背景点
    const bgDots = [
      { x: 3, y: 3 },
      { x: 3, y: 11 },
      { x: 7, y: 7 },
      { x: 11, y: 3 },
      { x: 11, y: 11 }
    ]
    for (let i = 0, len = bgDots.length; i < len; i++) {
      ctx.beginPath()
      const x = padding + bgDots[i].x * size
      const y = padding + bgDots[i].y * size
      ctx.arc(x, y, 4, 0, Math.PI * 2, false)
      ctx.fill()
    }
  }
  // 映射棋盘
  _mapping () {
    const { mappingArr } = this
    const { row, column } = this.obj
    for (let i = 0; i < column; i++) {
      mappingArr[i] = []
      for (let j = 0; j < row; j++) {
        mappingArr[i][j] = 0
      }
    }
    this.mappingArr = mappingArr
  }
  // 下子
  _putChess (x, y) {
    const { mappingArr, player } = this
    if (mappingArr[x][y]) return
    // 考虑可以做动态监听
    this.mappingArr[x][y] = player
    console.log(x, y)
  }
  _toPutChess (e) {
    console.log(e)
    const { size, radius } = this
    // const e = event || window.event
    if (e.offsetX < radius / 2 || e.offsetY < radius / 2) {
      return
    }
    const x = Math.floor((e.offsetX - radius / 2) / size)
    const y = Math.floor((e.offsetY - radius / 2) / size)
    this._putChess(x, y)
  }
}

export default ChessBoard
