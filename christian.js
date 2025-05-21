const svg = d3.select("svg");
const margin = { top: 60, right: 30, bottom: 100, left: 60 };
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;
const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("data-set/05_WorldsBestRestaurants_Updated.csv").then(data => {
  // Step 1: Count appearances by country
  const countryCounts = d3.rollup(
    data,
    v => v.length,
    d => d.country
  );

  // Step 2: Get top 5 countries by total appearances
  const top5Countries = Array.from(countryCounts.entries())
    .sort((a, b) => d3.descending(a[1], b[1]))
    .slice(0, 5)
    .map(d => d[0]);

  // Step 3: Filter original data to only include top 5 countries
  const filteredData = data.filter(d => top5Countries.includes(d.country));

  // Step 4: Group data by year and country
  const nested = d3.rollups(
    filteredData,
    v => v.length,
    d => d.year,
    d => d.country
  );

  const years = Array.from(new Set(filteredData.map(d => d.year))).sort();
  const countries = top5Countries;

  const formatted = nested.map(([year, entries]) => {
    const entry = { year };
    for (const [country, count] of entries) {
      entry[country] = count;
    }
    return entry;
  });

  const x0 = d3.scaleBand()
    .domain(years)
    .range([0, width])
    .paddingInner(0.1);

  const x1 = d3.scaleBand()
    .domain(countries)
    .range([0, x0.bandwidth()])
    .padding(0.05);

  const y = d3.scaleLinear()
    .domain([0, d3.max(formatted, d => d3.max(countries, c => d[c] || 0))])
    .nice()
    .range([height, 0]);

  const color = d3.scaleOrdinal()
    .domain(countries)
    .range(d3.schemeTableau10);

  // X Axis
  chart.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x0))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  // Y Axis
  chart.append("g").call(d3.axisLeft(y));

  // Bars
  chart.selectAll("g.layer")
    .data(formatted)
    .enter()
    .append("g")
    .attr("transform", d => `translate(${x0(d.year)},0)`)
    .selectAll("rect")
    .data(d => countries.map(country => ({
      key: country,
      value: d[country] || 0,
      year: d.year
    })))
    .enter()
    .append("rect")
    .attr("x", d => x1(d.key))
    .attr("y", d => y(d.value))
    .attr("width", x1.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", d => color(d.key))
    .attr("class", d => `bar bar-${d.key.replace(/\s+/g, '-')}`)
    .on("mouseover", (event, d) => {
      d3.selectAll(".bar")
        .transition().duration(200)
        .style("opacity", 0.15);

      d3.selectAll(`.bar-${d.key.replace(/\s+/g, '-')}`)
        .transition().duration(200)
        .style("opacity", 1);
    })
    .on("mouseout", () => {
      d3.selectAll(".bar")
        .transition().duration(300)
        .style("opacity", 1);
    });


  // Axis labels
  svg.append("text")
    .attr("x", width / 2 + margin.left)
    .attr("y", height + margin.top + 60)
    .attr("text-anchor", "middle")
    .text("Year");

  svg.append("text")
    .attr("x", -height / 2)
    .attr("y", margin.left / 2 - 20)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Number of Restaurants");

  // Legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width - 150},${margin.top})`);

  countries.forEach((c, i) => {
    const row = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    row.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", color(c));

    row.append("text")
      .attr("x", 18)
      .attr("y", 10)
      .text(c)
      .attr("font-size", "12px");
  });
}).catch(err => console.error("CSV Load Error:", err));
