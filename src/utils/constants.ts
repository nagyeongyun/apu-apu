export const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export const dayLabelMap: Record<(typeof days)[number], string> = {
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
  fri: '금',
  sat: '토',
  sun: '일',
};
