import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexGrid,
  ApexDataLabels,
  ApexFill,
  ApexPlotOptions,
  ApexLegend,
} from 'ng-apexcharts';

import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  colors: string[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  // stroke: ApexStroke;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  // fill: ApexFill;
  legend: ApexLegend;
};

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './revenue-chart.html',
})
export class RevenueChart implements OnChanges {
  @Input()
  categories: string[] | undefined = [];

  @Input()
  revenueData: any[] | undefined = [];

  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Revenue',
        data: [],
      },
    ],

    colors: ['#789085'],

    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: 'Inter, sans-serif',
      foreColor: 'var(--chart-text)',
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },

    dataLabels: {
      enabled: false,
    },

    // stroke: {
    //   curve: 'smooth',
    //   width: 2,
    // },

    // fill: {
    //   type: 'gradient',
    //   gradient: {
    //     opacityFrom: 0.25,
    //     opacityTo: 0.02,
    //   },
    // },

    xaxis: {
      categories: [],

      labels: {
        style: {
          fontSize: '12px',
          colors: ['var(--chart-text)'],
        },
      },

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: ['var(--chart-text)'],
        },

        formatter: (value) => {
          return `₦${value.toLocaleString()}`;
        },
      },
    },

    grid: {
      borderColor: 'var(--chart-grid)',
      strokeDashArray: 4,
    },

    tooltip: {
      y: {
        formatter: (value) => {
          return `₦${value.toLocaleString()}`;
        },
      },
    },

    legend: {
      show: false,
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'] || changes['revenueData']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    this.chartOptions = {
      ...this.chartOptions,

      series: [
        {
          name: 'Revenue',
          data: this.revenueData ?? [],
        },
      ],

      xaxis: {
        ...this.chartOptions.xaxis,

        categories: this.categories,
      },
    };
  }
}
