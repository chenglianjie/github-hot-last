import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
//  react 组件懒加载
const Polular = React.lazy(() => import('./component/popular'))
const Battle = React.lazy(() => import('./component/battle'))
const Result = React.lazy(() => import('./component/result'))
import './component/style/index.css'

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
            <Suspense fallback={<div>Loading...</div>}>
              <Route path='/battle'>
                <Battle />
              </Route>
              <Route path='/result'>
                <Result />
              </Route>
              <Route path='/'>
                <Polular />
              </Route>
            </Suspense>
          </Switch>
        </div>
      </Router>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
