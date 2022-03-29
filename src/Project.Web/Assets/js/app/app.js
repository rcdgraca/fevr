var progress = {
  el: {
    bars: document.querySelectorAll('.js-progress'),
    modal: document.querySelector('.js-modal'),
    body: document.body
  },
  fxFillBar: function fxFillBar(el) {
    var _this = this;

    if (!el.classList.contains('claimed')) {
      var percentage = el.dataset.value * 100 / el.dataset.complete,
          innerBar = el.querySelector('.progress__bar-inner'),
          animationDuration = percentage * .05,
          initialTimeDelay = 500;
      setTimeout(function () {
        innerBar.style.width = "".concat(percentage, "%");
        innerBar.style.transitionDuration = "".concat(animationDuration, "s");

        _this.fxCountNumber(el, animationDuration, initialTimeDelay);
      }, initialTimeDelay);
    }
  },
  fxCountNumber: function fxCountNumber(el, animationDuration, initialTimeDelay) {
    var _this2 = this;

    var finalValue = el.dataset.value,
        frameDuration = .2 / 60,
        totalFrames = Math.round(animationDuration / frameDuration),
        ease = function ease(t) {
      return t * (2 - t);
    },
        number = el.querySelector('.js-progress-number'),
        countTo = parseInt(finalValue, 10);

    var frame = 0;
    setTimeout(function () {
      var counter = setInterval(function () {
        frame++;
        var progress = ease(frame / totalFrames),
            currentCount = Math.round(countTo * progress);

        if (parseInt(number.innerHTML, 10) !== currentCount) {
          number.innerHTML = currentCount;
          currentCount === parseInt(el.dataset.complete) && _this2.fxBarCompleted(el);
        }

        frame === totalFrames && clearInterval(counter);
      }, frameDuration);
    }, initialTimeDelay);
  },
  fxBarCompleted: function fxBarCompleted(el) {
    var innerText = el.querySelector('.progress__bar-text');
    innerText.innerHTML = innerText.dataset.textClaim;
    el.classList.add('complete');
  },
  fxClaimReward: function fxClaimReward(el) {
    if (el.classList.contains('complete')) {
      var innerText = el.querySelector('.progress__bar-text');
      innerText.innerHTML = innerText.dataset.textClaim;
      el.classList.remove('complete');
      el.classList.add('claimed');
      innerText.innerHTML = innerText.dataset.textComplete;
      this.fxOpenModal();
    }
  },
  fxOpenModal: function fxOpenModal() {
    this.el.modal.style.display = 'flex';
    this.el.body.classList.add('no-scroll-fixed');
  },
  fxCloseModal: function fxCloseModal() {
    this.el.modal.style.display = 'none';
    this.el.body.classList.remove('no-scroll-fixed');
  },
  events: function events() {
    var _this3 = this;

    this.el.bars.forEach(function (el) {
      _this3.fxFillBar(el);

      el.addEventListener('click', function () {
        _this3.fxClaimReward(el);
      });
    });
    this.el.modal.querySelector('.js-close-modal').addEventListener('click', function () {
      _this3.fxCloseModal();
    });
  },
  init: function init() {
    this.events();
  }
};
progress.init();
//# sourceMappingURL=app.js.map