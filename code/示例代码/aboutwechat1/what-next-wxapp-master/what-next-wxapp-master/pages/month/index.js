Page({
	data: {
		month: []
	},

	onLoad() {
		this.setData({
			month: JSON.parse(wx.getStorageSync('month'))
		})
	}
})