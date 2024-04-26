import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'high-chart';
  combinedEmail: any;
  emails: any;
  tableData: any = [];
  oldArray = [
    { id: 1, name: 'test', email: 'testing@example.com', employeeId: 8 },
  ];
  newArray = [
    { id: 5, name: 'raman', email: 'testing1@example.com', employeeId: 1 },
  ];

  combineArrays(): any[] {
    const combined = [];
    this.oldArray.forEach((item) => {
      const newItem = { ...item };
      const match = this.newArray.find((newItem) => newItem.name === item.name);
      if (match) {
        newItem.email = `${item.email}(${match.email})`;
        this.newArray.splice(this.newArray.indexOf(match), 1);
      }
      combined.push(newItem);
    });
    combined.push(...this.newArray);
    return combined;
  }

  getFormattedData(): string[][] {
    const combined = this.combineArrays();
    const formattedData = combined.map((item) => [
      item.id.toString(),
      item.name,
      `${item.email}(${item.email})`,
    ]);
    return formattedData;
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.AreaChart();
    this.createBarChart();
    this.createCustomAnimatedPieChart();
    this.maleFemaleGraph();
    this.agePrecentageGraph();
    this.emotionsBar();
    this.ageAreaChart();
    this.createDonutChart();
  }
  AreaChart() {
    const chartOptionsArea: Highcharts.Options = {
      chart: {
        type: 'area',
      },
      accessibility: {
        description: 'test1',
      },
      title: {
        text: 'Audience',
      },
      xAxis: {
        allowDecimals: false,
        type: 'datetime', // Set the x-axis type to datetime
        dateTimeLabelFormats: {
          month: '%b %e, %Y',
        },
        min: Date.UTC(2024, 2, 10), // Set the minimum value for the x-axis (10 March 2024)
        max: Date.UTC(2024, 2, 18), // Set the maximum value for the x-axis (18 March 2024)
      },
      yAxis: {
        title: {
          text: 'Amount', // left side text show
        },
      },
      tooltip: {
        pointFormat:
          '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}',
      },
      credits: {
        enabled: false, // Disable Highcharts credits
      },
      plotOptions: {
        area: {
          pointStart: Date.UTC(2024, 2, 10), // Start date from 10 March 2024
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
      series: [
        {
          type: 'area',
          name: 'Male',
          color: '#e8effa', // Light blue for Male
          lineColor: '#0864cd',
          data: [
            [Date.UTC(2024, 2, 10), 50],
            [Date.UTC(2024, 2, 11), 100],
            [Date.UTC(2024, 2, 12), 200],
            [Date.UTC(2024, 2, 13), 300],
            [Date.UTC(2024, 2, 14), 500],
            [Date.UTC(2024, 2, 15), 300],
            [Date.UTC(2024, 2, 16), 200],
            [Date.UTC(2024, 2, 17), 150],
            [Date.UTC(2024, 2, 18), 50],
          ],
        },
        {
          type: 'area',
          name: 'Female',
          color: '#e8e1ef', // Light red for Female
          lineColor: '#ff5184', // Dark red border for Female
          data: [
            [Date.UTC(2024, 2, 10), 10],
            [Date.UTC(2024, 2, 11), 20],
            [Date.UTC(2024, 2, 12), 30],
            [Date.UTC(2024, 2, 13), 45],
            [Date.UTC(2024, 2, 14), 300],
            [Date.UTC(2024, 2, 15), 45],
            [Date.UTC(2024, 2, 16), 30],
            [Date.UTC(2024, 2, 17), 20],
            [Date.UTC(2024, 2, 18), 10],
          ],
        },
      ],
    };
    Highcharts.chart('container', chartOptionsArea);
  }

  createBarChart() {
    const chartOptionsBar: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Gender & Age',
        align: 'left',
      },
      xAxis: {
        categories: ['0-19', '20-29', '30-45', '46-60', '61+'],
        crosshair: false,
        accessibility: {
          description: 'Age Groups',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount',
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        valueSuffix: ' (1000 MT)',
      },
      plotOptions: {
        column: {
          groupPadding: 0.1,
          pointPadding: 0,
          borderColor: 'transparent',
          pointWidth: 40,
          dataLabels: {
            enabled: true,
            format: '{point.y:.0f}%',
            style: {
              fontSize: '17px',
              color: 'rgba(0, 0, 0, 1)',
            },
          },
        },
      },
      series: [
        {
          type: 'column',
          name: 'Male',
          data: [25, 40, 15, 10, 5],
          color: '#dcf0fc',
          borderColor: '#169de8',
          dataLabels: {
            style: {
              color: '#169de8',
            },
            borderWidth: 0,
          },
        },
        {
          type: 'column',
          name: 'Female',
          data: [30, 35, 10, 15, 10],
          color: '#ffe3eb',
          borderColor: '#ff5184',
          dataLabels: {
            style: {
              color: '#ff5184',
            },
          },
        },
      ],
    };

    Highcharts.chart('barGraph', chartOptionsBar);
  }
  fillDataValue: any = '25';
  getSubtitle() {
    return `<div class="monthly-smart-mails-graph">
        <p>${this.fillDataValue}%</p>
    </div>`;
  }
  createCustomAnimatedPieChart() {
    const chartOptionsPie: Highcharts.Options = {
      colors: ['#6240d9', '#8b6aff', '#b09aff', '#d9ceff'],
      chart: {
        type: 'pie',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      title: {
        text: 'Engaged visitors',
      },
      subtitle: {
        useHTML: true,
        text: this.getSubtitle(),
        verticalAlign: 'middle',
        style: {
          textAlign: 'center',
        },
        y: 15,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            useHTML: true,
            enabled: true,
            formatter: function () {
              return (
                '<div class="custom-label" style="background-color:' +
                this.point.color +
                '">' +
                this.point.y +
                '</div>'
              );
            },
          },
          enableMouseTracking: false,
          innerSize: '55%',
          showInLegend: true,
        },
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'middle',
        borderWidth: 0,
        useHTML: true,

        labelFormatter: function () {
          let labelHTML = '';
          if (this instanceof Highcharts.Point) {
            labelHTML =
              '<span class="custom-label-bottom" style="background-color:' +
              this.color +
              '">' +
              this.y +
              '</span> ' +
              '<span class="custom-legend-label">' +
              this.name +
              '</span> ';
          } else if (this instanceof Highcharts.Series) {
            labelHTML = '<span>' + this.name + '</span>';
          }
          return labelHTML;
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Engagement',
          data: [
            {
              name: 'Engaged <6 sec',
              y: 161,
            },
            {
              name: 'Engaged 6-10 sec',
              y: 90,
            },
            {
              name: 'Engaged 11-15 sec',
              y: 23,
            },
            {
              name: 'Engaged >15 sec',
              y: 89,
            },
          ],
        },
      ],
    };
    Highcharts.chart('PieChart', chartOptionsPie);
  }

  maleFemaleGraph() {
    const chartOptionsMFBar: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Male vs Female Percentage',
      },
      xAxis: {
        categories: ['Male', 'Female'],
      },
      yAxis: {
        title: {
          text: 'Percentage',
        },

        labels: {
          formatter: function () {
            return (
              '<span class="custom-label-values" style="font-size:17px;">' +
              this.value +
              '%</span>'
            );
          },
        },
      },
      plotOptions: {
        column: {
          borderWidth: 5,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return (
                '<span class="custom-label-values" style="font-size:17px;">' +
                this.y +
                '%</span>'
              );
            },
          },
        },
      },
      credits: {
        enabled: false, // Disable Highcharts credits
      },
      series: [
        {
          type: 'column',
          name: 'Male',
          color: '#d9e7f7',
          data: [48],
          borderColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#0563cc'],
              [0.01, 'transparent'],
            ],
          },
        },
        {
          type: 'column',
          name: 'Female',
          color: '#ffe3eb',
          data: [62],
          borderColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#ff5184'],
              [0.01, 'transparent'],
            ],
          },
        },
      ],
    };

    Highcharts.chart('maleFemale', chartOptionsMFBar);
  }

  agePrecentageGraph() {
    const data: any = [
      { name: '<20', value: 45 },
      { name: '20-29', value: 32 },
      { name: '30-45', value: 22 },
      { name: '>45', value: 1 },
    ];
    const chartOptionsagePrecentageBar: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        useHTML: true,
        text: '<span class="custom-label-values" style="font-size:20px; position:absolute; top:40px;">Age (%) <span style="background-color: #b6c1bd; color:#fff; border-radius:5px; width:10px; border-radius:17px; padding:6px 11px;"> ? </span></span>',
        align: 'left',
        style: {
          fontWeight: 'bold',
          color: '#333',
        },
      },
      xAxis: {
        categories: data.map((item: any) => item.name),
      },
      yAxis: {
        title: {
          text: 'Amount (%)',
        },
        labels: {
          formatter: function () {
            return (
              '<span class="custom-label-values" style="font-size:17px;">' +
              this.value +
              '%</span>'
            );
          },
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        column: {
          borderWidth: 5,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return (
                '<span class="custom-label-values" style="font-size:17px;">' +
                this.y +
                '%</span>'
              );
            },
          },
          pointPlacement: -0.2,
        },
      },
      legend: {
        layout: 'horizontal',
        useHTML: true,
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 100,
      },
      series: [
        {
          type: 'column',
          name: data
            .map((item: any) => {
              return (
                '<span class="top-name" style="font-size:17px; color:#1fcf52; background-color:#d4f5dc; margin: 3px 11px;  border-radius:6px; height:30px; width:65px; display:inline-block; text-align:center; line-height:30px;padding: 0;"><li>' +
                '<span  style="font-size:17px; margin:-8px; position:relative; left:-6px">' +
                item.name +
                '</span>' +
                '</li></span>'
              );
            })
            .join(''),
          events: {
            legendItemClick: function () {
              return false;
            },
          },
          data: data.map((item: any) => ({
            y: parseFloat(item.value),
            color: '#d4f5dc',
            dataLabels: {
              enabled: true,
              format:
                '<span class="custom-label-values" style="font-size:17px; color:#1fcf52">{y}%</span>',
            },
            borderColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, '#1fcf52'],
                [0.01, 'transparent'],
              ],
            },
          })),
        },
      ],
    };

    Highcharts.chart('agePrecentage', chartOptionsagePrecentageBar);
  }

  emotionsBar() {
    const data: any = [
      {
        name: '<img src="../assets/neutral-face-emoji.png" width="35" height="35"  style="margin: 6px 9px 7px 1px; background-color:#796767; border-radius: 19px; border: 1px solid #96a09e;"/>',
        value: 82,
      },
      {
        name: '<img src="../assets/emoticon-smiley-face.png" width="35" height="35"  style="margin: 6px 9px 7px 1px;background-color: #f6edcd; border-radius: 19px; border: 1px solid #d1a401;);"/>',
        value: 6,
      },
      {
        name: '<img src="../assets/sad.png" width="35" height="35" style="margin: 6px 9px 7px 1px;background-color: #d9f4e1; border-radius: 19px; border: 1px solid #74e392;"/>',
        value: 0,
      },
      {
        name: '<img src="../assets/shocked.png" width="35" height="35"  style="margin: 6px 9px 7px 1px; background-color: #ff91b0; border-radius: 19px; border: 1px solid #ff91b0;"/>',
        value: 1,
      },
    ];

    const colors = ['#eaecec', '#f6edcd', '#d9f4e1', '#ffe0e9'];
    const topColors = ['#96a09e', '#d1a401', '#74e392', '#ff91b0'];
    const chartOptionsageEmotionsBar: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        useHTML: true,
        text: '<span class="custom-label-values" style="font-size:20px; position:absolute; top:40px;">Emotions (%)</span>',
        align: 'left',
        style: {
          fontWeight: 'bold',
          color: '#333',
        },
      },
      xAxis: {
        categories: data.map((f: any) => f.name),
        labels: {
          useHTML: true,
          style: {
            fontSize: '20px',
          },
        },
      },
      yAxis: {
        title: {
          text: 'Amount (%)',
        },
        labels: {
          formatter: function () {
            return (
              '<span class="custom-label-values" style="font-size:17px;">' +
              this.value +
              '%</span>'
            );
          },
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        column: {
          borderWidth: 5,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return (
                '<span class="custom-label-values" style="font-size:17px;">' +
                this.y +
                '%</span>'
              );
            },
          },
          pointPlacement: -0.2,
        },
      },
      legend: {
        layout: 'horizontal',
        useHTML: true,
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 100,
      },
      series: [
        {
          type: 'column',
          name:
            '<span class="emoji" style="font-size:20px; letter-spacing:15px">' +
            data.map((item: any) => item.name).join('') +
            '</span>',
          data: data.map((item: any, index: number) => ({
            y: parseFloat(item.value),
            color: colors[index],
            dataLabels: {
              enabled: true,
              format:
                '<span class="custom-label-values" style="font-size:17px; color:' +
                topColors[index] +
                '">{y}%</span>',
            },
            borderColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, topColors[index]],
                [0.01, 'transparent'],
              ],
            },
          })),
        },
      ],
    };

    Highcharts.chart('emotionsBar', chartOptionsageEmotionsBar);
  }

  ageAreaChart() {
    const dataGroupA = [0.1, 8, 0.3, 16, 0.35, 30, 25, 0.2, 0.15, 0.1];
    const dataGroupB = [0.05, 16, 0.5, 0.2, 25, 0.2, 0.15, 0.1, 0.05, 0];
    const dataGroupC = [0.2, 8, 0.4, 35, 0.3, 0.25, 40, 0.15, 0.1, 0.05];
    const dataGroupD = [0, 0.8, 16, 5, 0.5, 0.5, 0.12, 0.5, 0.1, 0.05];

    const chartOptionsAgeArea: Highcharts.Options = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Overlaying Density Plots',
      },
      xAxis: {
        // categories: ['-10', '-8', '-6', '-4', '-2', '0', '2', '4', '6', '8', '10']
      },
      yAxis: {
        title: {
          text: 'Density',
        },
      },
      series: [
        {
          type: 'area',
          name: 'Group A',
          data: dataGroupA,
          fillOpacity: 0.2,
          color: '#6240d9',
        },
        {
          type: 'area',
          name: 'Group B',
          data: dataGroupB,
          fillOpacity: 0.2,
          color: '#74e392',
        },
        {
          type: 'area',
          name: 'Group C',
          data: dataGroupC,
          fillOpacity: 0.2,
          color: '#ff91b0',
        },
        {
          type: 'area',
          name: 'Group D',
          data: dataGroupD,
          fillOpacity: 0.2,
          color: '#96a09e',
        },
      ],
      plotOptions: {
        area: {
          marker: {
            enabled: false,
          },
          lineWidth: 2,
          connectNulls: true,
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        itemStyle: {
          color: '#333',
        },
      },
    };

    Highcharts.chart('AgeArea', chartOptionsAgeArea);
  }

  selectAllChecked: boolean = false;

  checkboxes = [
    { id: 'mce-group[19]-19-0', label: 'Women', checked: false },
    { id: 'mce-group[19]-19-1', label: 'Men', checked: false },
    { id: 'mce-group[19]-19-2', label: 'Kid', checked: false },
    { id: 'mce-group[19]-19-3', label: 'Athletic', checked: false },
    { id: 'mce-group[19]-19-4', label: 'Outdoor', checked: false },
    { id: 'mce-group[19]-19-5', label: 'Casual', checked: false },
  ];

  selectAllChanged(event: any) {
    this.selectAllChecked = event.target.checked;
    this.checkboxes.forEach((checkbox) => {
      checkbox.checked = this.selectAllChecked;
    });
  }

  checkboxChanged(id: string) {
    const checkbox = this.checkboxes.find(cb => cb.id === id);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      const allChecked = this.checkboxes.every(cb => cb.checked);
      this.selectAllChecked = allChecked ? true : false;
    }
  }
  
    startYear: any; 
    nbr: any; 
  
  
    createDonutChart() {
      
      const chartOptionsPie: Highcharts.Options = {
        chart:{
            type: 'pie',
        },
        subtitle: {
          useHTML: true,
          text: 'hello hello',
          floating: true,
          verticalAlign: 'middle',
          y: 30
        },
    
        legend: {
          enabled: false
        },
    
        tooltip: {
          valueDecimals: 2,
          valueSuffix: ' TWh'
        },
    
        plotOptions: {
          series: {
            borderWidth: 0,
         
                  dataLabels: {
              enabled: true,
              crop: false,
              style: {
                fontWeight: 'bold',
                fontSize: '16px'
              },
            }
          }
        },
        colors: ['#FCE700', '#F8C4B4', '#f6e1ea', '#B8E8FC', '#BCE29E'],
        series: [
          {
            type: 'pie',
            name: this.startYear,
            data: [
              { name: '1', y: 1 },
              { name: '2', y: 2 },
              { name: '3', y: 3 },
              { name: '4', y: 4 },
              { name: '5', y: 5 },
            ],          }
        ],
      };
      Highcharts.chart('DonutChart', chartOptionsPie);
    }
}
