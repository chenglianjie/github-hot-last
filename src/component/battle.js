/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { UsergroupAddOutlined, TrophyOutlined, RocketOutlined } from '@ant-design/icons'
import { getResultData } from '../request/request'
import { message, Button, Spin } from 'antd'
import './style/battle.less'
const Battle = props => {
  const [plaayer1, setPlaayer1] = useState('') // 玩家一
  const [plaayer2, setPlaayer2] = useState('') // 玩家二
  const [showPlayer1Img, setShowPlayer1Img] = useState(true) // 玩家一是否显示图片
  const [showPlayer1Img2, setShowPlayer1Img2] = useState(true) // 玩家二是否显示图片
  const [p1Img, setP1Img] = useState('') // 玩家一的图片
  const [p1Img2, setP1Img2] = useState('') // 玩家二的图片
  const [loading, setLoading] = useState(false) // 玩家一loading状态
  // 玩家一确认按钮
  const plaayer1Sumit = async () => {
    if (plaayer1) {
      setLoading(true)
      const { avatar_url = '' } = await getResultData(`https://api.github.com/users/${plaayer1}`)
      if (avatar_url) {
        setShowPlayer1Img(false)
        setP1Img(avatar_url)
      }
      setLoading(false)
    } else {
      message.warning('Player不能为空')
    }
  }
  // 玩家二确认按钮
  const plaayer2Sumit = async () => {
    if (plaayer2) {
      setLoading(true)
      const { avatar_url } = await getResultData(`https://api.github.com/users/${plaayer2}`)
      if (avatar_url) {
        setP1Img2(avatar_url)
        setShowPlayer1Img2(false)
      }
      setLoading(false)
    } else {
      message.warning('Player不能为空')
    }
  }
  // 点击战斗按钮
  const clickBattle = () => {
    props.history.push({
      pathname: '/result',
      state: { plaayer1, plaayer2 },
      search: `?player1=${plaayer1}&player2=${plaayer2}`,
    })
  }
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
                placeholder='github username'
                type='text'
                onKeyDown={e => {
                  if (e.keyCode === 13 && plaayer1) {
                    plaayer1Sumit()
                  }
                }}
                onChange={e => {
                  setPlaayer1(e.target.value)
                }}
              />
              <Button type='primary' disabled={!plaayer1} onClick={plaayer1Sumit}>
                submit
              </Button>
            </div>
          ) : (
            <Spin spinning={loading}>
              <div className='battle-item-img-box'>
                <div className='player-titie'>
                  <div>
                    <img src={p1Img} alt={`${plaayer1}图片`} />
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
            </Spin>
          )}
        </div>
        <div>
          <div className='Player-title'>Player Two</div>
          {showPlayer1Img2 ? (
            <div>
              <input
                onKeyDown={e => {
                  if (e.keyCode === 13 && plaayer1) {
                    plaayer2Sumit()
                  }
                }}
                placeholder='github username'
                onChange={e => {
                  setPlaayer2(e.target.value)
                }}
                type='text'
              />
              <Button disabled={!plaayer2} type='primary' onClick={plaayer2Sumit}>
                submit
              </Button>
            </div>
          ) : (
            <Spin spinning={loading}>
              <div className='battle-item-img-box'>
                <div className='player-titie'>
                  <div>
                    <img src={p1Img2} alt={`${plaayer2}图片`} />
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
            </Spin>
          )}
        </div>
      </div>
      {!showPlayer1Img && !showPlayer1Img2 && (
        <div className='battle-buttons'>
          <Button type='primary' onClick={clickBattle}>
            Battle
          </Button>
        </div>
      )}
    </div>
  )
}
export default withRouter(Battle)
