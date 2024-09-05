// components/calendar-item/calendar-item.ts
import moment from 'moment'

Component({

	options: {
		addGlobalClass: true
	},

	/**
	 * 组件的属性列表
	 */
	properties: {
		month: String,
		schedule: {},
		warn: {}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		dayList: [],
		computedDayList: [],
		warnInDay: [],
		currentDate: moment(new Date()).date(),
		currentMonth: moment(new Date()).format('YYYY-MM'),
	},

	/**
	 * 监听
	 */
	observers: {
		'month'() {
			this.setData({
				warnInDay: []
			})
			this.createDayList()
		},
		'dayList'() {
			const dayList = [...this.data.dayList]
			// 日程预警交叉
			const corssDayList = dayList.map(el => {
				return {
					dayBackground: ((el.scheduleList?.length > 0) && (el.weatherWarn?.warnInDay?.filter(el => el !== null).length > 0)) ? '#FF000022' : el.scheduleList?.length > 0 ? '#F3F6FF' : 'white',
					...el
				}
			})
			// 起止
			const startEndDayList = corssDayList.map(el => {
				return {
					...el,
					weatherWarn: {
						...el.weatherWarn,
						warnInDay: el?.weatherWarn?.warnInDay?.map(item => {
							const isStart = el?.weatherWarn?.start?.map(start => start?.id).includes(item?.id)
							const isEnd = el?.weatherWarn?.end?.map(end => end?.id).includes(item?.id)
							return {
								...item,
								isStart,
								isEnd
							}
						})
					}
				}
			})
			console.log(startEndDayList)
			this.setData({
				computedDayList: startEndDayList
			})
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		createDayList() {
			const currentMonth = this.properties.month
			const startOfMonth = moment(currentMonth).startOf('month')
			const endOfMonth = moment(currentMonth).endOf('month')
			const dayOfStart = startOfMonth.day()
			const dayOfEnd = endOfMonth.day()

			const preDays = []
			for (let i = dayOfStart; i > 0; i--) {
				preDays.push({ date: '', scheduleList: [] })
			}

			const currentDays = []
			for (let date = startOfMonth; date.isSameOrBefore(endOfMonth); date.add(1, 'days')) {
				const scheduleList = this.properties.schedule?.filter(el => moment(el.date).date() === date.date())
				currentDays.push({ date: date.date(), scheduleList })
			}

			const nextDays = []
			for (let i = 6 - dayOfEnd; i > 0; i--) {
				nextDays.push({ date: '', scheduleList: [] })
			}
			this.setData({
				dayList: [...preDays, ...this.createWeatherWarn(currentDays), ...nextDays]
			})
		},
		createWeatherWarn(currentDays) {
			for (let i = 0; i < currentDays.length; i++) {
				const weatherWarn = {
					out: [],
					in: [],
					start: [],
					end: []
				}
				for (let j = 0; j < this.properties.warn?.length; j++) {
					const currentDate = currentDays[i].date
					const warn = this.properties.warn[j]
					if (currentDate === moment(warn.startDate).date()) {
						weatherWarn.in.push(warn)
						weatherWarn.start.push(warn)
					}
					if (currentDate === moment(warn.endDate).date() + 1) {
						weatherWarn.out.push(warn)
					}
					if (currentDate === moment(warn.endDate).date()) {
						weatherWarn.end.push(warn)
					}
				}
				currentDays[i].weatherWarn = this.createWarnInDay(weatherWarn)
			}
			return currentDays
		},
		createWarnInDay(weatherWarn) {
			const warnInDay = [...this.data.warnInDay]
			const { out: warnOut, in: warnIn } = weatherWarn

			// 先出后进
			if (warnOut.length) {
				for (let j = 0; j < warnOut.length; j++) {
					let outIndex = ''
					warnInDay.forEach((el, index) => {
						if (el?.id === warnOut[j].id) {
							outIndex = index
						}
					})
					if (outIndex !== '') {
						warnInDay[outIndex] = null
					}
				}
			}
			if (warnIn.length) {
				for (let k = 0; k < warnIn.length; k++) {
					let inIndex = warnInDay.findIndex(el => el === null)
					if (inIndex === -1) {
						inIndex = warnInDay.length
					}
					warnInDay[inIndex] = warnIn[k]
				}
			}

			// 清除结尾的null
			const cleanedWarnInDay = []
			let isClean = false
			for (let i = warnInDay.length - 1; i >= 0; i--) {
				if (warnInDay[i] !== null) {
					isClean = true
				}
				if (warnInDay[i] === null && !isClean) {
					continue
				}
				cleanedWarnInDay.unshift(warnInDay[i])
			}

			weatherWarn.warnInDay = cleanedWarnInDay

			this.setData({
				warnInDay: cleanedWarnInDay
			})

			return weatherWarn
		}
	}
})