'use strict'
import React from 'react'
import style from './css.css'
import ChessBoard from './class/gobang'
class App extends React.Component {
  componentDidMount () {
    this.chessboard = new ChessBoard(this.mainCanvas, this.bgCanvas, {})
    // this.chessboard.addEventListener('click', this._putChess)
  }
  _putChess (e) {
    console.log(e.target.value)
    if (this.chessboard) this.chessboard._toPutChess(e.target)
  }
  render () {
    return (
      <div>
        <div className={style.container}>
          <canvas
            ref={res => {
              this.mainCanvas = res
            }}
            className={style.gobangBg}
            width="300"
            height="300"
          />
          <canvas
            ref={res => {
              this.bgCanvas = res
            }}
            className={style.gobangMain}
            width="300"
            height="300"
            onClick={e => {
              this._putChess(e)
            }}
          >
            你的浏览器不支持canvas,请用其他浏览器打开~
          </canvas>
        </div>
      </div>
    )
  }
}

export default App
