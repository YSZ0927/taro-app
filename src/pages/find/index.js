import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
// import Menu from '../../components/Menu';
import { connect } from '@tarojs/redux'
import { getStateList } from '../../actions/state/state'
import './index.styl'

import img0 from '../../assets/images/find/swiper_01.jpg'
import img1 from '../../assets/images/find/swiper_02.jpg'
import img2 from '../../assets/images/find/swiper_03.jpg'
import img3 from '../../assets/images/find/swiper_04.jpg'

// import { add, minus, asyncAdd } from '../../actions/counter'

@connect(({ state }) => ({
  state
}), (dispatch) => ({
  getStateList () {
    dispatch(getStateList())
  }
}))

export default class Index extends Component {

  config = {
    navigationBarTitleText: '发现'
  }

  componentWillMount () { }

  componentDidMount () {
    this.props.getStateList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  timeFilter(time) {
    const nowTime = new Date().getTime()
    const creatTime = Date.parse(new Date(time))
    let textStr = ''
    const hour = 60 * 60 * 1000
    const minute = 60 * 1000
    const day = 24 * 60 * 60 * 1000
    const todayStartTime = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 00:00:00`
    const todayStart = Date.parse(new Date(todayStartTime))
    const difference = todayStart > creatTime ? todayStart - creatTime : nowTime - creatTime
    const min = Math.floor(difference / minute)
    const hou = Math.floor(difference / hour)
    const da = Math.floor(difference / day)
    if (todayStart > creatTime) {
      if (hou < 24 && da === 0) {
        textStr = '昨天'
      } else {
        textStr = `${da}天前`
      }
    } else {
      if (difference < minute) {
        textStr = '刚刚'
      } else if (min < 60 && difference < hour) {
        textStr = `${min}分钟前`
      } else if (hou < 24 && difference < day) {
        textStr = `${hou}小时前`
      }
    }
    console.log(todayStart)
    console.log(creatTime)
    console.log(time)
    return textStr
  }
  imgFilter(imgStr) {
    return imgStr.split(',')
  }
  render () {
    const imgArr = [img0, img1, img2, img3]
    const { state } = this.props
    console.log(state)
    return (
      <View className='find'>
        <view className='find_swiper'>
          <Swiper
            className='swiper-box'
            autoplay
            circular
            interval='3000'
            duration='500'>
            {
              imgArr.map((item,index) => {
                return <SwiperItem key={index} className='img-item'><Image src={item} className='img'></Image></SwiperItem>
              })
            }
          </Swiper>
        </view>
        <View className='find_classtify-nav'>
          <Text>分类导航</Text>
          <View className='ul_one'>
            <View className='one_item item'>
              <Image src='//image.sudian178.com/sd/materialImg/5920818355740767.jpg'></Image>
              <Text>「图文」</Text>
            </View>
            <View className='one_item item'>
              <Image src='//image.sudian178.com/sd/materialImg/5920838402776740.jpg'></Image>
              <Text>「问答」</Text>
            </View>
            <View className='two_item item'>
              <Image src='//image.sudian178.com/sd/materialImg/4260117336296892.jpg'></Image>
              <Text>「阅读」</Text>
            </View>
          </View>
          <View className='ul_two'>
            <View className='one_item item'>
              <Image src='//image.sudian178.com/sd/materialImg/5920838402776740.jpg'></Image>
              <Text>「连载」</Text>
            </View>
            <View className='one_item item'>
              <Image src='//image.sudian178.com/sd/materialImg/4260117336296892.jpg'></Image>
              <Text>「影视」</Text>
            </View>
            <View className='one_item last-item item'>
              <Image src='//image.sudian178.com/sd/materialImg/5920838402776740.jpg'></Image>
              <Text>「音乐」</Text>
            </View>
            <View className='one_item last-item item'>
              <Image src='//image.sudian178.com/sd/materialImg/5920818355740767.jpg'></Image>
              <Text>「电台」</Text>
            </View>
          </View>
        </View>
        <View className='find_content-list'>
        {
          state.stateList.rows.map((item,index) => {
            return <View className='item' key={index}>
              <View className='item_header'>
                <AtAvatar size='small' circle image={item.avatarUrl}></AtAvatar>
                <Text>{item.nickName}</Text>
              </View>
              <View className='item_content'>
                <Text>{item.content}</Text>
                <View className='item_img-box'>
                  {
                    this.imgFilter(item.imgUrl).map((el,i) => {
                      return <Image src={el} key={i}></Image>
                    })
                  }
                </View>
              </View>
              <View className='item_date-handle'>
                <Text>{this.timeFilter(item.creatTime)}</Text>
                <View className='icon'>
                  <View className='yu yu-like'></View>
                  <View className='yu yu-discuss'></View>
                </View>
              </View>
            </View>
          })
        }
        </View>
      </View>
    )
  }
}

