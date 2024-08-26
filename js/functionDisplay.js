function getMainSubTabDisplay(){
    let str=""
    if(player.mainTabId==0){
        str+="<table>"
        str+="<tr><td style='text-align:left'>生命</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.hpmax,0)+"</td></tr>"
        str+="<tr><td style='text-align:left'>攻击</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.atk,0)+"</td></tr>"
        str+="<tr><td style='text-align:left'>防御</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.def,0)+"</td></tr>"
        str+="<tr><td style='text-align:left'>命中</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.hit,0)+"</td></tr>"
        str+="<tr><td style='text-align:left'>暴击伤害</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.criticalDamage,0)+"%</td></tr>"
        str+="<tr><td style='text-align:left'>伤害穿透</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.damageAdd,0)+"%</td></tr>"
        str+="<tr><td style='text-align:left'>伤害减免</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.damageMinus,0)+"%</td></tr>"
        str+="</table>"
        str+="<br>"
        str+="<button onclick='AutoUpgrade()'>一键升级</button><br>"
    }
    else if(player.mainTabId==1){
        str+="<table>"
        for(let i=0;i<bagDisplayList.length;i++){
            if(player.bag[bagDisplayList[i]]>0){
                str+="<tr><td>"+idToName[bagDisplayList[i]]+"×"+player.bag[bagDisplayList[i]]+"</td></tr>"
            }
        }
        str+="</table>"
    }
    else if(player.mainTabId==2){
        str+="<table>"
        let all=0
        for(let i=0;i<player.pelletNum.length;i++){
            if(player.pelletNum[i]==[100,100,100]){
                all++
            }
        }
        for(let i=0;i<=Math.min(all,pelletAttribute.length-1);i++){
            if(i==Math.min(all,pelletAttribute.length-1) && player.pelletNum[i][0]+player.pelletNum[i][1]+player.pelletNum[i][2]<300){
                str+="<tr>"
                str+="<td colspan=3>炼制"+(i+1)+"品丹药需要 "+(i+1)+"品丹药×1 金币×"+format(pelletAttribute[i][7],0)+"</td>"
                str+="</tr>"
                if(i<pelletAttribute.length-1){
                    str+="<tr>"
                    str+="<td colspan=3>炼制满后开启下一品丹药的炼制</td>"
                    str+="</tr>"
                }
            }
            str+="<tr>"
            str+="<td style='width:250px;text-align:left'>"+(i+1)+"品生命丹药 "+player.pelletNum[i][0]+"/100</td>"
            str+="<td style='width:250px;text-align:left'>"+(i+1)+"品攻击丹药 "+player.pelletNum[i][1]+"/100</td>"
            str+="<td style='width:250px;text-align:left'>"+(i+1)+"品防御丹药 "+player.pelletNum[i][2]+"/100</td>"
            str+="</tr>"
            str+="<tr>"
            str+="<td style='width:250px;text-align:left'>生命+"+format(player.pelletNum[i][0]*pelletAttribute[i][0],0)+"</td>"
            str+="<td style='width:250px;text-align:left'>攻击+"+format(player.pelletNum[i][1]*pelletAttribute[i][1],0)+"</td>"
            str+="<td style='width:250px;text-align:left'>防御+"+format(player.pelletNum[i][2]*pelletAttribute[i][2],0)+"</td>"
            str+="</tr>"
            str+="<tr>"
            str+="<td style='width:250px;text-align:left'>生命+"+format(player.pelletNum[i][0]*pelletAttribute[i][3]*100,0)+"%</td>"
            str+="<td style='width:250px;text-align:left'>攻击+"+format(player.pelletNum[i][1]*pelletAttribute[i][4]*100,0)+"%</td>"
            str+="<td style='width:250px;text-align:left'>防御+"+format(player.pelletNum[i][2]*pelletAttribute[i][5]*100,0)+"%</td>"
            str+="</tr>"
            if(player.pelletNum[i]!=[100,100,100]){
                str+="<tr>"
                if(player.pelletNum[i][0]<100){
                    str+="<td style='width:250px;text-align:left'><button onclick='TryMakePellet("+i+",0)' style='margin-left:0px'>一键炼制</button></td>"
                }
                else str+="<td style='width:250px'></td>"
                if(player.pelletNum[i][1]<100){
                    str+="<td style='width:250px;text-align:left'><button onclick='TryMakePellet("+i+",1)' style='margin-left:0px'>一键炼制</button></td>"
                }
                else str+="<td style='width:250px'></td>"
                if(player.pelletNum[i][2]<100){
                    str+="<td style='width:250px;text-align:left'><button onclick='TryMakePellet("+i+",2)' style='margin-left:0px'>一键炼制</button></td>"
                }
                else str+="<td style='width:250px'></td>"
                str+="</tr>"
            }
            str+="<tr><td colspan=3></td></tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==3){
        str+="<table>"
        for(let i=0;i<weaponAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+weaponFrontName[player.weaponType[i]]+weaponAttribute[i][0]+"</td>"
            str+="<td style='text-align:left;'>"
            for(let id in weaponAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(weaponAttribute[i][1][id]*player.weaponType[i],0)+" "
            }
            for(let id in weaponAttribute[i][2]){
                str+=attributeToName[id]+"+"+format(weaponAttribute[i][2][id]*player.weaponType[i],0)+"% "
            }
            str+="</td>"
            str+="<td style='width:200px;text-align:right'"
            if(player.weaponType[i]==4)str+=" colspan=2"
            str+=">"
            if(player.weaponType[i]<4){
                str+="消耗 "+idToName[weaponAttribute[i][3]]+"×"+(player.weaponType[i]+1)*weaponAttribute[i][4]+"</td><td><button onclick='TryBuildWeapon("+i+")'>锻造</button>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==4){
        str+="<table>"
        let list=["hpmax","atk","def","hit"]
        for(let i=0;i<list.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+attributeToName[list[i]]+"修炼 "+player.spiritLv[i]+"/1000级</td>"
            str+="<td style='text-align:left;width:100px'>"+attributeToName[list[i]]+"+"+player.spiritLv[i]+"%</td>"
            if(CalcSpiritNeed(i)<1e308){
                str+="<td style='text-align:left;width:300px'>下一级需要 "+idToName[2]+"×"+CalcSpiritNeed(i)+"</td>"
                str+="<td style='text-align:left;'><button onclick='SpiritUpgrade("+i+",0)'>修炼</button></td>"
                str+="<td style='text-align:left;'><button onclick='SpiritUpgrade("+i+",1)' style='margin-left:-10px;'>一键修炼</button></td>"
            }
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==5){
        str+="<table>"
        str+="<tr>"
        str+="<td>阳脉"+(player.meridianLv[0][0]+1)+"-"+player.meridianLv[0][1]+"</td>"
        str+="<td style='width:200px'></td>"
        str+="<td>阴脉"+(player.meridianLv[1][0]+1)+"-"+player.meridianLv[1][1]+"</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td>攻击+"+(meridianAttribute[player.meridianLv[0][0]][1]+meridianAttribute[player.meridianLv[0][0]][2]*Math.ceil(player.meridianLv[0][1]/2))+"%</td>"
        str+="<td style='width:200px'></td>"
        str+="<td>生命+"+(meridianAttribute[player.meridianLv[1][0]][1]+meridianAttribute[player.meridianLv[1][0]][2]*Math.ceil(player.meridianLv[1][1]/2))+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td>命中+"+(meridianAttribute[player.meridianLv[0][0]][1]+meridianAttribute[player.meridianLv[0][0]][2]*Math.floor(player.meridianLv[0][1]/2))+"%</td>"
        str+="<td style='width:200px'></td>"
        str+="<td>防御+"+(meridianAttribute[player.meridianLv[1][0]][1]+meridianAttribute[player.meridianLv[1][0]][2]*Math.floor(player.meridianLv[1][1]/2))+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td>伤害穿透+"+(player.meridianLv[0][0]*5)+"</td>"
        str+="<td style='width:200px'></td>"
        str+="<td>伤害减免+"+(player.meridianLv[1][0]*5)+"</td>"
        str+="</tr>"
        str+="<tr><td>　</td></tr>"
        if(player.meridianLv[0][0]!=meridianAttribute.length-1 || player.meridianLv[1][0]!=meridianAttribute.length-1){
            str+="<tr>"
            if(player.meridianLv[0][0]!=meridianAttribute.length-1)
            str+="<td>消耗 "+(player.meridianLv[0][1]==10?"金钱×"+(10000*meridianAttribute[player.meridianLv[0][0]][0]):"银针×"+(meridianAttribute[player.meridianLv[0][0]][0]))+"</td>"
            else
            str+="<td>　</td>"
            str+="<td style='width:200px'></td>"
            if(player.meridianLv[1][0]!=meridianAttribute.length-1)
            str+="<td>消耗 "+(player.meridianLv[1][1]==10?"金钱×"+(10000*meridianAttribute[player.meridianLv[1][0]][0]):"银针×"+(meridianAttribute[player.meridianLv[1][0]][0]))+"</td>"
            else
            str+="<td>　</td>"
            str+="</tr>"
            str+="<tr>"
            if(player.meridianLv[0][0]!=meridianAttribute.length-1)
            str+="<td><button onclick='TryUpgradeMeridian(0)'>升级</button></td>"
            else
            str+="<td>　</td>"
            str+="<td style='width:200px'></td>"
            if(player.meridianLv[1][0]!=meridianAttribute.length-1)
            str+="<td><button onclick='TryUpgradeMeridian(1)'>升级</button></td>"
            else
            str+="<td>　</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    return str
}
function getFightSubTabDisplay(){
    let str=""
    if(player.fightTabId<=9999){
        for(let i=0;i<fightSubTabList[player.fightTabId].length;i++){
            for(let j=0;j<fightSubTabList[player.fightTabId][i].length;j++){
                let id=fightSubTabList[player.fightTabId][i][j]
                str+="<button style='margin-top:2px;margin-left:2px' onclick='TryEnter("+id+")'>"+(player.maxKillDifficulty[id]>=player.nowDifficulty?"<text style='color:grey'>":"")
                +monster[id].name+(player.maxKillDifficulty[id]>=player.nowDifficulty?"</text>":"")+"</button>"
            }
            str+="<br>"
        }
    }
    else if(player.fightTabId<=99999){
        let id=player.fightTabId-10000
        str+="<button onclick='player.fightTabId*=10'>怪物详细信息</button><br><br>"
        str+="<table><tr>"
        str+="<td style='width:100px;text-align:left'>你</td>"
        str+="<td style='width:200px;text-align:left'></td>"
        str+="<td style='width:100px;text-align:right'>"+monster[id].name+"</td>"
        str+="</tr><tr>"
        str+="<td style='width:100px;text-align:left'>HP "+format(player.hp,0)+"</td>"
        str+="<td style='width:200px;text-align:left'></td>"
        str+="<td style='width:100px;text-align:right'>"+format(player.monsterHp,0)+" HP</td>"
        str+="</tr></table>"
        str+="<br>"
        if(player.inHanging==1){
            str+="已挂机 "+format(Math.floor(player.hangingTime),0)+" 次<br><br>"
        }
        str+="<button onclick='QuitFight()'>结束战斗</button>"
    }
    else{
        let id=player.fightTabId/10-10000
        str+="<table><tr>"
        str+="<td style='text-align:left'>"+monster[id].name+"</td><td style='width:5px'></td><td style='width:100px;text-align:left'></td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>生命</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.monsterHpmax,0)+"</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>攻击</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.monsterAtk,0)+"</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>防御</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.monsterDef,0)+"</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>命中</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.monsterHit,0)+"</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>伤害穿透</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.monsterDamageAdd,0)+"%</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>伤害减免</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.monsterDamageMinus,0)+"%</td>"
        str+="</tr><tr>"
        str+="<td>　</td>"
        str+="</tr><tr>"
        str+="<td style='text-align:left'>掉落</td>"
        str+="</tr><tr>"
        str+="<td colspan=3 style='text-align:left'>经验×"+format(monster[id].drop,0)+"</td>"
        str+="</tr><tr>"
        str+="<td colspan=3 style='text-align:left'>金币×"+format(monster[id].drop,0)+"</td>"
        for(let i=0;i<monster[id].dropList.length;i++){
            str+="</tr><tr>"
            str+="<td colspan=3 style='text-align:left'>"+idToName[monster[id].dropList[i][1]]+"×"+format(monster[id].dropList[i][2],0)+" 1/"+format(monster[id].dropList[i][0],0)+"</td>"
        }
        str+="</tr></table><br>"
        str+="<button onclick='player.fightTabId=Math.floor(player.fightTabId/10)'>返回战斗</button>"
    }
    str+="<br>"
    return str
}
function AutoUpgrade(){
    while(player.exp.gte(CalcExpNeed())){
        player.exp=player.exp.sub(CalcExpNeed())
        player.lv+=1
    }
}
function EnterFight(id){
    player.hp=player.hpmax
    let num=monster[id].num
    player.monsterHp=n(100).mul(num)
    player.monsterHpmax=n(100).mul(num)
    player.monsterAtk=n(10).mul(num)
    player.monsterDef=n(10).mul(num)
    player.monsterHit=n(100).add(n(10).mul(n(num).pow(0.8)))
    player.monsterDamageAdd=n(100).mul(n(num).pow(0.2))
    player.monsterDamageMinus=n(100).mul(n(num).pow(0.2).sub(1).div(2))
    if(player.maxKillDifficulty[id]<player.nowDifficulty){
        player.inFight=1
    }
    else{
        player.inHanging=1
    }
}
function QuitFight(){
    if(player.inHanging==1){
        player.hangingTime=Math.floor(player.hangingTime)
        let expgain=monster[player.onMonsterId].drop.mul(player.hangingTime)
        let moneygain=monster[player.onMonsterId].drop.mul(player.hangingTime)
        player.exp=player.exp.add(expgain)
        player.money=player.money.add(moneygain)
        let str="挂机 "+format(player.hangingTime,0)+" 次 , 获得 经验×"+format(expgain,0)+" 金币×"+format(moneygain,0)
        let dropList=[]
        for(let i=0;i<monster[player.onMonsterId].dropList.length;i++){
            let ii=monster[player.onMonsterId].dropList[i],count=0
            for(let j=0;j<player.hangingTime;j++){
                if(random()<=1/ii[0]){
                    count+=ii[2]
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
    player.onMonsterId=-1
    player.fightTabId=-1
    player.inFight=-1
    player.inHanging=-1
    player.hangingTime=0
    player.which=0
}
function DealFight(){
    player.fightingTime=Math.max(0,player.fightingTime-0.5)
    if(player.which==0){
        let count=player.atk.mul(player.atk).div(player.atk.add(player.monsterDef)).mul(player.damageAdd.sub(player.monsterDamageMinus).max(0).div(100)).min(player.monsterHp)
        let hitRate=player.hit.mul(9).div(player.hit.mul(9).add(player.monsterHit))
        let criticalRate=player.hit.div(player.hit.add(player.monsterHit.mul(9)))
        if(n(random()).lte(hitRate)){
            if(n(random()).lte(criticalRate)){
                count=count.mul(player.criticalDamage.div(100)).min(player.monsterHp)
                player.monsterHp=player.monsterHp.sub(count)
                logs.push("你 对 "+monster[player.onMonsterId].name+" 造成了"+format(count,0)+"点伤害 (暴击)")
            }
            else{
                player.monsterHp=player.monsterHp.sub(count)
                logs.push("你 对 "+monster[player.onMonsterId].name+" 造成了"+format(count,0)+"点伤害")
            }
        }
        else{
            logs.push("你 的攻击被 "+monster[player.onMonsterId].name+" 闪避了")
        }
        player.which=1
        if(player.monsterHp.lt(0.0001)){
            logs.push("恭喜 你 成功击败 "+monster[player.onMonsterId].name)
            player.maxKillDifficulty[player.onMonsterId]=Math.max(player.maxKillDifficulty[player.onMonsterId],player.nowDifficulty)
            player.inFight=-1
            player.inHanging=1
        }
    }
    else{
        let count=player.monsterAtk.mul(player.monsterAtk).div(player.monsterAtk.add(player.def)).mul(player.monsterDamageAdd.sub(player.damageMinus).max(0).div(100)).min(player.hp)
        let hitRate=player.monsterHit.mul(9).div(player.monsterHit.mul(9).add(player.hit))
        if(n(random()).lte(hitRate)){
            player.hp=player.hp.sub(count)
            logs.push(monster[player.onMonsterId].name+" 对 你 造成了"+format(count,0)+"点伤害")
        }
        else{
            logs.push(monster[player.onMonsterId].name+" 的攻击被 你 闪避了")
        }
        player.which=0
        if(player.hp.lt(0.0001)){
            logs.push("你 被 "+monster[player.onMonsterId].name+" 击败了")
            player.inFight=-1
        }
    }
}
function TryEnter(id){
    if(player.onMonsterId==-1){
        player.onMonsterId=id
        player.fightTabId=10000+id
        EnterFight(id)
    }
    else if(player.onMonsterId!=id){
        logs.push("你不能与 "+monster[id].name+" 战斗 , 因为你有别的战斗正在进行")
    }
    else{
        player.fightTabId=10000+id
    }
}