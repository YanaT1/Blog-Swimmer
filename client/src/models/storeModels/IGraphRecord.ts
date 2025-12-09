export interface IGraphRecord {
    id: number;
    year: number;
    month: number;
    style: string;
    value: number;      
    label?: string;     
    color?: string;
    pts?: number | null;
}
