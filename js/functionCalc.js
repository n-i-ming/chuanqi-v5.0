function CalcAttribute(){
    player.hpmax=n(100).mul(player.lv)
    player.atk=n(10).mul(player.lv)
    player.def=n(10).mul(player.lv)
    player.hit=n(100).add(n(5).mul(player.lv))
    player.criticalDamage=n(200)
    player.damageAdd=n(100)
    player.damageMinus=n(0)

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
    let list=["hpmax","atk","def","hit"]
    for(let i=0;i<list.length;i++){
        player[list[i]]=player[list[i]].mul(n(1).add(n(0.01).mul(player.spiritLv[i])))
    }
    player.atk=player.atk.mul(n(1).add(n(meridianAttribute[player.meridianLv[0][0]][1]+meridianAttribute[player.meridianLv[0][0]][2]*Math.ceil(player.meridianLv[0][1]/2)).div(100)))
    player.hit=player.hit.mul(n(1).add(n(meridianAttribute[player.meridianLv[0][0]][1]+meridianAttribute[player.meridianLv[0][0]][2]*Math.floor(player.meridianLv[0][1]/2)).div(100)))
    player.hpmax=player.hpmax.mul(n(1).add(n(meridianAttribute[player.meridianLv[1][0]][1]+meridianAttribute[player.meridianLv[1][0]][2]*Math.ceil(player.meridianLv[1][1]/2)).div(100)))
    player.def=player.def.mul(n(1).add(n(meridianAttribute[player.meridianLv[1][0]][1]+meridianAttribute[player.meridianLv[1][0]][2]*Math.floor(player.meridianLv[1][1]/2)).div(100)))
    player.damageAdd=player.damageAdd.add(n(5).mul(player.meridianLv[0][0]))
    player.damageMinus=player.damageMinus.add(n(5).mul(player.meridianLv[1][0]))
    player.fightAbility=n(1).mul(player.hpmax).mul(player.atk).mul(player.def).mul(player.hit).mul(player.criticalDamage).mul(player.damageAdd.add(100)).mul(player.damageMinus.add(100))
}
const expNeed=[
    [100,n(10)],[200,n(100)],[500,n(500)],[1000,n(1000)],[1500,n(2000)],[2000,n(3000)],[3000,n(5000)],[4000,n(7000)],[5000,n(10000)]
]
function CalcExpNeed(){
    for(let i=0;i<expNeed.length;i++){
        if(player.lv<=expNeed[i][0]){
            return expNeed[i][1]
        }
    }
    return n(1e308)
}
const spiritNeed=[
    [100,10],[200,15],[300,20],[400,25],[500,30],[600,35],[700,40],[1000,50]
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