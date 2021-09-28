import React from 'react'
import ReactDOM from 'react-dom'
import Login from '@/login'
import './style/index.scss'
import './style/index.css'
import './style/index.less'
function App() {
  let a = 5
  let b = 5
  let c = 5
  return (
    <div className='box'>
      <Login /> hello webpack5! hello webpack5! hello webpack5! useDebugValue(hello webpack5!) hello webpack5!
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
