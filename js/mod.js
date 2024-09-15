let modInfo = {
	name: "挂机",
	id: "存档di(必须要写一个独一waibibabu无二的di以防止存档冲突)",
	author: "匿_名",
	pointsName: "点数名称",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "赞助列表",
	name: "",
}

let changelog = `<h1>赞助鸣谢:</h1><br>
	(想改名可以联系作者)<br><br>
	<h3>心静自然凉</h3><br>
	<h3>淡定</h3><br>
	<h3>浪荡</h3><br>
	<h3>爱发电用户_cE6v</h3><br>
	<h3>Fye</h3><br>
	<h3>嘤嘤嘤（默默无闻）</h3><br>
	<h3>爱发电用户_fa40e</h3><br>
	<h3>爱发电用户_02da8</h3><br>
	<h3>鸭梨山大菠萝</h3><br>
	<h3>爱发电用户_kp4V</h3><br>
	<h3>F</h3><br>
	<h3>CCC</h3><br>
	<h3>Allen</h3><br>
	<h3>郝人</h3><br>
	<h3>加哥</h3><br>
	<h3>jiu jie</h3><br>
	<h3>李嘉图</h3><br>
	<h3>爱发电用户_f2d12</h3><br>
	<h3>latumu啦啦啦</h3><br>
	<h3>爱发电用户_kvg9</h3><br>
	<h3>吾心吾行澄如明镜</h3><br>
	<h3>梦浮生</h3><br>
	<h3>爱发电用户_xseX</h3><br>
	<h3>爱发电用户_wkSM</h3><br>
	<h3>爱发电用户_MXsA</h3><br>
	<h3>爱发电用户_JsFN</h3><br>
	<br>
	收到捐助共计1494.88元 , 挂机速度额外增加1.495<br>谢谢大家的支持<br>
		`

let winText = `恭喜通关!您已经完成了这个游戏.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let gain = new ExpantaNum(1)
	return gain
}


// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}