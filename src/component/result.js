/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Spin, Button } from 'antd'
import { getResultData } from '../request/request'
import './style/result.less'
const Result = props => {
  const [windata, setWindata] = useState({}) // 胜利数据
  const [loseData, setLoseData] = useState({}) // 失败数据
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const { plaayer1, plaayer2 } = props?.location?.state
    ;(async () => {
      setLoading(true)
      const player1 = await getResultData(`https://api.github.com/users/${plaayer1}`)
      const player2 = await getResultData(`https://api.github.com/users/${plaayer2}`)
      if (player1?.public_repos > player2?.public_repos) {
        setWindata(player1)
        setLoseData(player2)
      } else {
        setWindata(player2)
        setLoseData(player1)
      }
      setLoading(false)
    })()
  }, [])
  return (
    <Spin spinning={loading}>
      <div className='result-box'>
        <div className='result-box-item'>
          <div className='titless'>Winner</div>
          <div>
            <img src={windata?.avatar_url} alt='' />
          </div>
          <div className='scores'>name：{windata?.login}</div>
          <div className='scores'>Scores {windata?.public_repos}</div>
        </div>
        <div className='result-box-item'>
          <div className='titless'>Loser</div>
          <div>
            <img src={loseData?.avatar_url} alt='' />
          </div>
          <div className='scores'>{loseData?.login}</div>
          <div className='scores'>Scores {loseData?.public_repos}</div>
        </div>
      </div>
      <div className='rest'>
        <Button
          type='primary'
          onClick={() => {
            props.history.push('./battle')
          }}
        >
          RESET
        </Button>
      </div>
    </Spin>
  )
}
export default withRouter(Result)
