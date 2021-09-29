// 获取热门项目列表数据
import axios from 'axios'
const getPopularData = async api => {
  try {
    const { data } = await axios.get(api)
    return data
  } catch (error) {
    const msg = error?.response?.data?.message ?? '接口错误，请检查'
    alert(msg)
  }
}
export { getPopularData }
