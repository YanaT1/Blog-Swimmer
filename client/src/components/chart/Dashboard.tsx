import {
  FC, 
  useEffect, 
  useState 
} from 'react';
import {IYearsResultsStore} from '../../models/storeModels/IYearsResultsStore';
import {mapResultsToGraphRecords, getBestByMonth} from '../../components/result/resultUtils';
import DynamicLineChart from './DynamicLineChart';
import {resultsAPI} from '../../http/resultsAPI';

const styles = [
  '50m Butterfly',
  '100m Butterfly',
  '50m Freestyle',
  '100m Freestyle',
  '200m Freestyle',
  '400m Freestyle',
  '50m Backstroke',
  '50m Breaststroke',
  '100m Medley',
  '200m Medley',
];

const Dashboard: FC = () => {
  const [rawResults, setRawResults] = useState<IYearsResultsStore[]>([]);

  useEffect(() => {
    resultsAPI.fetchAll().then(setRawResults);
  }, []);

  const graphData = mapResultsToGraphRecords(rawResults);

  const allYears = Array.from(new Set(graphData.map((r) => r.year))).sort((a, b) => a - b);

  const filteredYears = Array.from(
    new Set([                             
      allYears[allYears.length - 2],              
      allYears[allYears.length - 1],              
    ])
  ).filter((year) => year !== undefined); 

  return (
    <div>
      {styles.map((style) => {
        const dataByYear: Record<number, (number | null)[]> = {};
        let globalLastValue: number | null = null;

        allYears.forEach((year) => {
            const yearResults = getBestByMonth(graphData, style, year, globalLastValue);
            const lastMonthValue = yearResults[11];
            if (lastMonthValue !== null) {
                globalLastValue = lastMonthValue;
            }
            if (filteredYears.includes(year)) {
                dataByYear[year] = yearResults;
            }
        });

        return (
          <div style={{ minHeight: '300px', width: '100%' }}>
              <DynamicLineChart
                   key={style}
                   label={style}
                   dataByYear={dataByYear}
              />
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
