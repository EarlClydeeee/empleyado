import { Component, Input } from '@angular/core';

export type DashboardMetricCardVariant = 'stat' | 'chart';

@Component({
  selector: 'app-dashboard-metric-card',
  template: `
    <a
      [routerLink]="route"
      class="dash-card dash-card--clickable anim-fade-up"
      [class.dash-card--stat]="variant === 'stat'"
      [class.dash-card--chart]="variant === 'chart'"
      [style.--delay]="delay"
      [attr.aria-label]="ariaLabel"
    >
      <h3
        class="dash-card__title"
        [class.dash-card__title--strong]="variant === 'chart'"
      >
        {{ title }}
      </h3>
      <ng-content></ng-content>
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
        height: 100%;
      }
    `,
  ],
})
export class DashboardMetricCard {
  @Input() title!: string;
  @Input() route!: string;
  @Input() variant: DashboardMetricCardVariant = 'stat';
  @Input() delay = '0ms';
  @Input() ariaLabel!: string;
}
