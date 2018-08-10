class Command {
  constructor (execute, undo, value) {
    this.execute = this[execute]
    this.undo = this[undo]
    this.value = value
    console.log(execute, value)
  }

  add (x, y) {
    return x + y
  }
  sub (x, y) {
    return x - y
  }
  mul (x, y) {
    return x * y
  }
  div (x, y) {
    return x / y
  }
}

class AddCommand extends Command {
  constructor (value) {
    super('add', 'sub', value)
  }
}

class SubCommand extends Command {
  constructor (value) {
    super('sub', 'add', value)
  }
}

class MulCommand extends Command {
  constructor (value) {
    super('mul', 'div', value)
  }
}

class DivCommand extends Command {
  constructor (value) {
    super('div', 'mul', value)
  }
}

export { AddCommand, SubCommand, MulCommand, DivCommand }
