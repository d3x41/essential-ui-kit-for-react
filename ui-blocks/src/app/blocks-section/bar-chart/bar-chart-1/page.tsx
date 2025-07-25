'use client';

import { useEffect, useRef, useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Category, ChartComponent, ColumnSeries, Inject, SeriesCollectionDirective, SeriesDirective, Tooltip } from "@syncfusion/ej2-react-charts";

export default function BarChart1() {
    /* SB Code - Start */
    const [theme, setTheme] = useState('tailwind');
    /* SB Code - End */
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [labelRotation, setLabelRotation] = useState(-45);
    const chartRef = useRef<ChartComponent | null>(null);
    
    const chartData: object[] = [
        { x: 'Accounting', y: 620 },
        { x: 'Implementation', y: 550 },
        { x: 'Deployment', y: 400 },
        { x: 'Marketing', y: 415 },
        { x: 'Customer Support', y: 310 },
        { x: 'Project Operations', y: 270 },
        { x: 'Logistics', y: 170 },
        { x: 'Finance', y: 150 },
        { x: 'Development', y: 80 }
    ];

    const primaryXAxis: object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        labelRotation: labelRotation,
        labelAlignment: 'Center',
        interval: 1,
        maximumLabelWidth: 100,
        enableWrap: true,
        labelStyle: { fontWeight: '500' }
    };

    const primaryYAxis: object = {
        labelFormat: '${value}K',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        minimum: 0,
        maximum: 700,
        interval: 140,
        labelStyle: { fontWeight: '500' }
    };

    const tooltip: object = {
        enable: true,
        format: '${point.x} : ${point.y}',
        enableMarker: false
    };

    const chartLoad = (args: any, lightTheme: string, darkTheme: string): void => {
        args.chart.theme = isDarkMode ? darkTheme : lightTheme;
    };

    const handleResize = (): void => {
        const newRotation = window.innerWidth <= 640 ? -90 : -45;
        setLabelRotation(newRotation);
    };

    /* SB Code - Start */
    const handleMessageEvent = (event: MessageEvent) => {
        if (event.origin === window.location.origin) {
            try {
                const blockData = JSON.parse(event.data);
                if (blockData.name === 'bar-chart-1' && blockData.theme) {
                    setTheme(blockData.theme);
                }
                else if (blockData.mode) {
                    setIsDarkMode(blockData.mode == 'dark');
                }
            } catch (error) {
                console.log('Error parsing message data: ', error);
            }
        }
    };
    /* SB Code - End */
    
    useEffect(() => {
        /* SB Code - Start */
        window.addEventListener('message', handleMessageEvent);
        /* SB Code - End */
        window.addEventListener('resize', handleResize);
        if (chartRef.current) {
            chartRef.current.refresh();
        }

        return () => {
            /* SB Code - Start */
            window.removeEventListener('message', handleMessageEvent);
            /* SB Code - End */
            window.removeEventListener('resize', handleResize);
        };
    }, [isDarkMode]);

    const getContent = () => {
        switch (theme) {
            case 'tailwind':
                return (
                    <section className="bg-white dark:bg-gray-950">
                        <div key={'barchart-1-tw'} className="h-screen flex justify-center p-4 sm:p-6">
                            <div className="w-full" style={{ maxWidth: '576px' }}>
                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                    <h1 className="text-base font-medium text-gray-900 dark:text-white">Top Earning Projects</h1>
                                    <ButtonComponent cssClass="e-outline" content="Last Month" iconCss="e-icons e-day" iconPosition="Right" type="button"></ButtonComponent>
                                </div>
                                <div className="mt-5">
                                    <ChartComponent ref={chartRef} chartArea={{ border: { width: 0 } }} width="100%" height="330px" primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} load={(args) => chartLoad(args, 'Tailwind3', 'Tailwind3Dark')}>
                                        <Inject services={[ColumnSeries, Tooltip, Category]} />
                                        <SeriesCollectionDirective>
                                            <SeriesDirective dataSource={chartData} type="Column" xName="x" yName="y" columnWidth={1} columnSpacing={0.2} fill="#267DDA"></SeriesDirective>
                                        </SeriesCollectionDirective>
                                    </ChartComponent>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            case 'bootstrap5':
                return (
                    <section className="bg-body">
                        <div key={'barchart-1-bs'} className="vh-100 d-flex justify-content-center p-3 p-sm-4">
                            <div className="w-100" style={{ maxWidth: '576px' }}>
                                <div className="d-flex flex-column flex-sm-row gap-1 justify-content-between align-items-start align-items-sm-center">
                                    <h1 className="fs-6 fw-medium text-body mb-sm-0">Top Earning Projects</h1>
                                    <ButtonComponent cssClass="e-outline" content="Last Month" iconCss="e-icons e-day" iconPosition="Right" type="button"></ButtonComponent>
                                </div>
                                <div className="mt-4">
                                    <ChartComponent ref={chartRef} chartArea={{ border: { width: 0 } }} width="100%" height="330px" primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} load={(args) => chartLoad(args, 'Bootstrap5', 'Bootstrap5Dark')}>
                                        <Inject services={[ColumnSeries, Tooltip, Category]} />
                                        <SeriesCollectionDirective>
                                            <SeriesDirective dataSource={chartData} type="Column" xName="x" yName="y" columnWidth={1} columnSpacing={0.2} fill="#006EEF"></SeriesDirective>
                                        </SeriesCollectionDirective>
                                    </ChartComponent>
                                </div>
                            </div>
                        </div>
                    </section>
                );
        }
    };

    return getContent();
}
