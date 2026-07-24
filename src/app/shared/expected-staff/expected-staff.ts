import { Component, Input } from '@angular/core';

export type StaffStatus = 'IN' | 'OUT' | 'LEAVE';

export interface ExpectedStaffMember {
  id: string;
  name: string;
  schedule: string;
  status: StaffStatus;
  detail?: string;
}

@Component({
  selector: 'app-expected-staff',
  template: `
    <section class="expected-staff anim-fade-up" aria-labelledby="expected-staff-title">
      <div class="expected-staff__accent" aria-hidden="true"></div>
      <h2 id="expected-staff-title" class="expected-staff__heading">
        <span>Expected</span> Staff: {{ staff.length }}
      </h2>

      <div class="expected-staff__list">
        <article class="expected-staff__row" *ngFor="let member of staff; trackBy: trackById">
          <span class="expected-staff__avatar" aria-hidden="true">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8.25" r="3.25" fill="currentColor"/>
              <path d="M5.25 19c1.45-3.15 3.75-4.7 6.75-4.7s5.3 1.55 6.75 4.7" fill="currentColor"/>
            </svg>
          </span>

          <div class="expected-staff__details">
            <h3 class="expected-staff__name">{{ member.name }}</h3>
            <p class="expected-staff__schedule">{{ member.schedule }}</p>
            <p class="expected-staff__detail" *ngIf="member.detail">
              <span aria-hidden="true" *ngIf="member.status === 'IN'">✓</span>
              {{ member.detail }}
            </p>
          </div>

          <strong
            class="expected-staff__status"
            [class.is-in]="member.status === 'IN'"
            [class.is-out]="member.status === 'OUT'"
            [class.is-leave]="member.status === 'LEAVE'"
          >
            {{ member.status }}
          </strong>
        </article>
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
export class ExpectedStaff {
  @Input() staff!: ExpectedStaffMember[];

  trackById(_index: number, member: ExpectedStaffMember): string {
    return member.id;
  }
}
