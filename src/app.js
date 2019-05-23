import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
// import { PersistGate } from 'redux-persist/es/integration/react'
import configStore from './store'
import Index from './pages/index'
import './assets/style/icon.styl'
import 'taro-ui/dist/style/index.scss'
// import './assets/style/variables.styl'

import './app.styl'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/find/index',
      'pages/user/index',
      'pages/wechat-login/index',
      'pages/new-state/index',
    ],
    tabBar: {
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/images/icon/home.png",
        selectedIconPath: "./assets/images/icon/home_act.png"
      }, {
        pagePath: "pages/find/index",
        text: "发现",
        iconPath: "./assets/images/icon/find.png",
        selectedIconPath: "./assets/images/icon/find_act.png"
      },{
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "./assets/images/icon/user.png",
        selectedIconPath: "./assets/images/icon/user_act.png",
      }],
      color: '#ccc',
      selectedColor: '#000',
      backgroundColor: '#fff',
      borderStyle: 'black'
    },
    window: {
      backgroundColor: '#f8f8f8',
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    wx.showTabBarRedDot({
      index: 2
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
          <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
