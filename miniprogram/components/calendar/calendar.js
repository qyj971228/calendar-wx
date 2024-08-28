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
					{ id: 1, key: "0-1", date: moment(new Date()).format('YYYY-MM-DD') },
					{ id: 2, key: "1-2" },
					{ id: 3, key: "2-3" },
				]
			})
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
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

			const getIndex = (index, offset) => (index + offset + listLength) % listLength

			const nextIndex = getIndex(currentIndex, 1)
			const preIndex = getIndex(currentIndex, -1)
			const currentVal = this.data.list[currentIndex].id

			const newList = []
			newList[preIndex] = { id: currentVal - 1, key: `${preIndex}-${currentVal - 1}` }
			newList[currentIndex] = { id: currentVal, key: `${currentIndex}-${currentVal}` }
			newList[nextIndex] = { id: currentVal + 1, key: `${nextIndex}-${currentVal + 1}` }

			this.setData({
				list: newList,
				canMoveTouch: true
			})
		}
	}
})