import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtImagePicker, AtTextarea, AtTag, AtButton,AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { addState } from '../../actions/state/state'

import './index.styl'

@connect(({ state }) => ({
  state
}), (dispatch) => ({
  addState (params) {
    dispatch(addState(params))
  }
}))

export default class Index extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      files: [],
      value: '',
      tagArr: [
        {name: '电影', active: false},
        {name: '阅读', active: false},
        {name: '音乐', active: false},
        {name: '生活', active: false}
      ],
      userInfo: null,
      showToast: false,
      toastText: null
    }
  }
  componentDidMount () {
    /**
     * 获取用户信息
     */
    const self = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log(res.data)
        self.setState({
          userInfo: res.data
        })
      }
    })
  }
  onChange (files) {
    this.setState({
      files
    })
  }
  onFail (mes) {
    console.log(mes)
  }
  onImageClick (index, file) {
    console.log(index, file)
  }
  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }
  onClick (i) {
    // console.log(event)
    console.log(i)
    this.setState((el) => {
      el.tagArr.map(item => {
        item.active = false
      })
      el.tagArr[i].active = !el.tagArr[i].active
    })
  }
  submitForm() {
    console.log(this.state.files)
    console.log(this.state.userInfo)
    if (this.state.value.length === 0) {
      this.setState({
        showToast: true,
        toastText: '内容不能为空'
      })
      return
    }
    let imgStr = ''
    const length = this.state.files.length
    this.state.files.map((item, index) => {
      imgStr += `${item.url}${index + 1 < length ? ',':''}`
    })
    const params = {
      userId: this.state.userInfo._id,
      content: this.state.value,
      imgUrl: imgStr
    }
    this.props.addState(params)
  }
  render () {
    let {tagArr, showToast, toastText} = this.state
    return (
      <View className='add-new-state'>
        <AtTextarea
        className='add-new-state_text'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          maxLength={200}
          placeholder='此刻你的想法...'
        />
        <AtImagePicker
          className='add-new-state_img'
          files={this.state.files}
          onChange={this.onChange.bind(this)}
        />
        <View className='add-new-state_tag'>
          {
            tagArr.map((item, index) => {
              return <AtTag 
                name={item.name}
                key={index}
                type='primary' 
                circle
                active={item.active}
                className='tag-item'
                onClick={this.onClick.bind(this, index)}
              >
                {item.name}
              </AtTag>
            })
          }
          
        </View>
        <View className='add-new-state_btn'>
          <AtButton className='add-btn' type='primary' onClick={this.submitForm.bind(this)}>发布</AtButton>
        </View>
        <AtToast isOpened={showToast} text={toastText}></AtToast>
      </View>
    )
  }
}