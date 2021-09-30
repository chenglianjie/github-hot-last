import React, { useState } from 'react'
import ReactDom from 'react-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { Spin } from 'antd'
import { getPopularData } from '../request/request' // 请求接口
import { UserOutlined, StarFilled, ForkOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import './style/loading.less'
import './style/polular.less'
const Polular = () => {
  let apiArr = [
    'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=1',
    'https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories&page=1',
    'https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories&page=1',
    'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories&page=1',
    'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories&page=1',
  ]
  const [title, setTitle] = useState([
    { name: 'All', checked: true, id: 0 },
    { name: 'JavaScript', checked: false, id: 1 },
    { name: 'Ruby', checked: false, id: 2 },
    { name: 'Java', checked: false, id: 3 },
    { name: 'CSS', checked: false, id: 4 },
  ]) // 头部标题
  const [listData, setListData] = useState([]) // list渲染数据
  const [loading, setLoading] = useState(false) // loading状态
  const [hasMore, setHasMore] = useState(true) // 是否开启下拉加载
  const [count, setCount] = useState(30) // 下拉加载
  const [page, setPage] = useState(1) // 页码
  const [language, setLanguage] = useState('') // 当前选择的语言
  const [initPage, setInitPage] = useState(1)
  // 加载更多数据
  const loadMoreData = async () => {
    if (listData.length >= count) {
      setHasMore(false)
      return
    }
    const { items, total_count } = await getPopularData(requestApi())
    ReactDom.unstable_batchedUpdates(() => {
      setCount(total_count)
      setListData([...listData, ...items])
      setPage(page + 1)
    })
  }
  // 生成api接口函数
  const requestApi = () => {
    let api = `https://api.github.com/search/repositories?q=stars:%3E1+language:${language.toLowerCase()}&sort=stars&order=desc&type=Repositories&page=${page}`
    if (!language) {
      api = `https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=${page}`
    }
    return api
  }
  //   点击标题切换
  const clickTitle = async (id, name) => {
    const arr = [...title]
    arr.forEach(item => {
      item.checked = false
    })
    arr.forEach(item => {
      item.checked = item.id === id
    })
    ReactDom.unstable_batchedUpdates(() => {
      setPage(1)
      setInitPage(2)
      setLanguage(name)
      setLoading(true)
      setTitle(arr)
    })
    const { items } = await getPopularData(apiArr[id])
    if (items) {
      ReactDom.unstable_batchedUpdates(() => {
        setListData(items)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }
  return (
    <div className={loading ? 'box box-grey' : 'box'}>
      {loading && (
        <div id='content'>
          <div className='left'></div>
          <div className='center'></div>
          <div className='right'></div>
        </div>
      )}
      <div className='head'>
        {title.map(item => {
          return (
            <div
              onClick={() => {
                clickTitle(item?.id, item?.name)
              }}
              className={item.checked ? 'active' : ''}
              key={item.id}
            >
              {item.name}
            </div>
          )
        })}
      </div>
      <InfiniteScroll
        pageStart={initPage} // 设置初始化请求的页数
        loadMore={() => loadMoreData()} // 监听的ajax请求
        hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
        loader={
          <div className='loader' key={0}>
            正在加载 Loading <Spin />
          </div>
        }
      >
        <div className='main'>
          {listData.map((item, index) => {
            return (
              <div key={item.id} className='list-item'>
                <div className='indexs'>#{index + 1}</div>
                <div className='list-item-img'>
                  <img src={item.owner.avatar_url} />
                </div>
                <div className='full-name'>
                  <a href={item.svn_url}>{item.full_name}</a>
                </div>
                <div className='name'>
                  <UserOutlined style={{ color: 'rgb(255, 191, 116)' }} />
                  <a href={item.html_url}>{item.name}</a>
                </div>
                <div>
                  <StarFilled style={{ color: 'rgb(255, 215, 0)' }} />
                  {item.stargazers_count} starts
                </div>
                <div>
                  <ForkOutlined style={{ color: 'rgb(129, 195, 245)' }} />
                  {item.forks_count} forks
                </div>
                <div>
                  <ExclamationCircleOutlined style={{ color: 'rgb(241, 138, 147)' }} />
                  {item.open_issues_count} Open issues
                </div>
              </div>
            )
          })}
        </div>
      </InfiniteScroll>
    </div>
  )
}
export default Polular
