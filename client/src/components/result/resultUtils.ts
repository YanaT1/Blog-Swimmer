import {IYearsResultsStore} from '../../models/storeModels/IYearsResultsStore';
import {IGraphRecord} from '../../models/storeModels/IGraphRecord';



export function parseTimeToSeconds(time: string): number | null {
  if (!time) return null;
  const parts = time.split(':').map(Number);

  if (parts.length === 1) return parts[0];               
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  
  return null; 
}


export function mapResultsToGraphRecords(results: IYearsResultsStore[]): IGraphRecord[] {
  const mapped = results.map((r) => {
    const value = parseTimeToSeconds(r.result);
    if (value === null) return null;

    const record: IGraphRecord = {
      id: r.id,
      year: new Date(r.date).getFullYear(),
      month: new Date(r.date).getMonth(), 
      style: r.style_m_name,
      value,
      label: r.place || undefined,
      pts: r.pts,
    };

    return record;
  });


  return mapped.filter((r): r is IGraphRecord => r !== null);
}


export function getBestByMonth(
  records: IGraphRecord[],
  style: string,
  year: number
): (number | null)[] {
  const monthlyBest: (number | null)[] = Array(12).fill(null);

  records
    .filter((r) => r.style === style && r.year === year)
    .forEach((r) => {
      const current = monthlyBest[r.month];
      if (current === null || r.value < current) {
        monthlyBest[r.month] = r.value;
      }
    });

  return monthlyBest.map((val) => (val !== null ? +val.toFixed(2) : null));
}


export function getBestPtsByStyleAndYear(
  records: IGraphRecord[],
  style: string,
  year: number
): { pts: number | null; time: string | null } {
  const filtered = records.filter(
    (r) => r.style === style && r.year === year && r.pts != null
  );

  if (filtered.length === 0) return { pts: null, time: null };

  const best = filtered.reduce((bestRecord, current) => {
    if (!bestRecord || (current.pts! > bestRecord.pts!)) {
      return current;
    }
    return bestRecord;
  }, null as IGraphRecord | null);

  return {
    pts: best?.pts ?? null,
    time: best ? formatSecondsToTime(best.value) : null,
  };
}


function formatSecondsToTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}:${secs.toFixed(2).padStart(5, '0')}`;
  }
  return secs.toFixed(2);
}
