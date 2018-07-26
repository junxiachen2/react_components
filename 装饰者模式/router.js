'use strict'
const { Text, View } = window.QUI
import style from './css.css'
import { Espresso, HouseBlend } from './comp/coffee'
import { Milk, Mocha, Soy } from './comp/condiment'
class Index extends React.Component {
  componentDidMount () {
    let coffee = new Espresso()
    coffee = new Milk(coffee)
    coffee = new Soy(coffee)
    console.log(coffee.getDescription(), '$' + coffee.cost())

    let coffee2 = new Espresso()
    coffee2 = new Milk(coffee2)
    coffee2 = new Mocha(coffee2)
    console.log(coffee2.getDescription(), '$' + coffee2.cost())
  }

  render () {
    return (
      <View className={style.container} >
        <Text>Hello world</Text>
      </View>
    )
  }
}
export default Index
