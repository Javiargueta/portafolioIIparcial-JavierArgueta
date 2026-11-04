export default class Carusel {
  constructor(rootSelector, tickSeconds = 5) {
    this.root = document.querySelector(rootSelector);
    if (!this.root) {
      throw new Error('No se encuentra el elemento root del carrusel');
    }
    this.trail = this.root.querySelector('.carusel-trail');
    this.slides = this.root.querySelectorAll('.slide');
    this.count = this.slides.length;
    this.index = 0;
    this.intervalTime = tickSeconds * 1000;
    this.timeoutId = null;
    this.dots = [];

    this.buildArrows();
    this.buildDots();
    this.root.addEventListener('mouseenter', () => this.stop());
    this.root.addEventListener('mouseleave', () => this.start());
    this.update();
    this.start();
  }

  buildArrows() {
    const make = (className, label, symbol) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = className;
      btn.setAttribute('aria-label', label);
      btn.innerHTML = symbol;
      this.root.appendChild(btn);
      return btn;
    };
    make('carusel-btn carusel-btn-prev', 'Anterior', '&#8592;').addEventListener('click', () => this.go(this.index - 1));
    make('carusel-btn carusel-btn-next', 'Siguiente', '&#8594;').addEventListener('click', () => this.go(this.index + 1));
  }

  buildDots() {
    const wrap = document.createElement('div');
    wrap.className = 'carusel-dots';
    for (let i = 0; i < this.count; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir al proyecto ${i + 1}`);
      dot.addEventListener('click', () => this.go(i));
      wrap.appendChild(dot);
      this.dots.push(dot);
    }
    this.root.appendChild(wrap);
  }

  go(i) {
    this.index = (i + this.count) % this.count;
    this.update();
    this.start();
  }

  update() {
    this.trail.style.transform = `translateX(-${this.index * 100}%)`;
    this.dots.forEach((d, i) => d.classList.toggle('is-active', i === this.index));
  }

  stop() {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }

  start() {
    this.stop();
    this.timeoutId = setTimeout(() => this.go(this.index + 1), this.intervalTime);
  }
}
