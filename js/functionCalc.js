function CalcAttribute(){
    let list=["hpmax","atk","def","hit"]
    player.hpmax=n(100).mul(player.lv).mul(n(player.eatPoint).add(1).pow(0.25))
    player.atk=n(10).mul(player.lv).mul(n(player.eatPoint).add(1).pow(0.25))
    player.def=n(10).mul(player.lv).mul(n(player.eatPoint).add(1).pow(0.25))
    player.hit=n(100).add(n(5).mul(player.lv).mul(n(player.eatPoint).add(1).pow(0.25)))
    player.criticalDamage=n(200)
    player.damageAdd=n(100)
    player.damageMinus=n(0)
    player.maxDifficulty=immortalAttribute[player.immortalLv][4]

    {//add
    for(let i=0;i<pelletAttribute.length;i++){
        player.hpmax=player.hpmax.add(pelletAttribute[i][0].mul(player.pelletNum[i][0]))
        player.atk=player.atk.add(pelletAttribute[i][1].mul(player.pelletNum[i][1]))
        player.def=player.def.add(pelletAttribute[i][2].mul(player.pelletNum[i][2]))
    }
    for(let i=0;i<weaponAttribute.length;i++){
        for(let id in weaponAttribute[i][1]){
            player[id]=player[id].add(weaponAttribute[i][1][id]*player.weaponType[i])
        }
    }
    player.damageAdd=player.damageAdd.add(n(10).mul(player.meridianLv[0][0]))
    player.damageMinus=player.damageMinus.add(n(10).mul(player.meridianLv[1][0]))
    for(let id in immortalAttribute[player.immortalLv][2]){
        player[id]=player[id].add(immortalAttribute[player.immortalLv][2][id])
    }
    for(let i=0;i<concealAttribute.length;i++){
        let mul=n(1).add(0.01*player.concealLv)
        if(player.concealType[i]>0)
        for(let id in concealAttribute[i][1]){
            player[id]=player[id].add(n(concealAttribute[i][1][id]).mul(n(2).pow(player.concealType[i]-1)).mul(mul))
        }
    }
    player.damageAdd=player.damageAdd.add(wingAttribute[player.wingLv[0]][4])
    player.damageMinus=player.damageMinus.add(wingAttribute[player.wingLv[0]][4])
    for(let i=0;i<bookAttribute.length;i++){
        let mul=(player.bookLv[i]==-1?0:(player.bookLv[i]*0.1+1))
        for(let id in bookAttribute[i][1]){
            player[id]=player[id].add(n(bookAttribute[i][1][id]).mul(mul))
        }
    }
    for(let i=0;i<petAttribute.length;i++){
        let mul=(player.petLv[i]==-1?0:player.petLv[i]<=2?player.petLv[i]+1:3*(1+0.1*(player.petLv[i]-2)))
        mul*=(1+0.01*player.petUpgradeLv)
        for(let id in petAttribute[i][1]){
            player[id]=player[id].add(n(petAttribute[i][1][id]).mul(mul))
        }
    }
    player.damageAdd=player.damageAdd.add(player.zonghengLv[2])
    player.damageMinus=player.damageMinus.add(player.zonghengLv[3])
    for(let i=0;i<soulcircleAttribute.length;i++){
        let mul=Math.min(6,player.soulcircleLv[i])*(1+0.01*Math.max(0,player.soulcircleLv[i]-6))*(1+0.01*player.soulcircleUpgradeLv)
        for(let id in soulcircleAttribute[i][1]){
            player[id]=player[id].add(n(soulcircleAttribute[i][1][id]).mul(mul))
        }
    }
    for(let i=0;i<skillAttribute.length;i++){
        let mul=player.skillLv[i]*(1+0.01*player.skillUpgradeLv)
        for(let id in skillAttribute[i][1]){
            player[id]=player[id].add(n(skillAttribute[i][1][id]).mul(mul))
        }
    }
    for(let i=0;i<infinityAttribute.length;i++){
        for(let id in infinityAttribute[i][1]){
            player[id]=player[id].add(player.infinityLv[i]==0?0:n(infinityAttribute[i][1][id]).div(100).add(1).pow(player.infinityLv[i]).sub(1).mul(100))
        }
    }
}
    {//mul
    for(let i=0;i<pelletAttribute.length;i++){
        player.hpmax=player.hpmax.mul(1+pelletAttribute[i][3]*player.pelletNum[i][0])
        player.atk=player.atk.mul(1+pelletAttribute[i][4]*player.pelletNum[i][1])
        player.def=player.def.mul(1+pelletAttribute[i][5]*player.pelletNum[i][2])
    }
    for(let i=0;i<weaponAttribute.length;i++){
        for(let id in weaponAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(n(weaponAttribute[i][2][id]*player.weaponType[i]).div(100)))
        }
    }
    for(let i=0;i<list.length;i++){
        player[list[i]]=player[list[i]].mul(n(1).add(n(0.01).mul(n(player.spiritLv[i]).mul(n(1.1).pow(CalcSpiritStage(i))))))
    }
    player.atk=player.atk.mul(n(1).add(n(meridianAttribute[player.meridianLv[0][0]][1]+meridianAttribute[player.meridianLv[0][0]][2]*Math.ceil(player.meridianLv[0][1]/2)).div(100)))
    player.hit=player.hit.mul(n(1).add(n(meridianAttribute[player.meridianLv[0][0]][1]+meridianAttribute[player.meridianLv[0][0]][2]*Math.floor(player.meridianLv[0][1]/2)).div(100)))
    player.hpmax=player.hpmax.mul(n(1).add(n(meridianAttribute[player.meridianLv[1][0]][1]+meridianAttribute[player.meridianLv[1][0]][2]*Math.ceil(player.meridianLv[1][1]/2)).div(100)))
    player.def=player.def.mul(n(1).add(n(meridianAttribute[player.meridianLv[1][0]][1]+meridianAttribute[player.meridianLv[1][0]][2]*Math.floor(player.meridianLv[1][1]/2)).div(100)))
    for(let id in immortalAttribute[player.immortalLv][1]){
        player[id]=player[id].mul(n(1).add(n(immortalAttribute[player.immortalLv][1][id]).div(100)))
    }
    for(let id in player.transmigrationLv){
        player[id]=player[id].mul(n(1.01).pow(player.transmigrationLv[id]))
    }
    player.damageAdd=player.damageAdd.mul(n(1.005).pow(player.divineLv))
    player.damageMinus=player.damageMinus.mul(n(1.005).pow(player.divineLv))
    for(let i=0;i<concealAttribute.length;i++){
        let mul=n(1).add(0.01*player.concealLv)
        if(player.concealType[i]>0)
        for(let id in concealAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(n(concealAttribute[i][2][id]).mul(n(2).pow(player.concealType[i]-1)).div(100).mul(mul)))
        }
    }
    for(let i=0;i<list.length;i++){
        player[list[i]]=player[list[i]].mul(n(1).add(wingAttribute[player.wingLv[0]][1].add(wingAttribute[player.wingLv[0]][2].mul(player.wingLv[1])).div(100)))
    }
    for(let i=0;i<bookAttribute.length;i++){
        let mul=(player.bookLv[i]==-1?0:(player.bookLv[i]*0.1+1))
        for(let id in bookAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(n(bookAttribute[i][2][id]).mul(mul).div(100)))
        }
    }
    for(let i=0;i<petAttribute.length;i++){
        let mul=(player.petLv[i]==-1?0:player.petLv[i]<=2?player.petLv[i]+1:3*(1+0.1*(player.petLv[i]-2)))
        mul*=(1+0.01*player.petUpgradeLv)
        for(let id in petAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(n(petAttribute[i][2][id]).mul(mul).div(100)))
        }
    }
    player.hpmax=player.hpmax.mul(n(1).add(n(player.zonghengLv[0]).div(100)))
    player.def=player.def.mul(n(1).add(n(player.zonghengLv[1]).div(100)))
    player.atk=player.atk.mul(n(1).add(n(player.zonghengLv[2]).div(200)))
    player.atk=player.atk.mul(n(1).add(n(player.zonghengLv[3]).div(200)))
    player.damageAdd=player.damageAdd.mul(n(1).add(n(player.zonghengLv[4]).div(1000)))
    player.damageMinus=player.damageMinus.mul(n(1).add(n(player.zonghengLv[4]).div(1000)))
    player.hit=player.hit.mul(n(1).add(n(player.zonghengLv[5]).div(100)))
    for(let i=0;i<soulcircleAttribute.length;i++){
        let mul=Math.min(6,player.soulcircleLv[i])*(1+0.01*Math.max(0,player.soulcircleLv[i]-6))*(1+0.01*player.soulcircleUpgradeLv)
        for(let id in soulcircleAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(n(soulcircleAttribute[i][2][id]).mul(mul).div(100)))
        }
    }
    for(let i=0;i<soulboneAttribute.length;i++){
        let mul=Math.min(1,player.soulboneLv[i])*(1+0.1*Math.max(0,player.soulboneLv[i]-1))
        for(let id in soulboneAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(n(soulboneAttribute[i][2][id]).mul(mul).div(100)))
        }
    }
    for(let i=0;i<skillAttribute.length;i++){
        let mul=player.skillLv[i]*(1+0.01*player.skillUpgradeLv)
        for(let id in skillAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(n(skillAttribute[i][2][id]).mul(mul).div(100)))
        }
    }
    for(let i=0;i<infinityAttribute.length;i++){
        for(let id in infinityAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(player.infinityLv[i]==0?0:n(infinityAttribute[i][2][id]).div(100).add(1).pow(player.infinityLv[i]).sub(1)))
        }
    }
}
    player.fightAbility=n(1).mul(player.hpmax).mul(player.atk).mul(player.def).mul(player.hit).mul(player.criticalDamage).mul(player.damageAdd.add(100)).mul(player.damageMinus.add(100))

    player.expMul=n(1)
    player.moneyMul=n(1)
    player.cultivationMul=n(1)
    player.expMul=player.expMul.mul(n(1).add(n(player.templeLv[0]).add(100).mul(n(1.05).pow(Math.floor(player.templeLv[0]/100))).sub(100).div(100)))
    player.moneyMul=player.moneyMul.mul(n(1).add(n(player.templeLv[1]).add(100).mul(n(1.05).pow(Math.floor(player.templeLv[1]/100))).sub(100).div(100)))
    player.cultivationMul=player.cultivationMul.mul(n(player.templeLv[2]).add(100).mul(n(1.05).pow(Math.floor(player.templeLv[2]/100))).sub(100).div(100))
    for(let i=0;i<soulboneAttribute.length;i++){
        let mul=Math.min(1,player.soulboneLv[i])*(1+0.1*Math.max(0,player.soulboneLv[i]-1))
        for(let id in soulboneAttribute[i][1]){
            player[id+"Mul"]=player[id+"Mul"].mul(n(1).add(n(soulboneAttribute[i][1][id]).mul(mul).div(100)))
        }
    }

    player.zoneHpmax=n(player.transmigrationLv.hpmax).mul(5)
    player.zoneAtk=n(player.transmigrationLv.atk)
    player.zoneDef=n(player.transmigrationLv.def)
    player.zoneHit=n(player.transmigrationLv.hit)

    player.hangingSpeed=1
    player.hangingSpeed+=1.21488
    player.hangingSpeed*=player.separationLv*0.5+1
    if(player.exchangeCodeList.includes("b15ae4e2ced7c192fe4acb5783fa57d336b963253950a8b7d2ff180876f4cc70")){
        player.hangingSpeed*=2
    }
    if(player.exchangeCodeList.includes("e5087192b1d924ad4fe535688e00b9d1d5ef4f0db60174dbaa070cc62c229875")){
        player.hangingSpeed*=2.5
    }
    if(player.exchangeCodeList.includes("69d86d4352e601f6db8580ad5224b12d4910115c015e03d07fd0311df94bef1b")){
        player.hangingSpeed*=3
    }
}
const expNeed=[
    [100,n(10)],[200,n(100)],[500,n(500)],[1000,n(1000)],[1500,n(2000)],[2000,n(3000)],[3000,n(5000)],[4000,n(7000)],[5000,n(10000)],
    [6000,n(15000)],[7000,n(20000)],[10000,n(50000)],[15000,n(100000)],[20000,n(200000)],[25000,n(350000)],[30000,n(500000)],[35000,n(750000)],[40000,n(1e6)],
    [45000,n(1.5e6)],[50000,n(2e6)],[55000,n(3e6)],[60000,n(5e6)],[70000,n(1e7)],[80000,n(2e7)],[90000,n(3e7)],[100000,n(5e7)],[110000,n(7e7)],[120000,n(1e8)],
    [130000,n(1.5e8)],[140000,n(2e8)],[150000,n(3e8)],[160000,n(5e8)],[170000,n(1e9)],[180000,n(2e9)],[190000,n(3e9)],[200000,n(5e9)],
    [2.1e5,n(7e9)],[2.2e5,n(1e10)],[2.3e5,n(1.2e10)],[2.4e5,n(1.5e10)],[2.5e5,n(2e10)],[2.6e5,n(2.5e10)],[2.7e5,n(3e10)],
    [2.8e5,n(4e10)],[2.9e5,n(5e10)],[3e5,n(6.5e10)],[3.1e5,n(8e10)],
    [3.2e5,n(1e11)],[3.3e5,n(1.2e11)],[3.4e5,n(1.5e11)],[3.5e5,n(2e11)],[3.6e5,n(2.5e11)],[3.7e5,n(3e11)],[3.8e5,n(4e11)],[3.9e5,n(5e11)],[4e5,n(6.5e11)],[4.1e5,n(8e11)],
    [4.2e5,n(1e12)],[4.3e5,n(1.2e12)],[4.4e5,n(1.5e12)],[4.5e5,n(2e12)],[4.6e5,n(2.5e12)],[4.7e5,n(3e12)],[4.8e5,n(4e12)],[4.9e5,n(5e12)],[5e5,n(6.5e12)],[5.1e5,n(8e12)],
    [5.2e5,n(1e13)],[5.3e5,n(1.2e13)],[5.4e5,n(1.5e13)],[5.5e5,n(2e13)],[5.6e5,n(2.5e13)],[5.7e5,n(3e13)],[5.8e5,n(4e13)],[5.9e5,n(5e13)],[6e5,n(6.5e13)],[6.1e5,n(8e13)],
]
function CalcExpNeed(){
    for(let i=0;i<expNeed.length;i++){
        if(player.lv<expNeed[i][0]){
            return expNeed[i][1]
        }
    }
    return n(1e308)
}
const spiritNeed=[
    [100,10],[200,15],[300,20],[400,25],[500,30],[600,35],[700,40],[1000,50],[1500,75],[2000,100],[3000,125],[4000,150],[5000,200],[6000,225],[7000,250],[8000,275],[9000,300],
    [10000,350],[12000,400],[14000,450],[16000,500],[20000,600],[25000,700],[30000,800],[35000,900],[40000,1000],[45000,1200],[50000,1400],
    [55000,1600],[60000,1800],[65000,2000],[70000,2500],[75000,3000],[80000,3500],[90000,4000],[1e5,4500],[1.1e5,5000],
    [1.2e5,6000],[1.3e5,7000],[1.4e5,8500],[1.5e5,10000],[1.6e5,15000],[1.7e5,20000],[1.8e5,25000],[1.9e5,30000],[2e5,35000]
]
function CalcSpiritNeed(id){
    for(let i=0;i<spiritNeed.length;i++){
        if(player.spiritLv[id]<spiritNeed[i][0]){
            return spiritNeed[i][1]
        }
    }
    return n(1e308)
}
function CalcSpiritStage(id){
    for(let i=0;i<spiritNeed.length;i++){
        if(player.spiritLv[id]<spiritNeed[i][0]){
            return i
        }
    }
    return spiritNeed.length
}
function SpiritUpgrade(id,type){
    if(type==0){
        if(player.bag[2]<CalcSpiritNeed(id)){
            NotEnough(2)
        }
        else{
            player.bag[2]-=CalcSpiritNeed(id)
            player.spiritLv[id]+=1
            logs.push("成功升级 "+["生命","攻击","防御","命中"][id]+"修炼 1级")
        }
    }
    else{
        let count=0
        while(player.bag[2]>=CalcSpiritNeed(id)){
            player.bag[2]-=CalcSpiritNeed(id)
            player.spiritLv[id]+=1
            count+=1
        }
        if(count==0){
            NotEnough(2)
        }
        else{
            logs.push("成功升级 "+["生命","攻击","防御","命中"][id]+"修炼 "+count+"级")
        }
    }
}
const transmigrationNeed=[
    [10,n(10000)],[20,n(100000)],[30,n(1e6)],[45,n(1e7)],[60,n(1e8)],[80,n(1e9)],[100,n(1e10)],[120,n(1e11)],[150,n(1e12)],[200,n(1e13)],
    [300,n(1e14)],[400,n(1e15)],[500,n(1e16)],[600,n(1e17)],[700,n(1e18)]
]
function CalcTransmigrationNeed(id){
    for(let i=0;i<transmigrationNeed.length;i++){
        if(player.transmigrationLv[id]<transmigrationNeed[i][0]){
            return transmigrationNeed[i][1]
        }
    }
    return n(1e308)
}
function TransmigrationUpgrade(id,type){
    if(player.transmigrationLv[id]>=player[id].logBase(2).floor()){
        return
    }
    if(type==0){
        if(player.money.lt(CalcTransmigrationNeed(id))){
            logs.push("金币不够")
        }
        else{
            player.money=player.money.sub(CalcTransmigrationNeed(id))
            player.transmigrationLv[id]+=1
            logs.push("成功转生 "+attributeToName[id]+" 1次")
        }
    }
    else{
        let count=0
        while(player.money.gte(CalcTransmigrationNeed(id)) && player.transmigrationLv[id]<player[id].logBase(2).floor()){
            player.money=player.money.sub(CalcTransmigrationNeed(id))
            player.transmigrationLv[id]+=1
            count+=1
        }
        if(count==0){
            logs.push("金币不够")
        }
        else{
            logs.push("成功转生 "+attributeToName[id]+" "+count+"次")
        }
    }
}
const divineNeed=[
    [20,n(30000)],[50,n(100000)],[100,n(1e6)],[150,n(1e7)],[200,n(1e8)],[300,n(1e9)],[400,n(1e10)],[500,n(1e11)],[600,n(1e12)],[800,n(1e13)],
    [1200,n(1e14)],[1600,n(1e15)],[2000,n(1e16)],[2400,n(1e17)],[2800,n(1e18)]
]
function CalcDivineNeed(){
    for(let i=0;i<divineNeed.length;i++){
        if(player.divineLv<divineNeed[i][0]){
            return divineNeed[i][1]
        }
    }
    return n(1e308)
}
function DivineUpgrade(type){
    let mx=player.transmigrationLv["hpmax"]+player.transmigrationLv["atk"]+player.transmigrationLv["def"]+player.transmigrationLv["hit"]
    if(player.divineLv>=mx){
        return
    }
    if(type==0){
        if(player.money.lt(CalcDivineNeed())){
            logs.push("金币不够")
        }
        else{
            player.money=player.money.sub(CalcDivineNeed())
            player.divineLv+=1
            logs.push("成功凝聚 1滴神力")
        }
    }
    else{
        let count=0
        while(player.money.gte(CalcDivineNeed()) && player.divineLv<mx){
            player.money=player.money.sub(CalcDivineNeed())
            player.divineLv+=1
            count+=1
        }
        if(count==0){
            logs.push("金币不够")
        }
        else{
            logs.push("成功凝聚 "+count+"滴神力")
        }
    }
}
const templeNeed=[
    [50,10],[100,20],[200,25],[300,30],[400,40],[500,50],[1000,75],[1500,100],[2000,150],[2500,200],[3000,250],[3500,300],[4000,350],
    [4500,400],[5000,500],[5500,750],[6000,1000],[6500,1500],[7000,2000],[7500,2500],[8000,3000],[8500,4000],[9500,5000],[10000,6000],
    [10500,8000],[11000,10000],[11500,15000],[12000,20000],[12500,25000],[13000,30000],[13500,40000],[14000,50000],[14500,75000],[15000,1e5],
    [15500,1.5e5],[16000,2e5],[16500,2.5e5],[17000,3e5],[17500,4e5],[18000,5e5],
]
function CalcTempleNeed(id){
    for(let i=0;i<templeNeed.length;i++){
        if(player.templeLv[id]<templeNeed[i][0]){
            return templeNeed[i][1]
        }
    }
    return n(1e308)
}
function TempleUpgrade(id,type){
    if(type==0){
        if(player.bag[6]<CalcTempleNeed(id)){
            NotEnough(6)
        }
        else{
            player.bag[6]-=CalcTempleNeed(id)
            player.templeLv[id]+=1
            logs.push("成功升级 1级 "+["经验","金币","修为"][id]+"神庙")
        }
    }
    else{
        let count=0
        while(player.bag[6]>=CalcTempleNeed(id)){
            player.bag[6]-=CalcTempleNeed(id)
            player.templeLv[id]+=1
            count+=1
        }
        if(count==0){
            NotEnough(6)
        }
        else{
            logs.push("成功升级 "+count+"级 "+["经验","金币","修为"][id]+"神庙")
        }
    }
}
const ConcealNeed=[
    [100,200],[200,500],[300,750],[400,1000],[500,1250],[600,1500],[700,1750],[800,2000],[900,2500],[1000,3000],
    [1200,3500],[1400,4000],[1600,4500],[1800,5000],[2000,6000],[2500,7000],[3000,8000],[3500,9000],[4000,10000],[4500,12000],[5000,14000],
]
function CalcConcealNeed(){
    for(let i=0;i<ConcealNeed.length;i++){
        if(player.concealLv<ConcealNeed[i][0]){
            return ConcealNeed[i][1]
        }
    }
    return n(1e308)
}
function ConcealUpgrade(type){
    if(type==0){
        if(player.bag[8]<CalcConcealNeed()){
            NotEnough(8)
        }
        else{
            player.bag[8]-=CalcConcealNeed()
            player.concealLv+=1
            logs.push("成功升级 1级 暗器强化")
        }
    }
    else{
        let count=0
        while(player.bag[8]>=CalcConcealNeed()){
            player.bag[8]-=CalcConcealNeed()
            player.concealLv+=1
            count+=1
        }
        if(count==0){
            NotEnough(8)
        }
        else{
            logs.push("成功升级 "+count+"级 暗器强化")
        }
    }
}
const ZonghengNeed=[
    [100,n(1e7)],[200,n(2e7)],[500,n(5e7)],[1000,n(1e8)],[2000,n(1e9)],[3000,n(1e10)],[4000,n(1e11)],[5000,n(1e12)],[6000,n(1e13)],
    [7000,n(1e14)],[8000,n(1e15)],[9000,n(1e16)],[10000,n(1e17)],
]
function CalcZonghengNeed(id){
    for(let i=0;i<ZonghengNeed.length;i++){
        if(player.zonghengLv[id]<ZonghengNeed[i][0]){
            return ZonghengNeed[i][1]
        }
    }
    return n(1e308)
}
function ZonghengUpgrade(id,type){
    let mx=1e100
    if(id==2)mx=player.zonghengLv[0]
    if(id==3)mx=player.zonghengLv[1]
    if(id==4)mx=Math.min(player.zonghengLv[2],player.zonghengLv[3])
    if(id==5)mx=player.zonghengLv[4]
    if(player.zonghengLv[id]==mx){
        logs.push(["纵剑术","横剑术","长虹贯日","横贯四方","合纵连横","九龙真诀"][id]+"等级已达上限")
        return
    }
    if(type==0){
        if(player.money.lt(CalcZonghengNeed(id))){
            logs.push("金币不够")
        }
        else{
            player.money=player.money.sub(CalcZonghengNeed(id))
            player.zonghengLv[id]+=1
            logs.push("成功升级 1级 "+["纵剑术","横剑术","长虹贯日","横贯四方","合纵连横","九龙真诀"][id])
        }
    }
    else{
        let count=0
        while(player.money.gte(CalcZonghengNeed(id)) && count<100 && player.zonghengLv[id]<mx){
            player.money=player.money.sub(CalcZonghengNeed(id))
            player.zonghengLv[id]+=1
            count+=1
        }
        if(count==0){
            logs.push("金币不够")
        }
        else{
            logs.push("成功升级 "+count+"级 "+["纵剑术","横剑术","长虹贯日","横贯四方","合纵连横","九龙真诀"][id])
        }
    }
}
const SoulcircleNeed=[
    [100,100],[200,200],[300,300],[400,400],[500,500],[700,750],[1000,1000]
]
function CalcSoulcircleNeed(){
    for(let i=0;i<SoulcircleNeed.length;i++){
        if(player.soulcircleUpgradeLv<SoulcircleNeed[i][0]){
            return SoulcircleNeed[i][1]
        }
    }
    return n(1e308)
}
function SoulcircleUpgrade(type){
    if(type==0){
        if(player.bag[24]<CalcSoulcircleNeed()){
            NotEnough(24)
        }
        else{
            player.bag[24]-=CalcSoulcircleNeed()
            player.soulcircleUpgradeLv+=1
            logs.push("成功升级 1级 魂环强化")
        }
    }
    else{
        let count=0
        while(player.bag[24]>=CalcSoulcircleNeed()){
            player.bag[24]-=CalcSoulcircleNeed()
            player.soulcircleUpgradeLv+=1
            count+=1
        }
        if(count==0){
            NotEnough(24)
        }
        else{
            logs.push("成功升级 "+count+"级 魂环强化")
        }
    }
}
const PetNeed=[
    [100,200],[200,500],[300,750],[400,1000],[500,1250],[600,1500],[700,1750],[800,2000],[900,2500],[1000,3000],
    [1200,3500],[1400,4000],[1600,4500],[1800,5000],[2000,6000],[2500,7000],[3000,8000],[3500,9000],[4000,10000],[4500,12000],[5000,14000],
]
function CalcPetNeed(){
    for(let i=0;i<PetNeed.length;i++){
        if(player.petUpgradeLv<PetNeed[i][0]){
            return PetNeed[i][1]
        }
    }
    return n(1e308)
}
function PetUpgrade(type){
    if(type==0){
        if(player.bag[17]<CalcPetNeed()){
            NotEnough(17)
        }
        else{
            player.bag[17]-=CalcPetNeed()
            player.petUpgradeLv+=1
            logs.push("成功升级 1级 宠物强化")
        }
    }
    else{
        let count=0
        while(player.bag[17]>=CalcPetNeed()){
            player.bag[17]-=CalcPetNeed()
            player.petUpgradeLv+=1
            count+=1
        }
        if(count==0){
            NotEnough(17)
        }
        else{
            logs.push("成功升级 "+count+"级 宠物强化")
        }
    }
}
const SkillNeed=[
    [100,100],[200,150],[300,200],[400,300],[500,400],[600,500],[700,650],[800,800],[900,1000],[1000,1200],
    [1200,1500],[1400,2000],[1600,3000],[1800,4000],[2000,5000],[2200,6000],[2400,8000],[2600,10000],[3000,12000],[3500,15000]
]
function CalcSkillNeed(){
    for(let i=0;i<SkillNeed.length;i++){
        if(player.skillUpgradeLv<SkillNeed[i][0]){
            return SkillNeed[i][1]
        }
    }
    return n(1e308)
}
function SkillUpgrade(type){
    if(type==0){
        if(player.bag[36]<CalcSkillNeed()){
            NotEnough(36)
        }
        else{
            player.bag[36]-=CalcSkillNeed()
            player.skillUpgradeLv+=1
            logs.push("成功升级 1级 绝技强化")
        }
    }
    else{
        let count=0
        while(player.bag[36]>=CalcSkillNeed()){
            player.bag[36]-=CalcSkillNeed()
            player.skillUpgradeLv+=1
            count+=1
        }
        if(count==0){
            NotEnough(36)
        }
        else{
            logs.push("成功升级 "+count+"级 绝技强化")
        }
    }
}