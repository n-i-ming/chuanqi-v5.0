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
        str+="</table>"
        str+="<br>"
        str+="<button onclick='AutoUpgrade()'>一键升级</button><br>"
    }
    else if(player.mainTabId==1){//背包
        str+="<table>"
        for(let i=0;i<bagDisplayList.length;i++){
            if(player.bag[bagDisplayList[i]]>0){
                str+="<tr><td>"+idToName[bagDisplayList[i]]+"×"+player.bag[bagDisplayList[i]]+"</td></tr>"
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
            str+="<td style='text-align:left;width:200px'>"+attributeToName[list[i]]+"修炼 "+player.spiritLv[i]+"/10000级</td>"
            str+="<td style='text-align:left;width:100px'>"+attributeToName[list[i]]+"+"+player.spiritLv[i]+"%</td>"
            if(CalcSpiritNeed(i)<1e100){
                str+="<td style='text-align:left;width:300px'>下一级需要 "+idToName[2]+"×"+CalcSpiritNeed(i)+"</td>"
                str+="<td style='text-align:left;'><button onclick='SpiritUpgrade("+i+",0)'>修炼</button></td>"
                str+="<td style='text-align:left;'><button onclick='SpiritUpgrade("+i+",1)' style='margin-left:-10px;'>一键修炼</button></td>"
            }
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==5){//经脉
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
        str+="<td>伤害穿透+"+(player.meridianLv[0][0]*10)+"</td>"
        str+="<td style='width:200px'></td>"
        str+="<td>伤害减免+"+(player.meridianLv[1][0]*10)+"</td>"
        str+="</tr>"
        str+="<tr><td>　</td></tr>"
        if(player.meridianLv[0][0]!=meridianAttribute.length-1 || player.meridianLv[1][0]!=meridianAttribute.length-1){
            str+="<tr>"
            if(player.meridianLv[0][0]!=meridianAttribute.length-1)
            str+="<td>消耗 "+(player.meridianLv[0][1]==10?"金币×"+(10000*meridianAttribute[player.meridianLv[0][0]][0]):"银针×"+(meridianAttribute[player.meridianLv[0][0]][0]))+"</td>"
            else
            str+="<td>　</td>"
            str+="<td style='width:200px'></td>"
            if(player.meridianLv[1][0]!=meridianAttribute.length-1)
            str+="<td>消耗 "+(player.meridianLv[1][1]==10?"金币×"+(10000*meridianAttribute[player.meridianLv[1][0]][0]):"银针×"+(meridianAttribute[player.meridianLv[1][0]][0]))+"</td>"
            else
            str+="<td>　</td>"
            str+="</tr>"
            str+="<tr>"
            if(player.meridianLv[0][0]!=meridianAttribute.length-1)
            str+="<td><button onclick='TryUpgradeMeridian(0,0)'>升级</button><button style='margin-left:-8px' onclick='TryUpgradeMeridian(0,1)'>一键升级</button></td>"
            else
            str+="<td>　</td>"
            str+="<td style='width:200px'></td>"
            if(player.meridianLv[1][0]!=meridianAttribute.length-1)
            str+="<td><button onclick='TryUpgradeMeridian(1,0)'>升级</button><button style='margin-left:-8px' onclick='TryUpgradeMeridian(1,1)'>一键升级</button></td>"
            else
            str+="<td>　</td>"
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==6){//飞升
        str+="<table>"
        str+="<tr><td colspan=4 style='text-align:left'>当前仙阶 "+immortalAttribute[player.immortalLv][0]+"</td></tr>"
        str+="<tr>"
        for(let id in immortalAttribute[player.immortalLv][1]){
            str+="<td style='text-align:left;width:200px'>"+attributeToName[id]+"+"+immortalAttribute[player.immortalLv][1][id]+"%</td>"
        }
        str+="</tr>"
        str+="<tr>"
        for(let id in immortalAttribute[player.immortalLv][2]){
            str+="<td style='text-align:left'>"+attributeToName[id]+"+"+immortalAttribute[player.immortalLv][2][id]+"</td>"
        }
        str+="</tr>"
        str+="<tr>"
        str+="<td style='text-align:left'>挂机难度系数上限+"+immortalAttribute[player.immortalLv][4]+"</td>"
        str+="</tr>"
        str+="<tr><td>　</td></tr>"
        if(player.immortalLv<immortalAttribute.length-1){
            str+="<tr><td colspan=4 style='text-align:left'>下一仙阶 "+immortalAttribute[player.immortalLv+1][0]+"</td></tr>"
            str+="<tr>"
            for(let id in immortalAttribute[player.immortalLv+1][1]){
                str+="<td style='text-align:left;width:200px'>"+attributeToName[id]+"+"+immortalAttribute[player.immortalLv+1][1][id]+"%</td>"
            }
            str+="</tr>"
            str+="<tr>"
            for(let id in immortalAttribute[player.immortalLv+1][2]){
                str+="<td style='text-align:left'>"+attributeToName[id]+"+"+immortalAttribute[player.immortalLv+1][2][id]+"</td>"
            }
            str+="</tr>"
            str+="<tr>"
            str+="<td style='text-align:left'>挂机难度系数上限+"+immortalAttribute[player.immortalLv+1][4]+"</td>"
            str+="</tr>"
            str+="<tr><td style='text-align:left'>消耗 修为×"+format(immortalAttribute[player.immortalLv][3],0)+"</td>"
            str+="<td style='text-align:left'>成功率"+format(10*(1+player.immortalTimes),0)+"%</td></tr>"
            str+="<tr><td style='text-align:left'><button style='margin-left:0px' onclick='TryUpgradeImmortal()'>飞升</button></td></tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==7){//转生
        str+="<table>"
        let list=["hpmax","atk","def","hit"]
        for(let i=0;i<list.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+attributeToName[list[i]]+"转生 "+player.transmigrationLv[list[i]]+"/"+format(player[list[i]].logBase(2).floor(),0)+"</td>"
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
        str+="<td style='text-align:left;width:200px'>神力 "+player.divineLv+"/"+format(mx,0)+"</td>"
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
            str+="<td style='text-align:left;width:150px'>"+list[i]+"+"+format(player.templeLv[i],0)+"%</td>"
            if(CalcTempleNeed(i)<=1e100){
                str+="<td style='text-align:right'>消耗 琥珀×"+format(CalcTempleNeed(i),0)+"</td>"
                str+="<td style='text-align:right'><button onclick='TempleUpgrade("+i+",0)'>升级</button></td>"
                str+="<td style='text-align:left'><button onclick='TempleUpgrade("+i+",1)' style='margin-left:-10px'>一键升级</button></td>"
            }
            str+="</tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==10){//暗器
        str+="<table>"
        str+="<tr>"
        str+="<td style='text-align:left;'>暗器强化 "+format(player.concealLv,0)+"/200级</td>"
        str+="<td style='text-align:left;'>所有暗器增益+"+format(player.concealLv,0)+"%</td>"
        if(CalcConcealNeed()<1e100){
            str+="<td style='text-align:right;'>消耗 陨铁×"+format(CalcConcealNeed(),0)+"</td>"
            str+="<td style='text-align:right;'><button onclick='ConcealUpgrade(0)'>升级</button></td>"
            str+="<td style='text-align:left;'><button onclick='ConcealUpgrade(1)' style='margin-left:-10px'>一键升级</button></td>"
        }
        str+="</tr>"
        let mul=n(1).add(0.01*player.concealLv)
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
        str+="<table>"
        str+="<tr><td colspan=4 style='text-align:left'>当前翅膀 "+wingAttribute[player.wingLv[0]][0]+"·"+player.wingLv[1]+"级</td></tr>"
        str+="<tr>"
        let list=["生命","攻击","防御","命中"]
        let list1=["伤害穿透","伤害减免"]
        for(let i=0;i<list.length;i++){
            str+="<td style='text-align:left;width:200px'>"+list[i]+"+"+(wingAttribute[player.wingLv[0]][1].add(wingAttribute[player.wingLv[0]][2].mul(player.wingLv[1])))+"%</td>"
        }
        str+="</tr>"
        str+="<tr>"
        for(let i=0;i<list1.length;i++){
            str+="<td style='text-align:left;width:200px'>"+list1[i]+"+"+(wingAttribute[player.wingLv[0]][3])+"</td>"
        }
        str+="</tr>"
        str+="<tr><td>　</td></tr>"
        if(player.wingLv[0]<wingAttribute.length-1 || player.wingLv[1]<10){
            str+="<tr><td colspan=4 style='text-align:left'>下一级 "
            +(player.wingLv[1]==10?wingAttribute[player.wingLv[0]+1][0]+"·0级":wingAttribute[player.wingLv[0]][0]+"·"+(player.wingLv[1]+1)+"级")+"</td></tr>"
            str+="<tr>"
            let a1=player.wingLv[0],a2=player.wingLv[1]
            if(a2<10)a2+=1
            else a1+=1,a2=0
            for(let i=0;i<list.length;i++){
                str+="<td style='text-align:left;width:200px'>"+list[i]+"+"+(wingAttribute[a1][1].add(wingAttribute[a1][2].mul(a2)))+"%</td>"
            }
            str+="</tr>"
            str+="<tr>"
            for(let i=0;i<list1.length;i++){
                str+="<td style='text-align:left;width:200px'>"+list1[i]+"+"+(wingAttribute[a1][3])+"</td>"
            }
            str+="</tr>"
            if(a2!=0){
                str+="<tr><td style='text-align:left'>消耗 羽毛×"+format(wingAttribute[player.wingLv[0]][4],0)+"</td></tr>"
            }
            else{
                str+="<tr><td style='text-align:left'>消耗 经验×"+format(n(wingAttribute[player.wingLv[0]][4]).mul(100000),0)+"</td></tr>"
            }
            str+="<tr><td style='text-align:left'><button style='margin-left:0px' onclick='TryUpgradeWing(0)'>升级</button><button style='margin-left:-8px' onclick='TryUpgradeWing(1)'>一键升级</button></td></tr>"
        }
        str+="</table>"
    }
    else if(player.mainTabId==12){//功法
        str+="<table>"
        for(let i=0;i<bookAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+bookAttribute[i][0]+(player.bookLv[i]>-1?player.bookLv[i]+"级":"")+"</td>"
            let mul=(player.bookLv[i]==-1?0:(player.bookLv[i]*0.1+1))
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
        for(let i=0;i<petAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:200px'>"+(player.petLv[i]==-1?"":petFrontName[Math.min(2,player.petLv[i])])+petAttribute[i][0]+(player.petLv[i]>=2?(player.petLv[i]-2)+"级":"")+"</td>"
            let mul=(player.petLv[i]==-1?0:player.petLv[i]<=2?player.petLv[i]+1:3*(1+0.1*(player.petLv[i]-2)))
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
        str+="<td style='width:300px;text-align:left'>生命+"+player.zonghengLv[0]+"%</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>防御+"+player.zonghengLv[1]+"%</td>"
        str+="</tr>"
        str+="<tr>"
        if(CalcZonghengNeed(0).lt(1e100))
        str+="<td style='width:300px;text-align:left'>消耗 金币×"+format(CalcZonghengNeed(0),0)+"</td>"
        else
        str+="<td style='width:300px;text-align:left'>　</td>"
        str+="<td style='width:20px'></td>"
        if(CalcZonghengNeed(1).lt(1e100))
        str+="<td style='width:300px;text-align:left'>消耗 金币×"+format(CalcZonghengNeed(1),0)+"</td>"
        else
        str+="<td style='width:300px;text-align:left'>　</td>"
        str+="</tr>"
        str+="<tr>"
        if(CalcZonghengNeed(0).lt(1e100))
        str+="<td style='width:300px;text-align:right'><button onclick='ZonghengUpgrade(0,0)'>升级</button><button onclick='ZonghengUpgrade(0,1)' style='margin-left:-8px'>升100级</button></td>"
        else
        str+="<td style='width:300px;text-align:left'>　</td>"
        str+="<td style='width:20px'></td>"
        if(CalcZonghengNeed(1).lt(1e100))
        str+="<td style='width:300px;text-align:right'><button onclick='ZonghengUpgrade(1,0)'>升级</button><button onclick='ZonghengUpgrade(1,1)' style='margin-left:-8px'>升100级</button></td>"
        else
        str+="<td style='width:300px;text-align:left'>　</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>长虹贯日 "+player.zonghengLv[2]+"/"+player.zonghengLv[0]+"级</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>横贯四方 "+player.zonghengLv[3]+"/"+player.zonghengLv[1]+"级</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>攻击+"+format(player.zonghengLv[2]*0.5,1)+"%</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>攻击+"+format(player.zonghengLv[3]*0.5,1)+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td style='width:300px;text-align:left'>伤害穿透+"+player.zonghengLv[2]+"</td>"
        str+="<td style='width:20px'></td>"
        str+="<td style='width:300px;text-align:left'>伤害减免+"+player.zonghengLv[3]+"</td>"
        str+="</tr>"
        str+="<tr>"
        if(CalcZonghengNeed(2).lt(1e100))
        str+="<td style='width:300px;text-align:left'>消耗 金币×"+format(CalcZonghengNeed(2),0)+"</td>"
        else
        str+="<td style='width:300px;text-align:left'>　</td>"
        str+="<td style='width:20px'></td>"
        if(CalcZonghengNeed(3).lt(1e100))
        str+="<td style='width:300px;text-align:left'>消耗 金币×"+format(CalcZonghengNeed(3),0)+"</td>"
        else
        str+="<td style='width:300px;text-align:left'>　</td>"
        str+="</tr>"
        str+="<tr>"
        if(CalcZonghengNeed(2).lt(1e100))
        str+="<td style='width:300px;text-align:right'><button onclick='ZonghengUpgrade(2,0)'>升级</button><button onclick='ZonghengUpgrade(2,1)' style='margin-left:-8px'>升100级</button></td>"
        else
        str+="<td style='width:300px;text-align:left'>　</td>"
        str+="<td style='width:20px'></td>"
        if(CalcZonghengNeed(3).lt(1e100))
        str+="<td style='width:300px;text-align:right'><button onclick='ZonghengUpgrade(3,0)'>升级</button><button onclick='ZonghengUpgrade(3,1)' style='margin-left:-8px'>升100级</button></td>"
        else
        str+="<td style='width:300px;text-align:left'>　</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>合纵连横·合击 "+player.zonghengLv[4]+"/"+Math.min(player.zonghengLv[2],player.zonghengLv[3])+"级</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>伤害穿透+"+format(player.zonghengLv[4]*0.1,1)+"%</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>伤害减免+"+format(player.zonghengLv[4]*0.1,1)+"%</td>"
        str+="</tr>"
        str+="<tr>"
        if(CalcZonghengNeed(4).lt(1e100))
        str+="<td colspan=3 style='text-align:left'>消耗 金币×"+format(CalcZonghengNeed(4),0)+"</td>"
        else
        str+="<td colspan=3>　</td>"
        str+="</tr>"
        str+="<tr>"
        if(CalcZonghengNeed(4).lt(1e100))
        str+="<td colspan=3 style='text-align:right'><button onclick='ZonghengUpgrade(4,0)'>升级</button><button onclick='ZonghengUpgrade(4,1)' style='margin-left:-8px'>升100级</button></td>"
        else
        str+="<td colspan=3>　</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>九龙真诀·合击 "+player.zonghengLv[5]+"/"+player.zonghengLv[4]+"级</td>"
        str+="</tr>"
        str+="<tr>"
        str+="<td colspan=3 style='text-align:left'>命中+"+player.zonghengLv[5]+"%</td>"
        str+="</tr>"
        str+="<tr>"
        if(CalcZonghengNeed(5).lt(1e100))
        str+="<td colspan=3 style='text-align:left'>消耗 金币×"+format(CalcZonghengNeed(5),0)+"</td>"
        else
        str+="<td colspan=3>　</td>"
        str+="</tr>"
        str+="<tr>"
        if(CalcZonghengNeed(5).lt(1e100))
        str+="<td colspan=3 style='text-align:right'><button onclick='ZonghengUpgrade(5,0)'>升级</button><button onclick='ZonghengUpgrade(5,1)' style='margin-left:-8px'>升100级</button></td>"
        else
        str+="<td colspan=3>　</td>"
        str+="</tr>"
        str+="</table>"
    }
    else if(player.mainTabId==15){//魂环
        str+="拥有魂环碎片 "+format(player.bag[24],0)+"<br>"
        str+="拥有魂力 "+format(player.soulPower,0)+"<br><br>"
        str+="<table>"
        for(let i=0;i<soulcircleAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:250px'>"+soulcircleFrontName[Math.min(6,player.soulcircleLv[i])]+soulcircleAttribute[i][0]+(player.soulcircleLv[i]>=6?(player.soulcircleLv[i]-6)+"级":"")+"</td>"
            let mul=Math.min(6,player.soulcircleLv[i])*(1+0.01*Math.max(0,player.soulcircleLv[i]-6))
            str+="<td style='text-align:left;'>"
            for(let id in soulcircleAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(soulcircleAttribute[i][1][id]),1)+" "
            }
            for(let id in soulcircleAttribute[i][2]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(soulcircleAttribute[i][2][id]),1)+"% "
            }
            str+="</td>"
            str+="<td style='width:300px;text-align:right'"
            if(player.soulcircleLv[i]==106)str+=" colspan=2"
            str+=">"
            if(player.soulcircleLv[i]<6){
                str+="消耗 魂环碎片×"+format((player.soulcircleLv[i]+1)*soulcircleAttribute[i][3],0)+"</td><td><button onclick='TryUpgradeSoulcircle("+i+",0)'>升级</button></td>"
            }
            else if(player.soulcircleLv[i]<106){
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
        for(let i=0;i<soulboneAttribute.length;i++){
            str+="<tr>"
            str+="<td style='text-align:left;width:250px'>"+soulboneAttribute[i][0]+(player.soulboneLv[i]>=1?(player.soulboneLv[i]-1)+"级":"")+"</td>"
            let mul=Math.min(1,player.soulboneLv[i])*(1+0.1*Math.max(0,player.soulboneLv[i]-1))
            str+="<td style='text-align:left;'>"
            for(let id in soulboneAttribute[i][1]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(soulboneAttribute[i][1][id]),1)+"% "
            }
            for(let id in soulboneAttribute[i][2]){
                str+=attributeToName[id]+"+"+format(n(mul).mul(soulboneAttribute[i][2][id]),1)+"% "
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
        str+="<td colspan=3 style='text-align:left'>经验×"+format(monster[id].drop.mul(n(1.01).pow(player.inFightDifficulty)).mul(player.expMul),0)+"</td>"
        str+="</tr><tr>"
        str+="<td colspan=3 style='text-align:left'>金币×"+format(monster[id].drop.mul(n(1.01).pow(player.inFightDifficulty)).mul(player.moneyMul),0)+"</td>"
        str+="</tr><tr>"
        str+="<td colspan=3 style='text-align:left'>修为×"+format(n(monster[id].drop.pow(0.5).mul(n(1.01).pow(player.inFightDifficulty))).mul(player.cultivationMul),0)+"</td>"
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
    player.inFightDifficulty=player.nowDifficulty
    player.monsterHp=n(100).mul(num).mul(n(1.05).pow(player.inFightDifficulty))
    player.monsterHpmax=n(100).mul(num).mul(n(1.05).pow(player.inFightDifficulty))
    player.monsterAtk=n(10).mul(num).mul(n(1.05).pow(player.inFightDifficulty))
    player.monsterDef=n(10).mul(num).mul(n(1.05).pow(player.inFightDifficulty))
    player.monsterHit=n(100).add(n(10).mul(n(num).pow(0.8))).mul(n(1.03).pow(player.inFightDifficulty))
    player.monsterDamageAdd=n(100).mul(n(num).pow(0.2)).mul(n(1.01).pow(player.inFightDifficulty))
    player.monsterDamageMinus=n(100).mul(n(num).pow(0.2).sub(1).div(2)).mul(n(1.01).pow(player.inFightDifficulty))
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
        player.hangingTime=Math.floor(player.hangingTime)
        let expgain=monster[player.onMonsterId].drop.mul(player.hangingTime).mul(n(1.01).pow(player.inFightDifficulty)).mul(player.expMul)
        let moneygain=monster[player.onMonsterId].drop.mul(player.hangingTime).mul(n(1.01).pow(player.inFightDifficulty)).mul(player.moneyMul)
        let cultivationgain=n(monster[player.onMonsterId].drop).pow(0.5).mul(player.hangingTime).mul(n(1.01).pow(player.inFightDifficulty)).mul(player.cultivationMul)
        player.exp=player.exp.add(expgain)
        player.money=player.money.add(moneygain)
        player.cultivation=player.cultivation.add(cultivationgain)
        let str="挂机 "+format(player.hangingTime,0)+" 次 , 获得 经验×"+format(expgain,0)+" 金币×"+format(moneygain,0)
        +" 修为×"+format(cultivationgain,0)
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