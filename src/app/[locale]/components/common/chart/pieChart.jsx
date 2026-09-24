import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = (props) => {
    const { seriesData, width = 400, height = 400 } = props;

    const labels = Array.isArray(seriesData?.data?.label) ? seriesData.data.label : [];
    const rawSeries = Array.isArray(seriesData?.data?.data) ? seriesData.data.data : [];
    const safeSeries = rawSeries.length > 0 ? rawSeries : [100];
    const safeLabels = labels.length === safeSeries.length ? labels : labels.slice(0, safeSeries.length);

    const options = {
        chart: {
            type: "donut",
            animations: { enabled: false },
            redrawOnParentResize: false,
            toolbar: { show: false },
        },
        labels: safeLabels,
        legend: { position: "right" },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        plotOptions: {
            pie: { donut: { size: "70%" } },
        },
        responsive: [
            {
                breakpoint: 640,
                options: {
                    legend: { position: "bottom" },
                },
            },
        ],
        noData: { text: "" },
        tooltip: { enabled: rawSeries.length > 0 },
    };

    return (
        <Chart
            options={options}
            series={safeSeries}
            type="donut"
            width={width === "100%" ? "100%" : width}
            height={height}
        />
    );
};

export default PieChart;

