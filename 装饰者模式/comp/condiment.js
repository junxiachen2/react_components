import { CondimentDecorator } from './base'

// 调料 milk, mocha, soy
class Milk extends CondimentDecorator {
  constructor (beverage) {
    super()
    this.beverage = beverage
  }
  getDescription () {
    return this.beverage.getDescription() + ', Milk'
  }
  cost () {
    return this.beverage.cost() + 0.20
  }
}
class Mocha extends CondimentDecorator {
  constructor (beverage) {
    super()
    this.beverage = beverage
  }
  getDescription () {
    return this.beverage.getDescription() + ', Mocha'
  }
  cost () {
    return this.beverage.cost() + 0.50
  }
}

class Soy extends CondimentDecorator {
  constructor (beverage) {
    super()
    this.beverage = beverage
  }
  getDescription () {
    return this.beverage.getDescription() + ', Soy'
  }
  cost () {
    return this.beverage.cost() + 0.40
  }
}

export { Milk, Mocha, Soy }

