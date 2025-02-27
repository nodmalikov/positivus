window.addEventListener('DOMContentLoaded', () => {
	const menuButton = document.querySelector('.menu-icon')
	const siteHeaderWrapper = document.querySelector('.site-header__wrapper')
	const accordions = document.querySelectorAll('.accordion')
	const accordionHeads = document.querySelectorAll('.accordion__head')
	const accordionBodies = document.querySelectorAll('.accordion__body')
	const accordionBadges = document.querySelectorAll('.accordion__badge')
	const sitenavList = document.querySelector('.sitenav__list')
	const siteHeader = document.querySelector('.site-header')
	const mainContent = document.querySelector('.main-content')
	const testimonialsPages = document.querySelector('.testimonials__pages')
	const testimonialsPage = document.querySelectorAll('.testimonials__page')
	const testimonialsPrevBtn = document.querySelector('.testimonials-prev-btn')
	const testimonialsNextBtn = document.querySelector('.testimonials-next-btn')
	const testimonialsIndicators = document.querySelectorAll(
		'.testimonials-indikator'
	)

	// INFINITY-CAROUSEL
	const partnersInner = document.querySelector('.partners__wrapper')
	const partnersImg = document.querySelectorAll('.partners__img')

	// Logolarni klonlash va qo'shish
	const cloneLogos = () => {
		// Birinchi klonlash
		partnersImg.forEach(img => {
			const clone = img.cloneNode(true)
			partnersInner.appendChild(clone)
		})

		// Ikkinchi klonlash
		partnersImg.forEach(img => {
			const clone = img.cloneNode(true)
			partnersInner.appendChild(clone)
		})
	}

	cloneLogos()

	// TESTIMONIALS-SLIDER
	const totalItems = testimonialsPage.length
	let currentIndex = 0
	const gapBetweenItems = 50 // Har bir element orasidagi bo'sh joy (50px)
	const initialOffset = 0 // Boshlang'ich holatda chap tarafga siljish (0px)

	// Har bir elementning kengligi va oradagi bo'sh joyni hisobga olgan holda siljish miqdorini hisoblash
	function getPageWidth() {
		return testimonialsPage[0].offsetWidth + gapBetweenItems // Kenglik + bo'sh joy
	}

	function updateSlider() {
		const pageWidth = getPageWidth() // Kenglik + bo'sh joy
		let offset

		if (currentIndex === 0) {
			// Agar currentIndex 0 bo'lsa, default holatda (0px)
			offset = initialOffset
		} else if (currentIndex === totalItems - 1) {
			// Agar oxirgi element bo'lsa, qo'shimcha bo'sh joy qoldirmaymiz
			offset = -(currentIndex * pageWidth) + initialOffset
		} else {
			// Boshqa holatlarda odatdagidev hisoblash
			offset = -(currentIndex * pageWidth) + initialOffset
		}

		testimonialsPages.style.transform = `translateX(${offset}px)`
		testimonialsPages.style.transition = 'transform 0.5s ease-in-out'

		// Indikatorlarni faollashtirish
		testimonialsIndicators.forEach((indicator, index) => {
			indicator.style.opacity = index === currentIndex ? '1' : '0.5'
		})
	}

	// Next tugmasi bosilganda bitta itemga o'tish
	testimonialsNextBtn.addEventListener('click', () => {
		if (currentIndex < totalItems - 1) {
			currentIndex++ // Faqat oxiriga yetganda to'xtash
			updateSlider()
		}
	})

	// Prev tugmasi bosilganda bitta itemga o'tish
	testimonialsPrevBtn.addEventListener('click', () => {
		if (currentIndex === 0) {
			// Agar currentIndex 0 bo'lsa, 0px dan 0px ga o'tish
			currentIndex = 0 // currentIndex o'zgartirmaymiz
			testimonialsPages.style.transform = 'translateX(0px)' // 0px ga o'tkazamiz
			testimonialsPages.style.transition = 'transform 0.5s ease-in-out'
		} else if (currentIndex > 0) {
			currentIndex-- // Boshqa holatlarda odatdagidev ishlaydi
			updateSlider()
		}
	})

	// Indikator bosilganda tegishli itemga o'tish
	testimonialsIndicators.forEach((indicator, index) => {
		indicator.addEventListener('click', () => {
			currentIndex = index
			updateSlider()
		})
	})

	// Ekran o'lchami o'zgarganda sliderni yangilash
	window.addEventListener('resize', () => {
		updateSlider()
	})

	updateSlider()

	// MOBILE-MENU
	menuButton.addEventListener('click', event => {
		event.stopPropagation()
		siteHeaderWrapper.classList.add('site-header__active')
	})

	document.addEventListener('click', event => {
		if (!siteHeaderWrapper.contains(event.target)) {
			siteHeaderWrapper.classList.remove('site-header__active')
		}
	})

	// ACCORDION
	accordionHeads.forEach((item, index) => {
		item.addEventListener('click', () => {
			const isActive =
				accordionBodies[index].classList.contains('accordion-active')

			accordions.forEach(acc => acc.classList.remove('change-bg'))
			accordionBodies.forEach(body => {
				body.classList.remove('accordion-active')
				body.style.maxHeight = null
			})
			accordionBadges.forEach(badge => badge.classList.remove('change-badge'))

			if (!isActive) {
				accordionBodies[index].classList.add('accordion-active')
				accordionBodies[
					index
				].style.maxHeight = `${accordionBodies[index].scrollHeight}px`
				accordionBadges[index].classList.add('change-badge')
				accordions[index].classList.add('change-bg')
			}
		})
	})

	// SCROLL
	window.onscroll = function () {
		if (window.innerWidth > 1001) {
			const offset = sitenavList.offsetHeight
			if (window.scrollY > offset - 20) {
				sitenavList.classList.add('sitenav-bg')
			} else if (window.scrollY < offset - 20) {
				sitenavList.classList.remove('sitenav-bg')
			}
		}
	}

	// SCROLLTOP
	const scrollBtn = document.querySelector('.scroll-btn')

	window.addEventListener('scroll', function () {
		scrollBtn.classList.toggle('scroll-btn-active', window.scrollY > 500)
	})

	scrollBtn.addEventListener('click', function () {
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
	})

	// ELEMENTS-SCROLL-ANIMATION
	window.addEventListener('scroll', () => {
		let reveals = document.querySelectorAll('.reveal')

		for (let i = 0; i < reveals.length; i++) {
			let windowHeight = window.innerHeight
			let revealTop = reveals[i].getBoundingClientRect().top
			let revealPoint = 50

			if (revealTop < windowHeight - revealPoint) {
				reveals[i].classList.add('active')
			} else {
				reveals[i].classList.remove('active') // Agar element ko'rinmasa, active klassni olib tashlash
			}
		}
	})

	//MAIN CONTENT'S MARGIN-TOP
	function updateMainContentMargin() {
		if (window.innerWidth <= 1050) {
			const headerHeight = siteHeader.offsetHeight
			mainContent.style.marginTop = `${headerHeight}px`
		} else {
			mainContent.style.marginTop = '0' // Ekran kengligi 1050px dan katta bo'lsa, margin-top ni o'chirish
		}
	}

	// Dastlabki holatda margin ni o'rnatish
	updateMainContentMargin()

	// Ekran o'lchami o'zgarganda margin ni yangilash
	window.addEventListener('resize', updateMainContentMargin)

	// Header balandligi o'zgarganda margin ni yangilash
	new ResizeObserver(updateMainContentMargin).observe(siteHeader)

	// EMAIL-SUBMIT
	;(function () {
		emailjs.init({
			publicKey: 'AXhT2PSqgoDSTsCFH',
		})
	})()

	window.onload = function () {
		document
			.querySelector('.form')
			.addEventListener('submit', function (event) {
				event.preventDefault()
				const formRadio = document.querySelector('input[name="radio"]:checked'),
					formName = document.querySelector('#name'),
					formEmail = document.querySelector('#email'),
					formMessage = document.querySelector('#message')

				if (
					formName.value == '' ||
					formEmail.value == '' ||
					formMessage.value == ''
				) {
					alert('Please input your information!')
				} else if (!formRadio) {
					alert('Please select an option!')
				} else {
					// these IDs from the previous steps
					emailjs.sendForm('service_vq6q6vv', 'template_8x5qtih', this).then(
						() => {
							alert('Sucsess')
						},
						error => {
							alert('Error')
						}
					)

					// Input value clear
					formName.value = ''
					formEmail.value = ''
					formMessage.value = ''
					if (formRadio) {
						formRadio.checked = false
					}
				}
			})
	}
})
