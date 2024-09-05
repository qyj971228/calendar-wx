// components/nav/nav.js
const App = getApp()

Component({

	options: {
		addGlobalClass: true,
		multipleSlots: true
	},

	/**
	 * 组件的属性列表
	 */
	properties: {
		refresherTriggered: false,
		refresherEnabled: false,
		isHomePage: false
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		navHeight: 0,
		statusBarHeight: 0
	},

	/**
	 * 组件的生命周期
	 */
	lifetimes: {
		attached() {
			this.setData({
				statusBarHeight: App.globalData.statusBarHeight,
				navHeight: App.globalData.navHeight
			})
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		pullRefresh() {
			this.triggerEvent('pullRefresh')
		},
		back() {
			wx.navigateBack({
				delta: 1
			})
		}
	},
})