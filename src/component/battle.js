/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { UsergroupAddOutlined, TrophyOutlined, RocketOutlined } from '@ant-design/icons'
import { message } from 'antd'
import './style/battle.less'
const Battle = props => {
  console.log('props', props)
  const [plaayer1, setPlaayer1] = useState('') // 玩家一
  const [plaayer2, setPlaayer2] = useState('') // 玩家二
  const [showPlayer1Img, setShowPlayer1Img] = useState(true) // 玩家一是否显示图片
  const [showPlayer1Img2, setShowPlayer1Img2] = useState(true) // 玩家二是否显示图片
  // 玩家一确认按钮
  const plaayer1Sumit = () => {
    if (plaayer1) {
      setShowPlayer1Img(false)
    } else {
      message.warning('Player不能为空')
    }
  }
  // 玩家二确认按钮
  const plaayer2Sumit = () => {
    if (plaayer2) {
      setShowPlayer1Img2(false)
    } else {
      message.warning('Player不能为空')
    }
  }
  // 点击战斗
  const clickBattle = () => {
    props.history.push({ pathname: '/result', state: { plaayer1, plaayer2 }, search: `?${plaayer1}&${plaayer2}` })
  }
  console.log('showPlayer1Img', showPlayer1Img)
  return (
    <div>
      <h2 className='text-center'>Instructions</h2>
      <div className='three-box'>
        <div className='three-box-item'>
          <div className='title'>Enter two Github:</div>
          <div className='img-box'>
            <UsergroupAddOutlined style={{ fontSize: 200, color: '#FFBF74' }} />
          </div>
        </div>
        <div className='three-box-item'>
          <div className='title'>Battle</div>
          <div className='img-box'>
            <RocketOutlined style={{ fontSize: 200, color: '#808080' }} />
          </div>
        </div>
        <div className='three-box-item'>
          <div className='title'>See the winner</div>
          <div className='img-box'>
            <TrophyOutlined style={{ fontSize: 200, color: '#F4EA2A' }} />
          </div>
        </div>
      </div>
      <div className='Players'>Players</div>
      <div className='battle-tow'>
        <div>
          <div className='Player-title'>Player One</div>
          {showPlayer1Img ? (
            <div style={{ marginBottom: 20 }}>
              <input
                type='text'
                onChange={e => {
                  console.log('e', e.target.value)
                  setPlaayer1(e.target.value)
                }}
              />
              <button onClick={plaayer1Sumit}>submit</button>
            </div>
          ) : (
            <div className='battle-item-img-box'>
              <div className='player-titie'>
                <div>
                  <img src='https://github.com/vue.png' alt='' />
                </div>
                <div className='word'>{plaayer1}</div>
              </div>
              <div
                onClick={() => {
                  setPlaayer1('')
                  setShowPlayer1Img(true)
                }}
                className='player-close'
              >
                X
              </div>
            </div>
          )}
        </div>
        <div>
          <div className='Player-title'>Player Two</div>
          {showPlayer1Img2 ? (
            <div>
              <input
                onChange={e => {
                  setPlaayer2(e.target.value)
                }}
                type='text'
              />
              <button onClick={plaayer2Sumit}>submit</button>
            </div>
          ) : (
            <div className='battle-item-img-box'>
              <div className='player-titie'>
                <div>
                  <img src='https://github.com/react.png' alt='' />
                </div>
                <div className='word'>{plaayer2}</div>
              </div>
              <div
                onClick={() => {
                  setPlaayer2('')
                  setShowPlayer1Img2(true)
                }}
                className='player-close'
              >
                X
              </div>
            </div>
          )}
        </div>
      </div>
      {!showPlayer1Img && !showPlayer1Img2 && (
        <div className='battle-buttons'>
          <button onClick={clickBattle}>Battle</button>
        </div>
      )}
    </div>
  )
}
export default withRouter(Battle)
