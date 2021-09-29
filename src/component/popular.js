import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { getPopularData } from '../request/request' // 请求接口
import './style/loading.less'
import './style/polular.less'
import axios from 'axios'
const Polular = () => {
  let apiArr = [
    'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=1',
    'https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories&page=1',
    'https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories&page=1',
    'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories&page=1',
    'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories&page=1',
  ]
  // https://developer.github.com/v3/search/#search-repositorie
  const [title, setTitle] = useState([
    { name: 'All', checked: true, id: 0 },
    { name: 'JavaScript', checked: false, id: 1 },
    { name: 'Ruby', checked: false, id: 2 },
    { name: 'Java', checked: false, id: 3 },
    { name: 'CSS', checked: false, id: 4 },
  ]) // 头部标题
  const [listData, setListData] = useState([]) // list渲染数据
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true) // 是否开启下拉加载
  const [count, setCount] = useState(30) // 下拉加载
  const [page, setPage] = useState(1) // 页码
  const [language, setLanguage] = useState('') // 当前选择的语言
  const [initPage, setInitPage] = useState(1)
  // 加载更多数据
  const loadMoreData = async () => {
    console.log('我执行了')
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
  const clickTitle = (id, name) => {
    setPage(1)
    setInitPage(2)
    setLanguage(name)
    setLoading(true)
    const arr = [...title]
    arr.forEach(item => {
      item.checked = false
    })
    arr.forEach(item => {
      if (item.id === id) {
        item.checked = true
      }
    })
    setTitle(arr)
    try {
      axios.get(apiArr[id]).then(res => {
        setListData(res.data.items)
        setLoading(false)
      })
    } catch (error) {
      console.error(error)
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
            正在加载 Loading ...
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
                  <i className='fas fa-user icon-i' style={{ color: 'rgb(255, 191, 116)' }}></i>
                  <a href={item.html_url}>{item.name}</a>
                </div>
                <div>
                  <i className='fas fa-star icon-i' style={{ color: 'rgb(255, 215, 0)' }}></i>
                  {item.stargazers_count} starts
                </div>
                <div>
                  <i className='fas fa-code-branch icon-i' style={{ color: 'rgb(129, 195, 245)' }}></i>
                  {item.forks_count} forks
                </div>
                <div>
                  <i className='fas fa-exclamation-triangle icon-i' style={{ color: 'rgb(241, 138, 147)' }}></i>
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
