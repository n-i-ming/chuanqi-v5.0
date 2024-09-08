function TryMakePellet(id,wh){
    let count=Math.min(100-player.pelletNum[id][wh],Math.min(player.money.div(pelletAttribute[id][7]).floor(),player.bag[pelletAttribute[id][6]]))
    player.bag[pelletAttribute[id][6]]-=count
    player.money=player.money.sub(pelletAttribute[id][7].mul(count))
    player.pelletNum[id][wh]+=count
    if(count==0){
        if(player.bag[pelletAttribute[id][6]]==0){
            NotEnough(pelletAttribute[id][6])
        }
        else{
            logs.push("金币不够")
        }
    }
    else{
        logs.push("成功炼制 "+(id+1)+"品"+["生命","攻击","防御"][wh]+"丹药×"+count)
    }
}
function TryBuildWeapon(id){
    if(player.weaponType[id]==4){
        return
    }
    if(player.bag[weaponAttribute[id][3]]<(player.weaponType[id]+1)*weaponAttribute[id][4]){
        NotEnough(weaponAttribute[id][3])
    }
    else{
        player.weaponType[id]+=1
        player.bag[weaponAttribute[id][3]]-=player.weaponType[id]*weaponAttribute[id][4]
        logs.push(weaponFrontName[player.weaponType[id]-1]+weaponAttribute[id][0]
            +" 成功炼制成 "+weaponFrontName[player.weaponType[id]]+weaponAttribute[id][0])
    }
}
function NotEnough(id){
    logs.push("材料不够 ("+idToName[id]+" 出自 "+idFrom[id]+")")
}
function TryUpgradeMeridian(id,wh){
    if(player.meridianLv[id][0]==meridianAttribute.length-1){
        return
    }
    if(wh==0){
        if(player.meridianLv[id][1]==10 && player.money.gte(n(10000).mul(meridianAttribute[player.meridianLv[id][0]][0]))){
            player.money=player.money.sub(n(10000).mul(meridianAttribute[player.meridianLv[id][0]][0]))
            player.meridianLv[id][0]+=1
            player.meridianLv[id][1]=0
            logs.push("成功升级 1级经脉")
        }
        else if(player.meridianLv[id][1]<10 && player.bag[3]>=meridianAttribute[player.meridianLv[id][0]][0]){
            player.bag[3]-=meridianAttribute[player.meridianLv[id][0]][0]
            player.meridianLv[id][1]+=1
            logs.push("成功升级 1级经脉")
        }
        else{
            if(player.meridianLv[id][1]==10){
                logs.push("金币不够")
            }
            else{
                NotEnough(3)
            }
        }
    }
    else{
        let count=0
        while(player.meridianLv[id][0]<meridianAttribute.length-1){
            if(player.meridianLv[id][1]==10 && player.money.gte(n(10000).mul(meridianAttribute[player.meridianLv[id][0]][0]))){
                player.money=player.money.sub(n(10000).mul(meridianAttribute[player.meridianLv[id][0]][0]))
                player.meridianLv[id][0]+=1
                player.meridianLv[id][1]=0
                count++
            }
            else if(player.meridianLv[id][1]<10 && player.bag[3]>=meridianAttribute[player.meridianLv[id][0]][0]){
                player.bag[3]-=meridianAttribute[player.meridianLv[id][0]][0]
                player.meridianLv[id][1]+=1
                count++
            }
            else{
                if(count==0){
                    if(player.meridianLv[id][1]==10){
                        logs.push("金币不够")
                    }
                    else{
                        NotEnough(3)
                    }
                }
                else{
                    logs.push("成功升级 "+count+"级经脉")
                }
                break
            }
        }
    }
}
function TryUpgradeImmortal(){
    if(player.cultivation.lt(immortalAttribute[player.immortalLv][3])){
        logs.push("修为不够")
    }
    else{
        player.cultivation=player.cultivation.sub(immortalAttribute[player.immortalLv][3])
        if(random()<=0.1*(player.immortalTimes+1)){
            player.immortalLv+=1
            player.immortalTimes=0
            logs.push("飞升 "+immortalAttribute[player.immortalLv][0]+" 成功")
        }
        else{
            player.immortalTimes+=1
            logs.push("飞升 "+immortalAttribute[player.immortalLv+1][0]+" 失败 , 再接再厉")
        }
    }
}
function TryBuildConceal(id){
    if(player.concealType[id]==3){
        return
    }
    if(n(player.bag[8]).lt(n(2).pow(player.concealType[id]).mul(concealAttribute[id][3]))){
        NotEnough(8)
    }
    else if(player.money.lt(n(2).pow(player.concealType[id]).mul(concealAttribute[id][3]).mul(50000))){
        logs.push("金币不够")
    }
    else{
        player.bag[8]-=n(2).pow(player.concealType[id]).mul(concealAttribute[id][3]).toNumber()
        player.money=player.money.sub(n(2).pow(player.concealType[id]).mul(concealAttribute[id][3]).mul(50000))
        player.concealType[id]+=1
        logs.push(concealFrontName[player.concealType[id]-1]+concealAttribute[id][0]
            +" 成功炼制成 "+concealFrontName[player.concealType[id]]+concealAttribute[id][0])
    }
}
function TryUpgradeWing(wh){
    if(player.wingLv[0]==wingAttribute.length-1 && player.wingLv[1]==10){
        return
    }
    if(player.wingLv[1]==10 && player.exp.lt(n(wingAttribute[player.wingLv[0]][4]).mul(100000))){
        logs.push("经验不够")
        return
    }
    if(player.wingLv[1]<10 && player.bag[10]<(n(wingAttribute[player.wingLv[0]][4]))){
        NotEnough(10)
        return
    }
    if(wh==0){
        let str=""
        str+=wingAttribute[player.wingLv[0]][0]+"·"+player.wingLv[1]+"级"
        str+=" 成功升级成 "
        if(player.wingLv[1]==10){
            player.exp=player.exp.sub(n(wingAttribute[player.wingLv[0]][4]).mul(100000))
            player.wingLv[0]+=1
            player.wingLv[1]=0
        }
        else{
            player.bag[10]-=wingAttribute[player.wingLv[0]][4]
            player.wingLv[1]+=1
        }
        str+=wingAttribute[player.wingLv[0]][0]+"·"+player.wingLv[1]+"级"
        logs.push(str)
    }
    else{
        let str=""
        str+=wingAttribute[player.wingLv[0]][0]+"·"+player.wingLv[1]+"级"
        str+=" 成功升级成 "
        while(player.wingLv[0]<wingAttribute.length-1 || player.wingLv[1]<10){
            if(player.wingLv[1]==10 && player.exp.gte(n(wingAttribute[player.wingLv[0]][4]).mul(100000))){
                player.exp=player.exp.sub(n(wingAttribute[player.wingLv[0]][4]).mul(100000))
                player.wingLv[0]+=1
                player.wingLv[1]=0
            }
            else if(player.wingLv[1]<10 && player.bag[10]>=(n(wingAttribute[player.wingLv[0]][4]))){
                player.bag[10]-=wingAttribute[player.wingLv[0]][4]
                player.wingLv[1]+=1
            }
            else{
                break
            }
        }
        str+=wingAttribute[player.wingLv[0]][0]+"·"+player.wingLv[1]+"级"
        logs.push(str)
    }
}
function TryUpgradeBook(id,wh){
    if(player.bookLv[id]==90){
        return
    }
    if(player.bookLv[id]==-1){
        if(player.bag[bookAttribute[id][4]]<10){
            NotEnough(bookAttribute[id][4])
        }
        else{
            player.bag[bookAttribute[id][4]]-=10
            player.bookLv[id]+=1
            logs.push("成功合成 "+bookAttribute[id][0])
        }
    }
    else{
        if(wh==0){
            if(player.exp.gte(bookAttribute[id][3])){
                player.exp=player.exp.sub(bookAttribute[id][3])
                player.bookLv[id]+=1
                logs.push("成功升级 "+bookAttribute[id][0]+" 1级")
            }
            else{
                logs.push("经验不够")
            }
        }
        else{
            let count=0
            while(player.exp.gte(bookAttribute[id][3]) && player.bookLv[id]<90){
                player.exp=player.exp.sub(bookAttribute[id][3])
                player.bookLv[id]+=1
                count+=1
            }
            if(count==0){
                logs.push("经验不够")
            }
            else{
                logs.push("成功升级 "+bookAttribute[id][0]+" "+count+"级")
            }
        }
    }
}
function TryUpgradePet(id,wh){
    if(player.petLv[id]==22){
        return
    }
    if(player.petLv[id]==-1){
        if(player.bag[petAttribute[id][5]]<1){
            NotEnough(petAttribute[id][5])
        }
        else{
            player.bag[petAttribute[id][5]]-=1
            player.petLv[id]+=1
            logs.push("成功孵化 "+petFrontName[0]+petAttribute[id][0])
        }
    }
    else if(player.petLv[id]<2){
        if(player.bag[17]<petAttribute[id][3]*(player.petLv[id]+1)){
            NotEnough(17)
        }
        else{
            player.bag[17]-=petAttribute[id][3]*(player.petLv[id]+1)
            if(random()<=0.01*(1+player.petTimes[id])){
                player.petLv[id]+=1
                player.petTimes[id]=0
                logs.push(petFrontName[player.petLv[id]-1]+petAttribute[id][0]+" 成功进化为 "+petFrontName[player.petLv[id]]+petAttribute[id][0])
            }
            else{
                player.petTimes[id]+=1
                logs.push(petFrontName[player.petLv[id]]+petAttribute[id][0]+" 进化失败")
            }
        }
    }
    else{
        if(wh==0){
            if(player.money.gte(petAttribute[id][4])){
                player.money=player.money.sub(petAttribute[id][4])
                player.petLv[id]+=1
                logs.push("成功升级 "+petAttribute[id][0]+" 1级")
            }
            else{
                logs.push("金币不够")
            }
        }
        else{
            let count=0
            while(player.money.gte(petAttribute[id][4]) && player.petLv[id]<22){
                player.money=player.money.sub(petAttribute[id][4])
                player.petLv[id]+=1
                count+=1
            }
            if(count==0){
                logs.push("金币不够")
            }
            else{
                logs.push("成功升级 "+petAttribute[id][0]+" "+count+"级")
            }
        }
    }
}
function TryUpgradeSoulcircle(id,wh){
    if(player.soulcircleLv[id]==106){
        return
    }
    if(player.soulcircleLv[id]<6){
        if(player.bag[24]<(player.soulcircleLv[id]+1)*soulcircleAttribute[id][3]){
            NotEnough(24)
        }
        else{
            player.bag[24]-=(player.soulcircleLv[id]+1)*soulcircleAttribute[id][3]
            player.soulcircleLv[id]+=1
            logs.push(soulcircleFrontName[player.soulcircleLv[id]-1]+soulcircleAttribute[id][0]
                +" 成功升级为 "+soulcircleFrontName[player.soulcircleLv[id]]+soulcircleAttribute[id][0])
        }
    }
    else{
        if(wh==0){
            if(player.soulPower.gte((player.soulcircleLv[id]-5)*2*soulcircleAttribute[id][3])){
                player.soulPower=player.soulPower.sub((player.soulcircleLv[id]-5)*2*soulcircleAttribute[id][3])
                player.soulcircleLv[id]+=1
                logs.push("成功升级 "+soulcircleAttribute[id][0]+" 1级")
            }
            else{
                logs.push("魂力不够")
            }
        }
        else{
            let count=0
            while(player.soulPower.gte((player.soulcircleLv[id]-5)*2*soulcircleAttribute[id][3]) && player.soulcircleLv[id]<106){
                player.soulPower=player.soulPower.sub((player.soulcircleLv[id]-5)*2*soulcircleAttribute[id][3])
                player.soulcircleLv[id]+=1
                count+=1
            }
            if(count==0){
                logs.push("魂力不够")
            }
            else{
                logs.push("成功升级 "+soulcircleAttribute[id][0]+" "+count+"级")
            }
        }
    }
}
function TryUpgradeSoulbone(id,wh){
    if(player.soulboneLv[id]==11){
        return
    }
    if(player.soulboneLv[id]<1){
        if(player.bag[25]<soulboneAttribute[id][3]){
            NotEnough(25)
        }
        else{
            player.bag[25]-=soulboneAttribute[id][3]
            player.soulboneLv[id]+=1
            logs.push("成功升级 "+soulboneAttribute[id][0]+" 1级")
        }
    }
    else{
        if(wh==0){
            if(player.bag[25]>=soulboneAttribute[id][3]/5){
                player.bag[25]-=soulboneAttribute[id][3]/5
                player.soulboneLv[id]+=1
                logs.push("成功升级 "+soulboneAttribute[id][0]+" 1级")
            }
            else{
                NotEnough(25)
            }
        }
        else{
            let count=0
            while(player.bag[25]>=soulboneAttribute[id][3]/5 && player.soulboneLv[id]<11){
                player.bag[25]-=soulboneAttribute[id][3]/5
                player.soulboneLv[id]+=1
                count+=1
            }
            if(count==0){
                NotEnough(25)
            }
            else{
                logs.push("成功升级 "+soulboneAttribute[id][0]+" "+count+"级")
            }
        }
    }
}
function TryEat(id){
    player.eatPoint+=player.bag[bagDisplayList[id]]*eatPointList[id]
    logs.push("成功吞噬 "+idToName[bagDisplayList[id]]+"×"+format(player.bag[bagDisplayList[id]],0)+
    " 获得 "+format(player.bag[bagDisplayList[id]]*eatPointList[id],0)+"吞噬点")
    player.bag[bagDisplayList[id]]=0
}
function TryUpgradeSkill(id,wh){
    if(player.skillLv[id]==10){
        return
    }
    if(wh==0){
        if(player.bag[36]>=skillAttribute[id][3]){
            player.bag[36]-=skillAttribute[id][3]
            player.skillLv[id]+=1
            logs.push("成功升级 "+skillAttribute[id][0]+" 1级")
        }
        else{
            NotEnough(36)
        }
    }
    else{
        let count=0
        while(player.bag[36]>=skillAttribute[id][3] && player.skillLv[id]<10){
            player.bag[36]-=skillAttribute[id][3]
            player.skillLv[id]+=1
            count+=1
        }
        if(count==0){
            NotEnough(36)
        }
        else{
            logs.push("成功升级 "+skillAttribute[id][0]+" "+count+"级")
        }
    }
}
function TryUpgradeInfinity(id,wh){
    if(player.infinityLv[id]==100){
        return
    }
    if(wh==0){
        if(player.bag[40]>=infinityAttribute[id][3] && player.money.gte(infinityAttribute[id][4].mul(n(1.1).pow(player.infinityLv[id])))){
            player.bag[40]-=infinityAttribute[id][3]
            player.money=player.money.sub(infinityAttribute[id][4].mul(n(1.1).pow(player.infinityLv[id])))
            player.infinityLv[id]+=1
            logs.push("成功升阶 "+infinityAttribute[id][0]+" 1阶")
        }
        else{
            if(player.bag[40]<infinityAttribute[id][3]){
                NotEnough(40)
            }
            else{
                logs.push("金币不够")
            }
        }
    }
    else{
        let count=0
        while(player.bag[40]>=infinityAttribute[id][3] && player.money.gte(infinityAttribute[id][4].mul(n(1.1).pow(player.infinityLv[id]))) && player.infinityLv[id]<100){
            player.bag[40]-=infinityAttribute[id][3]
            player.money=player.money.sub(infinityAttribute[id][4].mul(n(1.1).pow(player.infinityLv[id])))
            player.infinityLv[id]+=1
            count+=1
        }
        if(count==0){
            if(player.bag[40]<infinityAttribute[id][3]){
                NotEnough(40)
            }
            else{
                logs.push("金币不够")
            }
        }
        else{
            logs.push("成功升阶 "+infinityAttribute[id][0]+" "+count+"阶")
        }
    }
}
function TryBuildSeparation(){
    if(player.lv<(player.separationLv+1)*1e5){
        logs.push("等级不够")
    }
    else if(player.money.lt(n(1e10).mul(n(1e5).pow(player.separationLv)))){
        logs.push("金币不够")
    }
    else{
        player.money=player.money.sub(n(1e10).mul(n(1e5).pow(player.separationLv)))
        player.separationLv+=1
        logs.push("成功凝聚 1尊分身")
    }
}
function validateNumber(event) {
    var input = event.target;
    if(input.value.length==0){
        input.value='0'
        return
    }
    if (input.value % 1 !== 0 || input.value <= 0) {
      // 输入值不是整数或者小于等于0，则设置为上一个有效值
      input.value = input.oldValue;
    } else {
      // 有效值更新
      input.oldValue = input.value;
    }
}