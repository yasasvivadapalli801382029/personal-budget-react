import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import * as d3 from "d3";

function HomePage() {
  var data = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ff5733",
          "#117a65",
          "#9b59b6",
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fc6b19",
        ],
      },
    ],
    labels: [],
  };
  
  const ChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    width: 300,
    height: 300,
  };
  
  useEffect(() => {
    axios.get("http://localhost:5000/budget")
      .then((res) => {
        for (var i = 0; i < res.data.myBudget.length; i++) {
          data.labels.push(res.data.myBudget[i].title);
          data.datasets[0].data.push(res.data.myBudget[i].budget);
        }
        createChart();
        createD3Chart();
      })
      .catch(error => {
        console.error("There was a problem fetching the data: ", error);
      });
  }, []);

  const createChart = () => {
    var ctx = document.getElementById("myChart");
    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: ChartOptions,
    });
  };

  const createD3Chart = () => {
    const w = 300;
    const h = 300;
    const r = Math.min(w, h) / 2;

    const color = d3
      .scaleOrdinal()
      .domain(data.labels)
      .range(data.datasets[0].backgroundColor);

    const svg = d3
      .select(".D3JSChart")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${w / 2},${h / 2})`);

    const pie = d3.pie().value((d) => d);
    const arc = d3.arc().innerRadius(r - 50).outerRadius(r);
    const arcs = svg.selectAll("arc").data(pie(data.datasets[0].data)).enter().append("g").attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    arcs.append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d, i) => data.labels[i]);
  };

  return (
    <main className="center container" id="main">
      <section className="page-area">
        <article className="text-box">
          <header>
            <h2>Stay on track</h2>
          </header>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article className="text-box">
          <header>
            <h2>Alerts</h2>
          </header>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article className="text-box">
          <header>
            <h2>Results</h2>
          </header>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article className="text-box">
          <header>
            <h2>Free</h2>
          </header>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>

        <article className="text-box">
          <header>
            <h2>Stay on track</h2>
          </header>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article className="text-box">
          <header>
            <h2>Alerts</h2>
          </header>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article className="text-box">
          <header>
            <h2>Results</h2>
          </header>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article className="text-box">
          <header>
            <h2>Free</h2>
          </header>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>
        <br/>
        <article className="text-box">
          <header>
            <h2>Chart</h2>
          </header>
          <canvas id="myChart" width="400" height="400"></canvas>
        </article>
        <br/>
        <article className="text-box">
          <h2>D3JS Chart</h2>
          <div className="D3JSChart"></div>
        </article>
      </section>
    </main>
  );
}

export default HomePage;
