class Berverage {
  constructor () {
    this.description = 'Unknow Beverage'
  }
  getDescription () {
    return this.description
  }
  cost () { return }
}

class CondimentDecorator extends Berverage {
  getDescription () {}
}

export { Berverage, CondimentDecorator }
