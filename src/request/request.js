// 获取热门项目列表数据
import axios from 'axios'
import { message, Modal } from 'antd'
const getPopularData = async api => {
  try {
    const { data } = await axios.get(api)
    return data
  } catch (error) {
    const msg = error?.response?.data?.message ?? '接口错误，请检查'
    message.error(msg)
  }
}
const getResultData = async api => {
  try {
    const { data } = await axios.get(api)
    return data
  } catch (error) {
    const msg = error?.response?.data?.message ?? '接口错误，请检查'
    Modal.error({
      title: msg,
      content: '请重新输入玩家',
    })
    return {}
  }
}
export { getPopularData, getResultData }
