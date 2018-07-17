const defaultObj = {
  // player: 1,
  row: 15,
  column: 15
}
class ChessBoard {
  constructor (obj) {
    this.obj = Object.assign(defaultObj, obj)
    this.mappingArr = null
    this.reset()
  }
  reset () {
    this.mappingBoard()
  }
  // 映射棋盘
  mappingBoard () {
    this.mappingArr = [] // 0代表没有走过，玩家1，玩家2
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
  putChess (player, x, y) {
    const { mappingArr } = this
    if (mappingArr[x][y]) return
    this.mappingArr[x][y] = player
    // console.log(`玩家${player}在(${x},${y})下子`)
    return true
  }
  // 通过下子位置判断输赢
  judge (player, x, y) {
    let winFlag
    const { mappingArr } = this
    // 判断水平方向是否胜利
    for (let i = 0; i < 5; i++) {
      if (x - i < 0) continue
      winFlag = true
      for (let j = 0; j < 5; j++) {
        if (x - i + j > 14) {
          winFlag = false
        }
        else if (mappingArr[x - i + j][y] !== player) {
          winFlag = false
        }
      }
      if (winFlag) {
        return true
      }
    }

    // 判断竖直方向是否胜利
    for (let i = 0; i < 5; i++) {
      if (y - i < 0) continue
      winFlag = true
      for (let j = 0; j < 5; j++) {
        if (y - i + j > 14) {
          winFlag = false
        }
        else if (mappingArr[x][y - i + j] !== player) {
          winFlag = false
        }
      }
      if (winFlag) {
        return true
      }
    }

    // 判断斜方向(左上到右下)
    for (let i = 0; i < 5; i++) {
      if (x - i < 0 || y - i < 0) continue
      winFlag = true
      for (let j = 0; j < 5; j++) {
        if (x - i + j > 14 || y - i + j > 14) {
          winFlag = false
        }
        else if (mappingArr[x - i + j][ y - i + j] !== player) {
          winFlag = false
        }
      }
      if (winFlag) {
        return true
      }
    }

    // 判断斜方向(右上到左下)
    for (let i = 0; i < 5; i++) {
      if (x + i > 14 || y - i < 0) continue
      winFlag = true
      for (let j = 0; j < 5; j++) {
        if (x + i - j < 0 || y - i + j > 14) {
          winFlag = false
        }
        else if (mappingArr[x + i - j][y - i + j] !== player) {
          winFlag = false
        }
      }
      if (winFlag) {
        return true
      }
    }
    return false
  }
}

export default ChessBoard
