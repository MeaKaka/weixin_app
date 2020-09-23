import util from '../../utils/util.js'

Page({
	data: {
		isSelected: 'normal',
	},

	onLoad() {
		let time = util.getToday()
		let d = util.getDay()
		let week = util.getWeek()
		let month = util.getMonth()
		let comment = util.getDefaultComment()

		let _day = wx.getStorageSync('day') ? JSON.parse(wx.getStorageSync('day')) : {}
		this.setData({
			'day.time': time,
			'day.day': d,
			'day.week': week,
			'day.month': month,
			'day.comment': comment,
			'day.post': _day.post || [],
			week: wx.getStorageSync('week') ? JSON.parse(wx.getStorageSync('week')) : [],
		})
		
	},

	selectHandle(e) {
		let state = e.currentTarget.id 
		this.setData({
			isSelected: state
		})
	},

	formSubmit(e) {
		let state = this.data.isSelected
		let content = e.detail.value.content

		this.data.day.post.push({
			state: state,
			content: content,
			complete: false
		})

		this.setData({
			'day.post': this.data.day.post
		})

		wx.setStorageSync('day', JSON.stringify(this.data.day))

		this.createWeek(this.data.day)

		wx.showToast({
			icon: 'success',
			title: '添加成功',
			success(res){
				console.log(res)
			}
		})
	},

	createWeek(day) {
		let self = this
		let wstart = util.nearWeekStart()
		let d = util.getDay()
		let m = util.getMonth()
		let w = wx.getStorageSync('week') ? JSON.parse(wx.getStorageSync('week')) : []

		console.log(w)
		console.log(w.pop())
		let lastD = w.pop() === undefined ? 0 : w.pop().day
		let lastM = w.pop() === undefined ? 0 : w.pop().month

		if(wstart > lastD){
			// 不同周
			let _w = []
			_w.push(JSON.stringify(day))
			wx.setStorageSync('week', JSON.stringify(_w))
		}else if(d == lastD && m == lastM){
			// 同一天
			w.unshift()
			w.push(JSON.stringify(day))
			wx.setStorageSync('week', JSON.stringify(w))
		}else{
			// 同一周
			console.log(1)
			w.push(JSON.stringify(day))
			wx.setStorageSync('week', JSON.stringify(w))
		}
		
	},
})