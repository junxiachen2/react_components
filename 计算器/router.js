'use strict'
const { Text, View } = window.QUI
import style from './css.css'
import { AddCommand, SubCommand, MulCommand, DivCommand } from './comp/command'
import Calculator from './comp/calculator'
class Index extends React.Component {
  componentDidMount () {
    const calculator = new Calculator()
    calculator.execute(new AddCommand(12))
    calculator.execute(new SubCommand(2))
    calculator.execute(new MulCommand(3))
    calculator.execute(new DivCommand(2))
    calculator.execute(new AddCommand(89))
    console.log(calculator.getCurrentValue())
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
