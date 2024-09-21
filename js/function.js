function AutoUpgrade(){
    let nd=[]
    let count=0
    while(1){
        let i=0
        nd=[]
        for(i=0;i<expNeed.length;i++){
            if(player.lv<expNeed[i][0]){
                nd=expNeed[i]
                break
            }
        }
        if(i==expNeed.length){
            nd=CalcBigExpNeed()
        }
        let cost=nd[1].mul(nd[0]-player.lv)
        if(player.exp.gte(cost)){
            player.exp=player.exp.sub(cost)
            count+=nd[0]-player.lv
            player.lv=nd[0]
        }
        else{
            break
        }
    }
    if(nd.length==0){
        if(count==0){
            logs.push("已达等级上限")
        }
        else{
            logs.push("成功升 "+count+" 级")
        }
    }
    else{
        let up=player.exp.div(nd[1]).floor().toNumber()
        player.lv+=up
        count+=up
        player.exp=player.exp.sub(nd[1].mul(up))
        if(count==0){
            logs.push("经验不够")
        }
        else{
            logs.push("成功升 "+count+" 级")
        }
    }
}
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
    if(wh==0){
        if(player.meridianLv[id][1]==10 && player.money.gte(n(10000).mul(CalcMeridianAttribute(player.meridianLv[id][0])[0]))){
            player.money=player.money.sub(n(10000).mul(CalcMeridianAttribute(player.meridianLv[id][0])[0]))
            player.meridianLv[id][0]+=1
            player.meridianLv[id][1]=0
            logs.push("成功升级 1级经脉")
        }
        else if(player.meridianLv[id][1]<10 && player.bag[3]>=CalcMeridianAttribute(player.meridianLv[id][0])[0]){
            player.bag[3]-=CalcMeridianAttribute(player.meridianLv[id][0])[0]
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
        while(1){
            if(player.meridianLv[id][1]==10 && player.money.gte(n(10000).mul(CalcMeridianAttribute(player.meridianLv[id][0])[0]))){
                player.money=player.money.sub(n(10000).mul(CalcMeridianAttribute(player.meridianLv[id][0])[0]))
                player.meridianLv[id][0]+=1
                player.meridianLv[id][1]=0
                count++
            }
            else if(player.meridianLv[id][1]<10 && player.bag[3]>=CalcMeridianAttribute(player.meridianLv[id][0])[0]){
                player.bag[3]-=CalcMeridianAttribute(player.meridianLv[id][0])[0]
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
function TryUpgradeImmortal(type){
    let attr=(player.immortalLv<immortalAttribute.length?immortalAttribute[player.immortalLv]:CalcImmortalAttribute(player.immortalLv))
    let attr1=(player.immortalLv+1<immortalAttribute.length?immortalAttribute[player.immortalLv+1]:CalcImmortalAttribute(player.immortalLv+1))
    if(player.cultivation.lt(attr[3])){
        logs.push("修为不够")
        return
    }
    if(type==0){
        player.cultivation=player.cultivation.sub(attr[3])
        if(random()<=0.1*(player.immortalTimes+1)){
            player.immortalLv+=1
            player.immortalTimes=0
            logs.push("飞升 "+attr1[0]+" 成功")
        }
        else{
            player.immortalTimes+=1
            logs.push("飞升 "+attr1[0]+" 失败 , 再接再厉")
        }
    }
    else{
        while(player.cultivation.gte(attr[3])){
            player.cultivation=player.cultivation.sub(attr[3])
            if(random()<=0.1*(player.immortalTimes+1)){
                player.immortalLv+=1
                player.immortalTimes=0
                logs.push("飞升 "+attr1[0]+" 成功")
                attr=(player.immortalLv<immortalAttribute.length?immortalAttribute[player.immortalLv]:CalcImmortalAttribute(player.immortalLv))
                attr1=(player.immortalLv+1<immortalAttribute.length?immortalAttribute[player.immortalLv+1]:CalcImmortalAttribute(player.immortalLv+1))
            }
            else{
                player.immortalTimes+=1
                logs.push("飞升 "+attr1[0]+" 失败 , 再接再厉")
            }
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
    if(player.wingLv[1]==10 && player.exp.lt(n(CalcWingAttribute(player.wingLv[0])[4]).mul(100000))){
        logs.push("经验不够")
        return
    }
    if(player.wingLv[1]<10 && player.bag[10]<(n(CalcWingAttribute(player.wingLv[0])[4]))){
        NotEnough(10)
        return
    }
    if(wh==0){
        let str=""
        str+=CalcWingAttribute(player.wingLv[0])[0]+"·"+player.wingLv[1]+"级"
        str+=" 成功升级成 "
        if(player.wingLv[1]==10){
            player.exp=player.exp.sub(n(CalcWingAttribute(player.wingLv[0])[4]).mul(100000))
            player.wingLv[0]+=1
            player.wingLv[1]=0
        }
        else{
            player.bag[10]-=CalcWingAttribute(player.wingLv[0])[4]
            player.wingLv[1]+=1
        }
        str+=CalcWingAttribute(player.wingLv[0])[0]+"·"+player.wingLv[1]+"级"
        logs.push(str)
    }
    else{
        let str=""
        str+=CalcWingAttribute(player.wingLv[0])[0]+"·"+player.wingLv[1]+"级"
        str+=" 成功升级成 "
        while(1){
            if(player.wingLv[1]==10 && player.exp.gte(n(CalcWingAttribute(player.wingLv[0])[4]).mul(100000))){
                player.exp=player.exp.sub(n(CalcWingAttribute(player.wingLv[0])[4]).mul(100000))
                player.wingLv[0]+=1
                player.wingLv[1]=0
            }
            else if(player.wingLv[1]<10 && player.bag[10]>=(n(CalcWingAttribute(player.wingLv[0])[4]))){
                player.bag[10]-=CalcWingAttribute(player.wingLv[0])[4]
                player.wingLv[1]+=1
            }
            else{
                break
            }
        }
        str+=CalcWingAttribute(player.wingLv[0])[0]+"·"+player.wingLv[1]+"级"
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
    if(player.soulcircleLv[id]==10006){
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
            while(player.soulPower.gte((player.soulcircleLv[id]-5)*2*soulcircleAttribute[id][3]) && player.soulcircleLv[id]<10006){
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
function TryUpgradePartner(id,wh){
    if(player.partnerLv[id]>=100){
        return
    }
    if(wh==0){
        if(player.bag[56]>=partnerAttribute[id][2]){
            player.bag[56]-=partnerAttribute[id][2]
            player.partnerLv[id]+=1
            logs.push("成功宠幸 "+partnerAttribute[id][0]+" 1次")
        }
        else{
            NotEnough(56)
        }
    }
    else{
        let count=0
        while(player.bag[56]>=partnerAttribute[id][2] && player.partnerLv[id]<100){
            player.bag[56]-=partnerAttribute[id][2]
            player.partnerLv[id]+=1
            count+=1
        }
        if(count==0){
            NotEnough(56)
        }
        else{
            logs.push("成功宠幸 "+partnerAttribute[id][0]+" "+count+"次")
        }
    }
}
function TryGivePartner(id,wh){
    if(player.partnerLv[id]==199){
        return
    }
    if(wh==0){
        if(player.money.gte(partnerAttribute[id][3])){
            player.money=player.money.sub(partnerAttribute[id][3])
            player.partnerLv[id]+=1
            logs.push("成功赏赐 "+partnerAttribute[id][0]+" 1次")
        }
        else{
            logs.push("金币不够")
        }
    }
    else{
        let count=0
        while(player.money.gte(partnerAttribute[id][3]) && player.partnerLv[id]<199){
            player.money=player.money.sub(partnerAttribute[id][3])
            player.partnerLv[id]+=1
            count+=1
        }
        if(count==0){
            logs.push("金币不够")
        }
        else{
            logs.push("成功赏赐 "+partnerAttribute[id][0]+" "+count+"次")
        }
    }
}
function TryActiveHero(id){
    if(player.heroLv[id]==1){
        return
    }
    if(player.bag[heroAttribute[id][3]]>=heroAttribute[id][4]){
        player.bag[heroAttribute[id][3]]-=heroAttribute[id][4]
        player.heroLv[id]+=1
        logs.push("成功激活 英雄-"+heroAttribute[id][0])
    }
    else{
        NotEnough(heroAttribute[id][3])
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
function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    return crypto.subtle.digest("SHA-256", msgBuffer)
      .then(hashBuffer => {
        return Array.prototype.map.call(
          new Uint8Array(hashBuffer),
          x => (`00${x.toString(16)}`).slice(-2)
        ).join('');
      });
}
const monthCardList=[
    "d132043a3d2fdc0907b66263b79eb0e7dd3305be7b8888e6a9d87ba7f42949d5",
    "4d9430730f1089aaf48980e93a25115d49c8b3c7765bd5ef52ab704b10246122",
    "7955bcc921625d37f646363a34d2a2120e1386aee60588bcad3d0a8a7cd49d7b",
    "811bd1b974923857e43ab723fef191ac025d6595535d94a3d1c7cb8b30d68757",
    "50ea654b35849512a07f23401f283beee045bb7ab41ce29244235e342b25fc63",
    "e3cd2bfcce7e583dfb596ef1b8bf48c9f905d0a9833a5c64661b74c0953bd185"
]
function DealExchangeCode(){
    sha256(document.getElementById("exchangeCode").value).then(hash=>{
        if(hash=="b15ae4e2ced7c192fe4acb5783fa57d336b963253950a8b7d2ff180876f4cc70"){//x2
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("兑换码 - 小小支持一下 已成功激活")
            }
        }
        else if(hash=="e5087192b1d924ad4fe535688e00b9d1d5ef4f0db60174dbaa070cc62c229875"){//x2.5
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("兑换码 - 大力支持 已成功激活")
            }
        }
        else if(hash=="69d86d4352e601f6db8580ad5224b12d4910115c015e03d07fd0311df94bef1b"){//x3
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("兑换码 - 超级大力支持 已成功激活")
            }
        }
        else if(hash=="61d76ba854558116517c822fefa55ba9b42d0e50e46d852e63589b78d6809c33"){//x4
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("兑换码 - 巨力支持 已成功激活")
            }
        }
        else if(hash=="98d4c0c71f6671b4426c7fc604f63d97926587be5908153e95619fc971a70a5c"){//x5
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("兑换码 - 超级巨力支持 已成功激活")
            }
        }
        else if(hash=="1632b66a0c5a7ebf4ddf43636001472922536b0a6db6215cd7c117bd54c512fc"){//x5
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("兑换码 - 钻石支持 已成功激活")
            }
        }
        else if(hash=="d91d4221eaf4856528d3768c01dea80b3ce73922a276407c5e82ee5728ad9d6c"){//x6
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("兑换码 - 冠名支持 已成功激活")
            }
        }
        else if(monthCardList.includes(hash)){
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                player.monthCardTime+=3600*720
                logs.push("小月卡时间增加 720小时")
            }
        }
        else{
            logs.push("兑换码 无效")
        }
    })
}