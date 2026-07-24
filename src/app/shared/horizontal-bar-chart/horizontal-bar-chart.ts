import { Component, Input } from '@angular/core';

export interface BarChartItem {
  label: string;
  value: number;
}

@Component({
  selector: 'app-horizontal-bar-chart',
  template: `
    <section class="drill-card">
      <h2 class="drill-card__title">{{ title }}</h2>
      <div class="hbar" role="img" [attr.aria-label]="title">
        <div class="hbar__scale" aria-hidden="true">
          <span *ngFor="let tick of ticks; trackBy: trackByTick">{{ tick }}%</span>
        </div>
        <div class="hbar__body">
          <div class="hbar__grid" aria-hidden="true">
            <span class="hbar__grid-line" *ngFor="let tick of ticks; trackBy: trackByTick"></span>
          </div>
          <ul class="hbar__rows">
            <li
              class="hbar__row"
              *ngFor="let item of items; trackBy: trackByLabel; let i = index"
              [class.hbar__row--alt]="i % 2 === 1"
            >
              <span class="hbar__label">{{ item.label }}</span>
              <div class="hbar__track">
                <div class="hbar__bar" [style.width.%]="clamp(item.value)">
                  <span class="hbar__cap"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class HorizontalBarChart {
  @Input() title!: string;
  @Input() items!: BarChartItem[];
  readonly ticks = [0, 20, 40, 60, 80, 100];

  clamp(value: number): number {
    return Math.min(100, Math.max(0, value));
  }

  trackByTick(_index: number, tick: number): number {
    return tick;
  }

  trackByLabel(_index: number, item: BarChartItem): string {
    return item.label;
  }
}
