class Calculator {
  constructor () {
    this.current = 0
    this.commands = []
  }
  execute (command) {
    this.current = command.execute(this.current, command.value)
    this.commands.push(command)
  }
  undo () {
    const command = this.commands.pop()
    this.current = command.undo(this.current, command.value)
  }
  getCurrentValue () {
    return this.current
  }
}

export default Calculator
