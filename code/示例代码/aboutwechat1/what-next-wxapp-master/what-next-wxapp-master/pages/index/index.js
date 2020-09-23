import util from '../../utils/util.js'

Page({
	data: {
		day: {}
	},

	onLoad() {
		this.setData({
			day: wx.getStorageSync('day') ? JSON.parse(wx.getStorageSync('day')) : {}
		})
	},

	onShow() {
		this.setData({
			hour: new Date().getHours(),
			day: wx.getStorageSync('day') ? JSON.parse(wx.getStorageSync('day')) : {}
		})

		this.timeUp(new Date().getHours())


	},

	// change day should update week month
	checkHandle(e) {
		let index = e.currentTarget.id
		console.log(index)

		if(this.data.day.post[index].complete) return 

		this.data.day.post.map((i,j) => {
			j == index && (i.complete = true) 
			return i
		})

		this.checkTip()

		this.setData({
			day: this.data.day 
		})

		wx.setStorageSync('day', JSON.stringify(this.data.day))

		this.createWeek(this.data.day)
	},

	createWeek(day){
		let self = this
		let wstart = util.nearWeekStart()
		let w = wx.getStorageSync('week') ? JSON.parse(wx.getStorageSync('week')) : []

		console.log(w)
		console.log(w.pop())
		let lastD = w.pop() === undefined ? 0 : w.pop().day

		if(wstart > lastD){
			let _w = []
			_w.push(day)
			wx.setStorageSync('week', JSON.stringify(_w))
		}else{
			console.log(1)
			w.push(day)
			wx.setStorageSync('week', JSON.stringify(w))
		}
	},

	toAdd() {
		wx.navigateTo({
			url: '../add/index'
		})
	},

	toWeek() {
		wx.navigateTo({
			url: '../week/index'
		})
	},

	toMonth() {
		wx.navigateTo({
			url: '../month/index'
		})
	},

	checkTip(){
		let self = this
		let len = self.data.day.post.filter(i => i.complete).length
		if( len == self.data.day.post.length){
			self.data.day.comment = util.setGoodComment()
		}
	},

	timeUp(hour){
		if(hour < 23) return 

		let len = this.data.day.post.filter(i => i.complete).length

		len < this.data.day.post.lengt 
			? (this.data.day.comment = util.setBadComment())
			: (this.data.day.comment = util.setGoodComment())

		this.setData({
			day: this.data.day 
		})

		wx.setStorageSync('day', JSON.stringify(this.data.day))

		this.createWeek(this.data.day)
	},

	cleanUp(hour){
		if(hour = 24){
			this.setData({
				day: {}
			})

			wx.setStorageSync('day', JSON.stringify(this.data.day))
		}
	}
})