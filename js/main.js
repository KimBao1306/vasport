window.addEventListener('DOMContentLoaded', () => {});
jQuery(document).ready(function ($) {
	new WOW().init();

	if ($('.header').length) {
		/** MENU FIXED WHEN SCROLL */
		const header = $('.header');
		const headerHeight = header.height();
		const headerBottomHeight = $('.header__bottom').height();
		const headerOffsetTop = header.offset().top;
		if (scrollY >= headerOffsetTop + headerHeight) {
			header.addClass('--fixed');
			header.next().css('margin-top', headerBottomHeight);
		} else {
			header.removeClass('--fixed');
			header.next().css('margin-top', 0);
		}
		$(window).on('scroll', function () {
			if (scrollY >= headerOffsetTop + headerHeight) {
				header.addClass('--fixed');
				header.next().css('margin-top', headerBottomHeight);
			} else {
				header.removeClass('--fixed');
				header.next().css('margin-top', 0);
			}
		});
		/** MENU FIXED WHEN SCROLL - END */
		/** MENU IN MOBILE */
		$('.header__list  .dropdown').each(function () {
			const dropdown = $(this);
			const arrows = $('<i></i>');
			arrows.addClass('fa fa-angle-down');

			dropdown.find('a').eq(0).append(arrows);
			const subMenu = dropdown.children('.sub-menu');

			arrows.on('click', function (e) {
				e.preventDefault();
				dropdown.toggleClass('--show');
				$(this).parent().next('ul').stop().slideToggle();
			});
		});
		/** MENU IN MOBILE - END */
	}

	/** SCROLL TO TOP */
	if ($('.scroll-top').length) {
		$('.scroll-top').on('click', function (e) {
			e.preventDefault();
			$('html, body').animate(
				{
					// scrollTop: $("#to").offset().top //scroll đến vị trí #to
					scrollTop: 0,
				},
				500
			);
			return false;
		});

		$(window).on('scroll', function () {
			if ($(this).scrollTop() >= 10) {
				$('.scroll-top').addClass('--show');
			} else {
				$('.scroll-top').removeClass('--show');
			}
		});
	}
	/** SCROLL TO TOP - END*/

	/** TAB */
	$(window).on('click', (e) => {
		if (e.target.closest('.tab-link')) {
			const tabLink = e.target.closest('.tab-link');
			$(tabLink).addClass('--active').siblings().removeClass('--active');
			const tabContent = $(tabLink.getAttribute('data-tabs'));
			$(tabContent).addClass('--active').siblings().removeClass('--active');
		}
	});
	/** TAB - END */

	/** LIGHTGALLERY */
	if ($('.is-lightgallery').length) {
		$('.is-lightgallery').lightGallery({
			thumbnail: true,
		});
	}
	/** LIGHTGALLERY - END*/
	/** MAGNIFICPOPUP */
	// $('.open-popup-btn').magnificPopup({
	// 	removalDelay: 500,
	// 	callbacks: {
	// 		beforeOpen: function () {
	// 			this.st.mainClass = 'mfp-zoom-in';
	// 		},
	// 	},
	// 	midClick: true,
	// });
	if ($('.video-btn').length) {
		$('.video-btn').parent().magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-zoom-in',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false,
		});
	}
	/** MAGNIFICPOPUP - END*/
	/** SWIPER */
	$('.is-slider').each(function () {
		const $swiper = $(this).find('.swiper-container');
		const nextBtn = $(this).find('.swiper-button-next');
		const prevBtn = $(this).find('.swiper-button-prev');
		const pagination = $(this).find('.swiper-pagination');
		new Swiper($swiper, {
			speed: 600,
			// autoHeight: false,
			autoplay: {
				speed: 5000,
			},
			slidesPerView: 'auto',
			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn,
			},
			loop: false,
		});
	});

	if ($('#is-slider-detail') && $('#is-slider-detail-thumbs')) {
		const sliderThumbs = new Swiper(
			'#is-slider-detail-thumbs .swiper-container',
			{
				slidesPerView: 'auto',
				autoplay: {
					delay: 5000,
				},
				speed: 1000,
				slideToClickedSlide: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				loop: false,
			}
		);
		new Swiper('#is-slider-detail .swiper-container', {
			slidesPerView: 'auto',
			autoplay: {
				delay: 5000,
			},
			speed: 1000,
			thumbs: {
				swiper: sliderThumbs,
			},
			loop: false,
		});
	}
	/** SWIPER - END*/

	/** MENU BUTTON */
	if (
		$('.header .hamburger-btn').length &&
		$('.header__list').length &&
		$('.overlay').length
	) {
		$('.header .hamburger-btn').on('click', function () {
			$(this).toggleClass('--active');
			$('.header__list').toggleClass('--active');
			$('.overlay').toggleClass('--show');
		});

		$('.overlay').on('click', function () {
			$(this).removeClass('--show');
			$('.hamburger-btn').removeClass('--active');
			$('.header__list').removeClass('--active');
		});
	}
	/** MENU BUTTON - END*/

	/** MENU BUTTON BANNER */
	if (
		$('.banner .hamburger-btn').length &&
		$('.banner__addr').length &&
		$('.overlay').length
	) {
		$('.banner .hamburger-btn').on('click', function () {
			$(this).toggleClass('--active');
			$('.banner__addr').toggleClass('--active');
			$('.overlay').toggleClass('--show');
		});
		$('.overlay').on('click', function () {
			$(this).removeClass('--show');
			$('.banner .hamburger-btn').removeClass('--active');
			$('.banner__addr').removeClass('--active');
		});
	}
	/** MENU BUTTON BANNER  - END*/

	/** COUNT DOWN */
	if ($('.flash-time').length) {
		let itv;
		function countDown() {
			const endTimeString = $('.flash-time').data('time');
			const endTime = new Date(endTimeString);
			const now = new Date();
			const restTime = new Date(Date.parse(endTime) - Date.parse(now));
			//convert
			const d = Math.floor(restTime / 86400000) * 24;
			const h = Math.floor((restTime / (1000 * 60 * 60)) % 24);
			const m = Math.floor((restTime / (1000 * 60)) % 60);
			const s = Math.floor((restTime / 1000) % 60);
			//render to html
			$('.hours').html(`${d + h}`);
			$('.minutes').html(`0${m}`.slice(-2));
			$('.seconds').html(`0${s}`.slice(-2));
			if (Date.parse(endTime) - Date.parse(now) <= 0) {
				$('.hours').html(`00`);
				$('.minutes').html(`00`);
				$('.seconds').html(`00`);
				clearInterval(itv);
				return;
			}
		}
		itv = setInterval(countDown, 1000);
	}
	/** COUNT DOWN - END*/

	/** FILTER SIDEBAR */
	if ($('.product__sidebar').length) {
		$('.product__sidebar .main-title, .product__sidebar .fa').on(
			'click',
			function () {
				const parent = $(this).closest('.sidebar-stop');
				const icon = parent.find('.fa').eq(0);
				parent.toggleClass('--show');
				if (icon.hasClass('fa-minus-circle')) {
					icon.attr('class', 'fa fa-plus-circle');
				} else if (icon.hasClass('fa-plus-circle')) {
					icon.attr('class', 'fa fa-minus-circle');
				}
			}
		);

		$('.product__btn-sidebar').on('click', function () {
			$('.product__content .left').toggleClass('--active');
			$('.overlay').toggleClass('--show');
		});
		$('.overlay').on('click', function () {
			$('.product__content .left').removeClass('--active');
		});
	}
	/** FILTER SIDEBAR - END*/

	/** CATE HOME */
	$('.cate__wrap').each(function () {
		if ($(this).hasClass('--active')) {
			const img = $(this).find('img');
			const srcImg = img.attr('src');
			img.attr(
				'src',
				srcImg.slice(0, srcImg.lastIndexOf('.')).concat('-black.png')
			);
		}
	});
	/** CATE HOME - END*/

	/** QTT PICKER */
	const priceElement = $('.qtt-picker');
	if (priceElement) {
		//lấy dữ liệu từ ô input - min max step
		function qttPicker(btn) {
			const input = $(btn).closest('.qtt-picker').find('.qtt-input');
			const inputMax = $(input).attr('max');
			const inputMin = $(input).attr('min');
			const inputStep = $(input).attr('step')
				? parseFloat($(input).attr('step'))
				: 1;

			if ($(btn).hasClass('plus')) {
				const value = inputMax
					? Math.min(parseFloat(input.val()) + inputStep, parseFloat(inputMax))
					: parseFloat(input.val()) + inputStep;
				input.val(
					Number.isInteger(value)
						? parseInt(value)
						: parseFloat(value).toFixed(1)
				);
				return input.val();
			}

			if ($(btn).hasClass('minus')) {
				const value = Math.max(
					parseFloat(input.val()) - inputStep,
					inputMin ? parseFloat(inputMin) : inputStep
				);
				input.val(
					Number.isInteger(value)
						? parseInt(value)
						: parseFloat(value).toFixed(1)
				);
				return input.val();
			}

			// return input.val();
		}
		//event cho 2 nút tăng giảm
		$(window).on('click', (e) => {
			if ($(e.target).hasClass('plus') || $(e.target).hasClass('minus')) {
				const valueItem = qttPicker(e.target);
				calP(valueItem);
			}
		});
		//event cho input khi thay đổi
		$(window).on('change', (e) => {
			if ($(e.target).hasClass('qtt-input')) {
				const valueItem = qttPicker(e.target);
				calP(valueItem);
			}
		});

		function calP(vl) {
			// tách chuỗi và lấy giá tiền trong chuỗi
			const itemSize = $('input[name="pd-size"]:checked');
			const totalPrice = new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND',
			}).format(vl * itemSize.val());

			$('.price').html(totalPrice);
		}
	}
	/** QTT PICKER - END*/

	/** SHOW POPUP */
	const popupBtn = $('.js-popup');
	if (popupBtn.length) {
		$('.popup__close').on('click', function () {
			$.magnificPopup.close();
		});
		$('.js-popup').magnificPopup({
			type: 'inline',
			preloader: false,
			modal: true,
			midClick: true,
			removalDelay: 500,
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = 'mfp-zoom-in';
				},
			},
		});
	}

	/** SHOW POPUP - END*/
});
