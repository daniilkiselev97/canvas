import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StaticCanvasComponent } from './components/static-canvas/static-canvas.component';
import { MovingCircleComponent } from './components/moving-circle/moving-circle.component';
import { ProgressAnimationComponent } from './components/progress-animation/progress-animation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StaticCanvasComponent, MovingCircleComponent, ProgressAnimationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'canvas';
}
