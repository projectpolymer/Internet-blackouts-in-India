//svg width
const width = 900;
const height = 900;

//center origins
var originX = 450;
var originY = 450;

//selecting svg
var svg = d3.select('svg');
svg.attr('width', width)
   .attr('height', height);


//graph circle sizes
var innerCircleRadius = 40;
var outerCircleRadius = 60;

//colours
var mobile_col = '#8798ac'; //blue for mobile
var landline_col = '#eb8c70'; //orange for landline

//totals for center circles
var center_total_mobile = 0;
var center_total_landline = 0;

//coordinates for rectangles
var chairOriginX = originX + ((outerCircleRadius) * Math.sin(0));
var chairOriginY = originY - ((outerCircleRadius) * Math.cos(0));  
var chairWidth = 7;

//setting scales
var dur_log_Scale = d3.scaleLog().domain([1, 5352]).range([1, 100]); //scale for rects
var econ_log_Scale = d3.scaleLog().domain([1, 1500]).range([1, 100]); //scale for economy circles original was 150
var year = 12; //year key

//setting variables
var rot_angle = 30;
var y_mobile;
var rect_height_mobile;
var r_mobile;
var y_landline;
var rect_height_landline;
var r_landline;
var opacity = 0.25;

//appening parent group to svg
var chair = svg.append('g').attr('class','parent_group');

for(var i = 0; i <6;i++){

    //center total for mobile
    center_total_mobile = center_total_mobile + mobile_econ[key][parseInt('20'+(year+i))];

    if(mobile_data[key][parseInt('20'+(year+i))] > 0){

        y_mobile = (chairOriginY - (chairWidth / 2))-dur_log_Scale(mobile_data[key][parseInt('20'+(year+i))]);
        rect_height_mobile = dur_log_Scale(mobile_data[key][parseInt('20'+(year+i))]);
        r_mobile = econ_log_Scale(mobile_econ[key][parseInt('20'+(year+i))]);
    
    }
    else{
        
        y_mobile = 0;
        rect_height_mobile = 0;
        r_mobile = 0;
    
    }

    //economy circles
    chair.append('circle')
         .attr('cx', chairOriginX)
         .attr('cy', chairOriginY-rect_height_mobile)
         .attr('r', r_mobile)
         .attr('fill', '#F1948A')
         .attr('stroke', "#E74C3C")
         .attr('opacity', opacity)
         .attr("transform", "rotate(" + ((i*rot_angle)+15) + ", 450, 450)");

    //duration rectangles
    chair.append("rect")
         .attr('x', chairOriginX - (chairWidth / 2))
         .attr('y', y_mobile)
         .attr('width', chairWidth)
         .attr('opacity', 1)
         .attr('height', rect_height_mobile)
         .attr('fill', mobile_col)
         .attr('stroke', 'none')
         .attr("rx", 5)
         .attr("ry", 5)
         .attr("transform", "rotate(" + ((i*rot_angle)+15) + ", 450, 450)");

    // year text
    chair.append('text')
         .text(year+i)
         .attr('x', chairOriginX - chairWidth)
         .attr('y', chairOriginY+13)
         .attr("transform", "rotate(" + ((i*rot_angle)+15) + ", 450, 450)");

    // instances plotting
    for (var j = 0; j<mobile_instances[key][parseInt('20'+(year+i))];j++){
        chair.append('circle')
        .attr('class', 'instances')
        .attr('cx', chairOriginX)
        .attr('cy', (y_mobile-10)+j*-10)
        .attr('r', 3.3)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('opacity', 0.7)
        .attr("transform", "rotate(" + ((i*rot_angle)+15) + ", 450, 450)");
    }


    //landline plotting
    //center total for landline
    center_total_landline = center_total_landline + landline_econ[key][parseInt('20'+(year+i))];

    if(landline_data[key][parseInt('20'+(year+i))] > 0){

        y_landline = (chairOriginY - (chairWidth / 2))-dur_log_Scale(landline_data[key][parseInt('20'+(year+i))]);
        rect_height_landline = dur_log_Scale(landline_data[key][parseInt('20'+(year+i))]);
        r_landline = econ_log_Scale(landline_econ[key][parseInt('20'+(year+i))]);
    
    }
    else{
        
        y_landline = 0;
        rect_height_landline = 0;
        r_landline = 0;
    
    }

    //economic impact
    /* console.log(parseInt('20'+(year+i)));
    console.log(landline_econ[key][parseInt('20'+(year+i))]);
    console.log(econ_log_Scale(landline_econ[key][parseInt('20'+(year+i))])); */

    chair.append('circle')
         .attr('cx', chairOriginX)
         .attr('cy', chairOriginY- rect_height_landline)
         .attr('r', r_landline)
         .attr('fill', '#F1948A')
         .attr('stroke', "#E74C3C")
         .attr('opacity', opacity)
         .attr("transform", "rotate(" + (((i+1)*-rot_angle)+15) + ", 450, 450)");

    //duration
    chair.append("rect")
         .attr('x', chairOriginX - (chairWidth / 2))
         .attr('y', y_landline)
         .attr('width', chairWidth)
         .attr('opacity', 1)
         .attr('height', rect_height_landline)
         .attr('fill', landline_col)
         .attr('stroke', 'none')
         .attr("rx", 5)
         .attr("ry", 5)
         .attr("transform", "rotate(" + (((i+1)*-rot_angle)+15) + ", 450, 450)");

    //year text
    chair.append('text')
         .text(year+i)
         .attr('x', chairOriginX - chairWidth)
         .attr('y', chairOriginY+13)
         .attr("transform", "rotate(" + (((i+1)*-rot_angle)+15) + ", 450, 450)");

    //instance plotting
    for (var j = 0; j<landline_instances[key][parseInt('20'+(year+i))];j++){
        chair.append('circle')
             .attr('class', 'instances')
             .attr('cx', chairOriginX)
             .attr('cy', (y_landline-10)+j*-10)
             .attr('r', 3.3)
             .attr('fill', 'none')
             .attr('stroke', 'black')
             .attr('opacity', 0.7)
             .attr("transform", "rotate(" + (((i+1)*-rot_angle)+15) + ", 450, 450)");
    }

    


       

}

//center semi circle plotting
var center_scale = d3.scaleLinear().domain([0,Math.max(center_total_mobile, center_total_landline)]).range([0,40]);
var arc2 = d3.arc();


var halfcircle = function(x,y,rad, angle, color) {
    return chair.append('path')
    .attr('transform', 'translate('+[x,y]+')')
  .attr('d', arc2({
          innerRadius: 0,
          outerRadius: rad,
          startAngle: 0,
        endAngle: Math.PI*angle
    }))
    .attr('fill', color);  
}


halfcircle(originX,originY,center_scale(center_total_mobile), 1, mobile_col);
halfcircle(originX,originY,center_scale(center_total_landline), -1, landline_col);


//center line plotting

chair.append('line')
     .attr("x1", originX)
     .attr("y1", originY)
     .attr("x2", originX)
     .attr("y2", originY+115)
     .style("stroke", "black")
     .style("stroke-width", 0.2)
     .style("stroke-dasharray", ("5, 3"))
    .attr('opacity', 0.5)

chair.append('line')
     .attr("x1", originX)
     .attr("y1", originY)
     .attr("x2", originX)
     .attr("y2", originY-115)
     .style("stroke", "black")
     .style("stroke-width", 0.2)
     .style("stroke-dasharray", ("5, 3"))
     .attr('opacity', 0.5)


