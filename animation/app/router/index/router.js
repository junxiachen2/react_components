'use strict'
import style from './css.css'
import Animator from '../../components/animator/animator.js'

const { View } = window.QUI
const staticPrefix = 'https://static.app-remix.com/activityWeb/activityLaiseeCarnival/assets/images/'
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      // console.log('图片加载完毕')
      resolve()
    }
    img.onerror = () => {
      reject('图片加载出错')
    }
    img.src = url
  })
}
const preLoadImages = (urlArr) => {
  return new Promise((resolve, reject) => {
    Promise.all(urlArr.map((url) => {
      loadImage(url)
    }))
      .then(() => {
        console.log('所有图片加载完毕')
        resolve()
      })
      .catch(e => {
        reject(e)
      })
  })
}

class Index extends React.Component {
  state = {
    hasLoadImagesCss: false
  }

  circle = null
  circleAnimator = null
  isLoop = true

  laisee = null
  laiseeAnimator = null
  lastLaiseeIdx = null
  hasLoadImages = false
  componentDidMount () {
    const that = this
    if (!that.circle) return
    // const easeInOutBack = BezierEasing(0.68, -0.55, 0.265, 1.55)
    this.circleAnimator = new Animator(2000, (p) => {
      const tx = -100 * Math.sin(2 * Math.PI * p)
      const ty = -100 * Math.cos(2 * Math.PI * p)

      that.circle.style.transform = 'translate(' + tx + 'px,' + ty + 'px)'
    })

    this.laiseeAnimator = new Animator(4000, (p) => {
      const idx = Math.round(24 * p)
      if (that.lastLaiseeIdx === idx) return
      that.lastLaiseeIdx = idx
      that.laisee.style.backgroundImage = `url(${staticPrefix}laisee_open${idx}.png)`
    })
  }

  async _tapCircle () {
    let i = 0
    const that = this
    if (!that.circle) return
    while (that.isLoop) {
      await that.circleAnimator.animate()
      that.circle.style.background = ['red', 'green', 'blue'][i++ % 3]
    }
  }

  async _tapLaisee () {
    const that = this
    if (!that.laisee) return
    const urlArr = []
    for (let i = 0; i < 25; i++) {
      urlArr.push(`${staticPrefix}laisee_open${i}.png`)
    }
    // js 动画
    // if (!that.hasLoadImages) {
    //   await preLoadImages(urlArr)
    //   that.hasLoadImages = true
    // }
    // while (that.isLoop) {
    //   await that.laiseeAnimator.animate()
    // }

    // css 动画
    if (!that.state.hasLoadImagesCss) {
      await preLoadImages(urlArr)
      that.setState({ hasLoadImagesCss: true })
    }
  }

  render () {
    const { hasLoadImagesCss } = this.state
    return (
      <View className={style.container} >
        <View className={style.ball} getRef={(res) => { this.circle = res }} tap={this._tapCircle.bind(this)}></View>
        <View className={style[hasLoadImagesCss ? `animContainerWithAnim` : `animContainer`]} getRef={(res) => { this.laisee = res }}></View>
        <View className={style.btn} tap={this._tapLaisee.bind(this)}>打开红包</View>
      </View>
    )
  }
}
export default Index
