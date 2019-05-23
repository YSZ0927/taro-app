/*
 * @Author: Yushuizeng 
 * @描述: 底部菜单组件
 * @Date: 2018-12-29 16:20:51 
 * @Last Modified by: Yushuizeng
 * @Last Modified time: 2018-12-29 22:57:26
 */
import Taro from '@tarojs/taro'
import { AtTabBar }  from 'taro-ui'
// import { connect } from '@tarojs/redux'
// import { changeMenu } from '../../actions/global'
import "./index.styl"

// @connect(({ globals }) => ({
//   globals
// }), (dispatch) => ({
//   changeMenu (index) {
//     dispatch(changeMenu(index))
//   }
// }))

export default class Menu extends Taro.Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }
  componentDidMount () {
    try {
      var value = wx.getStorageSync('index')
      if (value) {
        this.setState({
          current: value
        })
      }
    } catch (e) {
      this.setState({
        current: 0
      })
    }
  }
  handleClick (value) {
    const index = value.currentTarget.dataset.eHandleclickAA
    if (this.state.current === index) return
    wx.setStorage({
      key: 'index',
      data: index
    })
    if (index === 0) {
      Taro.navigateTo({
        url: '/pages/index/index',
      })
    }
    if (index === 1) {
      Taro.navigateTo({
        url: '/pages/find/index',
      })
    }
    if (index === 2) {
      Taro.navigateTo({
        url: '/pages/user/index',
      })
    }
  }
  render () {
    // console.log(this.props.globals.data.menuIndex)
    return (
      <AtTabBar
        fixed
        tabList={[
          { title: '首页', iconType: 'index', iconPrefixClass:'yu', text: 'new' },
          { title: '发现', iconType: 'find', iconPrefixClass:'yu' },
          { title: '用户', iconType: 'user', iconPrefixClass:'yu', dot: true}
        ]}
        // onClick={this.handleClick.bind(this.currentTarget.dataset.eHandleclickAA)}
        onClick={this.handleClick.bind(this, 1)}
        current={this.state.current}
        fontSize={12}
        color={'#ccc'}
        selectedColor={'#000'}
      />
    )
  }
}

