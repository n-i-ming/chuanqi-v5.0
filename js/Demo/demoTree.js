// treeLayout will override the default tree's layout if used
var layoutInfo = {
    startTab: "c",
    startNavTab: "tree-tab",

	showTree: true,

    //treeLayout: ""

    
}

// A "ghost" layer which offsets f in the tree
addNode("spook", {
    row: 1,
    layerShown: "ghost",
}, 
)


// A "ghost" layer which offsets f in the tree
addNode("g", {
    symbol: "TH",
    branches: ["c"],
    color: '#6d3678',
    layerShown: true,
    canClick() {return player.points.gte(10)},
    tooltip: "Thanos your points",
    tooltipLocked: "Thanos your points",
    onClick() {player.points = player.points.div(2)
    console.log(this.layer)}

}, 
)


// A "ghost" layer which offsets f in the tree
addNode("h", {
    branches: ["g"],
    layerShown: true,
    tooltip() {return "Restore your points to " + player.c.otherThingy},
    tooltipLocked() {return "Restore your points to " + player.c.otherThingy},
    row: "side",
    canClick() {return player.points.lt(player.c.otherThingy)},
    onClick() {player.points = new OmegaNum(player.c.otherThingy)}
}, 
)

addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
                style() {return  {'background-color': '#222222'}},

})