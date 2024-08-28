var logs=[]
function addedPlayerData() { return {
    seed1:Math.floor(Math.random()*4294967296),seed2:Math.floor(Math.random()*4294967296),
    seed3:Math.floor(Math.random()*4294967296),seed4:Math.floor(Math.random()*4294967296),

    fightAbility:n(10000),
    atk:n(10),def:n(10),hp:n(100),hpmax:n(100),
    hit:n(100),criticalDamage:n(200),damageAdd:n(100),damageMinus:n(0),
    lv:1,exp:n(0),money:n(0),cultivation:n(0),
    bag:[],

    pelletNum:[],weaponType:[],spiritLv:[0,0,0,0],meridianLv:[[0,0],[0,0]],
    immortalLv:0,immortalTimes:0,transmigrationLv:{hpmax:0,atk:0,def:0,hit:0},divineLv:0,
    templeLv:[0,0,0],concealType:[],

    monsterHp:n(0),monsterHpmax:n(0),monsterAtk:n(0),monsterDef:n(0),
    monsterHit:n(0),monsterDamageAdd:n(0),monsterDamageMinus:n(0),

    onMonsterId:-1,

    nowBigTab:"main",
    mainTabId:-1,fightTabId:-1,
    inHanging:-1,hangingTime:0,
    inFight:-1,inFightDifficulty:0,which:0,fightingTime:0,
    expMul:n(1),moneyMul:n(1),cultivation:n(1),
    maxKillDifficulty:[],nowDifficulty:0,maxDifficuly:0,
}}

const subTabList=[
    ["属性","背包","丹药","兵器","元神","经脉","飞升","转生","神力","神庙","暗器"],["新手村","乱葬岗","山贼寨","土匪窝","强盗帮","昆仑山","奇来峰","大秦山","缥缈林"],
]
const idToName={
    0:"1品丹药",1:"铁矿",2:"元神修炼符",3:"银针",4:"白骨",5:"2品丹药",6:"琥珀",7:"树枝",8:"陨铁",9:"兽珠"
}
const idFrom={
    0:"新手村-所有怪物",1:"新手村-牛",2:"新手村后的所有怪物",3:"新手村后的所有怪物",4:"乱葬岗-大骷髅",5:"土匪窝的所有怪物",6:"昆仑山后的所有怪物",7:"昆仑山-树妖9",
    8:"奇来峰后的所有怪物",9:"大秦山-云中兽9"
}
const bagDisplayList=[2,3,6,8,0,5,1,4,7,9]
const pelletAttribute=[
    [n(1000),n(100),n(100),0.01,0.01,0.01,0,n(1000)],
    [n(5000),n(500),n(500),0.01,0.01,0.01,5,n(10000)],
]
const weaponFrontName=[
    "","凡品·","<text style='color:blue'>精品</text>·","<text style='color:purple'>完美</text>·","<text style='color:orange'>仙品</text>·"
]
const weaponAttribute=[
    ["宝剑",{atk:n(500),damageAdd:n(10)},{atk:n(5)},1,1],
    ["铁盾",{def:n(500),damageMinus:n(10)},{def:n(5)},1,1],
    ["白骨头盔",{damageMinus:n(15)},{hpmax:n(5),def:n(5),hit:n(5)},4,1],
    ["白骨护甲",{damageMinus:n(15)},{def:n(10),hit:n(5)},4,1],
    ["桃木剑",{damageAdd:n(25)},{atk:n(15),hit:n(10)},7,1],
    ["桃木杖",{damageAdd:n(25)},{atk:n(10),hit:n(15)},7,1],
    ["兽皮护手",{damageMinus:n(20)},{atk:n(15),def:n(10)},9,1],
    ["兽皮护腿",{damageMinus:n(20)},{atk:n(10),def:n(15)},9,1],
]
const meridianAttribute=[
    [1,0,1],[2,5,1],[5,10,2],[10,20,3],[20,35,5],[30,60,8],[50,100,10],[70,150,15],[85,225,20],[100,325,25],[120,450,30],[150,600,40],
    [200,800,40],[240,1000,50],[280,1250,50],[320,1500,50],[360,1750,50],[400,2000,100],[500,2500,100]
]
const immortalAttribute=[
    ["无",{},{},n(1000),0],
    ["散仙",{hpmax:n(10),atk:n(5)},{damageAdd:n(10)},n(3000),10],
    ["人仙",{hpmax:n(20),atk:n(10),def:n(5)},{damageAdd:n(20),damageMinus:n(10)},n(5000),20],
    ["地仙",{hpmax:n(35),atk:n(20),def:n(15),hit:n(5)},{damageAdd:n(35),damageMinus:n(20)},n(10000),30],
    ["天仙",{hpmax:n(50),atk:n(40),def:n(30),hit:n(15)},{damageAdd:n(50),damageMinus:n(35)},n(20000),40],
    ["真仙",{hpmax:n(70),atk:n(50),def:n(50),hit:n(30)},{damageAdd:n(75),damageMinus:n(50)},n(30000),50],
    ["金仙",{hpmax:n(100),atk:n(75),def:n(75),hit:n(50)},{damageAdd:n(120),damageMinus:n(100)},n(50000),75],
    ["玄仙",{hpmax:n(130),atk:n(100),def:n(100),hit:n(80)},{damageAdd:n(180),damageMinus:n(150)},n(75000),100],
    ["九天玄仙",{hpmax:n(200),atk:n(150),def:n(150),hit:n(120)},{damageAdd:n(250),damageMinus:n(200)},n(100000),125],
    ["大罗金仙",{hpmax:n(300),atk:n(200),def:n(200),hit:n(150)},{damageAdd:n(350),damageMinus:n(280)},n(200000),150],
    ["罗天上仙",{hpmax:n(500),atk:n(350),def:n(350),hit:n(250)},{damageAdd:n(500),damageMinus:n(400)},n(300000),175],
    ["仙君",{hpmax:n(800),atk:n(500),def:n(500),hit:n(350)},{damageAdd:n(700),damageMinus:n(550)},n(500000),200],
    ["仙帝",{hpmax:n(1200),atk:n(700),def:n(700),hit:n(500)},{damageAdd:n(1000),damageMinus:n(750)},n(1000000),225],
    ["半神",{hpmax:n(1500),atk:n(1000),def:n(1000),hit:n(750)},{damageAdd:n(1300),damageMinus:n(1000)},n(2000000),250],
    ["真神",{hpmax:n(2000),atk:n(1500),def:n(1500),hit:n(1000)},{damageAdd:n(1600),damageMinus:n(1300)},n(1e308),275],
]
const concealFrontName=[
    "","<text style='color:green'>一阶</text>·","<text style='color:blue'>二阶</text>·","<text style='color:red'>三阶</text>·"
]
const concealAttribute=[
    ["铁蒺藜",{damageAdd:n(5)},{atk:n(2.5),hit:n(2.5)},3],
    ["玄银骨针",{damageAdd:n(5)},{hpmax:n(2.5),atk:n(2.5)},5],
    ["三角斜钩",{damageAdd:n(5)},{def:n(2.5),hit:n(2.5)},7],
    ["离火珠",{damageAdd:n(7)},{hpmax:n(2.5),hit:n(2.5)},10],
    ["凄雨沙",{damageAdd:n(7)},{hpmax:n(2.5),atk:n(2.5)},10],
    ["暗星镖",{damageAdd:n(7)},{hpmax:n(5),atk:n(2.5),hit:n(2.5)},12],
    ["离合环",{damageAdd:n(10)},{atk:n(5),def:n(5)},15],
    ["生死两难",{damageAdd:n(10)},{atk:n(5),hit:n(5)},15],
    ["伏龙",{damageAdd:n(12)},{hpmax:n(5),atk:n(5)},20],
    ["血穹",{damageAdd:n(12)},{atk:n(5),hit:n(5)},20],
    ["蝎尾",{damageAdd:n(12)},{atk:n(5),def:n(5)},20],
    ["雷眼",{damageAdd:n(12)},{def:n(5),hit:n(5)},20],
    ["断虹",{damageAdd:n(15)},{hpmax:n(7.5),hit:n(7.5)},30],
    ["金芒",{damageAdd:n(15)},{hpmax:n(7.5),atk:n(7.5)},30],
    ["飞霜",{damageAdd:n(15)},{def:n(7.5),hit:n(7.5)},30],
    ["血咒",{damageAdd:n(15)},{atk:n(7.5),def:n(7.5)},30],
]
const attributeToName={
    atk:"攻击",hpmax:"生命",def:"防御",hit:"命中",criticalDamage:"暴击伤害",damageAdd:"伤害穿透",damageMinus:"伤害减免"
}