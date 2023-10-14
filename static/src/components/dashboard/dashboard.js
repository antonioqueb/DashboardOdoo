/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { loadJS } from "@web/core/assets";

const { Component, tags, onWillStart, useRef, onMounted } = owl;

export class Dashboard extends Component {
    setup () {
        this.chartRef = useRef("chart");
        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
        });

        onMounted(()=>{
            const data = [
                { year: 2010, count: 10 },
                { year: 2011, count: 20 },
                { year: 2012, count: 15 },
                { year: 2013, count: 25 },
                { year: 2014, count: 22 },
                { year: 2015, count: 30 },
                { year: 2016, count: 28 },
              ];
            
              new Chart(
                this.chartRef.el.getContext('2d'),
                {
                  type: 'bar',
                  data: {
                    labels: data.map(row => row.year),
                    datasets: [
                      {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count)
                      }
                    ]
                  }
                }
              );

        })

    }
}

Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard };


// Log to console when adding to the registry to confirm it's being executed
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);
