'use strict'
const { View } = window.QUI
import style from './index.css'
import { goLive } from '../../utils/goto'
import config from '../../utils/'
import PropTypes from 'prop-types'
class RankItem extends React.Component {
  _handleItem (args) {
    // 正在直播的主播进入／或者在糗事百科的直播页面进入的不响应
    if (config.isAnchor || config.qiubaizhibo) {
      // console.log('正在直播的主播进入／或者在糗事百科的直播页面进入的不响应')
      return
    }
    if (config.inapp_info) {
      // console.log('在自家APP内，跳转直播页／个人主页')
      const { uid, source, platform_id, live } = args
      if (uid == null || source == null || platform_id == null) { return }
      else {
        const arg = { uid, source, platform_id }
        if (live === 1) {
          // 直播间
          goLive(arg)
        }
        else {
          // 个人主页
          // goIndex(arg)
        }
      }
      return
    }
    else {
      // console.log('没有在自家APP内，跳去下载')
      window.location.href = config.download
      return
    }
  }
  render () {
    const { cnt } = this.props
    return (
      <View>{cnt.name}</View>
    )
  }
}
RankItem.propTypes = {
  cnt: PropTypes.object.isRequired
}
export default RankItem
