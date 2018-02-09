function initSwiper() {
	let view = document.querySelector('#mySlides');

	let controller = {
		view: null,
		swiper: null,
		swiperOptions: {
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar',
			},
		},
		init: function (view) {
			this.view = view;
			this.initSwiper();
		},
		initSwiper: function () {
			this.swiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions);
			window.getSwiperActiveIndex = () => {
				return this.swiper.activeIndex;
			}
		}
	}
	controller.init(view);
};