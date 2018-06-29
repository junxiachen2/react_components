// 适配不同浏览器的requestAnimFrame事件
window.requestAnimFrame = (() => {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

window.cancelAnimationFrame = ((qId) => {
  return window.cancelAnimationFrame(qId) ||
    window.webkitCancelAnimationFrame(qId) ||
    function () {
      window.clearTimeout(qId)
    }
})()

/**
 * duration 动画总时长
 * update(ep,p) 动画每一帧的更新事件
 * ep:0~1经过easing之后的动画进程 p:0~1不经过easing的动画进程
 * easing 缓动函数
 */
class Animator {
  constructor (duration, update, easing) {
    this.duration = duration
    this.update = update
    this.easing = easing
  }

  animate () {
    let startTime = 0
    const duration = this.duration
    const update = this.update
    const easing = this.easing
    const that = this

    return new Promise((resolve, reject) => {
      let qId = 0
      const step = (ts) => {
        startTime = startTime || ts
        const p = Math.min(1.0, (ts - startTime) / duration)
        update.call(that, easing ? easing(p) : p, p)

        // 动画已结束
        if (p < 1.0) {
          qId = requestAnimationFrame(step)
        }
        // 动画未结束
        else {
          resolve(that)
        }
      }

      that.cancel = () => {
        cancelAnimationFrame(qId)
        update.call(that, 0, 0)
        reject('canceled')
      }
      qId = requestAnimationFrame(step)
    })
  }

  // 拓展动画
  ease (easing) {
    return new Animator(this.duration, this.update, easing)
  }
}

export default Animator
