function CalcAttribute(){
    let list=["hpmax","atk","def","hit"]
    player.hpmax=n(100).mul(player.lv)
    player.atk=n(10).mul(player.lv)
    player.def=n(10).mul(player.lv)
    player.hit=n(100).add(n(5).mul(player.lv))
    player.criticalDamage=n(200)
    player.damageAdd=n(100)
    player.damageMinus=n(0)
    player.maxDifficulty=immortalAttribute[player.immortalLv][4]

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
        if(player.concealType[i]>0)
        for(let id in concealAttribute[i][1]){
            player[id]=player[id].add(n(concealAttribute[i][1][id]).mul(n(2).pow(player.concealType[i]-1)))
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
        player[list[i]]=player[list[i]].mul(n(1).add(n(0.01).mul(player.spiritLv[i])))
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
    player.damageAdd=player.damageAdd.mul(n(1.01).pow(player.divineLv))
    player.damageMinus=player.damageMinus.mul(n(1.01).pow(player.divineLv))
    for(let i=0;i<concealAttribute.length;i++){
        if(player.concealType[i]>0)
        for(let id in concealAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(n(concealAttribute[i][2][id]).mul(n(2).pow(player.concealType[i]-1)).div(100)))
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
    player.fightAbility=n(1).mul(player.hpmax).mul(player.atk).mul(player.def).mul(player.hit).mul(player.criticalDamage).mul(player.damageAdd.add(100)).mul(player.damageMinus.add(100))

    player.expMul=n(1)
    player.moneyMul=n(1)
    player.cultivationMul=n(1)
    player.expMul=player.expMul.mul(n(1).add(0.01*player.templeLv[0]))
    player.moneyMul=player.moneyMul.mul(n(1).add(0.01*player.templeLv[1]))
    player.cultivationMul=player.cultivationMul.mul(n(1).add(0.01*player.templeLv[2]))
}
const expNeed=[
    [100,n(10)],[200,n(100)],[500,n(500)],[1000,n(1000)],[1500,n(2000)],[2000,n(3000)],[3000,n(5000)],[4000,n(7000)],[5000,n(10000)],
    [6000,n(15000)],[7000,n(20000)],[10000,n(50000)],[15000,n(100000)],[20000,n(200000)],[25000,n(350000)],[30000,n(500000)],[35000,n(750000)],[40000,n(1e6)],
    [45000,n(1.5e6)],[50000,n(2e6)],[55000,n(3e6)],[60000,n(5e6)],[70000,n(1e7)]
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
    [10000,350]
]
function CalcSpiritNeed(id){
    for(let i=0;i<spiritNeed.length;i++){
        if(player.spiritLv[id]<spiritNeed[i][0]){
            return spiritNeed[i][1]
        }
    }
    return n(1e308)
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
    [10,n(10000)],[20,n(30000)],[30,n(50000)],[40,n(100000)],[50,n(300000)],[60,n(800000)],[70,n(2e6)],[80,n(5e6)],[100,n(1e7)]
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
    [20,n(30000)],[50,n(100000)],[100,n(200000)],[150,n(500000)],[200,n(1e6)],[300,n(3e6)],[400,n(8e6)],[500,n(2e7)]
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
    [50,10],[100,20],[200,25],[300,30],[400,40],[500,50]
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