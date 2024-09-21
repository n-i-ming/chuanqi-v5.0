function getMainSubTabDisplay(){
    let str=""
    if(player.mainTabId==0){//属性
        str+="<table>"
        str+="<tr><td style='text-align:left'>生命</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.hpmax,0)+"</td></tr>"
        str+="<tr><td style='text-align:left'>攻击</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.atk,0)+"</td></tr>"
        str+="<tr><td style='text-align:left'>防御</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.def,0)+"</td></tr>"
        str+="<tr><td style='text-align:left'>命中</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.hit,0)+"</td></tr>"
        str+="<tr><td style='text-align:left'>暴击伤害</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.criticalDamage,0)+"%</td></tr>"
        str+="<tr><td style='text-align:left'>伤害穿透</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.damageAdd,0)+"%</td></tr>"
        str+="<tr><td style='text-align:left'>伤害减免</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.damageMinus,0)+"%</td></tr>"
        str+="<tr><td style='text-align:left'>　</td></tr>"
        str+="<tr><td style='text-align:left'>挂机速度</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.hangingSpeed,3)+"</td></tr>"
        str+="<tr><td style='text-align:left'>材料掉落幸运</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.dropLuck,2)+"</td></tr>"
        str+="<tr><td style='text-align:left'>材料掉落倍率</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+format(player.dropMul,2)+"</td></tr>"
        str+="<tr><td style='text-align:left'>　</td></tr>"
        str+="<tr><td style='text-align:left'>小月卡剩余时长</td><td style='width:5px'></td><td style='width:100px;text-align:left'>"+formatTime(Math.floor(player.monthCardTime),2)+"</td></tr>"
        str+="<tr><td style='text-align:left'>小月卡效果</td><td style='width:5px'></td><td style='width:250px;text-align:left'>挂机速度x2 材料掉落倍率x2</td></tr>"
        str+="<tr><td style='text-align:left'>　</td></tr>"
        str+="<tr><td style='text-align:left'>中秋节福利效果</td><td style='width:5px'></td><td style='width:250px;text-align:left'>挂机速度x2 (9.17~9.23)</td></tr>"
        str+="</table>"
        str+="<br>"
        str+="<button onclick='AutoUpgrade()'>一键升级</button><br>"
    }
    else if(player.mainTabId==1){//背包
        str+="<table>"
        for(let i=0;i<bagDisplayList.length;i++){
            if(player.bag[bagDisplayList[i]]>0){
                str+="<tr><td>"+idToName[bagDisplayList[i]]+"×"+format(player.bag[bagDisplayList[i]],0)+"</td></tr>"
            }
        }
        str+="</table>"
    }
    else if(player.mainTabId==2){//丹药
        str+="<table>"
        let all=0
        for(let i=0;i<player.pelletNum.length;i++){
            if(player.pelletNum[i][0]+player.pelletNum[i][1]+player.pelletNum[i][2]==300){
                all++
            }
        }
        for(let i=Math.min(all,pelletAttribute.length-1);i>=0;i--){
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
            str+="<tr><td colspan=3>　</td></tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==3){//兵器
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
    else if(player.mainTabId==4){//元神
        str+="<table>"
        let list=["hpmax","atk","def","hit"]
        for(let i=0;i<list.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+attributeToName[list[i]]+"修炼 "+format(player.spiritLv[i],0)+"级</td>"
            str+="<td style='text-align:left;width:150px'>"+attributeToName[list[i]]+"+"+format(n(player.spiritLv[i]).mul(n(1.1).pow(CalcSpiritStage(i))),0)+"%</td>"
            str+="<td style='text-align:left;width:300px'>下一级需要 "+idToName[2]+"×"+format(CalcSpiritNeed(i),0)+"</td>"
            str+="<td style='text-align:left;'><button onclick='SpiritUpgrade("+i+",0)'>修炼</button></td>"
            str+="<td style='text-align:left;'><button onclick='SpiritUpgrade("+i+",1)' style='margin-left:-10px;'>一键修炼</button></td>"
            str+="</tr>"
        }
        str+="</table>"
        str+="<br>每一个阶段的元神独立提升属性加成10%<br>"
    }
    else if(player.mainTabId==5){//经脉
        let attr=CalcMeridianAttribute(player.meridianLv[0][0])
        let attr1=CalcMeridianAttribute(player.meridianLv[1][0])
        str+="<table>"
        str+="<tr>"
        str+="<td>阳脉"+(player.meridianLv[0][0]+1)+"-"+player.meridianLv[0][1]+"</td>"
        str+="<td style='width:200px'></td>"
        str+="<td>阴脉"+(player.meridianLv[1][0]+1)+"-"+player.meridianLv[1][1]+"</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td>攻击+"+format(attr[1].add(attr[2].mul(Math.ceil(player.meridianLv[0][1]/2))),0)+"%</td>"
        str+="<td style='width:200px'></td>"
        str+="<td>生命+"+format(attr1[1].add(attr1[2].mul(Math.ceil(player.meridianLv[1][1]/2))),0)+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td>命中+"+format(attr[1].add(attr[2].mul(Math.floor(player.meridianLv[0][1]/2))),0)+"%</td>"
        str+="<td style='width:200px'></td>"
        str+="<td>防御+"+format(attr1[1].add(attr1[2].mul(Math.floor(player.meridianLv[1][1]/2))),0)+"%</td>"
        str+="</tr>"
        str+="<tr><td>　</td></tr>"
        str+="<tr>"
        str+="<td>消耗 "+(player.meridianLv[0][1]==10?"金币×"+(format(10000*attr[0],0)):"银针×"+format((attr[0]),0))+"</td>"
        str+="<td style='width:200px'></td>"
        str+="<td>消耗 "+(player.meridianLv[1][1]==10?"金币×"+(format(10000*attr1[0],0)):"银针×"+format((attr1[0]),0))+"</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td><button onclick='TryUpgradeMeridian(0,0)'>升级</button><button style='margin-left:-8px' onclick='TryUpgradeMeridian(0,1)'>一键升级</button></td>"
        str+="<td style='width:200px'></td>"
        str+="<td><button onclick='TryUpgradeMeridian(1,0)'>升级</button><button style='margin-left:-8px' onclick='TryUpgradeMeridian(1,1)'>一键升级</button></td>"
        str+="</tr>"
        str+="</table>"
    }
    else if(player.mainTabId==6){//飞升
        let attr=(player.immortalLv<immortalAttribute.length?immortalAttribute[player.immortalLv]:CalcImmortalAttribute(player.immortalLv))
        let attr1=(player.immortalLv+1<immortalAttribute.length?immortalAttribute[player.immortalLv+1]:CalcImmortalAttribute(player.immortalLv+1))
        str+="<table>"
        str+="<tr><td colspan=4 style='text-align:left'>当前仙阶 "+attr[0]+"</td></tr>"
        str+="<tr>"
        for(let id in attr[1]){
            str+="<td style='text-align:left;width:200px'>"+attributeToName[id]+"+"+format(attr[1][id],0)+"%</td>"
        }
        str+="</tr>"
        str+="<tr>"
        for(let id in attr[2]){
            str+="<td style='text-align:left'>"+attributeToName[id]+"+"+format(attr[2][id],0)+"</td>"
        }
        str+="</tr>"
        str+="<tr>"
        str+="<td style='text-align:left'>挂机难度系数上限+"+attr[4]+"</td>"
        str+="</tr>"
        str+="<tr><td>　</td></tr>"
        str+="<tr><td colspan=4 style='text-align:left'>下一仙阶 "+attr1[0]+"</td></tr>"
        str+="<tr>"
        for(let id in attr1[1]){
            str+="<td style='text-align:left;width:200px'>"+attributeToName[id]+"+"+format(attr1[1][id],0)+"%</td>"
        }
        str+="</tr>"
        str+="<tr>"
        for(let id in attr1[2]){
            str+="<td style='text-align:left'>"+attributeToName[id]+"+"+format(attr1[2][id],0)+"</td>"
        }
        str+="</tr>"
        str+="<tr>"
        str+="<td style='text-align:left'>挂机难度系数上限+"+attr1[4]+"</td>"
        str+="</tr>"
        str+="<tr><td style='text-align:left'>消耗 修为×"+format(attr[3],0)+"</td>"
        str+="<td style='text-align:left'>成功率"+format(10*(1+player.immortalTimes),0)+"%</td></tr>"
        str+="<tr><td style='text-align:left'><button style='margin-left:0px' onclick='TryUpgradeImmortal(0)'>飞升</button><button style='margin-left:-8px' onclick='TryUpgradeImmortal(1)'>一键飞升</button></td></tr>"
        str+="</table>"
    }
    else if(player.mainTabId==7){//转生
        str+="<table>"
        let list=["hpmax","atk","def","hit"]
        for(let i=0;i<list.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+attributeToName[list[i]]+"转生 "+format(player.transmigrationLv[list[i]],0)+"/"+format(player[list[i]].logBase(2).floor(),0)+"</td>"
            str+="<td style='text-align:left;width:150px'>"+attributeToName[list[i]]+"+"+format(n(1.01).pow(player.transmigrationLv[list[i]]).sub(1).mul(100),1)+"%</td>"
            str+="<td style='text-align:right'>消耗 金币×"+format(CalcTransmigrationNeed(list[i]),0)+"</td>"
            str+="<td style='text-align:right'><button onclick='TransmigrationUpgrade("+'"'+list[i]+'"'+",0)'>转生</button></td>"
            str+="<td style='text-align:left;'><button onclick='TransmigrationUpgrade("+'"'+list[i]+'"'+",1)' style='margin-left:-10px'>一键转生</button></td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==8){//神力
        str+="<table>"
        let mx=player.transmigrationLv["hpmax"]+player.transmigrationLv["atk"]+player.transmigrationLv["def"]+player.transmigrationLv["hit"]
        str+="<tr>"
        str+="<td style='text-align:left;width:200px'>神力 "+format(player.divineLv,0)+"/"+format(mx,0)+"</td>"
        str+="<td style='text-align:left;width:150px'>伤害穿透+"+format(n(1.005).pow(player.divineLv).sub(1).mul(100),1)+"%</td>"
        str+="<td style='text-align:left;width:150px'>伤害减免+"+format(n(1.005).pow(player.divineLv).sub(1).mul(100),1)+"%</td>"
        str+="<td style='text-align:right'>消耗 金币×"+format(CalcDivineNeed(),0)+"</td>"
        str+="<td style='text-align:right'><button onclick='DivineUpgrade(0)'>凝聚</button></td>"
        str+="<td style='text-align:left;'><button onclick='DivineUpgrade(1)' style='margin-left:-10px'>一键凝聚</button></td>"
        str+="</tr>"
        str+="</table>"
    }
    else if(player.mainTabId==9){//神庙
        str+="<table>"
        let list=["经验","金币","修为"]
        for(let i=0;i<list.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:150px'>"+list[i]+"神庙 "+format(player.templeLv[i],0)+"级</td>"
            str+="<td style='text-align:left;width:150px'>"+list[i]+"+"
            +format(n(player.templeLv[i]).add(100).mul(n(1.05).pow(Math.floor(player.templeLv[i]/100))).sub(100),0)+"%</td>"
            str+="<td style='text-align:right'>消耗 琥珀×"+format(CalcTempleNeed(i),0)+"</td>"
            str+="<td style='text-align:right'><button onclick='TempleUpgrade("+i+",0)'>升级</button></td>"
            str+="<td style='text-align:left'><button onclick='TempleUpgrade("+i+",1)' style='margin-left:-10px'>一键升级</button></td>"
            str+="</tr>"
        }
        str+="</table>"
        str+="<br>每100级神庙 , 独立提升对应收益5%<br>"
    }
    else if(player.mainTabId==10){//暗器
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>暗器强化 "+format(player.concealLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有暗器增益+"+format(n(player.concealLv).mul(n(1.05).pow(Math.floor(player.concealLv/10000))),0)+"%</td>"
        str+="<td style='text-align:right;'>消耗 陨铁×"+format(CalcConcealNeed(),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='ConcealUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='ConcealUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        let mul=n(1).add(0.01*player.concealLv).mul(n(1.05).pow(Math.floor(player.concealLv/10000)))
        str+="<tr><td>　</td></tr>"
        for(let i=0;i<concealAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+concealFrontName[player.concealType[i]]+concealAttribute[i][0]+"</td>"
            str+="<td style='text-align:left;'>"
            for(let id in concealAttribute[i][1]){
                str+=attributeToName[id]+"+"+(player.concealType[i]==0?0:format(n(2).pow(player.concealType[i]-1).mul(concealAttribute[i][1][id]).mul(mul),1))+" "
            }
            for(let id in concealAttribute[i][2]){
                str+=attributeToName[id]+"+"+(player.concealType[i]==0?0:format(n(2).pow(player.concealType[i]-1).mul(concealAttribute[i][2][id]).mul(mul),1))+"% "
            }
            str+="</td>"
            str+="<td style='width:300px;text-align:right'"
            if(player.concealType[i]==3)str+=" colspan=2"
            str+=">"
            if(player.concealType[i]<3){
                str+="消耗 陨铁×"+format(n(2).pow(player.concealType[i]).mul(concealAttribute[i][3]),0)
                +" 金币×"+format(n(2).pow(player.concealType[i]).mul(concealAttribute[i][3]).mul(50000),0)+"</td><td><button onclick='TryBuildConceal("+i+")'>合成</button>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==11){//翅膀
        let attr=CalcWingAttribute(player.wingLv[0])
        str+="<table>"
        str+="<tr><td colspan=4 style='text-align:left'>当前翅膀 "+attr[0]+"·"+player.wingLv[1]+"级</td></tr>"
        str+="<tr>"
        let list=["生命","攻击","防御","命中"]
        let list1=["伤害穿透","伤害减免"]
        for(let i=0;i<list.length;i++){
            str+="<td style='text-align:left;width:200px'>"+list[i]+"+"+format((attr[1].add(attr[2].mul(player.wingLv[1]))),0)+"%</td>"
        }
        str+="</tr>"
        str+="<tr>"
        for(let i=0;i<list1.length;i++){
            str+="<td style='text-align:left;width:200px'>"+list1[i]+"+"+format((attr[3]),0)+"</td>"
        }
        str+="</tr>"
        str+="<tr><td>　</td></tr>"
        str+="<tr><td colspan=4 style='text-align:left'>下一级 "
        +(player.wingLv[1]==10?CalcWingAttribute(player.wingLv[0]+1)[0]+"·0级":attr[0]+"·"+(player.wingLv[1]+1)+"级")+"</td></tr>"
        str+="<tr>"
        let a1=player.wingLv[0],a2=player.wingLv[1]
        if(a2<10)a2+=1
        else a1+=1,a2=0
        for(let i=0;i<list.length;i++){
            str+="<td style='text-align:left;width:200px'>"+list[i]+"+"+format((CalcWingAttribute(a1)[1].add(CalcWingAttribute(a1)[2].mul(a2))),0)+"%</td>"
        }
        str+="</tr>"
        str+="<tr>"
        for(let i=0;i<list1.length;i++){
            str+="<td style='text-align:left;width:200px'>"+list1[i]+"+"+format((CalcWingAttribute(a1)[3]),0)+"</td>"
        }
        str+="</tr>"
        if(a2!=0){
            str+="<tr><td style='text-align:left'>消耗 羽毛×"+format(attr[4],0)+"</td></tr>"
        }
        else{
            str+="<tr><td style='text-align:left'>消耗 经验×"+format(n(attr[4]).mul(100000),0)+"</td></tr>"
        }
        str+="<tr><td style='text-align:left'><button style='margin-left:0px' onclick='TryUpgradeWing(0)'>升级</button><button style='margin-left:-8px' onclick='TryUpgradeWing(1)'>一键升级</button></td></tr>"
        str+="</table>"
    }
    else if(player.mainTabId==12){//功法
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>功法强化 "+format(player.bookUpgradeLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有功法增益+"+format(player.bookUpgradeLv*Math.pow(1.05,Math.floor(player.bookUpgradeLv/10000)),0)+"%</td>"
        str+="<td style='text-align:right;'>消耗 功法精粹×"+format(CalcBookNeed(),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='BookUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='BookUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        for(let i=0;i<bookAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+bookAttribute[i][0]+(player.bookLv[i]>-1?player.bookLv[i]+"级":"")+"</td>"
            let mul=(player.bookLv[i]==-1?0:(player.bookLv[i]*0.1+1))
            mul*=(1+0.01*player.bookUpgradeLv)
            mul*=Math.pow(1.05,Math.floor(player.bookUpgradeLv/10000))
            str+="<td style='text-align:left;'>"
            for(let id in bookAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(bookAttribute[i][1][id]),1)+" "
            }
            for(let id in bookAttribute[i][2]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(bookAttribute[i][2][id]),1)+"% "
            }
            str+="</td>"
            str+="<td style='width:300px;text-align:right'"
            if(player.bookLv[i]==90)str+=" colspan=2"
            str+=">"
            if(player.bookLv[i]==-1){
                str+="消耗 "+bookAttribute[i][0]+"-残页×10</td><td><button onclick='TryUpgradeBook("+i+",0)'>合成</button></td>"
            }
            else if(player.bookLv[i]<90){
                str+="消耗 经验×"+format(bookAttribute[i][3])+"</td><td style='text-align:right'><button onclick='TryUpgradeBook("+i+",0)'>升级</button></td>"
                str+="<td><button style='margin-left:-10px' onclick='TryUpgradeBook("+i+",1)'>一键升级</button></td>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==13){//宠物
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>宠物强化 "+format(player.petUpgradeLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有宠物增益+"+format(player.petUpgradeLv*Math.pow(1.05,Math.floor(player.petUpgradeLv/10000)),0)+"%</td>"
        str+="<td style='text-align:right;'>消耗 肉块×"+format(CalcPetNeed(),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='PetUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='PetUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        for(let i=0;i<petAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+(player.petLv[i]==-1?"":petFrontName[Math.min(2,player.petLv[i])])+petAttribute[i][0]+(player.petLv[i]>=2?(player.petLv[i]-2)+"级":"")+"</td>"
            let mul=(player.petLv[i]==-1?0:player.petLv[i]<=2?player.petLv[i]+1:3*(1+0.1*(player.petLv[i]-2)))
            mul*=(1+0.01*player.petUpgradeLv)
            mul*=Math.pow(1.05,Math.floor(player.petUpgradeLv/10000))
            str+="<td style='text-align:left;'>"
            for(let id in petAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(petAttribute[i][1][id]),1)+" "
            }
            for(let id in petAttribute[i][2]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(petAttribute[i][2][id]),1)+"% "
            }
            str+="</td>"
            str+="<td style='width:300px;text-align:right'"
            if(player.petLv[i]==22)str+=" colspan=2"
            str+=">"
            if(player.petLv[i]==-1){
                str+="消耗 "+petAttribute[i][0]+"蛋×1</td><td><button onclick='TryUpgradePet("+i+",0)'>孵化</button></td>"
            }
            else if(player.petLv[i]<2){
                str+="消耗 肉块×"+format(petAttribute[i][3]*(player.petLv[i]+1),0)+
                " 成功率"+(format(1+player.petTimes[i]))+"%</td><td><button onclick='TryUpgradePet("+i+",0)'>喂食</button></td>"
            }
            else if(player.petLv[i]<22){
                str+="消耗 金币×"+format(petAttribute[i][4],0)+"</td><td style='text-align:right'><button onclick='TryUpgradePet("+i+",0)'>升级</button></td>"
                str+="<td><button style='margin-left:-10px' onclick='TryUpgradePet("+i+",1)'>一键升级</button></td>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==14){//纵横
        str+="<table>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>纵剑术 "+player.zonghengLv[0]+"级</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>横剑术 "+player.zonghengLv[1]+"级</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>生命+"+format(player.zonghengLv[0]*Math.pow(1.05,Math.floor(player.zonghengLv[0]/10000)),0)+"%</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>防御+"+format(player.zonghengLv[1]*Math.pow(1.05,Math.floor(player.zonghengLv[1]/10000)),0)+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>消耗 金币×"+format(CalcZonghengNeed(0),0)+"</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>消耗 金币×"+format(CalcZonghengNeed(1),0)+"</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:right'><button onclick='ZonghengUpgrade(0,1)' style='margin-left:-8px'>升100级</button><button onclick='ZonghengUpgrade(0,2)' style='margin-left:-8px'>升1000级</button><button onclick='ZonghengUpgrade(0,3)' style='margin-left:-8px'>升1万级</button><button onclick='ZonghengUpgrade(0,4)' style='margin-left:-8px'>升10万级</button></td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:right'><button onclick='ZonghengUpgrade(1,1)' style='margin-left:-8px'>升100级</button><button onclick='ZonghengUpgrade(1,2)' style='margin-left:-8px'>升1000级</button><button onclick='ZonghengUpgrade(1,3)' style='margin-left:-8px'>升1万级</button><button onclick='ZonghengUpgrade(1,4)' style='margin-left:-8px'>升10万级</button></td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>长虹贯日 "+player.zonghengLv[2]+"/"+player.zonghengLv[0]+"级</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>横贯四方 "+player.zonghengLv[3]+"/"+player.zonghengLv[1]+"级</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>攻击+"+format(player.zonghengLv[2]*Math.pow(1.05,Math.floor(player.zonghengLv[2]/10000))*0.5,1)+"%</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>攻击+"+format(player.zonghengLv[3]*Math.pow(1.05,Math.floor(player.zonghengLv[3]/10000))*0.5,1)+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>伤害穿透+"+format(player.zonghengLv[2]*Math.pow(1.05,Math.floor(player.zonghengLv[2]/10000)),0)+"</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>伤害减免+"+format(player.zonghengLv[3]*Math.pow(1.05,Math.floor(player.zonghengLv[3]/10000)),0)+"</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>消耗 金币×"+format(CalcZonghengNeed(2),0)+"</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>消耗 金币×"+format(CalcZonghengNeed(3),0)+"</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:right'><button onclick='ZonghengUpgrade(2,1)' style='margin-left:-8px'>升100级</button><button onclick='ZonghengUpgrade(2,2)' style='margin-left:-8px'>升1000级</button><button onclick='ZonghengUpgrade(2,3)' style='margin-left:-8px'>升1万级</button><button onclick='ZonghengUpgrade(2,4)' style='margin-left:-8px'>升10万级</button></td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:right'><button onclick='ZonghengUpgrade(3,1)' style='margin-left:-8px'>升100级</button><button onclick='ZonghengUpgrade(3,2)' style='margin-left:-8px'>升1000级</button><button onclick='ZonghengUpgrade(3,3)' style='margin-left:-8px'>升1万级</button><button onclick='ZonghengUpgrade(3,4)' style='margin-left:-8px'>升10万级</button></td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>合纵连横·合击 "+player.zonghengLv[4]+"/"+Math.min(player.zonghengLv[2],player.zonghengLv[3])+"级</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>伤害穿透+"+format(player.zonghengLv[4]*Math.pow(1.05,Math.floor(player.zonghengLv[4]/10000))*0.1,1)+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>伤害减免+"+format(player.zonghengLv[4]*Math.pow(1.05,Math.floor(player.zonghengLv[4]/10000))*0.1,1)+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>消耗 金币×"+format(CalcZonghengNeed(4),0)+"</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:right'><button onclick='ZonghengUpgrade(4,1)' style='margin-left:-8px'>升100级</button><button onclick='ZonghengUpgrade(4,2)' style='margin-left:-8px'>升1000级</button><button onclick='ZonghengUpgrade(4,3)' style='margin-left:-8px'>升1万级</button><button onclick='ZonghengUpgrade(4,4)' style='margin-left:-8px'>升10万级</button></td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>九龙真诀·合击 "+player.zonghengLv[5]+"/"+player.zonghengLv[4]+"级</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>命中+"+format(player.zonghengLv[5]*Math.pow(1.05,Math.floor(player.zonghengLv[5]/10000)))+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>消耗 金币×"+format(CalcZonghengNeed(5),0)+"</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:right'><button onclick='ZonghengUpgrade(5,1)' style='margin-left:-8px'>升100级</button><button onclick='ZonghengUpgrade(5,2)' style='margin-left:-8px'>升1000级</button><button onclick='ZonghengUpgrade(5,3)' style='margin-left:-8px'>升1万级</button><button onclick='ZonghengUpgrade(5,4)' style='margin-left:-8px'>升10万级</button></td>"
        str+="</tr>"
        str+="</table>"
    }
    else if(player.mainTabId==15){//魂环
        str+="拥有魂环碎片 "+format(player.bag[24],0)+"<br>"
        str+="拥有魂力 "+format(player.soulPower,0)+"<br><br>"
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>魂环强化 "+format(player.soulcircleUpgradeLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有魂环增益+"+format(player.soulcircleUpgradeLv*Math.pow(1.05,Math.floor(player.soulcircleUpgradeLv/10000)),0)+"%</td>"
        str+="<td style='text-align:right;'>消耗 魂环碎片×"+format(CalcSoulcircleNeed(),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='SoulcircleUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='SoulcircleUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='text-align:left;'>魂力强化 "+format(player.soulPowerUpgradeLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有魂环增益+"+format(n(1.01).pow(player.soulPowerUpgradeLv).sub(1).mul(100),0)+"%</td>"
        str+="<td style='text-align:right;'>消耗 魂力×"+format(n(1e5).mul(n(1.1).pow(player.soulPowerUpgradeLv)),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='SoulpowerUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='SoulpowerUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        for(let i=0;i<soulcircleAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:300px'>"+soulcircleFrontName[Math.min(6,player.soulcircleLv[i])]+soulcircleAttribute[i][0]+(player.soulcircleLv[i]>=6?(player.soulcircleLv[i]-6)+"级":"")+"</td>"
            let mul=Math.min(6,player.soulcircleLv[i])*(1+0.01*Math.max(0,player.soulcircleLv[i]-6))*(1+0.01*player.soulcircleUpgradeLv)
            mul*=Math.pow(1.05,Math.floor(player.soulcircleUpgradeLv/10000))
            mul*=Math.pow(1.01,player.soulPowerUpgradeLv)
            str+="<td style='text-align:left;'>"
            for(let id in soulcircleAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(soulcircleAttribute[i][1][id]),1)+" "
            }
            for(let id in soulcircleAttribute[i][2]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(soulcircleAttribute[i][2][id]),1)+"% "
            }
            str+="</td>"
            str+="<td style='width:300px;text-align:right'"
            if(player.soulcircleLv[i]==10006)str+=" colspan=2"
            str+=">"
            if(player.soulcircleLv[i]<6){
                str+="消耗 魂环碎片×"+format((player.soulcircleLv[i]+1)*soulcircleAttribute[i][3],0)+"</td><td><button onclick='TryUpgradeSoulcircle("+i+",0)'>升级</button></td>"
            }
            else if(player.soulcircleLv[i]<10006){
                str+="消耗 魂力×"+format(soulcircleAttribute[i][3]*2*(player.soulcircleLv[i]-5),0)+"</td><td style='text-align:right'><button onclick='TryUpgradeSoulcircle("+i+",0)'>升级</button></td>"
                str+="<td><button style='margin-left:-10px' onclick='TryUpgradeSoulcircle("+i+",1)'>一键升级</button></td>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==16){//魂骨
        str+="拥有魂骨碎片 "+format(player.bag[25],0)+"<br><br>"
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>魂骨强化 "+format(player.soulboneUpgradeLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有魂骨获取类增益+"+format(player.soulboneUpgradeLv*Math.pow(1.05,Math.floor(player.soulboneUpgradeLv/10000))/10,1)
        +"% 所有魂骨属性类增益+"+format(player.soulboneUpgradeLv*Math.pow(1.05,Math.floor(player.soulboneUpgradeLv/10000)),0)+"%</td>"
        str+="<td style='text-align:right;'>消耗 魂骨碎片×"+format(CalcSoulboneNeed(),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='SoulboneUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='SoulboneUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        for(let i=0;i<soulboneAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:250px'>"+soulboneAttribute[i][0]+(player.soulboneLv[i]>=1?(player.soulboneLv[i]-1)+"级":"")+"</td>"
            let mul=Math.min(1,player.soulboneLv[i])*(1+0.1*Math.max(0,player.soulboneLv[i]-1))
            mul*=Math.pow(1.05,Math.floor(player.soulboneUpgradeLv/10000))
            str+="<td style='text-align:left;'>"
            for(let id in soulboneAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(soulboneAttribute[i][1][id]).mul(player.soulboneUpgradeLv/1000+1),1)+"% "
            }
            for(let id in soulboneAttribute[i][2]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(soulboneAttribute[i][2][id]).mul(player.soulboneUpgradeLv/100+1),1)+"% "
            }
            str+="</td>"
            str+="<td style='width:300px;text-align:right'"
            if(player.soulboneLv[i]==11)str+=" colspan=2"
            str+=">"
            if(player.soulboneLv[i]<1){
                str+="消耗 魂骨碎片×"+format(soulboneAttribute[i][3],0)+"</td><td><button onclick='TryUpgradeSoulbone("+i+",0)'>升级</button></td>"
            }
            else if(player.soulboneLv[i]<11){
                str+="消耗 魂骨碎片×"+format(soulboneAttribute[i][3]/5,0)+"</td><td style='text-align:right'><button onclick='TryUpgradeSoulbone("+i+",0)'>升级</button></td>"
                str+="<td><button style='margin-left:-10px' onclick='TryUpgradeSoulbone("+i+",1)'>一键升级</button></td>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==17){//吞噬
        str+="吞噬点 "+format(player.eatPoint,0)+"<br>"
        str+="等级属性×"+format(n(player.eatPoint).add(1).pow(0.25))+"<br><br>"
        str+="<table>"
        for(let i=0;i<bagDisplayList.length;i++){
            let id=bagDisplayList[i]
            if(player.bag[id]>0 && eatPointList[i]>0){
                str+="<tr>"
                str+="<td style='width:200px;text-align:left'>"+idToName[id]+"</td>"
                str+="<td style='width:200px;text-align:left'>可获得 "+format(eatPointList[i]*player.bag[id],0)+"吞噬点</td>"
                str+="<td><button onclick='TryEat("+i+")'>吞噬</button></td>"
                str+="</tr>"
            }
        }
        str+="</table>"
    }
    else if(player.mainTabId==18){//绝技
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>绝技强化 "+format(player.skillUpgradeLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有绝技增益+"+format(player.skillUpgradeLv*Math.pow(1.05,Math.floor(player.skillUpgradeLv/10000)),0)+"%</td>"
        str+="<td style='text-align:right;'>消耗 绝技图册×"+format(CalcSkillNeed(),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='SkillUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='SkillUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        for(let i=0;i<skillAttribute.length;i++){
            str+="<tr>"
            str+="<td style='width:200px;text-align:left'>"+skillAttribute[i][0]+" "+format(player.skillLv[i],0)+"级</td>"
            let mul=player.skillLv[i]*(1+0.01*player.skillUpgradeLv)
            mul*=Math.pow(1.05,Math.floor(player.skillUpgradeLv/10000))
            str+="<td style='text-align:left;'>"
            for(let id in skillAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(n(skillAttribute[i][1][id]).mul(mul),1)+" "
            }
            for(let id in skillAttribute[i][2]){
                str+=attributeToName[id]+"+"+format(n(skillAttribute[i][2][id]).mul(mul),1)+"% "
            }
            str+="</td>"
            str+="</td>"
            str+="<td style='width:300px;text-align:right'"
            if(player.skillLv[i]==10)str+=" colspan=2"
            str+=">"
            if(player.skillLv[i]<10){
                str+="消耗 绝技图册×"+format(skillAttribute[i][3],0)
                +"</td>"
                str+="<td style='text-align:right'><button onclick='TryUpgradeSkill("+i+",0)'>升级</button></td>"
                str+="<td style='text-align:left'><button onclick='TryUpgradeSkill("+i+",1)' style='margin-left:-10px'>一键升级</button></td>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==19){//无限
        str+="拥有无限宝石碎片 "+format(player.bag[40],0)+"<br><br>"
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>无限宝石强化 "+format(player.infinityUpgradeLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有无限宝石增益+"+format(player.infinityUpgradeLv*Math.pow(1.05,Math.floor(player.infinityUpgradeLv/10000)),0)+"%</td>"
        str+="<td style='text-align:right;'>消耗 无限宝石碎片×"+format(CalcInfinityNeed(),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='InfinityUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='InfinityUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        for(let i=0;i<infinityAttribute.length;i++){
            str+="<tr>"
            str+="<td style='width:200px;text-align:left'>"+infinityAttribute[i][0]+"·"+format(player.infinityLv[i],0)+"阶</td>"
            str+="<td style='text-align:left;'>"
            let mul=1+0.01*player.infinityUpgradeLv
            mul*=Math.pow(1.05,Math.floor(player.infinityUpgradeLv/10000))
            for(let id in infinityAttribute[i][1]){
                str+=attributeToName[id]+"+"+(player.infinityLv[i]==0?0:format(n(infinityAttribute[i][1][id]).div(100).add(1).pow(player.infinityLv[i]).mul(100).mul(mul).sub(100),0))+" "
            }
            for(let id in infinityAttribute[i][2]){
                str+=attributeToName[id]+"+"+(player.infinityLv[i]==0?0:format(n(infinityAttribute[i][2][id]).div(100).add(1).pow(player.infinityLv[i]).mul(100).mul(mul).sub(100),0))+"% "
            }
            str+="</td>"
            str+="</td>"
            str+="<td style='width:400px;text-align:right'"
            if(player.infinityLv[i]==100)str+=" colspan=2"
            str+=">"
            if(player.infinityLv[i]<100){
                str+="消耗 无限宝石碎片×"+format(infinityAttribute[i][3],0)+" 金币×"+format(infinityAttribute[i][4].mul(n(1.1).pow(player.infinityLv[i])),0)
                +"</td>"
                str+="<td style='text-align:right'><button onclick='TryUpgradeInfinity("+i+",0)'>升阶</button></td>"
                str+="<td style='text-align:left'><button onclick='TryUpgradeInfinity("+i+",1)' style='margin-left:-10px'>一键升阶</button></td>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==20){//分身
        str+="你拥有 "+format(player.separationLv,0)+" 尊分身<br>"
        str+="使你的挂机速度×"+format(player.separationLv*0.5+1,1)+"<br><br>"
        str+="下一尊分身需要 达到"+format((player.separationLv+1)*1e5,0)+"级 , 并消耗 金币×"+format(n(1e10).mul(n(1e5).pow(player.separationLv)),0)+"<br>"
        str+="<br><button onclick='TryBuildSeparation()'>凝聚</button><br>"
    }
    else if(player.mainTabId==21){//后宫
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>后宫强化 "+format(player.partnerUpgradeLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有后宫增益+"+format(player.partnerUpgradeLv*Math.pow(1.05,Math.floor(player.partnerUpgradeLv/10000)),0)+"%</td>"
        str+="<td style='text-align:right;'>消耗 仕女图×"+format(CalcPartnerNeed(),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='PartnerUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='PartnerUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        for(let i=0;i<partnerAttribute.length;i++){
            str+="<tr>"
            str+="<td style='width:300px;text-align:left'>"+partnerAttribute[i][0]+" "
            str+="亲密 "+(Math.max(0,Math.min(100,player.partnerLv[i])))+"% "
            str+="魅力 "+(Math.max(0,Math.min(100,player.partnerLv[i]-99)))+"%</td>"
            let mul=Math.max(0,Math.min(100,player.partnerLv[i]))*Math.max(1,Math.min(100,player.partnerLv[i]-99))*(1+0.01*player.partnerUpgradeLv)
            mul*=Math.pow(1.05,Math.floor(player.partnerUpgradeLv/10000))
            str+="<td style='text-align:left;'>"
            for(let id in partnerAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(n(partnerAttribute[i][1][id]).mul(mul),1)+"% "
            }
            str+="</td>"
            str+="</td>"
            str+="<td style='width:300px;text-align:right'"
            if(player.partnerLv[i]==199)str+=" colspan=2"
            str+=">"
            if(player.partnerLv[i]<100){
                str+="消耗 仕女图×"+format(partnerAttribute[i][2],0)
                +"</td>"
                str+="<td style='text-align:right'><button onclick='TryUpgradePartner("+i+",0)'>宠幸</button></td>"
                str+="<td style='text-align:left'><button onclick='TryUpgradePartner("+i+",1)' style='margin-left:-10px'>一键宠幸</button></td>"
            }
            else if(player.partnerLv[i]<199){
                str+="消耗 金币×"+format(partnerAttribute[i][3],0)
                +"</td>"
                str+="<td style='text-align:right'><button onclick='TryGivePartner("+i+",0)'>赏赐</button></td>"
                str+="<td style='text-align:left'><button onclick='TryGivePartner("+i+",1)' style='margin-left:-10px'>一键赏赐</button></td>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==22){//英雄
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>英雄强化 "+format(player.heroUpgradeLv,0)+"级</td>"
        str+="<td style='text-align:left;'>所有英雄增益+"+format(player.heroUpgradeLv*0.1*Math.pow(1.05,Math.floor(player.heroUpgradeLv/10000)),1)+"%</td>"
        str+="<td style='text-align:right;'>消耗 英雄元魂×"+format(CalcHeroNeed(),0)+"</td>"
        str+="<td style='text-align:right;'><button onclick='HeroUpgrade(0)'>升级</button></td>"
        str+="<td style='text-align:left;'><button onclick='HeroUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        str+="</tr>"
        for(let i=0;i<heroAttribute.length;i++){
            str+="<tr>"
            str+="<td style='width:250px;text-align:left'>"+heroAttribute[i][0]+" "+(player.heroLv[i]>0?"已激活":"未激活")+"</td>"
            let mul=player.heroLv[i]*(1+0.001*player.heroUpgradeLv)
            mul*=Math.pow(1.05,Math.floor(player.heroUpgradeLv/10000))
            str+="<td style='text-align:left;'>"
            for(let id in heroAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(n(heroAttribute[i][1][id]).mul(mul),1)+"% "
            }
            for(let j=0;j<heroAttribute[i][2].length;j++){
                let id=heroAttribute[i][2][j][0]
                str+=(id!="挂机速度"?idToName[id]:"挂机速度")+"+"+format(n(heroAttribute[i][2][j][1]).mul(mul),1)+"% "
            }
            str+="</td>"
            str+="</td>"
            str+="<td style='width:300px;text-align:right'"
            if(player.heroLv[i]==1)str+=" colspan=2"
            str+=">"
            if(player.heroLv[i]<1){
                str+="消耗 "+heroAttribute[i][0]+"-碎片×"+format(heroAttribute[i][4],0)
                +"</td>"
                str+="<td style='text-align:right'><button onclick='TryActiveHero("+i+")'>激活</button></td>"
            }
            str+="</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==23){//成就
        str+="真实挂机次数 "+format(player.hangingTimeReal)+"次<br>"
        str+="<br><table>"
        str+="<tr><td style='width:150px'><玩十分钟></td><td style='width:200px'>挂机600次</td><td style='width:100px'>挂机速度×2</td><td style='width:200px'>"+(player.hangingTimeReal>=600?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><玩一小时></td><td>挂机3600次</td><td>挂机速度×2</td><td>"+(player.hangingTimeReal>=3600?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><玩六小时></td><td>挂机21600次</td><td>挂机速度×2</td><td>"+(player.hangingTimeReal>=21600?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><玩了一天></td><td>挂机86400次</td><td>挂机速度×2</td><td>"+(player.hangingTimeReal>=86400?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><玩了一周></td><td>挂机604800次</td><td>挂机速度×2</td><td>"+(player.hangingTimeReal>=604800?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td>　</td></tr>"
        str+="<tr><td><初出茅庐></td><td>战力达到1e500</td><td>挂机速度×2</td><td>"+(player.fightAbility.gte(n("1e500"))?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><初窥门径></td><td>战力达到1e1000</td><td>挂机速度×2</td><td>"+(player.fightAbility.gte(n("1e1000"))?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><略有所成></td><td>战力达到1e1500</td><td>挂机速度×2</td><td>"+(player.fightAbility.gte(n("1e1500"))?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><渐入佳境></td><td>战力达到1e2000</td><td>挂机速度×2</td><td>"+(player.fightAbility.gte(n("1e2000"))?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><登堂入室></td><td>战力达到1e2500</td><td>挂机速度×2</td><td>"+(player.fightAbility.gte(n("1e2500"))?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><融会贯通></td><td>战力达到1e3000</td><td>挂机速度×2</td><td>"+(player.fightAbility.gte(n("1e3000"))?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><出类拔萃></td><td>战力达到1e3500</td><td>挂机速度×2</td><td>"+(player.fightAbility.gte(n("1e3500"))?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><炉火纯青></td><td>战力达到1e4000</td><td>挂机速度×2</td><td>"+(player.fightAbility.gte(n("1e4000"))?"已达成":"未达成")+"</td></tr>"
        str+="<tr><td><登峰造极></td><td>战力达到1e4500</td><td>挂机速度×2</td><td>"+(player.fightAbility.gte(n("1e4500"))?"已达成":"未达成")+"</td></tr>"
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
            str+="已挂机 "+format(Math.floor(Math.floor(player.hangingTime)*player.hangingSpeed),0)+" 次<br><br>"
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
        str+="<td colspan=3 style='text-align:left'>经验×"+format(monster[id].drop.mul(n(1.01).pow(player.inFightDifficulty)).mul(player.expMul),0)+"</td>"
        str+="</tr><tr>"
        str+="<td colspan=3 style='text-align:left'>金币×"+format(monster[id].drop.mul(n(1.01).pow(player.inFightDifficulty)).mul(player.moneyMul),0)+"</td>"
        str+="</tr><tr>"
        str+="<td colspan=3 style='text-align:left'>修为×"+format(monster[id].drop.mul(n(1.01).pow(player.inFightDifficulty)).mul(player.cultivationMul),0)+"</td>"
        for(let i=0;i<monster[id].dropList.length;i++){
            str+="</tr><tr>"
            str+="<td colspan=3 style='text-align:left'>"+idToName[monster[id].dropList[i][1]]+"×"
            +format(monster[id].dropList[i][2]*player.dropMul*player.bagMulList[monster[id].dropList[i][1]],0)
            +" 1/"+format(monster[id].dropList[i][0]/player.dropLuck,0)+"</td>"
        }
        str+="</tr></table><br>"
        str+="<button onclick='player.fightTabId=Math.floor(player.fightTabId/10)'>返回战斗</button>"
    }
    str+="<br>"
    return str
}
function EnterFight(id){
    player.hp=player.hpmax
    let num=monster[id].num
    player.inFightDifficulty=player.nowDifficulty
    player.monsterHp=n(100).mul(num).mul(n(1.1).pow(player.inFightDifficulty))
    player.monsterHpmax=n(100).mul(num).mul(n(1.1).pow(player.inFightDifficulty))
    player.monsterAtk=n(10).mul(num).mul(n(1.1).pow(player.inFightDifficulty))
    player.monsterDef=n(10).mul(num).mul(n(1.1).pow(player.inFightDifficulty))
    player.monsterHit=n(100).add(n(10).mul(n(num).pow(0.8))).mul(n(1.05).pow(player.inFightDifficulty))
    player.monsterDamageAdd=n(100).mul(n(num).pow(0.15)).mul(n(1.02).pow(player.inFightDifficulty))
    player.monsterDamageMinus=n(100).mul(n(num).pow(0.15).sub(1).div(2)).mul(n(1.02).pow(player.inFightDifficulty))
    if(player.maxKillDifficulty[id]<player.nowDifficulty){
        player.inFight=1
    }
    else{
        player.inHanging=1
        player.hangingTime=0
    }
}
function QuitFight(){
    if(player.inHanging==1){
        player.hangingTimeReal+=Math.floor(player.hangingTime)
        player.hangingTime=Math.floor(Math.floor(player.hangingTime)*player.hangingSpeed)
        let expgain=monster[player.onMonsterId].drop.mul(player.hangingTime).mul(n(1.01).pow(player.inFightDifficulty)).mul(player.expMul)
        let moneygain=monster[player.onMonsterId].drop.mul(player.hangingTime).mul(n(1.01).pow(player.inFightDifficulty)).mul(player.moneyMul)
        let cultivationgain=monster[player.onMonsterId].drop.mul(player.hangingTime).mul(n(1.01).pow(player.inFightDifficulty)).mul(player.cultivationMul)
        player.exp=player.exp.add(expgain)
        player.money=player.money.add(moneygain)
        player.cultivation=player.cultivation.add(cultivationgain)
        let str="挂机 "+format(player.hangingTime,0)+" 次 , 获得 经验×"+format(expgain,0)+" 金币×"+format(moneygain,0)
        +" 修为×"+format(cultivationgain,0)
        let dropList=[]
        for(let i=0;i<monster[player.onMonsterId].dropList.length;i++){
            let ii=monster[player.onMonsterId].dropList[i],count=0
            let sqrtTimes=Math.min(player.hangingTime,10000),sqrtNum=Math.floor(player.hangingTime/sqrtTimes)
            let re=player.hangingTime-sqrtNum*sqrtTimes
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
                dropList.push([ii[1],count*player.bagMulList[ii[1]]])
                player.bag[ii[1]]+=count*player.bagMulList[ii[1]]
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
    player.fightingTime=0
    player.hangingTime=0
    player.which=0
}
function DealFight(){
    player.fightingTime=Math.max(0,player.fightingTime-0.5)
    if(player.which==0){
        let count=player.atk.mul(player.atk).div(player.atk.add(player.monsterDef)).mul(player.damageAdd.sub(player.monsterDamageMinus).max(0).div(100))
        let hitRate=player.hit.mul(9).div(player.hit.mul(9).add(player.monsterHit))
        let criticalRate=player.hit.div(player.hit.add(player.monsterHit.mul(9)))
        if(n(random()).lte(hitRate)){
            if(n(random()).lte(criticalRate)){
                count=count.mul(player.criticalDamage.div(100))
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