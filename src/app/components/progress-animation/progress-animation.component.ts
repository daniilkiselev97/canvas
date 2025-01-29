import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-animation',
  standalone: true,
  imports: [],
  templateUrl: './progress-animation.component.html',
  styleUrl: './progress-animation.component.css'
})
export class ProgressAnimationComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  public ctx!: CanvasRenderingContext2D;
  public progress: number = 0;
  public animationId!: number;
  public radius: number = 70;
  public lineWidth: number = 10;
  public centerX!: number;
  public centerY!: number;

  ngOnInit(): void {
    const canvasElement = this.canvas.nativeElement;
    this.ctx = canvasElement.getContext('2d')!;
    this.centerX = canvasElement.width / 2;
    this.centerY = canvasElement.height / 2;

    this.startProgress();
  }

  private startProgress(): void {
    this.progress = 0;
    this.animateProgress();
  }

  private animateProgress(): void {
    if (this.progress >= 100) {
      this.progress = 0;
    }

    this.clearCanvas();
    this.drawBackgroundCircle();
    this.drawProgressCircle();
    this.drawText();

    this.progress += 0.5;

    this.animationId = requestAnimationFrame(() => this.animateProgress());
  }

  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  private drawBackgroundCircle(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = '#e6e6e6';
    this.ctx.stroke();
  }

  private drawProgressCircle(): void {
    this.ctx.beginPath();
    const endAngle = (this.progress / 100) * 2 * Math.PI;
    this.ctx.arc(this.centerX, this.centerY, this.radius, -Math.PI / 2, endAngle - Math.PI / 2);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = '#00cc66';
    this.ctx.stroke();
  }

  private drawText(): void {
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(`${Math.round(this.progress)}%`, this.centerX, this.centerY);
  }
}
