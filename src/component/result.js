/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Spin, Button, Modal } from 'antd'
import { getResultData } from '../request/request'
import './style/result.less'
const Result = props => {
  const [windata, setWindata] = useState({}) // 胜利数据
  const [loseData, setLoseData] = useState({}) // 失败数据
  const [loading, setLoading] = useState(false)
  // 获取url中search的方法
  const getQueryVariable = variable => {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false
  }
  useEffect(() => {
    const plaayer1 = getQueryVariable('player1') ? getQueryVariable('player1') : props?.location?.state?.plaayer1
    const plaayer2 = getQueryVariable('player2') ? getQueryVariable('player2') : props?.location?.state?.plaayer2
    if (plaayer1 && plaayer2) {
      ;(async () => {
        setLoading(true)
        const player1 = await getResultData(`https://api.github.com/users/${plaayer1}`)
        const player2 = await getResultData(`https://api.github.com/users/${plaayer2}`)
        // 判断如果没有这个玩家的情况
        if (JSON.stringify(player1) === '{}' || JSON.stringify(player2) === '{}') {
          Modal.warning({
            title: '参数错误',
            content: '返回上一级目录',
            onOk: () => {
              props?.history?.push('/battle')
            },
          })
        }
        if (player1?.public_repos > player2?.public_repos) {
          setWindata(player1)
          setLoseData(player2)
        } else {
          setWindata(player2)
          setLoseData(player1)
        }
        setLoading(false)
      })()
    } else {
      Modal.warning({
        title: '缺少参数！',
        content: '返回上一级目录',
        onOk: () => {
          props?.history?.push('/battle')
        },
      })
    }
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
