import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
// import Menu from '../../components/Menu';
import { connect } from '@tarojs/redux'
import { getUserInfo } from '../../actions/user/user'
import './index.styl'

import logo from '../../assets/images/static/logo.png'

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  getUserInfo (params) {
    dispatch(getUserInfo(params))
  }
}))

export default class Index extends Component {

  config = {
    navigationBarTitleText: '用户'
  }
  constructor (props) {
    super(props)
    this.state = {
      isLogin: true,
      userInfo: null
    }
  }
  componentWillMount () {
    const self = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              const userInfo = res.userInfo
              wx.login({
                success(res) {
                  if (res.code) {
                    const params = {
                      code: res.code
                    }
                    self.props.getUserInfo(Object.assign({}, params, userInfo))
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
            }
          })
        } else {
          self.setState({
            isLogin: false
          })
        }
      }
    })
    
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  addNewState() {
    Taro.navigateTo({
      url: '/pages/new-state/index'
    })
  }
  onGotUserInfo(e) {
    if (e.detail.userInfo) {
      this.setState({
        isLogin: true
      })
      Taro.navigateTo({
        url: '/pages/new-state/index'
      })
    }
  }
  render () {
    const {isLogin} = this.state
    const {user} = this.props
    console.log(user)
    return (
      <View className='user-page'>
      {isLogin ? (
        <View className='user'>
          <View className="user_info">
            <Text className='name'>{user.data.nickName}</Text>
            <Image src={user.data.avatarUrl}></Image>
            <Text className='notice'>关注我的0  我关注的0</Text>
          </View> 
          <View className='user_nav'>
            <View className='nav-list'>
              <Text>我的收藏</Text>
            </View>
            <View className='nav-list'>
              <Text>我的笔记</Text>
            </View>
            <View className='nav-list'>
              <Text>浏览记录</Text>
            </View>
          </View>
          <View className='user_new-state' onClick={this.addNewState.bind(this)}>
            <View className='yu yu-add-jiahao'></View>
          </View>
        </View>
      ) : (
        <View className='wechat-login'>
          <Image src={logo}></Image>
          <Text className='text'>整就完了~</Text>
          <AtButton className='wechat-btn' openType="getUserInfo" bindgetuserinfo="onGotUserInfo" type='primary'>授权登陆</AtButton>
        </View>
      )}
      </View>
    )
  }
}

