/*
D3 IC 07
Arielle Greenberg
Modified: 02/15/2023
*/



// the reason this is moreso on the left side of the webpage is because 200 500
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom:50}


const data2 = [55000, 48000, 27000, 66000, 90000]

// my frame minus my margins to give me the actual area that i want to plot inside of
// this saves u with margin bs later
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME3 = d3.select("#vis3")
                .append("svg")
                .attr("height", FRAME_HEIGHT)
                .attr("width", FRAME_WIDTH)
                .attr("class", "frame");


// what this max function does is look through all the rows in your data
// the (d) => return d loops through the data2
const MAX_X = d3.max(data2, (d) => {return d;});
console.log("Max x: " + MAX_X);

// scaling functions
// for quantitative data we use scale linear
// we're just telling teh scale what to be able to deal with
// we just added 10,000 just because. u kinda just gotta play with it
const X_SCALE = d3.scaleLinear()
                 // should expect data values from 0 to 50,000
                //  10,000 is a good buffer for this
                  .domain([0, (MAX_X + 10000)])
                  .range([0, VIS_WIDTH]); 

FRAME3.selectAll("points")
    .data(data2)
    .enter()
    .append("circle")
        .attr("cx", (d) => {
            return (X_SCALE(d) + MARGINS.left);
        })
        .attr("cy", MARGINS.top)
        .attr("r", 20)
         .attr("class", "point");

// add an axis
// placeholder for a generic svg
FRAME3.append("g")
        .attr("transform", 
                "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top + ")"))
                // setting the number of x ticks to be 4
        .call(d3.axisLeft(X_SCALE).ticks(4))
        .attr("font-size", "20px");

