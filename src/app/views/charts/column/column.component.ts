import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { PageTitleComponent } from '@component/page-title.component'
import { UIExamplesListComponent } from '@component/ui-examples-list/ui-examples-list.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import ApexCharts from 'apexcharts'

function updateQuarterChart(sourceChart: any, destChartIDToUpdate: string) {
  let series = []
  let seriesIndex = 0
  let colors = []
  if (sourceChart.w.globals.selectedDataPoints[0]) {
    let selectedPoints = sourceChart.w.globals.selectedDataPoints
    for (let i = 0; i < selectedPoints[seriesIndex].length; i++) {
      let selectedIndex = selectedPoints[seriesIndex][i]
      let yearSeries = sourceChart.w.config.series[seriesIndex]
      series.push({
        name: yearSeries.data[selectedIndex].x,
        data: yearSeries.data[selectedIndex].quarters,
      })
      colors.push(yearSeries.data[selectedIndex].color)
    }
    if (series.length === 0)
      series = [
        {
          data: [],
        },
      ]
    return ApexCharts.exec(destChartIDToUpdate, 'updateOptions', {
      series: series,
      colors: colors,
      fill: {
        colors: colors,
      },
    })
  }
}

function shuffleArray(
  array: { y: number; quarters: { x: string; y: number }[] }[]
) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

let arrayData = [
  {
    y: 400,
    quarters: [
      {
        x: 'Q1',
        y: 120,
      },
      {
        x: 'Q2',
        y: 90,
      },
      {
        x: 'Q3',
        y: 100,
      },
      {
        x: 'Q4',
        y: 90,
      },
    ],
  },
  {
    y: 430,
    quarters: [
      {
        x: 'Q1',
        y: 120,
      },
      {
        x: 'Q2',
        y: 110,
      },
      {
        x: 'Q3',
        y: 90,
      },
      {
        x: 'Q4',
        y: 110,
      },
    ],
  },
  {
    y: 448,
    quarters: [
      {
        x: 'Q1',
        y: 70,
      },
      {
        x: 'Q2',
        y: 100,
      },
      {
        x: 'Q3',
        y: 140,
      },
      {
        x: 'Q4',
        y: 138,
      },
    ],
  },
  {
    y: 470,
    quarters: [
      {
        x: 'Q1',
        y: 150,
      },
      {
        x: 'Q2',
        y: 60,
      },
      {
        x: 'Q3',
        y: 190,
      },
      {
        x: 'Q4',
        y: 70,
      },
    ],
  },
  {
    y: 540,
    quarters: [
      {
        x: 'Q1',
        y: 120,
      },
      {
        x: 'Q2',
        y: 120,
      },
      {
        x: 'Q3',
        y: 130,
      },
      {
        x: 'Q4',
        y: 170,
      },
    ],
  },
  {
    y: 580,
    quarters: [
      {
        x: 'Q1',
        y: 170,
      },
      {
        x: 'Q2',
        y: 130,
      },
      {
        x: 'Q3',
        y: 120,
      },
      {
        x: 'Q4',
        y: 160,
      },
    ],
  },
]

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [PageTitleComponent, NgApexchartsModule, UIExamplesListComponent],
  templateUrl: './column.component.html',
  styles: ``,
})
export class ColumnComponent {
  basicColumnChart: Partial<ChartOptions> = {
    chart: {
      height: 396,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    colors: ['#f8ac59', '#e06d94', '#7dcc93'],
    series: [
      {
        name: 'Net Profit',
        data: [47, 58, 59, 54, 62, 59, 65, 61, 68],
      },
      {
        name: 'Revenue',
        data: [79, 86, 103, 97, 89, 107, 93, 116, 96],
      },
      {
        name: 'Free Cash Flow',
        data: [38, 42, 39, 28, 47, 50, 54, 55, 43],
      },
    ],
    xaxis: {
      categories: [
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
      ],
    },
    legend: {
      offsetY: 7,
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f1f3fa',
      padding: {
        bottom: 5,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands'
        },
      },
    },
  }

  datalabelsColumnChart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%'
      },
      offsetY: -25,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    colors: ['#7dcc93'],
    legend: {
      show: true,
      horizontalAlign: 'center',
      offsetX: 0,
      offsetY: -5,
    },
    series: [
      {
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      position: 'top',
      labels: {
        offsetY: 0,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
        offsetY: -10,
      },
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100],
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + '%'
        },
      },
    },
    title: {
      text: 'Monthly Inflation in Argentina, 2002',
      floating: true,
      offsetY: 360,
      align: 'center',
      style: {
        color: '#444',
      },
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f1f3fa',
    },
  }

  stackedColumnChart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    series: [
      {
        name: 'Product A',
        data: [47, 58, 44, 70, 25, 46, 24, 52],
      },
      {
        name: 'Product B',
        data: [16, 26, 23, 11, 16, 30, 36, 15],
      },
      {
        name: 'Product C',
        data: [14, 20, 18, 18, 24, 17, 18, 16],
      },
    ],
    xaxis: {
      categories: [
        '2011 Q1',
        '2011 Q2',
        '2011 Q3',
        '2011 Q4',
        '2012 Q1',
        '2012 Q2',
        '2012 Q3',
        '2012 Q4',
      ],
    },
    colors: ['#4697ce', '#f8ac59', '#7dcc93'],
    fill: {
      opacity: 1,
    },
    legend: {
      offsetY: 7,
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f1f3fa',
      padding: {
        bottom: 5,
      },
    },
  }

  fullstackedColumnChart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'bar',
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    series: [
      {
        name: 'Product A',
        data: [11, 17, 15, 15, 21, 14, 15, 13],
      },
      {
        name: 'Product B',
        data: [44, 55, 41, 67, 22, 43, 21, 49],
      },
      {
        name: 'Product C',
        data: [13, 23, 20, 8, 13, 27, 33, 12],
      },
    ],
    xaxis: {
      categories: [
        '2011 Q1',
        '2011 Q2',
        '2011 Q3',
        '2011 Q4',
        '2012 Q1',
        '2012 Q2',
        '2012 Q3',
        '2012 Q4',
      ],
    },
    fill: {
      opacity: 1,
    },
    legend: {
      offsetY: 7,
    },
    colors: ['#eef2f7', '#4697ce', '#323a46'],
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f1f3fa',
      padding: {
        bottom: 5,
      },
    },
  }

  markersColumnChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Actual',
        data: [
          {
            x: '2011',
            y: 1292,
            goals: [
              {
                name: 'Expected',
                value: 1400,
                strokeHeight: 5,
                strokeColor: '#323a46',
              },
            ],
          },
          {
            x: '2012',
            y: 4432,
            goals: [
              {
                name: 'Expected',
                value: 5400,
                strokeHeight: 5,
                strokeColor: '#323a46',
              },
            ],
          },
          {
            x: '2013',
            y: 5423,
            goals: [
              {
                name: 'Expected',
                value: 5200,
                strokeHeight: 5,
                strokeColor: '#323a46',
              },
            ],
          },
          {
            x: '2014',
            y: 6653,
            goals: [
              {
                name: 'Expected',
                value: 6500,
                strokeHeight: 5,
                strokeColor: '#323a46',
              },
            ],
          },
          {
            x: '2015',
            y: 8133,
            goals: [
              {
                name: 'Expected',
                value: 6600,
                strokeHeight: 13,
                strokeWidth: 0,
                strokeLineCap: 'round',
                strokeColor: '#323a46',
              },
            ],
          },
          {
            x: '2016',
            y: 7132,
            goals: [
              {
                name: 'Expected',
                value: 7500,
                strokeHeight: 5,
                strokeColor: '#323a46',
              },
            ],
          },
          {
            x: '2017',
            y: 7332,
            goals: [
              {
                name: 'Expected',
                value: 8700,
                strokeHeight: 5,
                strokeColor: '#323a46',
              },
            ],
          },
          {
            x: '2018',
            y: 6553,
            goals: [
              {
                name: 'Expected',
                value: 7300,
                strokeHeight: 2,
                strokeDashArray: 2,
                strokeColor: '#323a46',
              },
            ],
          },
        ],
      },
    ],
    chart: {
      height: 380,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
      },
    },
    colors: ['#e06d94', '#323a46'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#e06d94', '#323a46'],
      },
    },
  }

  groupColumnChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Sales',
        data: [
          {
            x: 'Q1',
            y: 400,
          },
          {
            x: 'Q2',
            y: 430,
          },
          {
            x: 'Q3',
            y: 448,
          },
          {
            x: 'Q4',
            y: 470,
          },
          {
            x: 'Q1',
            y: 540,
          },
          {
            x: 'Q2',
            y: 580,
          },
          {
            x: 'Q3',
            y: 690,
          },
          {
            x: 'Q4',
            y: 690,
          },
        ],
      },
    ],
    chart: {
      type: 'bar',
      height: 380,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
      },
    },
    colors: ['#4697ce', '#fa5c7c'],
    xaxis: {
      type: 'category',
      group: {
        style: {
          fontSize: '10px',
          fontWeight: 700,
        },
        groups: [
          {
            title: '2020',
            cols: 4,
          },
          {
            title: '2021',
            cols: 4,
          },
        ],
      },
    },
  }

  rotatelabelColumnChart: Partial<ChartOptions> = {
    annotations: {
      points: [
        {
          x: 'Bananas',
          seriesIndex: 0,
          label: {
            borderColor: '#727cf5',
            offsetY: 0,
            style: {
              color: '#fff',
              background: '#727cf5',
            },
            text: 'Bananas are good',
          },
        },
      ],
    },
    chart: {
      height: 380,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    colors: ['#f8ac59'],
    series: [
      {
        name: 'Servings',
        data: [20, 15, 30, 25, 35, 40, 45, 50, 55, 60, 65, 70, 75],
      },
    ],
    grid: {
      borderColor: '#f1f3fa',
      padding: {
        top: 0,
        right: -2,
        bottom: -35,
        left: 10,
      },
    },
    xaxis: {
      labels: {
        rotate: -45,
      },
      categories: [
        'Apples',
        'Oranges',
        'Strawberries',
        'Pineapples',
        'Mangoes',
        'Bananas',
        'Blackberries',
        'Pears',
        'Watermelons',
        'Cherries',
        'Pomegranates',
        'Tangerines',
        'Papayas',
      ],
    },
    yaxis: {
      title: {
        text: 'Servings',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  }

  negativeColumnChart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: -100,
              to: -46,
              color: '#ff86c8',
            },
            {
              from: -45,
              to: 0,
              color: '#7f56da',
            },
          ],
        },
        columnWidth: '80%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#7dcc93'],
    series: [
      {
        name: 'Cash Flow',
        data: [
          1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09,
          0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8,
          -27.03, -54.4, -47.2, -43.3, -18.6, -48.6, -41.1, -39.6, -37.6, -29.4,
          -21.4, -2.4,
        ],
      },
    ],
    yaxis: {
      title: {
        text: 'Growth',
      },
      labels: {
        formatter: function (y) {
          return y.toFixed(0) + '%'
        },
      },
    },
    xaxis: {
      // TODO: uncomment below and fix the error
      //type: 'datetime',
      categories: [
        '2021-01-01',
        '2021-02-01',
        '2021-03-01',
        '2021-04-01',
        '2021-05-01',
        '2021-06-01',
        '2021-07-01',
        '2021-08-01',
        '2021-09-01',
        '2021-10-01',
        '2021-11-01',
        '2021-12-01',
        '2022-01-01',
        '2022-02-01',
        '2022-03-01',
        '2022-04-01',
        '2022-05-01',
        '2022-06-01',
        '2022-07-01',
        '2022-08-01',
        '2022-09-01',
        '2022-10-01',
        '2022-11-01',
        '2022-12-01',
        '2023-01-01',
        '2023-02-01',
        '2023-03-01',
        '2023-04-01',
        '2023-05-01',
        '2023-06-01',
        '2023-07-01',
        '2023-08-01',
        '2023-09-01',
      ],
      labels: {
        rotate: -90,
      },
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f1f3fa',
    },
  }

  distributedChart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    colors: [
      '#4697ce',
      '#53389f',
      '#7f56da',
      '#ff86c8',
      '#e06d94',
      '#63b7e6',
      '#f8ac59',
      '#7dcc93',
    ],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30],
      },
    ],
    xaxis: {
      categories: [
        'John',
        'Joe',
        'Jake',
        'Amber',
        'Peter',
        'Mary',
        'David',
        'Lily',
      ],
      labels: {
        style: {
          colors: [
            '#4697ce',
            '#53389f',
            '#7f56da',
            '#ff86c8',
            '#e06d94',
            '#63b7e6',
            '#f8ac59',
            '#7dcc93',
          ],
          fontSize: '14px',
        },
      },
    },
    legend: {
      offsetY: 7,
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f1f3fa',
    },
  }

  rangeColumnChart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'rangeBar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      offsetY: 7,
    },
    colors: ['#4697ce', '#7f56da'],
    series: [
      {
        name: 'Product A',
        data: [
          {
            x: 'Team A',
            y: [1, 5],
          },
          {
            x: 'Team B',
            y: [4, 6],
          },
          {
            x: 'Team C',
            y: [5, 8],
          },
          {
            x: 'Team D',
            y: [3, 11],
          },
        ],
      },
      {
        name: 'Product B',
        data: [
          {
            x: 'Team A',
            y: [2, 6],
          },
          {
            x: 'Team B',
            y: [1, 3],
          },
          {
            x: 'Team C',
            y: [7, 8],
          },
          {
            x: 'Team D',
            y: [5, 9],
          },
        ],
      },
    ],
  }
  makeData() {
    let dataSet = shuffleArray(arrayData)

    return [
      {
        x: '2011',
        y: dataSet[0].y,
        color: '#4697ce',
        quarters: dataSet[0].quarters,
      },
      {
        x: '2012',
        y: dataSet[1].y,
        color: '#6c757d',
        quarters: dataSet[1].quarters,
      },
      {
        x: '2013',
        y: dataSet[2].y,
        color: '#0acf97',
        quarters: dataSet[2].quarters,
      },
      {
        x: '2014',
        y: dataSet[3].y,
        color: '#fa5c7c',
        quarters: dataSet[3].quarters,
      },
      {
        x: '2015',
        y: dataSet[4].y,
        color: '#ffbc00',
        quarters: dataSet[4].quarters,
      },
      {
        x: '2016',
        y: dataSet[5].y,
        color: '#39afd1',
        quarters: dataSet[5].quarters,
      },
    ]
  }

  yearColumnChart: Partial<ChartOptions> = {
    series: [
      {
        data: this.makeData(),
      },
    ],
    chart: {
      id: 'barYear',
      height: 400,
      width: '100%',
      type: 'bar',
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: function (e, chart, opts) {
          let quarterChartEl = document.querySelector('#chart-quarter')
          var yearChartEl = document.querySelector('#chart-year')

          if (opts.selectedDataPoints[0].length === 1) {
            if (quarterChartEl?.classList.contains('active')) {
              updateQuarterChart(chart, 'barQuarter')
            } else {
              yearChartEl?.classList.add('chart-quarter-activated')
              quarterChartEl?.classList.add('active')
              updateQuarterChart(chart, 'barQuarter')
            }
          } else {
            updateQuarterChart(chart, 'barQuarter')
          }

          if (opts.selectedDataPoints[0].length === 0) {
            yearChartEl?.classList.remove('chart-quarter-activated')
            quarterChartEl?.classList.remove('active')
          }
        },
        updated: function (chart) {
          updateQuarterChart(chart, 'barQuarter')
        },
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        barHeight: '75%',
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff'],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex]
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    legend: {
      show: false,
    },
    colors: ['#4697ce', '#53389f', '#7f56da', '#ff86c8', '#e06d94', '#63b7e6'],

    states: {
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: 'darken',
          value: 1
        } as any,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
    },
    title: {
      text: 'Yearly Results',
      offsetX: 15,
    },
    subtitle: {
      text: '(Click on bar to see details)',
      offsetX: 15,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  }

  quarterChart: Partial<ChartOptions> = {
    series: [
      {
        data: [],
      },
    ],
    chart: {
      id: 'barQuarter',
      height: 400,
      width: '100%',
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        horizontal: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ['#4697ce', '#53389f', '#7f56da', '#ff86c8', '#e06d94', '#23c6c8'],
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: 'Quarterly Results',
      offsetX: 10,
    },
    tooltip: {
      x: {
        formatter: function (val, opts) {
          return opts.w.globals.seriesNames[opts.seriesIndex]
        },
      },
      // y: {
      //   title: {
      //     formatter: function (val, opts) {
      //       return opts.w.globals.labels[opts.dataPointIndex];
      //     },
      //   },
      // },
    },
  }

  updateQuarter() {
    this.yearColumnChart.series = [
      {
        data: this.makeData(),
      },
    ]
  }
}
