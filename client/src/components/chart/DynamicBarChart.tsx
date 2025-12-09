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
import {FC} from 'react';
import {IGraphRecord} from '../../models/storeModels/IGraphRecord';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TimeDataset {
    label: string;
    data: number[];
    times: (string | null)[];
    backgroundColor: string;
}

interface Props {
    graphData: IGraphRecord[];
    years: number[];
    styles: string[];
    colors?: string[];
}

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
                const dataset = context.dataset as TimeDataset;
                const pts = context.parsed.y;
                const time = dataset.times[context.dataIndex] ?? '—';
                return `Points: ${pts}, Time: ${time}`;
            },
    },},},
    scales: {
        y: {
            beginAtZero: true,
            title: {display: true, text: 'FINA Points'},
        },
    },
};

const DynamicBarChart: FC<Props> = ({graphData, years, styles, colors = defaultColors}) => {
    function getBestPtsByStyleAndYear(
        records: IGraphRecord[],
        style: string,
        year: number
    ): {pts: number | null; time: string | null} {
        const filtered = records.filter(
            (r) => r.style === style && r.year === year && r.value != null && r.pts != null
        );

        if (filtered.length === 0) return {pts: null, time: null};

        const best = filtered.reduce((best, cur) => {
            if (!best || (cur.pts! > best.pts!)) {
                return cur;
        }
        return best;
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

    const datasets: TimeDataset[] = years.map((year, i) => {
        const points: number[] = [];
        const times: (string | null)[] = [];

        styles.forEach((style) => {
            const best = getBestPtsByStyleAndYear(graphData, style, year);
            points.push(best.pts ?? 0);
            times.push(best.time);
        });

        return {
            label: `${year} year`,
            data: points,
            backgroundColor: colors[i % colors.length],
            times,
        };
    });

    const data: ChartData<'bar', number[]> = {
        labels: styles,
        datasets,
    };

    return <Bar options={options} data={data} />;
};

export default DynamicBarChart;
