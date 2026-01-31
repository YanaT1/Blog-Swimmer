import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {FC} from 'react';
import '../../css/charts.css';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface Props {
    label: string; 
    dataByYear: Record<number, (number | null)[]>;
    colors?: string[];
}

const defaultColors = [
    'rgba(0, 141, 218, 0.4)', 
    'rgba(3, 52, 110, 0.4)', 
    'rgba(5, 59, 255, 0.6)'
];

const DynamicLineChart: FC<Props> = ({ label, dataByYear, colors = defaultColors }) => {
    const years = Object.keys(dataByYear).map(Number).sort();

    const datasets = years.map((year, index) => {
        const color = colors[index % colors.length];
            return {
                label: `${year} year`,
                data: dataByYear[year],
                backgroundColor: color,
                borderColor: color,
                borderWidth: 2,
                fill: true,
                spanGaps: true,
            };
        });

        const options: ChartOptions<'line'> = {
            responsive: true,
            plugins: {
                legend: {position: 'top'},
                title: {display: true, text: `Best Times – ${label}`},
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const val = context.parsed.y;
                        return `Time: ${val.toFixed(2)}s`;
                    },
        },},},
        scales: {
            y: {
                reverse: true,
                beginAtZero: false,
                title: {display: true, text: 'Time (s)'},
        },},};

        const data: ChartData<'line'> = {
            labels: monthLabels,
            datasets,
        };

    return (
        <div className='mb-5 chart-wraper'>
            <Line options={options} data={data} />
        </div>
    )
};

export default DynamicLineChart;
