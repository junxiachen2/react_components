let id = 0
class Board {
  constructor (subject, name) {
    this.subject = subject
    this.name = name || '面板'
    subject.register(this)
    this.id = id++
  }

  update (temp) {
    const { name } = this
    console.log(`${name}更新温度，当前温度为${temp}°C`)
  }
}

export default Board
