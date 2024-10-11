import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
/*
const dataset = [
  { platform: "PS2", count: 400 },
  { platform: "DS", count: 2152 },
  { platform: "PS3", count: 1331 },
  { platform: "Wii", count: 1320 },
  { platform: "X360", count: 1262 },
  { platform: "PSP", count: 1209 },
  { platform: "PC", count: 4500 },
  { platform: "XB", count: 150 },
  { platform: "GBA", count: 120 },
];

const dataset = [
  { platform: "PS2", global_sales: 400, jp_sales: 139 },
  { platform: "DS", global_sales: 2152, jp_sales: 1500 },
  { platform: "PS3", global_sales: 1331, jp_sales: 800 },
  { platform: "Wii", global_sales: 1320, jp_sales: 1500 },
  { platform: "X360", global_sales: 1262, jp_sales: 100 },
  { platform: "PSP", global_sales: 1209, jp_sales: 76 },
  { platform: "PC", global_sales: 4500, jp_sales: 250 },
  { platform: "XB", global_sales: 150, jp_sales: 180 },
  { platform: "GBA", global_sales: 120, jp_sales: 250 },
];
*/
async function drawVis() {
  const dataset = await d3.csv("./datasets/videogames_wide.csv", d3.autoType);
  //Global_sales, JP_sales
  console.log(dataset);

  const width = 640;
  const height = 400;

  const margin = { top: 10, right: 20, bottom: 20, left: 30 };

  const svg = d3
    .select("#visContainer")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("boarder", "1px solid black");

    /*
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    */

  //const xScale = d3.scaleLinear().domain([120, 4500]).range([0, 640]);
  //const yScale = d3.scaleLinear().domain([120, 4500]).range([0, 400]);
  //const maxCount = d3.max(dataset,(d)=>d.count);

  const maxGlobalSale = d3.max(dataset,(d)=>d.global_sales);

  const maxJpSale = d3.max(dataset,(d)=>d.jp_sales);


  const xScale = d3
    .scaleLinear()
    .domain([0, maxGlobalSale])
    .range([margin.left, width - margin.right]);

  console.log(xScale(2190));

  const yScale = d3
    .scaleLinear()
    .domain([0, maxJpSale])
    .range([height - margin.bottom,margin.top])


  const colorScale = d3
  .scaleLinear()
  .domain([0, maxGlobalSale])
  .range(["blue","red"])

  svg
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => {
      return xScale(d.global_sales);
    })
    .attr("cy", (d)=>{
      return yScale(d.jp_sales);
    })

    .attr("r", 2)
    .attr("fill", (d) => {
      try{
        //return colorScale(d.global_sales);
        //not sure about here
        if(d.Name.toLowerCase().includes("mario")){
          return "red";
        } else {
          return "grey";
        } 
      } catch (error){
        console.log(d);
      }
      

      
      
    });

  // add x axis
  svg
    .append("g")
    .call(d3.axisBottom(xScale))
    .attr("transform",`translate(0, ${height- margin.bottom})`);

  //add y axis
  svg
    .append("g")
    .call(d3.axisLeft(yScale))
    .attr("transform",`translate(${margin.left}, 0)`);

}


drawVis();

