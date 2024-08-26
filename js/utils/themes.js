// ************ Themes ************
const themes = {
	0:"Default",
	1:"10%",
	2:"20%",
	3:"30%",
	4:"40%",
	5:"50%",
};
const theme_names = {
	0:"Default",
	1:"10%",
	2:"20%",
	3:"30%",
	4:"40%",
	5:"50%",
};
function changeTheme() {
	colors_theme = colors["default"];
	document.body.style.setProperty('--background', "#efefef");
	document.body.style.setProperty('--background_tooltip',"rgba(255, 255, 255, 0.75)");
	document.body.style.setProperty('--color',  "#dfdfdf");
	document.body.style.setProperty('--points',"#ffffff");
	document.body.style.setProperty("--locked","#bf8f8f");
}
function getThemeName() {
	return theme_names[player.themeId];
}
function switchTheme() {
	player.themeId+=1
	if(player.themeId>5){
		player.themeId-=6
	}
	changeTheme();
	resizeCanvas();
}