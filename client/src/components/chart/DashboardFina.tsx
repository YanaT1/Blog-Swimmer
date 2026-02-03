import { 
    FC, 
    useEffect, 
    useState} from 'react';
import {IYearsResultsStore} from '../../models/storeModels/IYearsResultsStore';
import {mapResultsToGraphRecords} from '../../components/result/resultUtils';
import {IGraphRecord} from '../../models/storeModels/IGraphRecord';
import {resultsAPI} from '../../http/resultsAPI';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {formatSecondsToTime} from '../../components/result/resultUtils';



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const defaultColors = [
    'rgba(0, 141, 218, 0.5)',
    'rgba(3, 52, 110, 0.5)',
    'rgba(5, 59, 255, 0.5)',
];

const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: {position: 'top'},
        title: {display: true, text: 'Personal Bests FINA'},
        tooltip: {
            callbacks: {
                label: (context) => {
                    const dataset = context.dataset as any;
                    const points = context.parsed.y;
                    const time = dataset.times?.[context.dataIndex] ?? '—';
                    return `Points: ${points}, Time: ${time}`;
    },},},},
    scales: {
        y: {
            beginAtZero: true,
            title: { display: true, text: 'FINA Points' },
    },},
};


function getBestPtsByStyleAndYear(
    records: IGraphRecord[],
    style: string,
    year: number
): { pts: number | null; time: string | null } {
        const filtered = records.filter(
            (r) => r.style === style && r.year === year && r.pts != null
        );

        if (filtered.length === 0) return { pts: null, time: null };

        const best = filtered.reduce((best, curr) =>
            curr.pts! > (best.pts ?? 0) ? curr : best,
        ) as IGraphRecord;

        return {
            pts: best.pts ?? null,
            time: formatSecondsToTime(best.value),
        };
}

const DashboardFina: FC = () => {
    const [rawResults, setRawResults] = useState<IYearsResultsStore[]>([]);

    useEffect(() => {
        resultsAPI.fetchAll().then(setRawResults);
    }, []);

    const graphData = mapResultsToGraphRecords(rawResults);
    const styles = Array.from(new Set(graphData.map((r) => r.style))).sort();
    const allYears = Array.from(new Set(graphData.map((r) => r.year))).sort((a, b) => a - b);
    const filteredYears = Array.from(
        new Set([
            allYears[allYears.length - 2],
            allYears[allYears.length - 1],
        ])
    ).filter((year): year is number => typeof year === 'number');

    const dataByYear: Record<number, { pts: (number | null)[]; times: (string | null)[] }> = {};

    filteredYears.forEach((year) => {
        dataByYear[year] = { pts: [], times: [] };
        styles.forEach((style) => {
            const best = getBestPtsByStyleAndYear(graphData, style, year);
            dataByYear[year].pts.push(best.pts ?? 0);
            dataByYear[year].times.push(best.time ?? null);
        });
    });

    const datasets = filteredYears.map((year, index) => ({
        label: `${year} year`,
        data: dataByYear[year].pts.map((v) => v ?? 0),
        backgroundColor: defaultColors[index % defaultColors.length],
        times: dataByYear[year].times,
    }));

    const data: ChartData<'bar', number[]> = {
        labels: styles,
        datasets,
    };
    

    return (
        <Bar options={options} data={data} />
    );
};

export default DashboardFina;
