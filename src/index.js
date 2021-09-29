import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import Polular from './component/popular'
import Battle from './component/battle'

function App() {
  return (
    <div className='box'>
      <Router>
        <div className='nav'>
          <div className='nav-box'>
            <NavLink exact to='/' style={{ marginRight: 30 }} activeClassName='link-active'>
              Popular
            </NavLink>
            <NavLink exact to='/battle' style={{ marginRight: 30 }} activeClassName='link-active'>
              Battle
            </NavLink>
          </div>
          <Switch>
            <Route path='/battle'>
              <Battle />
            </Route>
            <Route path='/'>
              <Polular />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
