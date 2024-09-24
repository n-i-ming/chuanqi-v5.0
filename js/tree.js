var keys={
    a:false,b:false,c:false,d:false,e:false,f:false,g:false,
    h:false,i:false,j:false,k:false,l:false,m:false,n:false,
    o:false,p:false,q:false,r:false,s:false,t:false,
    u:false,v:false,w:false,x:false,y:false,z:false,
    space: false,shift:false,
}
var strstrstr="abcdefghijklmnopqrstuvwxyz"
var charToNum={"a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,
    "h":72,"i":73,"j":74,"k":75,"l":76,"m":77,"n":78,
    "o":79,"p":80,"q":81,"r":82,"s":83,"t":84,
    "u":85,"v":86,"w":87,"x":88,"y":89,"z":90}
function keydown(event) {
    if(event.keyCode==16){
        keys["shift"]=true;
    }
    else if(event.keyCode==32){
        keys["space"]=true;
    }
    else if(event.keyCode>=65 && event.keyCode<=90){
        keys[strstrstr[event.keyCode-65]]=true
    }
}
function keyup(event){
    if(event.keyCode==16){
        keys["shift"]=false;
    }
    else if(event.keyCode==32){
        keys["space"]=false;
    }
    else if(event.keyCode>=65 && event.keyCode<=90){
        keys[strstrstr[event.keyCode-65]]=false
    }
}
function random() {
    player.seed1 >>>= 0; player.seed2 >>>= 0; player.seed3 >>>= 0; player.seed4 >>>= 0;
    let cast32 = (player.seed1 + player.seed2) | 0;
    player.seed1 = player.seed2 ^ player.seed2 >>> 9;
    player.seed2 = player.seed3 + (player.seed3 << 3) | 0;
    player.seed3 = (player.seed3 << 21 | player.seed3 >>> 11);
    player.seed4 = player.seed4 + 1 | 0;
    cast32 = cast32 + player.seed4 | 0;
    player.seed3 = player.seed3 + cast32 | 0;
    return (cast32 >>> 0) / 4294967296;
}
addLayer("tree-tab",{
    update(diff){
        {//update fix
        if(document.getElementById("outer")!==undefined && document.getElementById("outer")!==null)
        document.getElementById("outer")["style"]["background-color"]="rgba(0,0,0,"+player.themeId*0.1+")"
        if(document.getElementsByClassName("upgTable")[0]===undefined && document.getElementsByClassName("upgTable")[0]===null){

        }
        else{
            document.getElementById("text")["style"]["left"]=(document.getElementsByClassName("upgTable")[0].getBoundingClientRect().width-document.getElementById("text").getBoundingClientRect().width)/2+"px"
        }
        if(player.haventFixed20240924==false){
            player.haventFixed20240924=true
            player.separationLv=0
            player.moneyTotal=player.money
        }
        while(player.maxKillDifficulty.length<monster.length){
            player.maxKillDifficulty.push(-1)
        }
        while(player.killZone.length<zoneMonster.length){
            player.killZone.push(-1)
        }
        while(player.bag.length<bagDisplayList.length){
            player.bag.push(0)
        }
        while(player.bagMulList.length<bagDisplayList.length){
            player.bagMulList.push(0)
        }
        while(player.pelletNum.length<pelletAttribute.length){
            player.pelletNum.push([0,0,0])
        }
        while(player.weaponType.length<weaponAttribute.length){
            player.weaponType.push(0)
        }
        while(player.concealType.length<concealAttribute.length){
            player.concealType.push(0)
        }
        while(player.bookLv.length<bookAttribute.length){
            player.bookLv.push(-1)
        }
        while(player.petLv.length<petAttribute.length){
            player.petLv.push(-1)
        }
        while(player.petTimes.length<petAttribute.length){
            player.petTimes.push(0)
        }
        while(player.soulcircleLv.length<soulcircleAttribute.length){
            player.soulcircleLv.push(0)
        }
        while(player.soulboneLv.length<soulboneAttribute.length){
            player.soulboneLv.push(0)
        }
        while(player.skillLv.length<skillAttribute.length){
            player.skillLv.push(0)
        }
        while(player.infinityLv.length<infinityAttribute.length){
            player.infinityLv.push(0)
        }
        while(player.partnerLv.length<partnerAttribute.length){
            player.partnerLv.push(0)
        }
        while(player.heroLv.length<heroAttribute.length){
            player.heroLv.push(0)
        }
        while(player.starLv.length<starAttribute.length){
            player.starLv.push([-1,-1,0])
        }
        for(let i=0;i<player.weaponType.length;i++){
            player.weaponType[i]=Math.min(4,player.weaponType[i])
        }
        for(let i=0;i<player.concealType.length;i++){
            player.concealType[i]=Math.min(3,player.concealType[i])
        }
        player.wingLv[1]=Math.min(player.wingLv[1],10)
        let ccc=0
        for(let i=0;i<monthCardList.length;i++){
            if(player.exchangeCodeList.includes(monthCardList[i])){
                ccc+=1
            }
        }
        player.monthCardTime=Math.min(player.monthCardTime,ccc*3600*720)
        }
        player.devSpeed=1
        let dif=(Date.now()/1e3-player.tmtmtm)
        // dif*=1000
        player.tmtmtm=Date.now()/1e3
        player.monthCardTime=Math.max(0,player.monthCardTime-dif)
        CalcAttribute()
        if(document.getElementById("difficulty")!==undefined && document.getElementById("difficulty")!==null && document.getElementById("difficulty").value.length==0){
            document.getElementById("difficulty").value=player.nowDifficulty
        }
        if(document.getElementById("difficulty")!==undefined && document.getElementById("difficulty")!==null && document.getElementById("difficulty").value.length>0){
            document.getElementById("difficulty").value=Math.max(0,Math.min(player.maxDifficulty,toNumber(document.getElementById("difficulty").value))).toString()
        }
        if(player.inHanging!=-1){
            player.hangingTime+=dif
        }
        if(player.inHangingZone!=-1){
            player.hangingTimeZone+=dif
        }
        if(player.inFight!=-1){
            player.fightingTime+=dif
            while(player.fightingTime>=0.5){
                DealFight()
            }
        }
        if(player.inFightZone!=-1){
            player.fightingTimeZone+=dif
            while(player.fightingTimeZone>=0.5){
                DealFightZone()
            }
        }
    },
    tabFormat:[
        "blank",
        "blank",
        ["display-text",function(){
            let str=""
            str+="<table><tr>"
            let attr=(player.immortalLv<immortalAttribute.length?immortalAttribute[player.immortalLv]:CalcImmortalAttribute(player.immortalLv))
            str+="<td>"+attr[0]+"·"+format(player.lv,0)+"级</td>"
            str+="<td style='width:50px'></td>"
            str+="<td>战力"+format(player.fightAbility,0)+"</td>"
            str+="<td style='width:50px'></td>"
            str+="<td>经验 "+format(player.exp,0)+"/"+(player.lv<3e5?format(CalcExpNeed(),0):format(CalcBigExpNeed()[1],0))+"</td>"
            str+="<td style='width:50px'></td>"
            str+="<td>金币 "+format(player.money,0)+"</td>"
            str+="<td style='width:50px'></td>"
            str+="<td>修为 "+format(player.cultivation,0)+"</td>"
            str+="</tr></table>"
            return str
        }],
        "blank",
        ["display-text",function(){
            let str=""
            str+="<table><tr>"
            str+="<td><button onclick='player.mainTabId=-1,player.nowBigTab="+'"main"'+"'>主页</button></td>"
            str+="<td><button style='margin-left:-10px' onclick='"+(player.onMonsterId!=-1?"player.fightTabId="+(10000+player.onMonsterId)+",":"")+"player.nowBigTab="+'"fight"'+"'>挂机</button></td>"
            str+="<td><button style='margin-left:-10px' onclick='"+(player.onZoneMonsterId!=-1?"player.zoneTabId="+(10000+player.onZoneMonsterId)+",":"")+"player.nowBigTab="+'"zone"'+"'>副本</button></td>"
            str+="<td><button style='margin-left:-10px' onclick='player.nowBigTab="+'"show"'+"'>介绍</button></td>"
            str+="<td><button style='margin-left:-10px' onclick='player.nowBigTab="+'"exchange"'+"'>兑换</button></td>"
            str+="</tr></table><br>"
            if(player.nowBigTab=='main'){
                if(player.mainTabId==-1){
                    str+="<table><tr>"
                    for(let i=0;i<subTabList[0].length;i++){
                        str+="<td><button "+(i%10!=0?"style='margin-left:-10px'":"")+" onclick='player.mainTabId="+i+"'>"+subTabList[0][i]+"</button></td>"
                        if(i%10==9){
                            str+="</tr><tr>"
                        }
                    }
                    str+="</tr></table>"
                }
                else{
                    str+=getMainSubTabDisplay()
                    str+="<br>"
                    str+="<button onclick='player.mainTabId=-1'>返回</button>"
                }
            }
            else if(player.nowBigTab=='fight'){
                if(player.fightTabId==-1){
                    str+="挂机难度"+player.nowDifficulty+"/"+player.maxDifficulty+"<br><input id='difficulty' style='width:200px' type='number' patter='[0-9]*' oninput='validateNumber(event)'>"
                    str+="<button onclick='player.nowDifficulty=toNumber(document.getElementById("+'"'+"difficulty"+'"'+").value)'>确认</button>"
                    str+="<br><br>"
                    str+="<table><tr>"
                    for(let i=0;i<subTabList[1].length;i++){
                        str+="<td><button "+(i%10!=0?"style='margin-left:-10px'":"")+" onclick='player.fightTabId="+i+"'>"+subTabList[1][i]+"</button></td>"
                        if(i%10==9){
                            str+="</tr><tr>"
                        }
                    }
                    str+="</tr></table>"
                }
                else{
                    str+=getFightSubTabDisplay()
                    str+="<br>"
                    str+="<button onclick='player.fightTabId=-1'>返回</button>"
                }
            }
            else if(player.nowBigTab=='zone'){
                if(player.zoneTabId==-1){
                    str+="<table><tr>"
                    for(let i=0;i<subTabList[2].length;i++){
                        str+="<td><button "+(i%10!=0?"style='margin-left:-10px'":"")+" onclick='player.zoneTabId="+i+"'>"+subTabList[2][i]+"</button></td>"
                        if(i%10==9){
                            str+="</tr><tr>"
                        }
                    }
                    str+="</tr></table>"
                }
                else{
                    str+=getZoneSubTabDisplay()
                    str+="<br>"
                    str+="<button onclick='player.zoneTabId=-1'>返回</button>"
                }
            }
            else if(player.nowBigTab=='show'){
                str+="伤害 = 攻击<sup>2</sup>/(攻击+防御)*(伤害穿透-伤害减免)<br><br>"
                str+="属性转生次数上限 = ⌊log<sub>2</sub>(对应属性)⌋<br>"
                str+="每次转生独立增加 1%对应属性<br><br>"
                str+="每滴神力独立增加 0.5%伤害穿透和伤害减免<br><br>"
                str+="每级难度增加怪物 10%生命、攻击、防御 5%命中 2%伤害穿透和伤害减免<br>"
                str+="每级难度增加 1%经验、金币、修为获取<br><br>"
                str+="副本与挂机的战斗是独立的<br>"
                str+="副本中属性等于对应属性转生次数<br>其中生命是5倍<br><br>"
                str+="强化系统属性每10000级独立提升5%<br>"
            }
            else if(player.nowBigTab=='exchange'){
                str+="兑换码<br>"
                str+="<input id='exchangeCode' style='width:400px'>"
                str+="<button onclick='DealExchangeCode()'>确认</button>"
                str+="<br><br>已激活的兑换码<br>"
                if(player.exchangeCodeList.includes("b15ae4e2ced7c192fe4acb5783fa57d336b963253950a8b7d2ff180876f4cc70")){
                    str+="小小支持一下 : 挂机速度×2<br>"
                }
                if(player.exchangeCodeList.includes("e5087192b1d924ad4fe535688e00b9d1d5ef4f0db60174dbaa070cc62c229875")){
                    str+="大力支持 : 挂机速度×2.5<br>"
                }
                if(player.exchangeCodeList.includes("69d86d4352e601f6db8580ad5224b12d4910115c015e03d07fd0311df94bef1b")){
                    str+="超级大力支持 : 挂机速度×3 材料掉落率x2<br>"
                }
                if(player.exchangeCodeList.includes("61d76ba854558116517c822fefa55ba9b42d0e50e46d852e63589b78d6809c33")){
                    str+="巨力支持 : 挂机速度×4<br>"
                }
                if(player.exchangeCodeList.includes("98d4c0c71f6671b4426c7fc604f63d97926587be5908153e95619fc971a70a5c")){
                    str+="超级巨力支持 : 挂机速度×5 材料掉落数量x2<br>"
                }
                if(player.exchangeCodeList.includes("1632b66a0c5a7ebf4ddf43636001472922536b0a6db6215cd7c117bd54c512fc")){
                    str+="钻石支持 : 挂机速度×5 材料掉落率x2.5<br>"
                }
                if(player.exchangeCodeList.includes("d91d4221eaf4856528d3768c01dea80b3ce73922a276407c5e82ee5728ad9d6c")){
                    str+="冠名支持 : 挂机速度×6 材料掉落数量x2.5<br>"
                }
            }
            return str
        }],
        "blank",
        ["display-text",function(){
            let str=""
            str+="<div style='padding-left:10px;padding-top:10px;text-align:left;height:400px;width:600px;border:2px solid black;overflow:auto'>"
            for(let i=logs.length-1;i>=Math.max(0,logs.length-100);i--){
                str+=logs[i]
                str+="<br>"
            }
            str+="</div>"
            return str
        }]
    ],
    previousTab: "",
    leftTab: true,
})