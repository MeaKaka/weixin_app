// pages/select/select.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectOption: 2
    },

    changeOption: function (event) {
        this.setData({
            selectOption: event.currentTarget.dataset.optionindex
        })
    },

    chooseCamera: function () {
        var _this = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success: function (res) {
                var tempFilePath = res.tempFilePaths[0]
                _this.createPicBoard(tempFilePath)
            }
        })
    },

    chooseAlbum: function () {
        var _this = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album'],
            success: function (res) {
                var tempFilePath = res.tempFilePaths[0]
                _this.createPicBoard(tempFilePath)
            }
        })
    },

    createPicBoard: function (imgSrc) {
        wx.navigateTo({
            url: '../new_board/new_board?type=img&src=' + imgSrc
        })
    },

    createNewBoard: function (event) {
        var boardType = event.currentTarget.dataset.boardType
        wx.navigateTo({
            url: '../new_board/new_board?type=' + boardType
        })
    },
})