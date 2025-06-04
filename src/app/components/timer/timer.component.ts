import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  imports :[CommonModule],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration: number = 1200;
  timeLeft: number = 1200; // Duration in seconds (e.g., 1 hour = 3600 seconds)
  minutes: number = 0;
  seconds: number = 0;
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    this.timeLeft = this.duration;
    this.startTimer();
  }

  startTimer(): void {
    // Initialize minutes and seconds
    this.updateDisplay();

    // Create an interval that ticks every second
    this.subscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplay();
      } else {
        // Timer is done
        this.subscription?.unsubscribe();
        alert('Time is up!');
      }
    });
  }

  updateDisplay(): void {
    this.minutes = Math.floor(this.timeLeft / 60);
    this.seconds = this.timeLeft % 60;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
