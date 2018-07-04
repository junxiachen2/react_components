'use strict'
import React from 'react'
import style from './css.css'
import ChessBoard from './gobang'
const cbConfig = {
  padding: 10,
  row: 15,
  column: 15,
  size: 20,
  radius: 6
}
class App extends React.Component {
  constructor () {
    super()
    this.chessboard = null
    this.canvasDom = null
    this.player = 1 // 玩家1，玩家2
    this.winFlag = false
  }
  componentDidMount () {
    this.chessboard = new ChessBoard()
  }
  _putChess (e) {
    if (this.winFlag) return
    const { chessboard, player } = this
    const { pageX, pageY } = e
    const { top, left } = this.canvasDom.getBoundingClientRect()
    const { padding, size } = cbConfig
    const x = Math.floor((pageX - left - padding / 2) / size)
    const y = Math.floor((pageY - top - padding / 2) / size)
    const canChess = chessboard.putChess(player, x, y)
    if (!canChess) return
    this._drawChess(player, x, y)
    this.winFlag = chessboard.judge(player, x, y)
    if (this.winFlag) {
      console.log(`玩家${player}胜利！`)
    }
    this.player = player === 1 ? 2 : 1
  }
  _drawChess (player, x, y) {
    const { padding, size, radius } = cbConfig
    const ctx = this.canvasDom.getContext('2d')
    const drawX = padding + x * size
    const drawY = padding + y * size
    ctx.beginPath()
    ctx.arc(drawX, drawY, radius, 0, Math.PI * 2, false)
    const g = ctx.createRadialGradient(drawX, drawY, radius, drawX, drawY, 0)
    if (player === 1) {
      g.addColorStop(0, '#000')
      g.addColorStop(1, '#636766')
    }
    else if (player === 2) {
      g.addColorStop(0, '#D1D1D1')
      g.addColorStop(1, '#fff')
    }
    ctx.fillStyle = g
    ctx.fill()
  }
  _drawBg (res) {
    const bgSelector = res
    const { row, column, size, padding } = cbConfig
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
  }
  render () {
    return (
      <div>
        <div className={style.container}>
          <canvas ref={res => { this._drawBg(res) }} className={style.gobangBg} width="300" height="300"/>
          <canvas ref={res => { this.canvasDom = res }} className={style.gobangMain} width="300" height="300"
            onClick={e => { this._putChess(e) }}>
            你的浏览器不支持canvas,请用其他浏览器打开~
          </canvas>
        </div>
      </div>
    )
  }
}

export default App
