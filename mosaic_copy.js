var customMosaic = (function() {

	var x = 1;
	var y = 1;
	var meta;
	var density = 10;
	var distance = 0;
	var selected = [];
	var selectedX = [];
	var selectedY = [];
	var center = [];
	var shape = '';
	var opacity_array = [ '#9e9e9ed1', '#dcdbdbc4',
			'rgba(191, 191, 191, 0.89)', '#d0d0d0eb',
			'rgba(214, 214, 214, 0.89)' ];
	var opacity_num = 0;

	function init(arg) {

		this.meta = arg;

		/* for(var i=1; i <1723; i++){ */
		/* for(var i=1; i <6724; i++){ */
		$('.mosaic-body').css('width', this.meta.width);
		$('.mosaic-body').css('height', this.meta.height);
		$('.mosaic-body').css('left', (1-(this.meta.width/Number($('.mosaic-left').css('width').replace('px',''))))*35+"%" );



		for (var i = 1; i < (this.meta.width/density)*(this.meta.height/density); i++) {
			var div = document.createElement("div");
			div.setAttribute("class", "mosaic-part");
			div.onclick = onclick.bind(this);
			div.onmouseover=onmouseover.bind(this);
			div.style.background = 'url(/resources/img/wb.jpg)';
			$(div).css("background-size", this.meta.width*density +"% "+this.meta.height*density+"%");
			/*$(div).css("background-size", "8200% 8200%");*/
			/* $(div).css("background-size", "2050% 2050%") */

			/* 10px */
			/*
			 * $(div).css("background-position-x", (410-((x-1)*10))+"px");
			 * $(div).css("background-position-y", (410-((y-1)*10))+"px");
			 */

			/* 5px */
		/*	$(div).css("background-position-x", (410 - ((x - 1) * 5)) + "px");
			$(div).css("background-position-y", (410 - ((y - 1) * 5)) + "px");*/

			$(div).css("background-position-x", (this.meta.width - ((x - 1) * density)) + "px");
			$(div).css("background-position-y", (this.meta.height - ((y - 1) * density)) + "px");

			$(div).css("width", density+"px");
			$(div).css("height", density+"px");


			// $(div).css("filter", "blur(3px)");
		/*	if (x == 83) {*/
			if (x == Math.abs((this.meta.width/density)+1)) {
				x = 1;
				y++;
			} else {
				div.setAttribute('x', x);
				div.setAttribute('y', y);
				x++;
				$('.mosaic-body').append(div);
			}
		}
		y = 1;
	}

	function onmouseover(event) {


		$this = this;
		if (selected.length == 1) {

			[].forEach.call($('.mosaic-part'), function(e, i) {

				var x_value_ = Number($(e).attr("x"));
				var y_value_ = Number($(e).attr("y"));
				var x_value = Math.abs($(e).offset().left);
				var y_value = Math.abs($(e).offset().top);

				var r_value = Math.floor(Math.random() * 7);

				// $(e).css('background', '');
				// $(e).css("background-color", opacity_array[opacity_num]);

			/*	if (x_value > (selected[0].x - 1)
						&& x_value < (Number(event.currentTarget
								.getAttribute('x')) + 1)) {

					if (y_value > (selected[0].y - 1)
							&& y_value < (Number(event.currentTarget
									.getAttribute('y')) + 1)) {
*/
				if (x_value > (selected[0].x - 10)
						&& x_value < (Math.abs($(event.currentTarget).offset().left)+ 10)) {

					if (y_value > (selected[0].y - 10)
							&& y_value < (Math.abs($(event.currentTarget).offset().top) + 10)) {



						// if((x_value+y_value+r_value)%2==0){
						// e.setAttribute('class', 'mosaic-part selected-odd');
						// }else{
						// e.setAttribute('class', 'mosaic-part selected-even');
						// }

						// $(e).css("filter", "blur(3px)");

						if (opacity_num > 4) {
							if ((x_value) % 2 == 0) {
								opacity_num = 1;
							} else {
								opacity_num = 0;
							}

						}
						$(e).css('background', '');
						$(e).css("background-color",opacity_array[opacity_num]);

						opacity_num++;

						// $(e).css("background-size", "4100% 4100%");
						// $(e).css("background-position-x",
						// (410-((x_value-1)*2))-8+"px");
						// $(e).css("background-position-y",
						// (410-((y_value-1)*2))-8+"px");

					} else {
						// 사진원복
						$(e).css("background", 'url(/resources/img/wb.jpg)');
						$(e).css("background-size", $this.meta.width*density +"% "+$this.meta.height*density+"%");
						$(e).css("background-position-x", ($this.meta.width - ((x_value_ - 1) * density)) + "px");
						$(e).css("background-position-y", ($this.meta.height - ((y_value_ - 1) * density)) + "px");
					}
				} else {

					// 사진원복
					$(e).css("background", 'url(/resources/img/wb.jpg)');
					$(e).css("background-size", $this.meta.width*density +"% "+$this.meta.height*density+"%");
					$(e).css("background-position-x", ($this.meta.width - ((x_value_ - 1) * density)) + "px");
					$(e).css("background-position-y", ($this.meta.height - ((y_value_ - 1) * density)) + "px");

				}

			});
		}

	}

	function onclick(event) {

		$this = this;


		if (selected.length == 0) {



			selected.push({
				x_ : event.currentTarget.getAttribute("x"),
				y_ : event.currentTarget.getAttribute("y"),
				x : Math.abs(Math.abs($(event.currentTarget).offset().left)),
				y : Math.abs(Math.abs($(event.currentTarget).offset().top))
			});
		} else if (selected.length == 1) {

			selected.push({
				x_ : event.currentTarget.getAttribute("x"),
				y_ : event.currentTarget.getAttribute("y"),
				x : Math.abs(event.pageX),
				y : Math.abs(event.pageY)
			});
			// var opacity_array = ['0.5','0.1','0.3','0.2'];
			var x_distance = Math.abs(selected[1].x - selected[0].x) / 2;
			var y_distance = Math.abs(selected[1].y - selected[0].x) / 2;

			[].forEach.call($('.mosaic-part'), function(e) {

				var x_value_ = $(e).attr("x");
				var y_value_ = $(e).attr("y");
				var x_value = Math.abs($(e).offset().left);
				var y_value = Math.abs($(e).offset().top);


				var r_value = Math.floor(Math.random() * 7);

				if ($this.shape == "square") {
					if (x_value > (selected[0].x - 1)&& x_value < (Number(selected[1].x) + 1)) {
						selectedX.push({
							x : x_value,
							y : y_value
						});

						if (y_value > (selected[0].y - 1)&& y_value < (selected[1].y + 1)) {
							selectedY.push({
								x : x_value,
								y : y_value
							});
							// if((x_value+y_value+r_value)%2==0){
							// e.setAttribute('class', 'mosaic-part
							// selected-odd');
							// }else{
							// e.setAttribute('class', 'mosaic-part
							// selected-even');
							// }
							// e.style.background =
							// 'url(/resources/img/abc2.jpg)';
							// $(e).css("background-position-x",
							// (410-((x-1)*10))+"px");
							// $(e).css("background-position-y",
							// (410-((y-1)*10))+"px");

							if (opacity_num > 4) {
								if ((selected[1].x) % 2 == 0) {
									opacity_num = 1;
								} else {
									opacity_num = 0;
								}
							}
							$(e).css('background', '');
							$(e).css("background-color",
									opacity_array[opacity_num]);

							// $(e).css("background",
							// 'url(/resources/img/wb.jpg)');
							//
							// $(e).css("background-size", "4100% 4100%");
							// $(e).css("background-position-x",
							// (410-((x_value-1)*2))+"px");
							// $(e).css("background-position-y",
							// (410-((y_value-1)*2))+"px");

							opacity_num++;
						}
					}

				} else {

				}

			});

			this.opacity_num = 0;
			selected = [];

			// $('.mosaic-part').css('border', '1px solid rgba(128, 128, 128,
			// 0)');
		}
	}

	function render() {

		// $('.mosaic-body').css('background','url(/resources/img/wb.jpg)');
		[].forEach.call($('.mosaic-part'), function(e) {

			var x_value = $(e).attr("x");
			var y_value = $(e).attr("y");
			var r_value = Math.floor(Math.random() * 7);

			if (x_value > (selected[0].x - 1)
					&& x_value < (Number(selected[1].x) + 1)) {
				if (y_value > (selected[0].y - 1)
						&& y_value < (selected[1].y + 1)) {

				} else {
					$(e).css('background', '');
					$(e).css('border', ' 0px solid transparent;');
				}
			} else {
				$(e).css('background', '');
				$(e).css('border', ' 0px solid transparent;');
			}

			$(e).css("zoom", "100%");
		});
	}

	function selectShape(arg) {
		this.shape = arg;
	}

	function defaultmosaic() {
		this.selected.length = 0;
		$('.mosaic-part').remove();
		this.selectedY.length = 0;
		this.selectedX.length = 0;
		this.x = 1;
		this.y = 1;
		this.meta = 0;
	}

	return {
		init : init,
		render : render,
		selected : selected,
		selectedX : selectedX,
		selectedY : selectedY,
		meta: meta,
		selectShape : selectShape,
		density: density,
		defaultmosaic : defaultmosaic
	}

})()

function mosaicJs() {

	var x = 1;
	var y = 1;
	var selected = [];

	for (var i = 1; i < 1190; i++) {
		var div = document.createElement("div");
		div.setAttribute("class", "mosaic-part");
		div.onclick = function(e) {

			if (selected.length == 0) {
				selected.push({
					x : e.currentTarget.getAttribute("x"),
					y : e.currentTarget.getAttribute("y")
				});
			} else if (selected.length == 1) {
				selected.push({
					x : e.currentTarget.getAttribute("x"),
					y : e.currentTarget.getAttribute("y")
				});
				[].forEach.call($('.mosaic-part'), function(e) {

					var x_value = $(e).attr("x");
					var y_value = $(e).attr("y");
					var r_value = Math.floor(Math.random() * 7);

					if (x_value > (selected[0].x - 1)
							&& x_value < (selected[1].x + 1)) {
						e.setAttribute('class', 'mosaic-part selected-odd');
						if (y_value > (selected[0].y - 1)
								&& y_value < (selected[1].y + 1)) {
							if ((x_value + y_value + r_value) % 2 == 0) {
								e.setAttribute('class',
										'mosaic-part selected-odd');
							} else {
								e.setAttribute('class',
										'mosaic-part selected-even');
							}
						}
					}
				});
				selected = [];

				$('.mosaic-part').css('border', '1px solid #80808000');
			}
		}

		if (x == 35) {
			x = 1;
			y++;
		} else {
			div.setAttribute('x', x);
			div.setAttribute('y', y);
			x++;
			$('.mosaic-body').append(div);
		}

	}
}
