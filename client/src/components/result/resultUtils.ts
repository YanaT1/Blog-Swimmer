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
  year: number,
  initialValue: number | null = null
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

  let lastValidValue = initialValue;

  const continuousData = monthlyBest.map((val) => {
    if (val !== null) {
      lastValidValue = val;
      return +val.toFixed(2);
    }
    
    return lastValidValue !== null ? +lastValidValue.toFixed(2) : null;
  });

  return continuousData;
}

export function formatSecondsToTime(seconds: number): string {  
  const mins = Math.floor(seconds / 60);  
  const secs = seconds % 60;  
  if (mins > 0) {   
     return `${mins}:${secs.toFixed(2).padStart(5, '0')}`;  
    }  
    return secs.toFixed(2);
}
