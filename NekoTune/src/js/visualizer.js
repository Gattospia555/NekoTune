// visualizer.js - Renders web audio API data to a Canvas
export class Visualizer {
  constructor(canvasEl, playerInstance) {
    this.canvas = canvasEl;
    this.ctx = this.canvas.getContext('2d');
    this.player = playerInstance;
    this.running = false;
    this.animationId = null;

    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  resize() {
    // High DPI fix
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.draw();
  }

  stop() {
    this.running = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  draw() {
    if (!this.running) return;
    this.animationId = requestAnimationFrame(() => this.draw());

    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);

    this.ctx.clearRect(0, 0, width, height);

    if (!this.player || !this.player.analyzer || !this.player.analyzerData) {
      return;
    }

    this.player.analyzer.getByteFrequencyData(this.player.analyzerData);
    const data = this.player.analyzerData;

    this.ctx.beginPath();
    
    // Create a beautiful premium gradient
    const gradient = this.ctx.createLinearGradient(0, height, 0, 0);
    // Use the CSS accent color dynamically or fallback to purple pink
    const rootStyle = getComputedStyle(document.body);
    const primary = rootStyle.getPropertyValue('--primary')?.trim() || '#FF3366';
    const accent = rootStyle.getPropertyValue('--accent')?.trim() || '#FF9933';
    
    gradient.addColorStop(0, primary);
    gradient.addColorStop(1, accent);

    this.ctx.fillStyle = gradient;

    const barWidth = (width / data.length) * 1.5; // Only need lower frequencies so widen it
    let x = 0;

    for (let i = 0; i < data.length; i++) {
       // We only take the first half of the frequency bins for a more musical visualization
       if (i > data.length / 1.5) break; 
       
       const value = data[i];
       // Make it a smooth curve at the bottom
       const barHeight = (value / 255) * (height * 0.7); 

       // Draw with rounded corners
       this.ctx.roundRect(x, height - barHeight, barWidth - 4, barHeight, [20, 20, 0, 0]);
       
       x += barWidth;
    }
    
    this.ctx.fill();
  }
}
