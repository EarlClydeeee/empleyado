import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <header class="drill-header">
      <nav class="drill-breadcrumbs" aria-label="Breadcrumb">
        <a routerLink="/" class="drill-breadcrumbs__link">{{ parentLabel }}</a>
        <span class="drill-breadcrumbs__sep" aria-hidden="true">&gt;</span>
        <span class="drill-breadcrumbs__current">{{ title }}</span>
      </nav>
      <h1 class="drill-header__title">{{ title }}</h1>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class PageHeader {
  @Input() title!: string;
  @Input() parentLabel = 'Dashboard';
}
