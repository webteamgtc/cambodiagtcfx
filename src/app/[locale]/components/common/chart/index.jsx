// import { useRef } from "react";
// import dynamic from 'next/dynamic';
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const ColumnChart = (props) => {
//     const chartRef = useRef(null);
//     const {
//         width,
//         seriesData = [],
//         height,
//         label,
//         strokeWidth = [1],
//         showAxis = false,
//         grid = false
//     } = props;

//     const options =
//     {
//         chart: {
//             type: 'line',
//             zoom: {
//                 enabled: false
//             },
//             toolbar: {
//                 show: false,
//             },
//         },
//         dataLabels: {
//             enabled: false
//         },
//         colors: ["#1039af"],
//         stroke: {
//             show: true,
//             curve: "straight",
//             lineCap: "butt",
//             width: strokeWidth,
//             dashArray: 0,
//         },
//         xaxis: {
//             type: 'datetime',
//             labels: {
//                 show: showAxis||false
//             },
//             axisBorder: {
//                 show: false
//             },
//             axisTicks: {
//                 show: false,
//             },
//             crosshairs: {
//                 show: false
//             }
//         },
//         yaxis: {
//             tickAmount: 4,
//             labels: {
//                 show: showAxis||false
//             },
//             title: {
//                 text: label,
//                 style: {
//                     color: "#b68756",
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     cssClass: 'apexcharts-yaxis-title',
//                 },
//             }
//         },
//         grid: {
//             show: grid||false,
//         },
//         tooltip: {
//             enabled: true
//         },
//         legend: {
//             horizontalAlign: 'left'
//         },
//         annotations: {
//             yaxis: [{
//                 y: 0,
//                 //   borderColor: executiveReport ? "" : Colors.primary,
//                 strokeDashArray: 0,
//             },],
//             xaxis: [
//                 {
//                     x: 0,
//                     borderColor: "",
//                 },
//             ],
//         },
//     };

//     return (
//         <div className="w-full">
//             <Chart options={options} series={seriesData}
//                 type="area" height={height || 350} width={width || 250}
//                 className="chartss"
//             />
//         </div>
//     );
// };

// export default ColumnChart;

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ColumnChart = (props) => {
    //   fillColor
    // legendColors
    // legendFillColors
    const {
        width,
        seriesData = [],
        height,
        label,
        strokeWidth = [1],
        showAxis = false,
        grid = false,
        /** 'area' (default) or 'bar' — bar uses solid fill, no area gradient */
        variant = "area",
    } = props;

    const isBar = variant === "bar";
    const chartHeight = Number(height) || 350;
    const safeSeries =
        Array.isArray(seriesData) && seriesData.length > 0
            ? seriesData
            : [{ name: "Return", data: [] }];

    const options = {
        chart: {
            type: isBar ? "bar" : "area",
            height: chartHeight,
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: !showAxis,
            },
            animations: {
                enabled: false,
            },
            redrawOnParentResize: false,

        },
        noData: {
            text: "",
            align: "center",
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#1039af"],
        ...(isBar
            ? {
                  plotOptions: {
                      bar: {
                          borderRadius: 4,
                          columnWidth: "55%",
                      },
                  },
                  fill: {
                      type: "solid",
                      opacity: 1,
                  },
                  stroke: {
                      show: false,
                      width: 0,
                  },
              }
            : {
                  stroke: {
                      show: true,
                      curve: "straight",
                      lineCap: "butt",
                      width: strokeWidth,
                      dashArray: 0,
                  },
              }),
        xaxis: {
            type: 'datetime',
            labels: {
                show: showAxis || false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                show: false
            }
        },
        yaxis: {
            tickAmount: 4,
            labels: {
        show: showAxis || false,
        formatter: (val) => {
            const n = Number(val);
            if (!Number.isFinite(n)) return "";
            return n.toFixed(2);
        },
            },
            title: {
                text: label,
                style: {
                    color: "#b68756",
                    fontSize: '16px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-title',
                },
            }
        },
        grid: {
            show: grid || false,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                // When axes are visible, ApexCharts needs left padding
                left: showAxis ? 18 : 0,
            },
        },
        legend: {
            horizontalAlign: 'left'
        }
    };

    return (
        <div className="w-full">
            <Chart
                options={options}
                series={safeSeries}
                type={isBar ? "bar" : "area"}
                height={chartHeight}
                width={width === "100%" ? "100%" : width || 250}
                className="chartss"
            />
        </div>
    );
};

export default ColumnChart;

