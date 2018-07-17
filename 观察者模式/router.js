'use strict'
const { Text, View } = window.QUI
import style from './css.css'
import Subject from './comp/subject'
import Board from './comp/board'
class Index extends React.Component {
  componentDidMount () {
    const subject = new Subject()
    const board1 = new Board(subject, `源源面板`)
    const board2 = new Board(subject, `千千面板`)
    const board3 = new Board(subject, `小凯面板`)
    let board4 = null

    setTimeout(() => {
      board4 = new Board(subject, `TF面板`)
      subject.setMeasurements(35)
    }, 3000)
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
