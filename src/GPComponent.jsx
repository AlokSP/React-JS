import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

function GPComponent() {
    const [start, setStart] = useState(2);
    const [ratio, setRatio] = useState(2);
    const [series, setSeries] = useState([2]);
    const [history, setHistory] = useState([]);
    const [limit, setLimit] = useState(10);

    
    const [animate, setAnimate] = useState(false);

    const generateNext = () => {
        const next = series[series.length - 1] * ratio;
        setSeries([...series, next]);
        triggerAnimation();
    };

    const generateAuto = () => {
        let temp = [start];
        for (let i = 1; i < limit; i++) {
            temp.push(temp[temp.length - 1] * ratio);
        }
        setSeries(temp);
        triggerAnimation();
    };

    const resetSeries = () => {
        setSeries([start]);
    };

    const saveHistory = () => {
        setHistory([...history, series]);
    };

    const triggerAnimation = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    };

   
    const data = {
        labels: series.map((_, i) => i + 1),
        datasets: [
            {
                label: "GP Series",
                data: series,
                borderWidth: 2,
                tension: 0.3
            }
        ]
    };

    return (
        <div className="card shadow p-4 mt-4">
            <h2 className="text-center mb-3">📈 GP Generator</h2>

            {/* Inputs */}
            <div className="row mb-2">
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        value={start}
                        onChange={(e) => setStart(Number(e.target.value))}
                        placeholder="Start"
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        value={ratio}
                        onChange={(e) => setRatio(Number(e.target.value))}
                        placeholder="Ratio"
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        placeholder="Limit"
                    />
                </div>
            </div>

           
            <div className="text-center mb-2">
                <button className="btn btn-primary me-2" onClick={generateNext}>
                    Next
                </button>
                <button className="btn btn-success me-2" onClick={generateAuto}>
                    Auto Generate
                </button>
                <button className="btn btn-warning me-2" onClick={resetSeries}>
                    Reset
                </button>
                <button className="btn btn-dark" onClick={saveHistory}>
                    Save
                </button>
            </div>

           
            <div className={`alert alert-info text-center ${animate ? "scale" : ""}`}>
                <strong>Series:</strong> {series.join(", ")}
            </div>

           
            <div className="mb-3">
                <Line data={data} />
            </div>

           
            <div>
                <h5>Saved History</h5>
                <ul className="list-group">
                    {history.map((item, index) => (
                        <li key={index} className="list-group-item">
                            {item.join(", ")}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Animation CSS */}
            <style>
                {`
                .scale {
                    transform: scale(1.05);
                    transition: 0.3s;
                }
                `}
            </style>
        </div>
    );
}

export default GPComponent;