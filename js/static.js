var logs=[]
function addedPlayerData() { return {
    seed1:Math.floor(Math.random()*4294967296),seed2:Math.floor(Math.random()*4294967296),
    seed3:Math.floor(Math.random()*4294967296),seed4:Math.floor(Math.random()*4294967296),

    fightAbility:n(10000),
    atk:n(10),def:n(10),hp:n(100),hpmax:n(100),
    hit:n(100),criticalDamage:n(200),damageAdd:n(100),damageMinus:n(0),
    lv:1,exp:n(0),money:n(0),
    bag:[],

    pelletNum:[],weaponType:[],spiritLv:[0,0,0,0],meridianLv:[[0,0],[0,0]],

    monsterHp:n(0),monsterHpmax:n(0),monsterAtk:n(0),monsterDef:n(0),
    monsterHit:n(0),monsterDamageAdd:n(0),monsterDamageMinus:n(0),

    onMonsterId:-1,

    nowBigTab:"main",
    mainTabId:-1,fightTabId:-1,
    inHanging:-1,hangingTime:0,
    inFight:-1,which:0,fightingTime:0,
    maxKillDifficulty:[],nowDifficulty:0,
}}

const subTabList=[
    ["属性","背包","丹药","兵器","元神","经脉"],["新手村","乱葬岗"],
]
const idToName={
    0:"1品丹药",1:"铁矿",2:"元神修炼符",3:"银针",4:"白骨"
}
const idFrom={
    0:"新手村-所有怪物",1:"新手村-牛",2:"新手村后的所有怪物",3:"新手村后的所有怪物",4:"乱葬岗-大骷髅"
}
const bagDisplayList=[2,3,0,1,4]
const pelletAttribute=[
    [n(1000),n(100),n(100),0.01,0.01,0.01,0,n(1000)],
]
const weaponFrontName=[
    "","凡品·","<text style='color:blue'>精品</text>·","<text style='color:purple'>完美</text>·","<text style='color:orange'>仙品</text>·"
]
const weaponAttribute=[
    ["宝剑",{atk:n(500),damageAdd:n(10)},{atk:n(5)},1,1],
    ["铁盾",{def:n(500),damageMinus:n(10)},{def:n(5)},1,1],
    ["白骨头盔",{damageMinus:n(15)},{hpmax:n(5),def:n(5),hit:n(5)},4,1],
    ["白骨护甲",{damageMinus:n(15)},{def:n(10),hit:n(5)},4,1],
]
const meridianAttribute=[
    [1,0,1],[2,5,1],[5,10,2],[10,20,3],[20,35,5]
]
const attributeToName={
    atk:"攻击",hpmax:"生命",def:"防御",hit:"命中",criticalDamage:"暴击伤害",damageAdd:"伤害穿透",damageMinus:"伤害减免"
}