//app.js
App({
	onLaunch() {
		const { statusBarHeight } = wx.getWindowInfo()
		this.globalData.statusBarHeight = statusBarHeight
	},
	globalData: {
		navHeight: 46,
		statusBarHeight: 0
	},
})