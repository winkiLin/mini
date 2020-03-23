// components/tabbar/tabbar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [{
      "pagePath": "/pages/index/index",
      "iconPath": "../../image/home-icon.png",
      "selectedIconPath": "../../image/home-active-icon.png",
      "text": "首页"
    },
    {
      "pagePath": "/pages/cloth-need-add/index",
      "iconPath": "../../image/add-icon.png",
      "selectedIconPath": "../../image/add-icon.png",
      "text": "找版"
    },
    {
      "pagePath": "/pages/my/index",
      "iconPath": "../../image/my-icon.png",
      "selectedIconPath": "../../image/my-active-icon.png",
      "text": "我的"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pathTo(e) {
      const that = this
      const select = e.currentTarget.dataset.type
      let url
      switch (select) {
        case "我的":
          url = '/pages/my/index'
          break;
        case "找版":
          url = '/pages/cloth-need-add/index'
          this.triggerEvent('NeedAdd',{reLoad:true})
          break;
        case "首页":
          url = '/pages/index/index'
          break;
          
          default:
            url = '/pages/index/index'
          break;
      }
      wx.switchTab({url})

    },

    setList() {
      this.data.list.splice(1,1)
      this.setData({
        ['list']: this.data.list
      })
    }
  }
})
