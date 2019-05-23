import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import './index.styl'

import img3 from '../../assets/images/find/swiper_04.jpg'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '微信授权'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='wechat-login'>
        <Text>允许微信授权后，可体验更多功能</Text>
        <Button openType="getUserInfo">授权登陆</Button>
        <Button>返回首页</Button>
      </View>
    )
  }
}
