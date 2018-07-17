class Subject {
  obervers = []
  temp = 28
  register (oberver) {
    this.obervers.push(oberver)
    // console.log(`注册了subject`, oberver)
  }

  remove (oberver) {
    let idx = -1
    this.obervers.map((item) => {
      if (item.id === oberver.id) {
        idx = item.id
      }
    })
    if (idx > -1) {
      this.obervers.splice(idx, 1)
    }
  }

  notify () {
    const { obervers, temp } = this
    for (const i in obervers) {
      obervers[i].update(temp)
    }
  }

  setMeasurements (temp) {
    this.temp = temp
    this.notify()
  }
}
export default Subject
