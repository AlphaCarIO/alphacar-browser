let Car = Car || {}
Car.Boot = function(game) {}
Car.Boot.prototype = {
	preload: function() {
		//this.load.image('preloaderBar', 'images/preloader-bar.jpg')
	},
	create: function() {
		// 触摸点数
		this.input.maxPointers = 1;
		// 缩放方式
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// 水平居中
		this.scale.pageAlignHorizontally = true;
		// 垂直居中
		this.scale.pageAlignVertically = true;
		this.state.start('preloader');
		Car.W = this.game.width
		Car.H = this.game.height
	}
}

Car.Preloader = function(game) {
	Car.GAME_W = 640
	Car.GAME_H = 1008
	this.loadText = null
}

Car.Preloader.prototype = {
	create: function() {

		this.load.onLoadStart.add(this.loadStart, this)
		this.load.onFileComplete.add(this.fileComplete, this)
		this.load.onLoadComplete.add(this.loadComplete, this)

		this.loadText = this.add.text(Car.GAME_W / 2 - 40, Car.GAME_H / 2 - 60, '0', {
			fill: '#ffffff',
			font: "100px 微软雅黑",
			align: "center"
		})

		this.loading()
	},
	loadStart: function(total) {
		console.log("load start: " + total)
	},
	/**
	 * [fileComplete description]
	 * @param  {[type]} progress    [进度百分比]
	 * @param  {[type]} cacheKey    [文件名称]
	 * @param  {[boolean]} success  [是否成功]
	 * @param  {[type]} totalLoaded [加成完成的个数]
	 * @param  {[type]} totalFiles  [文件总数]
	 * @return {[type]}             [description]
	 */
	fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
		this.loadText.setText(progress)
		console.log("File Complete: " + progress + "% - " + cacheKey + "static: " + success + " " + totalLoaded + " out of " + totalFiles)
	},
	loadComplete: function() {
		this.state.start('menu')
	},
	loading: function() {
		this.stage.backgroundColor = '#000'

		//首页
		let base_path = 'static/car_snap_assets';

		this.load.image('index-bg', base_path + '/images/index-bg.jpg')
		this.load.image('btn-ad', base_path + '/images/btn-ad.png')
		this.load.image('btn-drive', base_path + '/images/btn-drive.png')
		this.load.image('btn-intro', base_path + '/images/btn-intro.png')
		this.load.image('btn-prize', base_path + '/images/btn-prize.png')
		this.load.image('btn-drive', base_path + '/images/btn-drive.png')
		this.load.image('btn-rank-index', base_path + '/images/btn-rank-index.png')
		this.load.spritesheet('btn-start', base_path + '/images/btn-start.png',185,187)
		this.load.image('btn-weixin', base_path + '/images/btn-weixin.png')

		//游戏
		this.load.image('map', base_path + '/images/map.jpg')
		this.load.image('kuang', base_path + '/images/kuang.png')
		this.load.image('mark', base_path + '/images/mark.png')
		this.load.image('share', base_path + '/images/share.png')
		this.load.image('btn-again', base_path + '/images/btn-again.png')
		this.load.image('btn-rank', base_path + '/images/btn-rank.png')
		this.load.image('cloud-01', base_path + '/images/cloud-01.png')
		this.load.image('cloud-02', base_path + '/images/cloud-02.png')
		this.load.image('cloud-03', base_path + '/images/cloud-03.png')
		this.load.spritesheet('photo', base_path + '/images/photo.png', 135, 145)
		this.load.spritesheet('btn-pai', base_path + '/images/btn-pai.png', 296, 296)
		this.load.spritesheet('car', base_path + '/images/carsprite.png', 173, 299)

		// 音效
		this.load.audio('bg-audio', base_path + '/audio/bg.mp3')
		this.load.audio('btn-audio', base_path + '/audio/btn.mp3')
		this.load.audio('photo-audio', base_path + '/audio/photo.mp3')
		this.load.audio('pai-audio', base_path + '/audio/pai.mp3')
		this.load.audio('gameover-audio', base_path + '/audio/gameover.mp3')

		this.load.start()
	}
}

Car.Menu = function(game) {}

Car.Menu.prototype = {
	create: function() {
		let bgMusic = this.add.audio('bg-audio', 1, true)
		bgMusic.play('', 0, 1, true)
		this.state.start('game')
		return
		var fontStyle = {
			font: "18px 微软雅黑",
			fill: "#000",
			align: "right"
		}
		var popIntro = document.getElementById('game-intro')
		var popClose = document.getElementsByClassName("game-intro-close")[0]

		this.add.sprite(0, 0, 'index-bg')
		var btnWX = this.add.sprite(Car.W - 100, 40, 'btn-weixin')
		this.add.text(Car.W - 150, 120, "关注一汽奔腾", fontStyle)
		var btnRank = this.add.sprite(Car.W - 100, 160, 'btn-rank-index')
		this.add.text(Car.W - 96, 240, "排行榜", fontStyle)
		var btnPrize = this.add.sprite(Car.W - 100, 270, 'btn-prize')
		this.add.text(Car.W - 96, 350, "礼物盒", fontStyle)
		var btnAd = this.add.sprite(Car.W - 260, 0, 'btn-ad')

		var btnIntro = this.add.sprite(30, Car.H - 180, 'btn-intro')
		var btnDrive = this.add.sprite(448, Car.H - 180, 'btn-drive')
		btnIntro.inputEnabled = true
		btnDrive.inputEnabled = true
		btnIntro.events.onInputDown.add(function() {
			popIntro.style.display = "block"
		}, this);
		popClose.ontouchend = function(){
			popIntro.style.display = "none"
		}

		this.add.button(Car.W / 2 - 92, Car.H - 240, 'btn-start', this.startGame, this, 0, 0, 1)
			//btnStrat.onInputDown.add(this.startGame, this)

	},
	startGame: function() {
		this.state.start('game')
	}
}

Car.Game = function(game) {
	this._car = null
	this._over = false
	this._ok = false
	this._play = true
	this.photoCount = 0
	this.photoItem = []
	this.photoAnim = true
	this.speed = 3000
	this.level = 1
	this.isUp = null

	this.btnPai = null

	Car.photo = 0
	Car.film = 5
	Car.filmText = null
	Car.photoText = null
}

Car.Game.prototype = {
	create: function() {
		var _this = this
		this.add.sprite(0, 0, 'map')
		this._car = this.add.sprite(150, -300, 'car', 0)

		setTimeout(function() {
			_this.resetCar()
		}, 1000)

		this._fontStyle = {
			font: "36px 微软雅黑",
			fill: "#fff",
			strokeThickness: 1,
			align: "center"
		}

		Car.photoText = this.add.text(294, 55, "0", this._fontStyle)
		Car.filmText = this.add.text(115, 55, Car.film, this._fontStyle)

		var mark = this.add.sprite(24, -43, 'mark')
		var kuang = this.add.sprite(Car.GAME_W / 2 - 241, 211, 'kuang')

		//console.log(this.game);
		//this.btnPai = this.add.button(Car.GAME_W / 2 - 148, Car.GAME_H, 'btn-pai', null, this, 0, 0, 1)
		this.btnPai = this.add.sprite(Car.GAME_W / 2 - 148, Car.GAME_H, 'btn-pai')
		this.btnPai.inputEnabled = true;
		/*
		this.btnPai.input.useHandCursor = true
		this.btnPai.input.pixelPerfectOver = true
		*/

		kuang.alpha = 0

		this.add.tween(mark).to({
			y: 43
		}, 500, Phaser.Easing.Linear.None, true, false)

		this.add.tween(kuang).to({
			alpha: 1
		}, 500, Phaser.Easing.Linear.None, true, false)

		this.add.tween(this.btnPai).to({
			y: 710
		}, 500, Phaser.Easing.Linear.None, true, false)

		this.btnPai.events.onInputDown.add(this.pai, this.btnPai)
		//this.btnPai.onInputDown.add(this.pai, this.btnPai)

		this.photoMusic = this.add.audio('photo-audio')
		this.paiMusic = this.add.audio('pai-audio')
		this.overMusic = this.add.audio('gameover-audio')
		this.btnMusic = this.add.audio('btn-audio')

		this.cloud1 = this.add.sprite(-300, 200, 'cloud-01')
		this.cloud2 = this.add.sprite(-300, 50, 'cloud-02')
		this.cloud3 = this.add.sprite(0, 1008, 'cloud-03')
		this.cloud1.visible = false
		this.cloud2.visible = false
		this.cloud3.visible = false
			//this.dataURI = this.game.canvas.toDataURL()
			//this.input.addMoveCallback(this.getPoint, this);
	},
	getPoint: function(p, x, y) {
		console.log("X: " + x, "  Y: " + y)
	},
	managePause: function() {
		if (this._play) {
			this.tween.pause()
		} else {
			this.tween.resume()
		}
		this._play = !this._play
	},
	update: function() {
		if (this._car !== null) {
			if (this._car.y === (this.isUp ? -300 : 1008)) {
				if (this._ok) {
					this.resetCar()
					this._ok = false
				} else {
					this.overMusic.play()
					this.gameOver()
				}
			}
		}
	},
	record: function() {
		//ajax
	},
	resetCar: function() {
		var num = Math.floor(Math.random() * 8)
		this.isUp = num > 3 ? true : false
		this._car.frame = num
		this._car.x = this.isUp ? 370 : 150
		this._car.y = this.isUp ? 1008 : -300
			//this._car.angle = Math.random() > 0.5 ? -Math.floor(Math.random() * 40) : Math.floor(Math.random() * 40)
		this.add.tween(this._car).to({
			y: this.isUp ? -300 : 1008
		}, this.speed, Phaser.Easing.Linear.None, true, false)
		this.addCloud()
	},
	removePhoto: function(obj) {
		obj && obj.destroy()
	},
	gameOver: function() {
		this.game.paused = true
		console.log("游戏结束！")
		this.overMusic.play()

		if (Car.film === 0) {
			this.input.onDown.remove(this.again, this)
			alert("没有胶卷啦！")
		} else {
			Car.film--;
			this.input.onDown.add(this.again, this)
		}

		Car.filmText.setText(Car.film)

		this.speed = 3000

		this.share = this.add.sprite(0, 0, 'share')
		this.btnAgain = this.add.sprite(Car.GAME_W / 2 - 131, 506, 'btn-again')
		this.btnRank = this.add.sprite(Car.GAME_W / 2 - 131, 608, 'btn-rank')


	},
	again: function(e) {
		console.log('(x, y) =(', e.x, ',', e.y, ")")
		var c = Car.GAME_W / 2
		var x1 = c - 131,
			y1 = 506,
			x2 = c + 131,
			y2 = 589,
			y3 = 608,
			y4 = 691;
		var _this = this
		if (this.game.paused) {
			// 再试一次
			if (e.x > x1 && e.x < x2 && e.y > y1 && e.y < y2) {
				this.btnMusic.play()
				console.log("再来一次")
				if (this.photoItem) {
					for (var key in this.photoItem) {
						this.removePhoto(this.photoItem[key])
					}
				}
				Car.photo = 0
				Car.photoText.setText(Car.photo)
				this.share.destroy()
				this.btnAgain.destroy()
				this.btnRank.destroy()
				this.resetCar()
				this.photoCount = 0
				this.photoItem.length = 0

				_this.game.paused = false
			} else if (e.x > x1 && e.x < x2 && e.y > y3 && e.y < y4) {
				// 排行榜
				this.btnMusic.play()
				console.log("排行榜")
			} else {
				return
			}
		}
	},
	photoToScore: function(callback) {
		var _this = this
		var length = this.photoItem.length
		for (var key in this.photoItem) {
			this.add.tween(this.photoItem[key]).to({
				x: 226,
				y: 49,
				width: 40,
				height: 40,
				angle: 0,
			}, 1000, Phaser.Easing.Back.In, true, false).delay(key).onComplete.add(this.removePhoto, this)
		}
		this.photoMusic.play()
		this.photoCount = 0
		this.photoItem.length = 0
	},
	addPhoto: function() {
		if (this.photoCount === 5) {
			this.photoToScore()
		}
		var item = this.add.sprite(222, 376, 'photo')
		var angle = Math.floor(Math.random() * 10) > 5 ? Math.floor(Math.random() * 30) : -Math.floor(Math.random() * 30)
		item.alpha = .1
		this.photoCount++;
		this.photoItem.push(item)
		this.add.tween(item).to({
			x: 597,
			y: 224 + (this.photoCount === 1 ? 0 : this.photoCount * 90),
			alpha: 1,
			angle: angle
		}, 1000, Phaser.Easing.Back.Out, true, false);
	},
	pai: function(e) {
		console.log('pai (x, y) =(', e.x, ',', e.y, ")")
		console.log(this._car.y)
		this.paiMusic.play()
		if (this._car.y > 200 && this._car.y < 410) {
			document.getElementById('shan').style.display = "block"
			Car.photo++;
			Car.photoText.setText(Car.photo)
			this.updateLevel()
			setTimeout(function() {
				document.getElementById('shan').style.display = "none"
			}, 100)
			this.addPhoto()
			this._ok = true
		} else {
			this.gameOver()
		}
	},
	updateLevel: function() {
		if (Car.photo % 5 === 0 && this.speed > 900) {
			this.speed = this.speed - 300
		} else if (this.speed < 900) {
			this.speed = this.speed - 10
		} else {
			this.speed = this.speed - 50
		}
		this.level = 1 + Car.photo / 5
		console.log(this.level)
	},
	addCloud: function() {
		if (this.level === 3) {
			this.cloud1.visible = true
			this.add.tween(this.cloud1).to({
				x: 640
			}, 3000, Phaser.Easing.Linear.None, true, false)
		} else if (this.level === 4) {
			this.cloud2.visible = true
			this.add.tween(this.cloud2).to({
				x: 640
			}, 3000, Phaser.Easing.Linear.None, true, false)
		} else if (this.level === 5) {
			this.cloud3.visible = true
			this.add.tween(this.cloud3).to({
				y: 900
			}, 3000, Phaser.Easing.Linear.None, true, false)
		}
	},
	render:function(){
		var debug = this.game.debug
		debug.inputInfo(32, 32);
		debug.spriteInputInfo(this.btnPai, 32, 170);
		debug.pointer(this.game.input.activePointer);
	}
}

export default Car;
