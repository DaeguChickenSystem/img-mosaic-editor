var customMosaic = (function() {

	var x = 1;
	var y = 1;
	var meta;
	var density = 5;
	var distance = 0;
	var selected = [];
	var selectedX = [];
	var selectedY = [];
	var timer=null;
	var msc_area_cnt=0;
	var center = [];
	var shape = 'square';
	var opacity_array = [ '#9e9e9ed1', '#dcdbdbc4',
		 '#d0d0d0eb',
			'rgba(214, 214, 214, 0.89)' ];
	var opacity_num = 0;



	function init(arg) {
/*
		density 5일떈  background size 에 *4를 해줘야함*/

		this.meta = arg;

		$('.mosaic-body').css('width', this.meta.width);
		$('.mosaic-body').css('height', this.meta.height);
		$('.mosaic-body').css('background-image',  'url('+this.meta.pic+')');
		$('.mosaic-body').css('left', (1-(this.meta.width/Number($('.mosaic-left').css('width').replace('px',''))))*35+"%" );



		for (var i = 1; i < (this.meta.width/this.density)*(this.meta.height/this.density); i++) {
			var div = document.createElement("div");
			div.setAttribute("class", "mosaic-part");
			div.onclick = onclick.bind(this);
			div.onmouseover=onmouseover.bind(this);
	/*		div.style.background = 'url(/resources/img/wb.jpg)';*/
			if(this.density==5){
				$(div).css("background-size", this.meta.width*this.density*4 +"% "+this.meta.height*this.density*4+"%");
			}else if(this.density==10){
				$(div).css("background-size", this.meta.width*this.density +"% "+this.meta.height*this.density+"%");
			}


			$(div).css("background-position-x", (this.meta.width - ((x - 1) * this.density)) + "px");
			$(div).css("background-position-y", (this.meta.height - ((y - 1) * this.density)) + "px");

			$(div).css("width", this.density+"px");
			$(div).css("height", this.density+"px");

			if (x == Math.abs((this.meta.width/this.density)+1)) {
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
		x = 1;

		$('.mosaic-area').click(onclick.bind(this));
	}



	function onmouseover(event) {
/*		event.preventDefault();
		event.stopPropagation();*/
		$this = this;
		if ($this.selected.length == 1) {
			var mouse_left= Math.abs(event.pageX);
			var mouse_top= Math.abs(event.pageY);
			var selected_x=$this.selected[0].x
			var selected_y=$this.selected[0].y


			$this.timer=null;

			var r_value = Math.floor(Math.random() * 7);

			$('#mosaic-area_'+msc_area_cnt).css("width", (mouse_left - $this.selected[0].x));
			$('#mosaic-area_'+msc_area_cnt).css("height", (mouse_top - $this.selected[0].y));



			if ($this.shape == "circle"){
				$('#mosaic-area_'+msc_area_cnt).css("border-radius", (mouse_top - $this.selected[0].y)/2);
			}else{
				$('#mosaic-area_'+msc_area_cnt).css("border-radius", '');
			}

		}

	}


	function onclick(event) {
//			event.preventDefault();
			event.stopPropagation();

		var mouse_left= Math.abs(event.pageX);
		var mouse_top= Math.abs(event.pageY);

		$this = this;
		if ($this.selected.length == 0) {


			var mosaic_area_dom = document.createElement('div');
			mosaic_area_dom.setAttribute("class", "mosaic-area");
			mosaic_area_dom.setAttribute("id", 'mosaic-area_'+msc_area_cnt);
			mosaic_area_dom.onclick=onclick.bind($this);
			mosaic_area_dom.onmouseover=onmouseover.bind($this);


			$('.mosaic-body').after(mosaic_area_dom);


			$this.selected.push({
				x_ : event.currentTarget.getAttribute("x"),
				y_ : event.currentTarget.getAttribute("y"),
				x : Math.abs(Math.abs($(event.currentTarget).offset().left)),
				y : Math.abs(Math.abs($(event.currentTarget).offset().top))
			});
	

			 $('#mosaic-area_'+msc_area_cnt).css("left",Math.abs(Math.abs($(event.currentTarget).offset().left)));
			 $('#mosaic-area_'+msc_area_cnt).css("top",Math.abs(Math.abs($(event.currentTarget).offset().top)));
			 $('#mosaic-area_'+msc_area_cnt).css("background-position-x", -(mouse_left-$('.mosaic-body').offset().left));
			 $('#mosaic-area_'+msc_area_cnt).css("background-position-y", -(mouse_top-$('.mosaic-body').offset().top));
       $('#mosaic-area_'+msc_area_cnt).css('background-image',  'url('+this.meta.pic+')');
       $('#mosaic-area_'+msc_area_cnt).css('filter', 'blur(3px)');
		} else if ($this.selected.length == 1) {

			$this.selected.push({
				x_ : event.currentTarget.getAttribute("x"),
				y_ : event.currentTarget.getAttribute("y"),
				x : Math.abs(event.pageX),
				y : Math.abs(event.pageY)
			});
			// var opacity_array = ['0.5','0.1','0.3','0.2'];
			var x_distance = Math.abs($this.selected[1].x - $this.selected[0].x) / 2;
			var y_distance = Math.abs($this.selected[1].y - $this.selected[0].y) / 2;

			$('#mosaic-area_'+msc_area_cnt).unbind();

			this.opacity_num = 0;
			$this.selected.length = 0;
			msc_area_cnt++;


		}
	}

	function render() {

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

	function defaultmosaic(a) {
	    var meta = customMosaic.meta;
		$('.mosaic-part').remove();
		$('.mosaic-part').unbind();
		if(a==1){
			this.selected.length = 0;
			this.selectedY.length = 0;
			this.selectedX.length = 0;
		}
		this.x = 1;
		this.y = 1;
		this.meta = meta;
	   	customMosaic.init(this.meta);
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
		defaultmosaic : defaultmosaic,
		index: [x,y]
	}

})()
