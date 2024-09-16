function getZoneSubTabDisplay(){
    let str=""
    if(player.zoneTabId<=9999){
        for(let i=0;i<zoneSubTabList[player.zoneTabId].length;i++){
            for(let j=0;j<zoneSubTabList[player.zoneTabId][i].length;j++){
                let id=zoneSubTabList[player.zoneTabId][i][j]
                str+="<button style='margin-top:2px;margin-left:2px' onclick='TryEnterZone("+id+")'>"+(player.killZone[id]==1?"<text style='color:grey'>":"")
                +zoneMonster[id].name+(player.killZone[id]==1?"</text>":"")+"</button>"
            }
            str+="<br>"
        }
    }
    else if(player.zoneTabId<=99999){
        let id=player.zoneTabId-10000
        str+="<button onclick='player.zoneTabId*=10'>怪物详细信息</button><br><br>"
        str+="<table><tr>"
        str+="<td style='width:100px;text-align:left'>你</td>"
        str+="<td style='width:200px;text-align:left'></td>"
        str+="<td style='width:100px;text-align:right'>"+zoneMonster[id].name+"</td>"
        str+="</tr><tr>"
        str+="<td style='width:100px;text-align:left'>HP "+format(player.zoneHp,0)+"</td>"
        str+="<td style='width:200px;text-align:left'></td>"
        str+="<td style='width:100px;text-align:right'>"+format(player.zoneMonsterHp,0)+" HP</td>"
        str+="</tr></table>"
        str+="<br>"
        if(player.inHangingZone==1){
            str+="已挂机 "+format(Math.floor(Math.floor(player.hangingTimeZone)*player.hangingSpeed),0)+" 次<br><br>"
        }
        str+="<button onclick='QuitFightZone()'>结束战斗</button>"
    }
    else{
        let id=player.zoneTabId/10-10000
        str+="<table><tr>"
        str+="<td style='text-align:left'>"+zoneMonster[id].name+"</td><td style='width:5px'></td><td style='width:100px;text-align:left'></td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>生命</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.zoneMonsterHpmax,0)+"</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>攻击</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.zoneMonsterAtk,0)+"</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>防御</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.zoneMonsterDef,0)+"</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>命中</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.zoneMonsterHit,0)+"</td>"
        str+="</tr><tr>"
        str+="<td>　</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>掉落</td>"
        str+="</tr><tr>"
        if(zoneMonster[id].drop.gt(0.001))
        str+="<td colspan=3 style='text-align:left'>魂力×"+format(zoneMonster[id].drop,0)+"</td>"
        str+="</tr><tr>"
        for(let i=0;i<zoneMonster[id].dropList.length;i++){
            str+="</tr><tr>"
            str+="<td colspan=3 style='text-align:left'>"+idToName[zoneMonster[id].dropList[i][1]]+"×"+format(zoneMonster[id].dropList[i][2]*player.dropMul,0)
            +" 1/"+format(zoneMonster[id].dropList[i][0]/player.dropLuck,0)+"</td>"
        }
        str+="</tr></table><br>"
        str+="<button onclick='player.zoneTabId=Math.floor(player.zoneTabId/10)'>返回战斗</button>"
    }
    str+="<br>"
    return str
}
function EnterFightZone(id){
    player.zoneHp=player.zoneHpmax
    player.zoneMonsterHp=zoneMonster[id].hpmax
    player.zoneMonsterHpmax=zoneMonster[id].hpmax
    player.zoneMonsterAtk=zoneMonster[id].atk
    player.zoneMonsterDef=zoneMonster[id].def
    player.zoneMonsterHit=zoneMonster[id].hit
    if(player.killZone[id]==-1){
        player.inFightZone=1
    }
    else{
        player.inHangingZone=1
        player.hangingTimeZone=0
    }
}
function QuitFightZone(){
    if(player.inHangingZone==1){
        player.hangingTimeZone=Math.floor(Math.floor(player.hangingTimeZone)*player.hangingSpeed)
        let soulPowergain=zoneMonster[player.onZoneMonsterId].drop.mul(player.hangingTimeZone)
        player.soulPower=player.soulPower.add(soulPowergain)
        let str="挂机 "+format(player.hangingTimeZone,0)+" 次 , 获得 "
        if(soulPowergain.gt(0.001)){
            str+="魂力×"+format(soulPowergain,0)
        }
        let dropList=[]
        for(let i=0;i<zoneMonster[player.onZoneMonsterId].dropList.length;i++){
            let ii=zoneMonster[player.onZoneMonsterId].dropList[i],count=0
            let sqrtTimes=Math.min(player.hangingTimeZone,10000),sqrtNum=Math.floor(player.hangingTimeZone/sqrtTimes)
            let re=player.hangingTimeZone-sqrtNum*sqrtTimes
            for(let j=0;j<sqrtTimes;j++){
                if(random()<=1*player.dropLuck/ii[0]){
                    count+=ii[2]*sqrtNum*player.dropMul
                }
            }
            for(let j=0;j<re;j++){
                if(random()<=1*player.dropLuck/ii[0]){
                    count+=ii[2]*player.dropMul
                }
            }
            if(count>0){
                dropList.push([ii[1],count])
                player.bag[ii[1]]+=count
            }
        }
        for(let i=0;i<dropList.length;i++){
            str+=" "+idToName[dropList[i][0]]+"×"+format(dropList[i][1],0)
        }
        logs.push(str)
    }
    player.onZoneMonsterId=-1
    player.zoneTabId=-1
    player.inFightZone=-1
    player.inHangingZone=-1
    player.fightingTimeZone=0
    player.hangingTimeZone=0
    player.whichZone=0
}
function DealFightZone(){
    player.fightingTimeZone=Math.max(0,player.fightingTimeZone-0.5)
    if(player.whichZone==0){
        let count=player.zoneAtk.sub(player.zoneMonsterDef).max(0)
        let hitRate=player.zoneHit.div(player.zoneHit.add(player.zoneMonsterHit))
        if(n(random()).lte(hitRate)){
            player.zoneMonsterHp=player.zoneMonsterHp.sub(count)
            logs.push("你 对 "+zoneMonster[player.onZoneMonsterId].name+" 造成了"+format(count,0)+"点伤害")
        }
        else{
            logs.push("你 的攻击被 "+zoneMonster[player.onZoneMonsterId].name+" 闪避了")
        }
        player.whichZone=1
        if(player.zoneMonsterHp.lt(0.0001)){
            logs.push("恭喜 你 成功击败 "+zoneMonster[player.onZoneMonsterId].name)
            player.killZone[player.onZoneMonsterId]=1
            player.inFightZone=-1
            player.inHangingZone=1
        }
    }
    else{
        let count=player.zoneMonsterAtk.sub(player.zoneDef).max(0)
        let hitRate=player.zoneMonsterHit.div(player.zoneHit.add(player.zoneMonsterHit))
        if(n(random()).lte(hitRate)){
            player.zoneHp=player.zoneHp.sub(count)
            logs.push(zoneMonster[player.onZoneMonsterId].name+" 对 你 造成了"+format(count,0)+"点伤害")
        }
        else{
            logs.push(zoneMonster[player.onZoneMonsterId].name+" 的攻击被 你 闪避了")
        }
        player.whichZone=0
        if(player.zoneHp.lt(0.0001)){
            logs.push("你 被 "+zoneMonster[player.onZoneMonsterId].name+" 击败了")
            player.inFightZone=-1
        }
    }
}
function TryEnterZone(id){
    if(player.onZoneMonsterId==-1){
        player.onZoneMonsterId=id
        player.zoneTabId=10000+id
        EnterFightZone(id)
    }
    else if(player.onZoneMonsterId!=id){
        logs.push("你不能与 "+zoneMonster[id].name+" 战斗 , 因为你有别的战斗正在进行")
    }
    else{
        player.zoneTabId=10000+id
    }
}