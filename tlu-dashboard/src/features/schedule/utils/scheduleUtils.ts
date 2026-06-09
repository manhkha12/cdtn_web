import type { CourseClass } from "../../../types";

const PERIOD_TIMES: Record<number, { start: string; end: string }> = {
  1: { start: "07:00", end: "07:45" },
  2: { start: "07:50", end: "08:35" },
  3: { start: "08:40", end: "09:25" },
  4: { start: "09:30", end: "10:15" },
  5: { start: "10:20", end: "11:05" },
  6: { start: "11:10", end: "11:55" },
  7: { start: "13:00", end: "13:45" },
  8: { start: "13:50", end: "14:35" },
  9: { start: "14:40", end: "15:25" },
  10: { start: "15:30", end: "16:15" },
  11: { start: "16:20", end: "17:05" },
  12: { start: "17:10", end: "17:55" },
  13: { start: "18:00", end: "18:45" },
  14: { start: "18:50", end: "19:35" },
  15: { start: "19:40", end: "20:25" },
};

/**
 * Parses a lesson slot string and returns its start and end Date objects on a given baseDate.
 * Handles both hour-based (e.g. "07:00-09:15" or "Tiết 7-9 (13:00-15:15)") and period-based (e.g. "1-3").
 */
export const getClassTimeRange = (lessonSlot: string, baseDate: Date) => {
  let startHour = 7;
  let startMin = 0;
  let endHour = 11;
  let endMin = 45;

  const timeMatches = lessonSlot.match(/(\d{1,2}):(\d{2})/g);

  if (timeMatches && timeMatches.length >= 2) {
    const startParts = timeMatches[0].split(":").map(Number);
    const endParts = timeMatches[1].split(":").map(Number);
    startHour = startParts[0];
    startMin = startParts[1];
    endHour = endParts[0];
    endMin = endParts[1];
  } else {
    const periodParts = lessonSlot.match(/\d+/g)?.map(Number);
    if (periodParts && periodParts.length >= 1) {
      const startPeriod = periodParts[0];
      const endPeriod = periodParts[1] || startPeriod;

      const startT = PERIOD_TIMES[startPeriod] || { start: "07:00", end: "07:45" };
      const endT = PERIOD_TIMES[endPeriod] || startT;

      const startParts = startT.start.split(":").map(Number);
      const endParts = endT.end.split(":").map(Number);

      startHour = startParts[0];
      startMin = startParts[1];
      endHour = endParts[0];
      endMin = endParts[1];
    }
  }

  const startDate = new Date(baseDate);
  startDate.setHours(startHour, startMin, 0, 0);

  const endDate = new Date(baseDate);
  endDate.setHours(endHour, endMin, 0, 0);

  return { startDate, endDate };
};

/**
 * Checks if a class's specific time slot on a baseDate has already passed compared to the current time.
 */
export const isClassPassed = (classData: CourseClass, baseDate: Date) => {
  const now = new Date();

  // Clear times to compare dates first
  const dateOnlyNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateOnlyBase = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());

  if (dateOnlyBase < dateOnlyNow) {
    return true;
  }
  if (dateOnlyBase > dateOnlyNow) {
    return false;
  }

  // If the base date is today, check the class end time
  const { endDate } = getClassTimeRange(classData.lesson_slot, baseDate);
  return now > endDate;
};
