import { Berverage } from './base'

class Espresso extends Berverage {
  constructor () {
    super()
    this.description = 'Espresso'
  }
  cost () {
    return 1.99
  }
}

class HouseBlend {
  constructor () {
    // super()
    this.description = 'HouseBlend'
  }
  cost () {
    return 0.89
  }
}

export { Espresso, HouseBlend }
