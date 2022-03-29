const progress = {
	el: {
		bars: document.querySelectorAll('.js-progress'),
		modal: document.querySelector('.js-modal'),
		body: document.body
	},

	fxFillBar (el) {
		if(!el.classList.contains('claimed')) {
			const percentage = el.dataset.value * 100 / el.dataset.complete,
				innerBar = el.querySelector('.progress__bar-inner'),
				animationDuration = percentage * .05,
				initialTimeDelay = 500
			
			setTimeout(() => {
				innerBar.style.width = `${percentage}%`
				innerBar.style.transitionDuration = `${animationDuration}s`
				this.fxCountNumber(el, animationDuration, initialTimeDelay)
			}, initialTimeDelay)
		}
	},

	fxCountNumber (el, animationDuration, initialTimeDelay) {
		const finalValue = el.dataset.value,
			frameDuration = .2 / 60,
			totalFrames = Math.round(animationDuration / frameDuration),
			ease = t => t * ( 2 - t ),
			number = el.querySelector('.js-progress-number'),
			countTo = parseInt(finalValue, 10)

		let frame = 0

		setTimeout(() => {
			const counter = setInterval (() => {
				frame++
				const progress = ease(frame / totalFrames),
					currentCount = Math.round(countTo * progress)
	
				if (parseInt(number.innerHTML, 10) !== currentCount) {
					number.innerHTML = currentCount
					currentCount === parseInt(el.dataset.complete) && this.fxBarCompleted(el)
				}
	
				frame === totalFrames && clearInterval(counter)
				
			}, frameDuration)
		}, initialTimeDelay)
	},

	fxBarCompleted (el) {
		const innerText = el.querySelector('.progress__bar-text')
		innerText.innerHTML = innerText.dataset.textClaim
		el.classList.add('complete')
	},

	fxClaimReward(el) {
		if(el.classList.contains('complete')) {
			const innerText = el.querySelector('.progress__bar-text')
			innerText.innerHTML = innerText.dataset.textClaim
			el.classList.remove('complete')
			el.classList.add('claimed')
			innerText.innerHTML = innerText.dataset.textComplete
			this.fxOpenModal()
		}
	},

	fxOpenModal () {
		this.el.modal.style.display = 'flex'
		this.el.body.classList.add('no-scroll-fixed')
	},

	fxCloseModal () {
		this.el.modal.style.display = 'none'
		this.el.body.classList.remove('no-scroll-fixed')
	},

	events () {
		this.el.bars.forEach(el => {
			this.fxFillBar(el)
			el.addEventListener('click', () => {
				this.fxClaimReward(el)
			})
			
		})

		this.el.modal.querySelector('.js-close-modal').addEventListener('click', () => {
			this.fxCloseModal()
		})
	},

	init () {
		this.events()
	}
}

progress.init()