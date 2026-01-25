import { Injectable } from '@angular/core';
import { DateInfo } from '@shared/models/date-info.model';

import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  formatDateToYYYYMMDD(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD');
  }

  sameDate(a: Date, b: Date): boolean {
    return dayjs(a).isSame(b, 'day') && dayjs(a).isSame(b, 'month') && dayjs(a).isSame(b, 'year');
  }

  getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(d.setDate(diff));
  }

  buildWeekFrom(startDate: Date): Date[] {
    const monday = dayjs(startDate);
    return Array.from({ length: 7 }, (_, i) => monday.add(i, 'day').toDate());
  }

  getFromAndToOfWeek(weekStart: Date): { from: Date; to: Date } {
    const from = new Date(weekStart);
    const to = new Date(weekStart);
    to.setDate(to.getDate() + 6);

    return { from, to };
  }

  getDateInfo(date: Date): DateInfo {
    const dayNames: Record<number, string> = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
    };

    const today = new Date();
    const isToday = dayjs(date).isSame(today, 'day');
    const isPast = dayjs(date).isBefore(today, 'day');
    const status = isToday ? 'today' : isPast ? 'past' : 'future';

    return {
      dayName: dayNames[date.getDay()],
      dayNumber: date.getDate(),
      status,
    };
  }
}
