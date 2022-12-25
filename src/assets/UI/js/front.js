'use strict';

document.addEventListener('DOMContentLoaded', function () {
	/* ===============================================================
		CUSTOM SELECT [CHOICES.JS]
	=============================================================== */
	function injectClassess(x) {
		let pickerCustomClass = x.dataset.customclass;
		let pickerSevClasses = pickerCustomClass.split(' ');
		x.parentElement.classList.add.apply(x.parentElement.classList, pickerSevClasses);
	}

	const selectPicker = document.querySelectorAll('.selectpicker');
	if (selectPicker.length) {
		selectPicker.forEach((el) => {
			const customSelect = new Choices(el, {
				placeholder: true,
				searchEnabled: false,
				itemSelectText: '',
				callbackOnInit: () => injectClassess(el),
			});
		});
	}
	/* ===============================================================
		GLIGHTBOX
	=============================================================== */
	const lightbox = GLightbox({
		touchNavigation: true,
	});

	/* ===============================================================
		PRODUCT DETAIL SLIDER
	=============================================================== */
	var productSliderThumbs = new Swiper('.product-slider-thumbs', {
		direction: 'horizontal',
		slidesPerView: 5,
		spaceBetween: 10,
		breakpoints: {
			560: {
				direction: 'vertical',
				slidesPerView: 1,
				spaceBetween: 0,
			},
		},
	});

	var productsSlider = new Swiper('.product-slider', {
		slidesPerView: 1,
		spaceBetween: 0,
		thumbs: {
			swiper: productSliderThumbs,
		},
	});
	/* ===============================================================
         PRODUCT QUNATITY
      =============================================================== */
	document.querySelectorAll('.dec-btn').forEach((el) => {
		el.addEventListener('click', () => {
			var siblings = el.parentElement.querySelector('input');
			if (parseInt(siblings.value, 10) >= 1) {
				siblings.value = parseInt(siblings.value, 10) - 1;
			}
		});
	});
	document.querySelectorAll('.inc-btn').forEach((el) => {
		el.addEventListener('click', () => {
			var siblings = el.parentElement.querySelector('input');
			siblings.value = parseInt(siblings.value, 10) + 1;
		});
	});
});
