import { Component, Input } from '@angular/core';

export interface MetricStat {
  label: string;
  value: string;
}

@Component({
  selector: 'app-metric-stats',
  template: `
    <div class="drill-stats" role="list">
      <article class="drill-stat" role="listitem" *ngFor="let stat of stats; trackBy: trackByLabel">
        <p class="drill-stat__label">{{ stat.label }}</p>
        <p class="drill-stat__value">{{ stat.value }}</p>
      </article>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class MetricStats {
  @Input() stats!: MetricStat[];

  trackByLabel(_index: number, stat: MetricStat): string {
    return stat.label;
  }
}
