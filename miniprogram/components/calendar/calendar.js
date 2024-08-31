// components/calendar.ts
import moment from 'moment'

Component({

	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		currentMonth: '',
		swiperList: [],
		canMoveTouch: true,
		calendarTitle: ['日', '一', '二', '三', '四', '五', '六'],
	},
	/**
	 * 组件的生命周期
	 */
	lifetimes: {
		attached() {
			// 在组件实例进入页面节点树时执行
			this.setData({
				swiperList: [
					{ id: 0, date: this.getMonth(0) },
					{ id: 1, date: this.getMonth(1) },
					{ id: 2, date: this.getMonth(-1) },
				],
				currentMonth: this.getMonth(0),
			})
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		getMonth(num, date) {
			return moment(date).add(num, 'months').format('YYYY-MM')
		},
		onHandleChange() {
			// console.log('start change')
			this.setData({
				canMoveTouch: false
			})
		},
		onHandleAnimationFinish(e) {
			// console.log('end change')

			const currentIndex = e.detail.current
			const listLength = 3

			const getID = (index, offset) => (index + offset + listLength) % listLength
			const nextIndex = getID(currentIndex, 1)
			const preIndex = getID(currentIndex, -1)
			const currentID = this.data.swiperList[currentIndex].id
			const currentMonth = this.data.swiperList[currentIndex].date

			const newList = []
			newList[preIndex] = { id: currentID - 1, date: this.getMonth(-1, currentMonth) }
			newList[currentIndex] = { id: currentID, date: this.getMonth(0, currentMonth) }
			newList[nextIndex] = { id: currentID + 1, date: this.getMonth(1, currentMonth) }

			this.setData({
				swiperList: newList,
				canMoveTouch: true,
				currentMonth: currentMonth
			})
		}
	}
})