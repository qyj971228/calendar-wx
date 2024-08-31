// components/calendar-item/calendar-item.ts
import moment from 'moment'

Component({

	/**
	 * 组件的属性列表
	 */
	properties: {
		month: String
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		dayList: []
	},

	/**
	 * 监听
	 */
	observers: {
		'month'() {
			this.getDayList()
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		getDayList() {
			const days = []
			const currentMonth = this.properties.month
			const startOfMonth = moment(currentMonth).startOf('month')
			const endOfMonth = moment(currentMonth).endOf('month')
			const dayOfStart = startOfMonth.day()
			const dayOfEnd = endOfMonth.day()
			for (let i = dayOfStart; i > 0; i--) {
				days.push('')
			}
			for (let date = startOfMonth; date.isSameOrBefore(endOfMonth); date.add(1, 'days')) {
				days.push(date.date())
			}
			for (let i = 6 - dayOfEnd; i > 0; i--) {
				days.push('')
			}
			this.setData({
				dayList: days
			})
		}
	}
})