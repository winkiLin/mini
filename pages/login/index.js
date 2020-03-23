import request from '../../utils/req'
import config from '../../utils/config'
import timer from '../../utils/timer'
import Mcaptcha from '../../utils/mcaptcha.js'
const app = getApp()
Page({
  data: {
    captchaLabel:"获取验证码",
    seconds: timer.length,
    captchaDisabled: false,
    username: '',
    passcode: '',
    msgloading: false,    
    loginDisabled: false,
    loginloading: false
  },
  onReady(){
    this.mcaptcha=new Mcaptcha({
      el: 'canvas',
      width: 80,
      height: 35,
      createCodeImg: ""
      });
  },
  onLoad(e) {
      wx.hideLoading()
  },
  getCode(){  
    if(!this.data.username.match(/^((1[3-9]{1})+\d{9})$/)) { 
      wx.showToast({
        title: '请输入正确的手机号码。',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.setData({
      msgloading:true,
      captchaDisabled: true
    })
    request({
      url: 'get/code',
      method: 'POST',
      data: {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        phone: this.data.username
      },
      isNeedLoading:false,
      isNeedToken: false
    }).then(response => {
      //console.log(response, 'response')
      if(response.code===200){
        this.setData({
          msgloading : false,
          captchaLabel: timer.length + '秒后重新发送'
        })
        wx.showToast({
          title: "验证码已发送，请查收短信。",
          icon: 'none',
          duration: 2000
        })
        // 启动以1s为步长的倒计时
        var interval = setInterval(() => {
            timer.countdown(this);
        }, 1000);
      // 停止倒计时
        setTimeout(function() {
            clearInterval(interval);
        }, timer.length * 1000);
      }else{
        this.setData({
          msgloading : false,
          captchaDisabled: false
        })
        wx.showToast({
          title: response.message?response.message:"获取验证码失败，请检查手机号重试。",
          icon: 'none',
          duration: 2000
        })        
      }
    }).catch(error => {      
      this.setData({
        msgloading : false,
        captchaDisabled: false
      })
    })
  },
  searchWrite(event) {
    this.setData({
      [`${event.target.dataset.type}`]: event.detail.value
    })
  },
  // 登入
  loginBtn() {
    let { username, passcode } = this.data,
    _this = this    
    console.log(this.data,'ceshi')
    if(!this.data.username.match(/^((1[3-9]{1})+\d{9})$/))  { 
      wx.showToast({
        title: '请输入正确的手机号码。',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!passcode) {
      wx.showToast({
        title: '请输入图形验证码。',
        icon: 'none',
        duration: 2000
      })
      return
    }
    _this.setData({loginloading : true,loginDisabled : true})
    getToken()
    function getToken() { 
      request({
        url: 'oauth/token',
        method: 'POST',
        data: {
          client_id: config.clientId,
          client_secret: config.clientSecret,
          grant_type: "password",
          scope: "*",
          type: 2,
          username: _this.data.username,
          password: _this.data.passcode
        },
        isNeedLoading:false,
        isNeedPrefix:false,
        isLogin:true,
        isNeedToken: false
      }).then(response => {
        _this.setData({loginloading : false,loginDisabled : false})
        if(response.access_token){
          wx.setStorage({
            key: 'token',
            data: response.token_type + ' ' + response.access_token,
            success: (ret) => {
              //console.log(ret, 'ret')
              wx.reLaunch({
                url: '../index/index'
              })
            }
          })
          app.globalData.token= response.token_type + ' ' + response.access_token
        }else{
          wx.showToast({
            title: '登录失败，请稍后重试。',
            icon: 'none',
            duration: 2000
          })
        }
        //console.log(response, 'logon-response')
      }).catch(error => {
        console.log(error, 'logon-error')
        _this.setData({loginloading : false,loginDisabled : false})  
      })
    }
  },
  //刷新验证码
onTap(){
  this.mcaptcha.refresh();
  }
}) 