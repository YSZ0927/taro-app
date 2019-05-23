import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Menu from '../../components/Menu';
import './index.styl'

import { getRecommend } from '../../actions/counter'
import img from '../../assets/images/home/big_img.jpg'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  getRecommend () {
    dispatch(getRecommend())
  }
}))
// const mapStateToProps = state => {
//   return {
//     data: state.
//   }
// }
// export default connect(mapStateToProps, {

// })(Index)
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor (props) {
    // 父类的构造函数 调用constructor
    super(props)
    this.state = {
      currentIndex: 0,
      tabsList: [
        '推荐',
        '列表'
      ],
    }
  }
  
  componentWillMount () { }

  componentDidMount () { 
    this.props.getRecommend()
    // global.console.log(a)
    this.getToday()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  formatTime(num) {
    // console.log(num)
    let time
    if (num > 10 && num < 20) {
      time = `-${num.toString().charAt(1)}`
    } else if (num.toString().charAt(1) === '0' && num.toString().charAt(0) !== '1') {
      time = `${num.toString().charAt(0)}-`
    } else if (num === 10) {
      time = '-'
    } else {
      time = num
    }
    // console.log(time)
    return time
  }
  getToday() {
    const days = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const Str = `${this.formatTime(month)}月${this.formatTime(day)}日`
    let lastDate = ''
    for (let i = 0; i < Str.length; i++) {
      if (isNaN(parseInt(Str.charAt(i)))) {
        // debugger
        if (Str.charAt(i) == '-') {
          lastDate += days[days.length-1]
        } else {
          lastDate += Str.charAt(i)
        }
      } else {
        lastDate += days[Str.charAt(i)]
      }
    }
    return lastDate
  }
  
  formatStr(str) {
    // if (!str.indexOf('|')) return
    if (str.length > 0) {
      const list = str.split('|')
      return list
    }  
  }
  tabClick(index) {
    console.log(index)
    this.setState({
      currentIndex: index.currentTarget.dataset.eTabclickAA
    })
    if (index === 1) {
      this.getRecommendList()
    }
  }
  render () {
    // const { counter } = this.props
    let {tabsList} = this.state
    // const arr = counter.data.content.split('|')
    // const arr = counter.data.rows
    // let tabList = ['推荐', '列表']
    // let active = 'active'
    return (
      <View className='home'>
        <View className='home_top-tab'>
          {
            tabsList.map((item,index) => {
              let active = index === this.state.currentIndex ? 'active tab_item' : 'tab_item'
              return <Text key={index} className={active} onClick={this.tabClick.bind(this, index)}>
              {item}</Text>
            })
          }
        </View>
        {this.state.currentIndex ===0 ? (
          <View className='home_recommend'>
            <View className="date-area">
              <View>
                <Text>{this.getToday()}</Text>
              </View>
              <View className='area-weather'>
                <Text>朝阳 · 晴  2°C</Text>
              </View>
            </View>
            <View className="recommend-text">
              <Image src={img} className='img'></Image>
              <Text>
                最地道的美食，最浓郁的年味，还得去倒没被城市吞没的小村小镇。那里的生活才叫生活，城市，尤其是大城市的，叫生存，只是活着
              </Text>
              <View className='icon-group'>
                <View className='icon-left'>
                  <View className='yu yu-browse'></View>
                  <Text>999</Text>
                </View>
                <View className='icon-right'>
                  <View className='yu yu-edit'></View>
                  <View className='yu yu-collect'></View>
                  <View className='yu yu-share'></View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View className='home_recommend-list'>
            <View className='recommend-list'>
              <Text className='item-title'></Text>
              <View className='item-img'>
                <Image src='https://image.sudian178.com/sd/materialImg/5920818355740767.jpg'></Image>
              </View>
              <Text className='item-content'>今年过节不收礼</Text>
              <View className='icon-group'>
                <View className='icon-left'>
                  <View className='yu yu-browse'></View>
                  <Text>999</Text>
                </View>
                <View className='icon-right'>
                  <View className='yu yu-collect'></View>
                  <View className='yu yu-share'></View>
                </View>
              </View>
            </View>
            <View className='recommend-list'>
              <Text className='item-title'></Text>
              <View className='item-img'>
                <Image src='https://image.sudian178.com/sd/materialImg/5920818355740767.jpg'></Image>
              </View>
              <Text className='item-content'>今年过节不收礼</Text>
              <View className='icon-group'>
                <View className='yu yu-browse'></View>
                <View className='icon-right'>
                  <View className='yu yu-liked liked'></View>
                  <View className='yu yu-share'></View>
                </View>
              </View>
            </View>
            <View className='recommend-list'>
              <Text className='item-title'></Text>
              <View className='item-img'>
                <Image src='https://image.sudian178.com/sd/materialImg/5920818355740767.jpg'></Image>
              </View>
              <Text className='item-content'>今年过节不收礼</Text>
              <View className='icon-group'>
                <View className='yu yu-browse'></View>
                <View className='icon-right'>
                  <View className='yu yu-liked liked'></View>
                  <View className='yu yu-share'></View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

