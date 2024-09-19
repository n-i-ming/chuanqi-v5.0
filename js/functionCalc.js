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
        mul*=(1+0.01*player.bookUpgradeLv)
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
        let mul=1+0.01*player.infinityUpgradeLv
        for(let id in infinityAttribute[i][1]){
            player[id]=player[id].add(player.infinityLv[i]==0?0:n(infinityAttribute[i][1][id]).div(100).add(1).pow(player.infinityLv[i]).mul(mul).sub(1).mul(100))
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
        mul*=(1+0.01*player.bookUpgradeLv)
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
            player[id]=player[id].mul(n(1).add(n(soulboneAttribute[i][2][id]).mul(mul).mul(player.soulboneUpgradeLv/100+1).div(100)))
        }
    }
    for(let i=0;i<skillAttribute.length;i++){
        let mul=player.skillLv[i]*(1+0.01*player.skillUpgradeLv)
        for(let id in skillAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(n(skillAttribute[i][2][id]).mul(mul).div(100)))
        }
    }
    for(let i=0;i<infinityAttribute.length;i++){
        let mul=1+0.01*player.infinityUpgradeLv
        for(let id in infinityAttribute[i][2]){
            player[id]=player[id].mul(n(1).add(player.infinityLv[i]==0?0:n(infinityAttribute[i][2][id]).div(100).add(1).pow(player.infinityLv[i]).mul(mul).sub(1)))
        }
    }
    for(let i=0;i<partnerAttribute.length;i++){
        let mul=Math.max(0,Math.min(100,player.partnerLv[i]))*Math.max(1,Math.min(100,player.partnerLv[i]-99))*(1+0.01*player.partnerUpgradeLv)
        for(let id in partnerAttribute[i][1]){
            player[id]=player[id].mul(n(1).add(n(partnerAttribute[i][1][id]).mul(mul).div(100)))
        }
    }
}
    player.fightAbility=n(1).mul(player.hpmax).mul(player.atk).mul(player.def).mul(player.hit).mul(player.criticalDamage).mul(player.damageAdd.add(100)).mul(player.damageMinus.add(100))

    player.expMul=n(1)
    player.moneyMul=n(1)
    player.cultivationMul=n(1)
    player.expMul=player.expMul.mul(n(1).add(n(player.templeLv[0]).add(100).mul(n(1.05).pow(Math.floor(player.templeLv[0]/100))).sub(100).div(100)))
    player.moneyMul=player.moneyMul.mul(n(1).add(n(player.templeLv[1]).add(100).mul(n(1.05).pow(Math.floor(player.templeLv[1]/100))).sub(100).div(100)))
    player.cultivationMul=player.cultivationMul.mul(n(1).add(n(player.templeLv[2]).add(100).mul(n(1.05).pow(Math.floor(player.templeLv[2]/100))).sub(100).div(100)))
    for(let i=0;i<soulboneAttribute.length;i++){
        let mul=Math.min(1,player.soulboneLv[i])*(1+0.1*Math.max(0,player.soulboneLv[i]-1))
        for(let id in soulboneAttribute[i][1]){
            player[id+"Mul"]=player[id+"Mul"].mul(n(1).add(n(soulboneAttribute[i][1][id]).mul(mul).mul(player.soulboneUpgradeLv/1000+1).div(100)))
        }
    }
    for(let i=0;i<heroAttribute.length;i++){
        let mul=player.heroLv[i]*(1+0.001*player.heroUpgradeLv)
        for(let id in heroAttribute[i][1]){
            player[id+"Mul"]=player[id+"Mul"].mul(n(1).add(n(heroAttribute[i][1][id]).mul(mul).div(100)))
        }
    }

    for(let i=0;i<player.bagMulList.length;i++){
        player.bagMulList[i]=1
    }

    player.zoneHpmax=n(player.transmigrationLv.hpmax).mul(5)
    player.zoneAtk=n(player.transmigrationLv.atk)
    player.zoneDef=n(player.transmigrationLv.def)
    player.zoneHit=n(player.transmigrationLv.hit)

    player.hangingSpeed=1
    player.hangingSpeed+=3.55
    player.hangingSpeed*=player.separationLv*0.5+1

    player.dropLuck=1
    player.dropMul=1

    if(player.exchangeCodeList.includes("b15ae4e2ced7c192fe4acb5783fa57d336b963253950a8b7d2ff180876f4cc70")){
        player.hangingSpeed*=2
    }
    if(player.exchangeCodeList.includes("e5087192b1d924ad4fe535688e00b9d1d5ef4f0db60174dbaa070cc62c229875")){
        player.hangingSpeed*=2.5
    }
    if(player.exchangeCodeList.includes("69d86d4352e601f6db8580ad5224b12d4910115c015e03d07fd0311df94bef1b")){
        player.hangingSpeed*=3
        player.dropLuck*=2
    }
    if(player.exchangeCodeList.includes("98d4c0c71f6671b4426c7fc604f63d97926587be5908153e95619fc971a70a5c")){
        player.hangingSpeed*=5
        player.dropMul*=2
    }
    if(player.monthCardTime>0){
        player.hangingSpeed*=2
        player.dropMul*=2
    }
    player.hangingSpeed*=2
    for(let i=0;i<heroAttribute.length;i++){
        let mul=player.heroLv[i]*(1+0.001*player.heroUpgradeLv)
        for(let j=0;j<heroAttribute[i][2].length;j++){
            let id=heroAttribute[i][2][j][0]
            if(id=="挂机速度")
            player.hangingSpeed*=(1+heroAttribute[i][2][j][1]*mul/100)
            else
            player.bagMulList[id]=player.bagMulList[id]*(1+heroAttribute[i][2][j][1]*mul/100)
        }
    }
}
const expNeed=[
    [100,n(10)],[200,n(100)],[500,n(500)],[1000,n(1000)],[1500,n(2000)],[2000,n(3000)],[3000,n(5000)],[4000,n(7000)],[5000,n(10000)],
    [6000,n(15000)],[7000,n(20000)],[10000,n(50000)],[15000,n(100000)],[20000,n(200000)],[25000,n(350000)],[30000,n(500000)],[35000,n(750000)],[40000,n(1e6)],
    [45000,n(1.5e6)],[50000,n(2e6)],[55000,n(3e6)],[60000,n(5e6)],[70000,n(1e7)],[80000,n(2e7)],[90000,n(3e7)],[100000,n(5e7)],[110000,n(7e7)],[120000,n(1e8)],
    [130000,n(1.5e8)],[140000,n(2e8)],[150000,n(3e8)],[160000,n(5e8)],[170000,n(1e9)],[180000,n(2e9)],[190000,n(3e9)],[200000,n(5e9)],
    [2.1e5,n(7e9)],[2.2e5,n(1e10)],[2.3e5,n(1.2e10)],[2.4e5,n(1.5e10)],[2.5e5,n(2e10)],[2.6e5,n(2.5e10)],[2.7e5,n(3e10)],[2.8e5,n(4e10)],[2.9e5,n(5e10)],
    [3e5,n(6.5e10)],[3.1e5,n(8e10)],[3.2e5,n(1e11)],[3.3e5,n(1.2e11)],[3.4e5,n(1.5e11)],[3.5e5,n(2e11)],[3.6e5,n(2.5e11)],[3.7e5,n(3e11)],[3.8e5,n(4e11)],[3.9e5,n(5e11)],
    [4e5,n(6.5e11)],[4.1e5,n(8e11)],[4.2e5,n(1e12)],[4.3e5,n(1.2e12)],[4.4e5,n(1.5e12)],[4.5e5,n(2e12)],[4.6e5,n(2.5e12)],[4.7e5,n(3e12)],[4.8e5,n(4e12)],[4.9e5,n(5e12)],
    [5e5,n(6.5e12)],[5.1e5,n(8e12)],[5.2e5,n(1e13)],[5.3e5,n(1.2e13)],[5.4e5,n(1.5e13)],[5.5e5,n(2e13)],[5.6e5,n(2.5e13)],[5.7e5,n(3e13)],[5.8e5,n(4e13)],[5.9e5,n(5e13)],
    [6e5,n(6.5e13)],[6.1e5,n(8e13)],[6.2e5,n(1e14)],[6.3e5,n(1.2e14)],[6.4e5,n(1.5e14)],[6.5e5,n(2e14)],[6.6e5,n(2.5e14)],[6.7e5,n(3e14)],[6.8e5,n(4e14)],[6.9e5,n(5e14)],
    [7e5,n(6.5e14)],[7.1e5,n(8e14)],[7.2e5,n(1e15)],[7.3e5,n(1.2e15)],[7.4e5,n(1.5e15)],[7.5e5,n(2e15)],[7.6e5,n(2.5e15)],[7.7e5,n(3e15)],[7.8e5,n(4e15)],[7.9e5,n(5e15)],
    [8e5,n(6.5e15)],[8.1e5,n(8e15)],[8.2e5,n(1e16)],[8.3e5,n(1.2e16)],[8.4e5,n(1.5e16)],[8.5e5,n(2e16)],[8.6e5,n(2.5e16)],[8.7e5,n(3e16)],[8.8e5,n(4e16)],[8.9e5,n(5e16)],
    [9e5,n(6.5e16)],[9.1e5,n(8e16)],[9.2e5,n(1e17)],[9.3e5,n(1.2e17)],[9.4e5,n(1.5e17)],[9.5e5,n(2e17)],[9.6e5,n(2.5e17)],[9.7e5,n(3e17)],[9.8e5,n(4e17)],[9.9e5,n(5e17)],
    [1.00e6,n(6.5e17)],[1.01e6,n(8e17)],[1.02e6,n(1e18)],[1.03e6,n(1.2e18)],[1.04e6,n(1.5e18)],[1.05e6,n(2e18)],[1.06e6,n(2.5e18)],[1.07e6,n(3e18)],[1.08e6,n(4e18)],[1.09e6,n(5e18)],
    [1.10e6,n(6.5e18)],[1.11e6,n(8e18)],[1.12e6,n(1e19)],[1.13e6,n(1.2e19)],[1.14e6,n(1.5e19)],[1.15e6,n(2e19)],[1.16e6,n(2.5e19)],[1.17e6,n(3e19)],[1.18e6,n(4e19)],[1.19e6,n(5e19)],
    [1.20e6,n(6.5e19)],[1.21e6,n(8e19)],[1.22e6,n(1e20)],[1.23e6,n(1.2e20)],[1.24e6,n(1.5e20)],[1.25e6,n(2e20)],[1.26e6,n(2.5e20)],[1.27e6,n(3e20)],[1.28e6,n(4e20)],[1.29e6,n(5e20)],
    [1.30e6,n(6.5e20)],[1.31e6,n(8e20)],[1.32e6,n(1e21)],[1.33e6,n(1.2e21)],[1.34e6,n(1.5e21)],[1.35e6,n(2e21)],[1.36e6,n(2.5e21)],[1.37e6,n(3e21)],[1.38e6,n(4e21)],[1.39e6,n(5e21)],
    [1.40e6,n(6.5e21)],[1.41e6,n(8e21)],[1.42e6,n(1e22)],[1.43e6,n(1.2e22)],[1.44e6,n(1.5e22)],[1.45e6,n(2e22)],[1.46e6,n(2.5e22)],[1.47e6,n(3e22)],[1.48e6,n(4e22)],[1.49e6,n(5e22)],
]
function CalcExpNeed(){
    for(let i=0;i<expNeed.length;i++){
        if(player.lv<expNeed[i][0]){
            return expNeed[i][1]
        }
    }
    return n(1e308)
}
function CalcBigExpNeed(){
    let m=player.lv-3e5
    let ls=[6.5,8,10,12,15,20,25,30,40,50],bs=n(1e10)
    let mx=3e5+Math.ceil((m+1)/10000)*10000,nd=bs.mul(n(10).pow(Math.floor((mx-3e5)/1e5))).mul(ls[Math.floor((mx-Math.floor(mx/1e5)*1e5)/10000)])
    return [mx,nd]
}
const spiritNeed=[
    [100,10],[200,15],[300,20],[400,25],[500,30],[600,35],[700,40],[1000,50],[1500,75],[2000,100],[3000,125],[4000,150],[5000,200],[6000,225],[7000,250],[8000,275],[9000,300],
    [10000,350],[12000,400],[14000,450],[16000,500],[20000,600],[25000,700],[30000,800],[35000,900],[40000,1000],[45000,1200],[50000,1400],
    [55000,1600],[60000,1800],[65000,2000],[70000,2500],[75000,3000],[80000,3500],[90000,4000],[1e5,4500],[1.1e5,5000],
    [1.2e5,6000],[1.3e5,7000],[1.4e5,8500],[1.5e5,10000],[1.6e5,15000],[1.7e5,20000],[1.8e5,25000],[1.9e5,30000],[2e5,35000],[2.1e5,40000],
    [2.2e5,45000],[2.3e5,50000],[2.4e5,55000],[2.5e5,60000],[2.6e5,65000],[2.7e5,70000],[2.8e5,75000],[2.9e5,80000],[3e5,85000],[3.1e5,90000],
    [3.2e5,95000],[3.3e5,1e5],[3.4e5,1.1e5],[3.5e5,1.2e5],[3.6e5,1.3e5],[3.7e5,1.4e5],[3.8e5,1.5e5],[3.9e5,1.6e5],[4e5,1.7e5],[4.1e5,1.8e5],
    [4.2e5,1.9e5],[4.3e5,2e5],[4.4e5,2.2e5],[4.5e5,2.4e5],[4.6e5,2.6e5],[4.7e5,2.8e5],[4.8e5,3e5],[4.9e5,3.5e5],[5e5,4e5],[5.1e5,4.5e5],
    [5.2e5,5e5],[5.3e5,5.5e5],[5.4e5,6e5],[5.5e5,6.5e5],[5.6e5,7e5],[5.7e5,8e5],[5.8e5,9e5],[5.9e5,1e6],[6e5,1.2e6],[6.1e5,1.4e6],
    [6.2e5,1.6e6],[6.3e5,1.8e6],[6.4e5,2e6],[6.5e5,2.5e6],[6.6e5,3e6],[6.7e5,3.5e6],[6.8e5,4e6],[6.9e5,4.5e6],[7e5,5e6],[7.1e5,5.5e6],
    [7.2e5,6e6],[7.3e5,6.5e6],[7.4e5,7e6],[7.5e5,8e6],[7.6e5,9e6],[7.7e5,1e7],[7.8e5,1.2e7],[7.9e5,1.4e7],[8e5,1.6e7],
    [8.1e5,1.8e7],[8.2e5,2e7],[8.3e5,2.5e7],[8.4e5,3e7],[8.5e5,3.5e7],[8.6e5,4e7],[8.7e5,4.5e7],[8.8e5,5e7],[8.9e5,6e7],
    [9e5,7e7],[9.1e5,8e7],[9.2e5,9e7],[9.3e5,1e8],[9.4e5,1.2e8],[9.5e5,1.4e8],[9.6e5,1.6e8],[9.7e5,1.8e8],[9.8e5,2e8],[9.9e5,2.5e8],
    [1e6,3e8],
]
function CalcSpiritNeed(id){
    for(let i=0;i<spiritNeed.length;i++){
        if(player.spiritLv[id]<spiritNeed[i][0]){
            return spiritNeed[i][1]
        }
    }
    return CalcBigSpiritNeed(id)[1]
}
function CalcBigSpiritNeed(id){
    let m=player.spiritLv[id]-1e6
    let ls=[3.5,4,4.5,5,6,7,8,9,10,12,14,16,18,20,25,30],bs=n(1e8)
    let mx=1e6+Math.ceil((m+1)/10000)*10000,nd=bs.mul(n(10).pow(Math.floor((mx-1e6)/(10000*ls.length)))).mul(ls[Math.floor((mx-1e6-Math.floor((mx-1e6)/(10000*ls.length))*(10000*ls.length))/10000)])
    return [mx,nd]
}
function CalcSpiritStage(id){
    for(let i=0;i<spiritNeed.length;i++){
        if(player.spiritLv[id]<spiritNeed[i][0]){
            return i
        }
    }
    return spiritNeed.length+Math.floor((player.spiritLv[id]-1e6)/10000)
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
    [300,n(1e14)],[400,n(1e15)],[500,n(1e16)],[600,n(1e17)],[700,n(1e18)],[800,n(1e19)],[900,n(1e20)],[1000,n(1e21)],[1100,n(1e22)],[1200,n(1e23)],
    [1300,n(1e24)],[1400,n(1e25)],[1500,n(1e26)],[1600,n(1e27)],[1700,n(1e28)],[1800,n(1e29)],[1900,n(1e30)],[2000,n(1e31)],
    [2100,n(1e32)],[2200,n(1e33)],[2300,n(1e34)],[2400,n(1e35)],[2500,n(1e36)],[2600,n(1e37)],[2700,n(1e38)],[2800,n(1e39)],
]
function CalcTransmigrationNeed(id){
    for(let i=0;i<transmigrationNeed.length;i++){
        if(player.transmigrationLv[id]<transmigrationNeed[i][0]){
            return transmigrationNeed[i][1]
        }
    }
    return CalcBigTransmigrationNeed(id)[1]
}
function CalcBigTransmigrationNeed(id){
    let m=player.transmigrationLv[id]-300
    let bs=n(1e14)
    let mx=300+Math.ceil((m+1)/100)*100,nd=bs.mul(n(10).pow(Math.floor((mx-300)/100)))
    return [mx,nd]
}
function TransmigrationUpgrade(id,type){
    if(n(player.transmigrationLv[id]).gte(player[id].logBase(2).floor())){
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
        while(player.money.gte(CalcTransmigrationNeed(id)) && n(player.transmigrationLv[id]).lt(player[id].logBase(2).floor())){
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
    [1200,n(1e14)],[1600,n(1e15)],[2000,n(1e16)],[2400,n(1e17)],[2800,n(1e18)],[3200,n(1e19)],[3600,n(1e20)],[4000,n(1e21)],[4400,n(1e22)],[4800,n(1e23)],
    [5200,n(1e24)],[5600,n(1e25)],[6000,n(1e26)],[6400,n(1e27)],[6800,n(1e28)],[7200,n(1e29)],[7600,n(1e30)],[8000,n(1e31)],
    [8400,n(1e32)],[8800,n(1e33)],[9200,n(1e34)],[9600,n(1e35)],[10000,n(1e36)],[10400,n(1e37)],[10800,n(1e38)],[11200,n(1e39)],
]
function CalcDivineNeed(){
    for(let i=0;i<divineNeed.length;i++){
        if(player.divineLv<divineNeed[i][0]){
            return divineNeed[i][1]
        }
    }
    return CalcBigDivineNeed(id)[1]
}
function CalcBigDivineNeed(id){
    let m=player.divineLv[id]-1200
    let bs=n(1e14)
    let mx=1200+Math.ceil((m+1)/400)*400,nd=bs.mul(n(10).pow(Math.floor((mx-1200)/400)))
    return [mx,nd]
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
    [15500,1.5e5],[16000,2e5],[16500,2.5e5],[17000,3e5],[17500,4e5],[18000,5e5],[19000,6.5e5],[20000,8e5],[21000,1e6],[22000,1.2e6],
    [23000,1.4e6],[24000,1.6e6],[25000,1.8e6],[26000,2e6],[27000,2.5e6],[28000,3e6],[29000,3.5e6],[30000,4e6],[31000,4.5e6],[32000,5e6],
    [33000,6e6],[34000,7e6],[35000,8e6],[36000,9e6],[37000,1e7],[38000,1.2e7],[39000,1.4e7],[40000,1.6e7],[41000,1.8e7],[42000,2e7],
    [43000,2.5e7],[44000,3e7],[45000,3.5e7],[46000,4e7],[47000,4.5e7],[48000,5e7],[49000,6e7],[50000,7e7],
    [51000,8e7],[52000,9e7],[53000,1e8],[54000,1.2e8],[55000,1.4e8],[56000,1.6e8],[57000,1.8e8],[58000,2e8],
    [59000,2.5e8],[60000,3e8],[61000,3.5e8],[62000,4e8],[63000,4.5e8],[64000,5e8],[65000,6e8],[66000,7e8],[67000,8e8],
    [68000,9e8],[69000,1e9],[70000,1.2e9],[71000,1.4e9],[72000,1.6e9],[73000,1.8e9],[74000,2e9],[75000,2.5e9],[76000,3e9],
    [77000,3.5e9],[78000,4e9],[79000,4.5e9],[80000,5e9]
]
function CalcTempleNeed(id){
    for(let i=0;i<templeNeed.length;i++){
        if(player.templeLv[id]<templeNeed[i][0]){
            return templeNeed[i][1]
        }
    }
    return CalcBigTempleNeed(id)[1]
}
function CalcBigTempleNeed(id){
    let m=player.templeLv[id]-80000
    let ls=[6,7,8,9,10,12,14,16,18,20,25,30,35,40,45,50],bs=n(1e9)
    let mx=80000+Math.ceil((m+1)/1000)*1000,nd=bs.mul(n(10).pow(Math.floor((mx-80000)/(1000*ls.length)))).mul(ls[Math.floor((mx-80000-Math.floor((mx-80000)/(1000*ls.length))*(1000*ls.length))/1000)])
    return [mx,nd]
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
    [5500,16000],[6000,18000],[6500,20000],[7000,25000],[8000,30000],[9000,35000],[10000,40000],[11000,50000],[12000,60000],[13000,70000],[14000,80000],
    [15000,90000],[16000,1e5],[17000,1.2e5],[18000,1.4e5],[19000,1.6e5],[20000,1.8e5],[22000,2e5],[24000,2.5e5],[26000,3e5],
    [28000,3.5e5],[30000,4e5],[32000,4.5e5],[34000,5e5],[36000,6e5],[38000,7e5],[40000,8e5],[42000,9e5],[44000,1e6],[46000,1.2e6],
    [48000,1.4e6],[50000,1.6e6],[52000,1.8e6],[54000,2e6],[56000,2.5e6],[58000,3e6],[60000,3.5e6],[62000,4e6],[64000,4.5e6],[66000,5e6],
    [68000,5.5e6],[70000,6e6],[75000,7e6],[80000,8e6],[85000,9e6],[90000,1e7],[95000,1.2e7],[1e5,1.4e7],[1.05e5,1.6e7],[1.1e5,1.8e7],
    [1.15e5,2e7],[1.20e5,2.5e7],[1.25e5,3e7],[1.30e5,3.5e7],[1.35e5,4e7],[1.40e5,4.5e7],[1.45e5,5e7],[1.50e5,6e7],
    [1.55e5,7e7],[1.60e5,8e7],[1.65e5,9e7],[1.70e5,1e8],[1.75e5,1.2e8],[1.80e5,1.4e8],[1.85e5,1.6e8],[1.90e5,1.8e8],[1.95e5,2e8],[2.00e5,2.5e8]
]
function CalcConcealNeed(){
    for(let i=0;i<ConcealNeed.length;i++){
        if(player.concealLv<ConcealNeed[i][0]){
            return ConcealNeed[i][1]
        }
    }
    return CalcBigConcealNeed()[1]
}
function CalcBigConcealNeed(){
    let m=player.concealLv-2e5
    let ls=[3,3.5,4,4.5,5,6,7,8,9,10,12,14,16,18,20,25],bs=n(1e8)
    let mx=2e5+Math.ceil((m+1)/10000)*10000,nd=bs.mul(n(10).pow(Math.floor((mx-2e5)/(10000*ls.length)))).mul(ls[Math.floor((mx-2e5-Math.floor((mx-2e5)/(10000*ls.length))*(10000*ls.length))/10000)])
    return [mx,nd]
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
    [7000,n(1e14)],[8000,n(1e15)],[9000,n(1e16)],[10000,n(1e17)],[12000,n(1e18)],[14000,n(1e19)],[16000,n(1e20)],[18000,n(1e21)],[20000,n(1e22)],
    [22000,n(1e23)],[25000,n(1e24)],[30000,n(1e25)],[35000,n(1e26)],[40000,n(1e27)],[45000,n(1e28)],[50000,n(1e29)],[60000,n(1e30)],
    [70000,n(1e31)],[80000,n(1e32)],[90000,n(1e33)],[1e5,n(1e34)],[1.1e5,n(1e35)],[1.2e5,n(1e36)],[1.3e5,n(1e37)],[1.4e5,n(1e38)],
    [1.5e5,n(1e39)],[1.6e5,n(1e40)],[1.7e5,n(1e41)],[1.8e5,n(1e42)],[1.9e5,n(1e43)],[2e5,n(1e44)]
]
function CalcZonghengNeed(id){
    for(let i=0;i<ZonghengNeed.length;i++){
        if(player.zonghengLv[id]<ZonghengNeed[i][0]){
            return ZonghengNeed[i][1]
        }
    }
    return CalcBigZonghengNeed(id)[1]
}
function CalcBigZonghengNeed(id){
    let m=player.zonghengLv[id]-2e5
    let bs=n(1e45)
    let mx=2e5+Math.ceil((m+1)/20000)*20000,nd=bs.mul(n(10).pow(Math.floor((mx-2e5)/(20000))))
    return [mx,nd]
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
    else if(type==1){
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
    else if(type==2){
        let count=0
        while(player.money.gte(CalcZonghengNeed(id)) && count<1000 && player.zonghengLv[id]<mx){
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
    else if(type==3){
        let count=0
        while(player.money.gte(CalcZonghengNeed(id)) && count<10000 && player.zonghengLv[id]<mx){
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
    [100,100],[200,200],[300,300],[400,400],[500,500],[700,750],[1000,1000],[1200,1500],[1500,2000],[2000,3000],[2500,4000],[3000,5000],[3500,6500],[4000,8000],
    [5000,10000],[6000,15000],[7000,20000],[8000,30000],[9000,45000],[10000,60000],[11000,80000],[12000,1e5],[14000,1.5e5],[16000,2e5],
    [18000,2.5e5],[20000,3e5],[22000,3.5e5],[24000,4e5],[26000,4.5e5],[28000,5e5],[30000,6e5],[32000,7e5],[34000,8e5],[36000,9e5],[38000,1e6],
    [40000,1.2e6],[42000,1.4e6],[44000,1.6e6],[46000,1.8e6],[48000,2e6],[50000,2.5e6],[52000,3e6],[54000,3.5e6],[56000,4e6],[58000,4.5e6],
    [60000,5e6],[65000,6e6],[70000,7e6],[75000,8e6],[80000,9e6],[85000,1e7],[90000,1.2e7],[95000,1.4e7],[1e5,1.6e7]
]
function CalcSoulcircleNeed(){
    for(let i=0;i<SoulcircleNeed.length;i++){
        if(player.soulcircleUpgradeLv<SoulcircleNeed[i][0]){
            return SoulcircleNeed[i][1]
        }
    }
    return CalcBigSoulcircleNeed()[1]
}
function CalcBigSoulcircleNeed(){
    let m=player.soulcircleUpgradeLv-1e5
    let ls=[1.8,2,2.5,3,3.5,4,4.5,5,6,7,8,9,10,12,14,16],bs=n(1e7)
    let mx=1e5+Math.ceil((m+1)/10000)*10000,nd=bs.mul(n(10).pow(Math.floor((mx-1e5)/(10000*ls.length)))).mul(ls[Math.floor((mx-1e5-Math.floor((mx-1e5)/(10000*ls.length))*(10000*ls.length))/10000)])
    return [mx,nd]
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
const SoulboneNeed=[
    [100,100],[200,200],[300,500],[400,1000],[500,1500],[700,2000],[1000,3000],[1200,4000],[1500,5000],[2000,7000],[2500,9000],[3000,12000],[3500,15000],
    [4000,20000],[4500,30000],[5000,50000],[5500,75000],[6000,1e5],[6500,1.5e5],[7000,2e5],[7500,2.5e5],[8000,3e5],[8500,3.5e5],[9000,4e5],
    [9500,4.5e5],[10000,5e5],[11000,6e5],[12000,7e5],[13000,8e5],[14000,9e5],[15000,1e6],
    [16000,1.2e6],[17000,1.4e6],[18000,1.6e6],[19000,1.8e6],[20000,2e6],[21000,2.5e6],[22000,3e6],
    [23000,3.5e6],[24000,4e6],[25000,4.5e6],[26000,5e6],[27000,6e6],[28000,7e6],[29000,8e6],[30000,9e6],
    [32000,1e7],[34000,1.2e7],[36000,1.4e7],[38000,1.6e7],[40000,1.8e7],[42000,2e7],[44000,2.5e7],
    [46000,3e7],[48000,3.5e7],[50000,4e7]
]
function CalcSoulboneNeed(){
    for(let i=0;i<SoulboneNeed.length;i++){
        if(player.soulboneUpgradeLv<SoulboneNeed[i][0]){
            return SoulboneNeed[i][1]
        }
    }
    return CalcBigSoulboneNeed()[1]
}
function CalcBigSoulboneNeed(){
    let m=player.soulboneUpgradeLv-50000
    let ls=[5,6,7,8,9,10,12,14,16,18,20,25,30,35,40,45],bs=n(1e7)
    let mx=50000+Math.ceil((m+1)/2000)*2000,nd=bs.mul(n(10).pow(Math.floor((mx-50000)/(2000*ls.length)))).mul(ls[Math.floor((mx-50000-Math.floor((mx-50000)/(2000*ls.length))*(2000*ls.length))/2000)])
    return [mx,nd]
}
function SoulboneUpgrade(type){
    if(type==0){
        if(player.bag[25]<CalcSoulboneNeed()){
            NotEnough(25)
        }
        else{
            player.bag[25]-=CalcSoulboneNeed()
            player.soulboneUpgradeLv+=1
            logs.push("成功升级 1级 魂骨强化")
        }
    }
    else{
        let count=0
        while(player.bag[25]>=CalcSoulboneNeed()){
            player.bag[25]-=CalcSoulboneNeed()
            player.soulboneUpgradeLv+=1
            count+=1
        }
        if(count==0){
            NotEnough(25)
        }
        else{
            logs.push("成功升级 "+count+"级 魂骨强化")
        }
    }
}
const BookNeed=[
    [100,100],[200,150],[300,200],[400,300],[500,400],[600,500],[700,650],[800,800],[900,1000],[1000,1200],
    [1200,1500],[1400,2000],[1600,3000],[1800,4000],[2000,5000],[2200,6000],[2400,8000],[2600,10000],[3000,12000],[3500,15000],[4000,20000],
    [4500,25000],[5000,30000],[6000,45000],[7000,60000],[8000,80000],[9000,1e5],[10000,1.2e5],[11000,1.5e5],[12000,2e5],
    [13000,2.5e5],[14000,3e5],[15000,3.5e5],[16000,4e5],[17000,4.5e5],[18000,5e5],[20000,6e5],[22000,7e5],[24000,8e5],[26000,9e5],
    [28000,1e6],[30000,1.2e6],[32000,1.4e6],[34000,1.6e6],[36000,1.8e6],[38000,2e6],[40000,2.5e6],[42000,3e6],[44000,3.5e6],[46000,4e6],
    [48000,4.5e6],[50000,5e6],[52000,6e6],[54000,7e6],[56000,8e6],[58000,9e6],[60000,1e7],[62000,1.2e7],[64000,1.4e7],[66000,1.6e7],
    [68000,1.8e7],[70000,2e7],[75000,2.5e7],[80000,3e7],[85000,3.5e7],[90000,4e7],[95000,4.5e7],[1e5,5e7]
]
function CalcBookNeed(){
    for(let i=0;i<BookNeed.length;i++){
        if(player.bookUpgradeLv<BookNeed[i][0]){
            return BookNeed[i][1]
        }
    }
    return CalcBigBookNeed()[1]
}
function CalcBigBookNeed(){
    let m=player.bookUpgradeLv-1e5
    let ls=[6,7,8,9,10,12,14,16,18,20,25,30,35,40,45,50],bs=n(1e7)
    let mx=1e5+Math.ceil((m+1)/10000)*10000,nd=bs.mul(n(10).pow(Math.floor((mx-100000)/(10000*ls.length)))).mul(ls[Math.floor((mx-1e5-Math.floor((mx-1e5)/(10000*ls.length))*(10000*ls.length))/10000)])
    return [mx,nd]
}
function BookUpgrade(type){
    if(type==0){
        if(player.bag[50]<CalcBookNeed()){
            NotEnough(50)
        }
        else{
            player.bag[50]-=CalcBookNeed()
            player.bookUpgradeLv+=1
            logs.push("成功升级 1级 功法强化")
        }
    }
    else{
        let count=0
        while(player.bag[50]>=CalcBookNeed()){
            player.bag[50]-=CalcBookNeed()
            player.bookUpgradeLv+=1
            count+=1
        }
        if(count==0){
            NotEnough(50)
        }
        else{
            logs.push("成功升级 "+count+"级 功法强化")
        }
    }
}
const PetNeed=[
    [100,200],[200,500],[300,750],[400,1000],[500,1250],[600,1500],[700,1750],[800,2000],[900,2500],[1000,3000],
    [1200,3500],[1400,4000],[1600,4500],[1800,5000],[2000,6000],[2500,7000],[3000,8000],[3500,9000],[4000,10000],[4500,12000],[5000,14000],
    [5500,16000],[6000,18000],[6500,20000],[7000,25000],[8000,30000],[9000,35000],[10000,40000],[11000,50000],[12000,60000],[13000,70000],[14000,80000],
    [15000,90000],[16000,1e5],[17000,1.2e5],[18000,1.4e5],[19000,1.6e5],[20000,1.8e5],[22000,2e5],[24000,2.5e5],[26000,3e5],
    [28000,3.5e5],[30000,4e5],[32000,4.5e5],[34000,5e5],[36000,6e5],[38000,7e5],[40000,8e5],[42000,9e5],[44000,1e6],[46000,1.2e6],
    [48000,1.4e6],[50000,1.6e6],[52000,1.8e6],[54000,2e6],[56000,2.5e6],[58000,3e6],[60000,3.5e6],[62000,4e6],[64000,4.5e6],[66000,5e6],
    [68000,5.5e6],[70000,6e6],[75000,7e6],[80000,8e6],[85000,9e6],[90000,1e7],[95000,1.2e7],[1e5,1.4e7],[1.05e5,1.6e7],[1.1e5,1.8e7],
    [1.15e5,2e7],[1.20e5,2.5e7],[1.25e5,3e7],[1.30e5,3.5e7],[1.35e5,4e7],[1.40e5,4.5e7],[1.45e5,5e7],[1.50e5,6e7],
    [1.55e5,7e7],[1.60e5,8e7],[1.65e5,9e7],[1.70e5,1e8],[1.75e5,1.2e8],[1.80e5,1.4e8],[1.85e5,1.6e8],[1.90e5,1.8e8],[1.95e5,2e8],[2.00e5,2.5e8]
]
function CalcPetNeed(){
    for(let i=0;i<PetNeed.length;i++){
        if(player.petUpgradeLv<PetNeed[i][0]){
            return PetNeed[i][1]
        }
    }
    return CalcBigPetNeed()[1]
}
function CalcBigPetNeed(){
    let m=player.petUpgradeLv-2e5
    let ls=[3,3.5,4,4.5,5,6,7,8,9,10,12,14,16,18,20,25],bs=n(1e8)
    let mx=2e5+Math.ceil((m+1)/10000)*10000,nd=bs.mul(n(10).pow(Math.floor((mx-2e5)/(10000*ls.length)))).mul(ls[Math.floor((mx-2e5-Math.floor((mx-2e5)/(10000*ls.length))*(10000*ls.length))/10000)])
    return [mx,nd]
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
    [1200,1500],[1400,2000],[1600,3000],[1800,4000],[2000,5000],[2200,6000],[2400,8000],[2600,10000],[3000,12000],[3500,15000],[4000,20000],
    [4500,25000],[5000,30000],[6000,45000],[7000,60000],[8000,80000],[9000,1e5],[10000,1.2e5],[11000,1.5e5],[12000,2e5],
    [13000,2.5e5],[14000,3e5],[15000,3.5e5],[16000,4e5],[17000,4.5e5],[18000,5e5],[20000,6e5],[22000,7e5],[24000,8e5],[26000,9e5],
    [28000,1e6],[30000,1.2e6],[32000,1.4e6],[34000,1.6e6],[36000,1.8e6],[38000,2e6],[40000,2.5e6],[42000,3e6],[44000,3.5e6],[46000,4e6],
    [48000,4.5e6],[50000,5e6],[52000,6e6],[54000,7e6],[56000,8e6],[58000,9e6],[60000,1e7],[62000,1.2e7],[64000,1.4e7],[66000,1.6e7],
    [68000,1.8e7],[70000,2e7],[75000,2.5e7],[80000,3e7],[85000,3.5e7],[90000,4e7],[95000,4.5e7],[1e5,5e7]
]
function CalcSkillNeed(){
    for(let i=0;i<SkillNeed.length;i++){
        if(player.skillUpgradeLv<SkillNeed[i][0]){
            return SkillNeed[i][1]
        }
    }
    return CalcBigSkillNeed()[1]
}
function CalcBigSkillNeed(){
    let m=player.skillUpgradeLv-1e5
    let ls=[6,7,8,9,10,12,14,16,18,20,25,30,35,40,45,50],bs=n(1e7)
    let mx=1e5+Math.ceil((m+1)/10000)*10000,nd=bs.mul(n(10).pow(Math.floor((mx-100000)/(10000*ls.length)))).mul(ls[Math.floor((mx-1e5-Math.floor((mx-1e5)/(10000*ls.length))*(10000*ls.length))/10000)])
    return [mx,nd]
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
const InfinityNeed=[
    [100,200],[200,300],[300,500],[400,750],[500,1000],[700,1500],[1000,2000],[1200,2500],[1500,3000],[2000,3500],[2500,4000],[3000,5000],
    [3500,6500],[4000,8000],[5000,10000],[6000,15000],[7000,20000],[8000,25000],[9000,30000],[10000,40000],[11000,50000],[12000,60000],
    [13000,70000],[14000,80000],[15000,90000],[16000,1e5],[17000,1.2e5],[18000,1.4e5],[19000,1.6e5],[20000,1.8e5],[22000,2e5],
    [24000,2.5e5],[26000,3e5],[28000,3.5e5],[30000,4e5],[32000,4.5e5],[34000,5e5],[36000,6e5],[38000,7e5],[40000,8e5],[42000,9e5],
    [44000,1e6],[46000,1.2e6],[48000,1.4e6],[50000,1.6e6],[52000,1.8e6],[54000,2e6],[56000,2.5e6],[58000,3e6],[60000,3.5e6],[62000,4e6],
    [64000,4.5e6],[66000,5e6],[68000,6e6],[70000,7e6],[72000,8e6],[74000,9e6],[76000,1e7],[78000,1.2e7],[80000,1.4e7]
]
function CalcInfinityNeed(){
    for(let i=0;i<InfinityNeed.length;i++){
        if(player.infinityUpgradeLv<InfinityNeed[i][0]){
            return InfinityNeed[i][1]
        }
    }
    return CalcBigInfinityNeed()[1]
}
function CalcBigInfinityNeed(){
    let m=player.infinityUpgradeLv-80000
    let ls=[1.6,1.8,2,2.5,3,3.5,4,4.5,5,6,7,8,9,10,12,14],bs=n(1e7)
    let mx=80000+Math.ceil((m+1)/5000)*5000,nd=bs.mul(n(10).pow(Math.floor((mx-80000)/(5000*ls.length)))).mul(ls[Math.floor((mx-80000-Math.floor((mx-80000)/(5000*ls.length))*(5000*ls.length))/5000)])
    return [mx,nd]
}
function InfinityUpgrade(type){
    if(type==0){
        if(player.bag[40]<CalcInfinityNeed()){
            NotEnough(40)
        }
        else{
            player.bag[40]-=CalcInfinityNeed()
            player.infinityUpgradeLv+=1
            logs.push("成功升级 1级 无限宝石强化")
        }
    }
    else{
        let count=0
        while(player.bag[40]>=CalcInfinityNeed()){
            player.bag[40]-=CalcInfinityNeed()
            player.infinityUpgradeLv+=1
            count+=1
        }
        if(count==0){
            NotEnough(40)
        }
        else{
            logs.push("成功升级 "+count+"级 无限宝石强化")
        }
    }
}
const PartnerNeed=[
    [100,100],[200,150],[300,200],[400,300],[500,400],[600,500],[700,650],[800,800],[900,1000],[1000,1200],
    [1200,1500],[1400,2000],[1600,3000],[1800,4000],[2000,5000],[2200,6000],[2400,8000],[2600,10000],[3000,12000],[3500,15000],[4000,20000],
    [4500,25000],[5000,30000],[6000,45000],[7000,60000],[8000,80000],[9000,1e5],[10000,1.2e5],[11000,1.5e5],[12000,2e5],
    [13000,2.5e5],[14000,3e5],[15000,3.5e5],[16000,4e5],[17000,4.5e5],[18000,5e5],[20000,6e5],[22000,7e5],[24000,8e5],[26000,9e5],
    [28000,1e6],[30000,1.2e6],[32000,1.4e6],[34000,1.6e6],[36000,1.8e6],[38000,2e6],[40000,2.5e6],[42000,3e6],[44000,3.5e6],[46000,4e6],
    [48000,4.5e6],[50000,5e6],[52000,6e6],[54000,7e6],[56000,8e6],[58000,9e6],[60000,1e7],[62000,1.2e7],[64000,1.4e7],[66000,1.6e7],
    [68000,1.8e7],[70000,2e7],[75000,2.5e7],[80000,3e7],[85000,3.5e7],[90000,4e7],[95000,4.5e7],[1e5,5e7]
]
function CalcPartnerNeed(){
    for(let i=0;i<PartnerNeed.length;i++){
        if(player.partnerUpgradeLv<PartnerNeed[i][0]){
            return PartnerNeed[i][1]
        }
    }
    return CalcBigPartnerNeed()[1]
}
function CalcBigPartnerNeed(){
    let m=player.partnerUpgradeLv-1e5
    let ls=[6,7,8,9,10,12,14,16,18,20,25,30,35,40,45,50],bs=n(1e7)
    let mx=1e5+Math.ceil((m+1)/10000)*10000,nd=bs.mul(n(10).pow(Math.floor((mx-100000)/(10000*ls.length)))).mul(ls[Math.floor((mx-1e5-Math.floor((mx-1e5)/(10000*ls.length))*(10000*ls.length))/10000)])
    return [mx,nd]
}
function PartnerUpgrade(type){
    if(type==0){
        if(player.bag[56]<CalcPartnerNeed()){
            NotEnough(56)
        }
        else{
            player.bag[56]-=CalcPartnerNeed()
            player.partnerUpgradeLv+=1
            logs.push("成功升级 1级 后宫强化")
        }
    }
    else{
        let count=0
        while(player.bag[56]>=CalcPartnerNeed()){
            player.bag[56]-=CalcPartnerNeed()
            player.partnerUpgradeLv+=1
            count+=1
        }
        if(count==0){
            NotEnough(56)
        }
        else{
            logs.push("成功升级 "+count+"级 后宫强化")
        }
    }
}
const HeroNeed=[
    [100,100],[200,200],[300,500],[400,1000],[500,1500],[700,2000],[1000,3000],[1200,4000],[1500,5000],[2000,7000],[2500,9000],[3000,12000],[3500,15000],
    [4000,20000],[4500,30000],[5000,50000],[5500,75000],[6000,1e5],[6500,1.5e5],[7000,2e5],[7500,2.5e5],[8000,3e5],[8500,3.5e5],[9000,4e5],
    [9500,4.5e5],[10000,5e5],[11000,6e5],[12000,7e5],[13000,8e5],[14000,9e5],[15000,1e6],
    [16000,1.2e6],[17000,1.4e6],[18000,1.6e6],[19000,1.8e6],[20000,2e6],[21000,2.5e6],[22000,3e6],
    [23000,3.5e6],[24000,4e6],[25000,4.5e6],[26000,5e6],[27000,6e6],[28000,7e6],[29000,8e6],[30000,9e6],
    [32000,1e7],[34000,1.2e7],[36000,1.4e7],[38000,1.6e7],[40000,1.8e7],[42000,2e7],[44000,2.5e7],
    [46000,3e7],[48000,3.5e7],[50000,4e7]
]
function CalcHeroNeed(){
    for(let i=0;i<HeroNeed.length;i++){
        if(player.heroUpgradeLv<HeroNeed[i][0]){
            return HeroNeed[i][1]
        }
    }
    return CalcBigHeroNeed()[1]
}
function CalcBigHeroNeed(){
    let m=player.heroUpgradeLv-50000
    let ls=[5,6,7,8,9,10,12,14,16,18,20,25,30,35,40,45],bs=n(1e7)
    let mx=50000+Math.ceil((m+1)/2000)*2000,nd=bs.mul(n(10).pow(Math.floor((mx-50000)/(2000*ls.length)))).mul(ls[Math.floor((mx-50000-Math.floor((mx-50000)/(2000*ls.length))*(2000*ls.length))/2000)])
    return [mx,nd]
}
function HeroUpgrade(type){
    if(type==0){
        if(player.bag[63]<CalcHeroNeed()){
            NotEnough(63)
        }
        else{
            player.bag[63]-=CalcHeroNeed()
            player.heroUpgradeLv+=1
            logs.push("成功升级 1级 英雄强化")
        }
    }
    else{
        let count=0
        while(player.bag[63]>=CalcHeroNeed()){
            player.bag[63]-=CalcHeroNeed()
            player.heroUpgradeLv+=1
            count+=1
        }
        if(count==0){
            NotEnough(63)
        }
        else{
            logs.push("成功升级 "+count+"级 英雄强化")
        }
    }
}