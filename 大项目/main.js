console.log("加载成功");

//配置当前index.html引入的所有.js文件
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"parabola": "parabola",
		"index": "index",
		"banner": "banner",
		"look" : "look"
	},
	shim: {
		//设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
		//抛物线不支持AMD规范
		"parabola": {
			exports: "_"
		}
	}
})

require(["banner", "index","look"], function(banner, index,look){
	banner.move(); //让轮播图效果生效
	index.index();
	look.look()
})