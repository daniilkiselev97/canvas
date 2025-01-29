import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-moving-circle',
  standalone: true,
  imports: [],
  templateUrl: './moving-circle.component.html',
  styleUrl: './moving-circle.component.css'
})
export class MovingCircleComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  public ctx!: CanvasRenderingContext2D;
  public animationId!: number;
  public xPosition: number = 0;
  public moving: boolean = false;

  ngOnInit(): void {
    const canvasElement = this.canvas.nativeElement;
    this.ctx = canvasElement.getContext('2d')!;
  }

  startAnimation(): void {
    if (!this.moving) {
      this.moving = true;
      this.animate();
    }
  }

  stopAnimation(): void {
    this.moving = false;
    cancelAnimationFrame(this.animationId);
  }

  private animate(): void {
    if (!this.moving) return;

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.ctx.beginPath();
    this.ctx.arc(this.xPosition, 100, 30, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();

    this.xPosition += 2;
    if (this.xPosition > this.canvas.nativeElement.width) {
      this.xPosition = 0;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
