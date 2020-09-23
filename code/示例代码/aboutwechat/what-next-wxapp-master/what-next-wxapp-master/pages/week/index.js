Page({
	data: {
		week: []
	},

	onLoad() {
		let week = wx.getStorageSync('week') !== undefined 
			? JSON.parse(wx.getStorageSync('week'))
			: []

		let w = []

		week.forEach(i => {
			w.push(JSON.parse(i))
		})

		console.log(w)

		this.setData({
			week: w
		})
	}
})