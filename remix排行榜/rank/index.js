'use strict'
const { View } = window.QUI
import style from './index.css'
import RankItem from '../rankItem'
import PropTypes from 'prop-types'
class Rank extends React.Component {
  _renderRankItems () {
    let { list } = this.props
    const { num, showMore } = this.props
    list = showMore ? list : list.slice(0, num)
    return list.map((item, idx) => {
      return <RankItem cnt={item} key={idx}/>
    })
  }
  _renderShowMoreBtn () {
    const { list } = this.props
    const { num, showMore } = this.props
    if (list.length > num) {
      return <View tap={this.props.toggleShowMore}
        className={style.showMoreBtn}>{showMore ? '点击收起' : '点击展开'}</View>
    }
  }
  render () {
    return (
      <View>
        {this._renderRankItems()}
        {this._renderShowMoreBtn()}
      </View>
    )
  }
}
Rank.propTypes = {
  list: PropTypes.array.isRequired,
  num: PropTypes.number,
  showMore: PropTypes.bool,
  toggleShowMore: PropTypes.func.isRequired
}
Rank.defaultProps = {
  num: 5,
  showMore: false
}
export default Rank
