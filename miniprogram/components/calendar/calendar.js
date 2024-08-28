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
		list: [],
		canMoveTouch: true,
	},
	/**
	 * 组件的生命周期
	 */
	lifetimes: {
		attached() {
			// 在组件实例进入页面节点树时执行
			this.setData({
				list: [
					{ id: 0, date: this.getMonth(0) },
					{ id: 1, date: this.getMonth(1) },
					{ id: 2, date: this.getMonth(-1) },
				]
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
			const currentID = this.data.list[currentIndex].id
			const currentDate = this.data.list[currentIndex].date

			const newList = []
			newList[preIndex] = { id: currentID - 1, date: this.getMonth(-1, currentDate) }
			newList[currentIndex] = { id: currentID, date: this.getMonth(0, currentDate) }
			newList[nextIndex] = { id: currentID + 1, date: this.getMonth(1, currentDate) }

			this.setData({
				list: newList,
				canMoveTouch: true
			})
		}
	}
})