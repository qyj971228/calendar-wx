// pages/calendar.ts

const App = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navHeight: 0,
		triggered: false,
		currentMonth: '',
		scheduleList: {
			'2024-08': [
				{
					id: '801',
					date: '2024-08-01'
				}, {
					id: '802',
					date: '2024-08-10'
				}, {
					id: '803',
					date: '2024-08-20'
				}
			],
			'2024-09': [
				{
					id: '901',
					date: '2024-09-25'
				}, {
					id: '902',
					date: '2024-09-10'
				}, {
					id: '903',
					date: '2024-09-20'
				},
				{
					id: '903',
					date: '2024-09-30'
				}
			],
			'2024-10': [
				{
					id: '1001',
					date: '2024-10-01'
				}, {
					id: '1002',
					date: '2024-10-01'
				}, {
					id: '1003',
					date: '2024-10-01'
				}
			]
		},
		warnList: {
			'2024-08': [
				{
					id: '123',
					warnType: '预警类型1',
					startDate: '2024-08-10',
					endDate: '2024-08-18'
				},
				{
					id: '112',
					warnType: '预警类型2',
					startDate: '2024-08-17',
					endDate: '2024-08-18'
				},
			],
			'2024-09': [
				{
					id: '122',
					warnType: '持续高温 36~39摄氏度',
					startDate: '2024-09-10',
					endDate: '2024-09-20',
					bgColor: 'rgba(0, 0, 255, 0.1)',
					textColor: 'blue',
				},
				{
					id: '133',
					warnType: '持续高温 36~39摄氏度',
					startDate: '2024-09-17',
					endDate: '2024-09-24',
					bgColor: 'rgba(255, 0, 0, 0.1)',
					textColor: 'red',
				},
				{
					id: '1334',
					warnType: '持续高温 36~39摄氏度',
					startDate: '2024-09-24',
					endDate: '2024-09-26',
					bgColor: 'rgba(255, 200, 0, 0.1)',
					textColor: 'orange',
				},
				{
					id: '13345',
					warnType: '持续高温 36~39摄氏度',
					startDate: '2024-09-24',
					endDate: '2024-09-24',
					bgColor: 'rgba(0, 255, 0, 0.1)',
					textColor: 'green',
				},
			],
			'2024-10': [
				{
					id: '233',
					warnType: '预警类型1',
					startDate: '2024-10-10',
					endDate: '2024-10-14'
				},
				{
					id: '333',
					warnType: '预警类型2',
					startDate: '2024-10-17',
					endDate: '2024-10-18'
				},
			]
		}
	},

	pullRefresh() {
		this.setData({
			triggered: true
		})
		console.log('pullRefreshed')
		setTimeout(() => {
			this.setData({
				triggered: false
			})
		}, 1000);
	},
	onHandleCurrentMonthChange(e) {
		const { currentMonth } = e.detail
		this.setData({ currentMonth })
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		this.setData({
			navHeight: App.globalData.navHeight
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})