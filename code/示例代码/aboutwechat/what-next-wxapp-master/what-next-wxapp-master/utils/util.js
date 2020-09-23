function random(len){
	return parseInt(len*Math.random())
}

function getDefaultComment() {
	let comments = [
		'看好你哦',
		'能不能加工资，就看这次了',
		'不完成，裸奔',
		'完成了，让你社交一下',
		'那些比你优秀的人，还比你努力',
		'想想你的工资卡',
		'完成了，考虑让你去趟旅游',
		'这点小事都完成不了，穷也活该',
		'敢不敢跟未来的自己赌一把',
		'抬头，未来的自己在看着呢',
	]
	return comments[random(comments.length)]
}
function setBadComment(){
	let comments = [
		'真是菜鸡哦，你',
		'不行你说啊',
		'还要不要买房了',
		'不觉的你很失败？',
		'怪不得生活一团糟',
		'你还有没有想要的生活了',
		'看看别人都是什么工资',
		'还想不想去旅游了',
		'别到未来，自己才后悔当前不努力',
		'难怪你想要的东西，想买的东西，都得不到',
	]

	return comments[random(comments.length)]
}
function setGoodComment(){
	let comments = [
		'离自己想要的生活有近了一步',
		'离加工资不远了',
		'好的，奖励你去咖啡厅发呆',
		'计划一下去哪旅游吧',
		'约朋友出来喝东西吧',
		'锻炼一下，让你有健康的身体',
		'看来离买A7r2不远了',
		'好的，开始撸猫',
		'买jeep，买jeep，买jeep',
		'让你看一局电影',
		'你很快成为牛逼的自己',
	]

	return comments[random(comments.length)]
}

function getToday() {
	let time = new Date()
	let y = time.getFullYear()
	let m = time.getMonth() + 1
	let d = time.getDate()
	let w = time.getDay()

	switch(w){
		case 0:
		return `${y}-${m}-${d} 星期天`
		break;

		case 1:
		return `${y}-${m}-${d} 星期一`
		break;

		case 2:
		return `${y}-${m}-${d} 星期二`
		break;

		case 3:
		return `${y}-${m}-${d} 星期三`
		break;

		case 4:
		return `${y}-${m}-${d} 星期四`
		break;

		case 5:
		return `${y}-${m}-${d} 星期五`
		break;

		case 6:
		return `${y}-${m}-${d} 星期六`
		break;
	}
	
}

function getDay(){
	return new Date().getDate()
}

function getWeek() {
	return new Date().getDay()
}

function getMonth() {
	return new Date().getMonth() + 1
}

function nearWeekStart(){
	let today = new Date().getDate()
	let w = new Date().getDay()

	let nearW0
	let nearW6

	switch(w){
		case 0:
			nearW0 = today 
			nearW6 = today + 6
		break;
		case 1:
			nearW0 = today -1
			nearW6 = today + 5
		break;
		case 2:
			nearW0 = today -2
			nearW6 = today + 4
		break;
		case 3:
			nearW0 = today -3
			nearW6 = today + 3
		break;
		case 4:
			nearW0 = today -4
			nearW6 = today + 2
		break;
		case 5:
			nearW0 = today -5
			nearW6 = today + 1
		break;
		case 6:
			nearW0 = today -6
			nearW6 = today
		break;
	}

	return nearW0
}


module.exports = {
	getToday,
	getWeek,
	getMonth,
	nearWeekStart,
	getDay,
	getDefaultComment,
	setGoodComment,
	setBadComment
}