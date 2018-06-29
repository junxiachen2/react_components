'use strict'
import '../../utils/resize'
import Router from './router'
class Main extends React.Component { render () { return (<Router />) } }
const enter = function () { ReactDOM.render(<Main />, document.getElementById('main')) }
window.onload = function () { enter() }
