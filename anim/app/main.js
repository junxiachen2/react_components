'use strict'
import React from 'react'
import { render } from 'react-dom'
import App from './component/index'
import './utils/resize.js'

const main = function () {
  render(<App />, document.getElementById('main'))
}
window.onload = function () {
  main()
}
