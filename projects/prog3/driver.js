//locates the canvas
var canv = document.getElementById("canvas");
var world_canv = document.getElementById("world");
//gets context of canvas
var cont = canv.getContext("2d");
var world_cont = world_canv.getContext("2d");

//coordinates of the "previous" point position, for drawing lines
var prevx = undefined;
var prevy = undefined;

//holds data on surface of rotation currently being drawn
var line_segments = [];

//holds all the segments and points in the currently displayed Object
/*HOLDS IN FORMAT
skel[# for selected segment][# of selected point].(x/y/z)*/
var skel = [];

//stores full data
var world_skel = [];
var world_surfaces = [];
var world_colors = [];

var world_trans = [];
var world_rota = [];
var world_scale = [];
var world_adj_matrix = [];
var ambient = false;
var specular = true;

//notes which coordinates in skel holds each polygon
/*HOLDS IN FORMAT 
surfaces.[# for selected polygon](one/two/thr).(seg/point)
= {
          one: {
            seg: nextseg,
            point: j
          },
          two: { //right corner of the triangle
            seg: nextseg,
            point:(j+1)
          }, 
          thr: {
            seg: thisseg,
            point:(j+1)
          }
} */
var surfaces = [];
var adj_matrix = [];

var allow_new_points = true;
var draw_endcaps = false;
var draw_wire = false;
var mouse_over_world = false; 

var flat = true;
var gourand = false; 
var phong = false; 
var directional = true; 
var point = false; 
var pointloc = [(-100 - 250)/250, (100 - 250)/250, (100 - 250)/250 ]
var pointcol = [Math.floor(255 * 1), Math.floor(255 * 0.8), Math.floor(255 * 0.2)];

var ambient = false;


//Initializes Canvas
function main(){
    //draws starting cross lines
    make_axis(cont);
    make_axis(world_cont);
    addEvntLsnr2();
    //addEvntLsnr1();
    addEvntLsnr3();
    addEvntLsnr4();
    addEvntLsnr5();
    addEvntLsnr6();
    addEvntLsnr7();
    addEvntLsnr8();
    addEvntLsnr9();
    addEvntLsnr10();
    addEvntLsnr11();
    addEvntLsnr12();
    addEvntLsnr13();
    addEvntLsnr14();
    addEvntLsnr15();
    addEvntLsnr16();
    addEvntLsnr17();
    allow_new_points = true;
}

//adds event listeners for slider
function addEvntLsnr1(){
  var yrota = document.getElementById("yrotation");
  let update = () => yrota.value;

  yrota.addEventListener('input', update);
  update();
}

function addEvntLsnr2(){
  var xrota = document.getElementById("xrotation");
  let update = () => xrota.value;

  xrota.addEventListener('input', update);
  update();
}

function addEvntLsnr3(){
  var yscale = document.getElementById("yscale");
  let update = () => yscale.value;

  yscale.addEventListener('input', update);
  update();
}

function addEvntLsnr4(){
  var xscale = document.getElementById("xscale");
  let update = () => xscale.value;

  xscale.addEventListener('input', update);
  update();
}

function addEvntLsnr5(){
  var zscale = document.getElementById("zscale");
  let update = () => zscale.value;

  zscale.addEventListener('input', update);
  update();
}

function addEvntLsnr6(){
  var xrot = document.getElementById("xrota");
  let update = () => xrot.value;

  xrot.addEventListener('input', update);
  update();
}

function addEvntLsnr7(){
  var yrot = document.getElementById("yrota");
  let update = () => yrot.value;

  yrot.addEventListener('input', update);
  update();
}

function addEvntLsnr8(){
  var zrot = document.getElementById("zrota");
  let update = () => zrot.value;

  zrot.addEventListener('input', update);
  update();
}

function addEvntLsnr9(){
  var ytrans = document.getElementById("ytrans");
  let update = () => ytrans.value;

  ytrans.addEventListener('input', update);
  update();
}

function addEvntLsnr10(){
  var ztrans = document.getElementById("ztrans");
  let update = () => ztrans.value;

  ztrans.addEventListener('input', update);
  update();
}

function addEvntLsnr11(){
  var xtrans = document.getElementById("xtrans");
  let update = () => xtrans.value;

  xtrans.addEventListener('input', update);
  update();
}

function addEvntLsnr12(){
  var red = document.getElementById("red");
  let update = () => red.value;

  red.addEventListener('input', update);
  update();
}

function addEvntLsnr13(){
  var blue = document.getElementById("blue");
  let update = () => blue.value;

  blue.addEventListener('input', update);
  update();
}

function addEvntLsnr14(){
  var green = document.getElementById("green");
  let update = () => green.value;

  green.addEventListener('input', update);
  update();
}

function addEvntLsnr15(){
  var xpoint = document.getElementById("xpoint");
  let update = () => xpoint.value;

  xpoint.addEventListener('input', update);
  update();
}
function addEvntLsnr16(){
  var ypoint = document.getElementById("ypoint");
  let update = () => ypoint.value;

  ypoint.addEventListener('input', update);
  update();
}
function addEvntLsnr17(){
  var zpoint = document.getElementById("zpoint");
  let update = () => zpoint.value;

  zpoint.addEventListener('input', update);
  update();
}

main();

function make_axis(contxt){
  clear_segment(); 
  contxt.clearRect(0, 0, 500, 500);

  //red line
  contxt.beginPath();
  contxt.strokeStyle = "red";
  contxt.moveTo(20,canv.height/2);
  contxt.lineTo(canv.width-20, canv.height/2);
  contxt.stroke();

  //green line
  contxt.beginPath();
  contxt.strokeStyle = "green";
  contxt.moveTo(canv.width/2,20);
  contxt.lineTo(canv.width/2, canv.height-20);
  contxt.stroke();
}


//Gets Mouse Coordinates
function mouse_coords(){

  var xcoor = event.clientX;
  var ycoor = event.clientY;
  
  return [xcoor, ycoor];
}

//Adds a point when building a line segment
function set_point(){
  if(allow_new_points){

    //gets mouse coordinates
    var point = mouse_coords();

    //starts new segment
    if(prevx == undefined){
      cont.beginPath();
      cont.strokeStyle = "black";
      prevx = point[0];
      prevy = point[1];
      cont.moveTo(prevx,prevy);
    }

    //continues previous segment
    else{
      cont.lineTo(point[0], point[1]);
      cont.stroke();
      prevx = point[0];
      prevy = point[1];
      cont.moveTo(prevx,prevy);
    }
  
    //stores values of the most recently created point
    var newpoint = {
      x: point[0],
      y: point[1],
      z: 0
    }
    line_segments.push(newpoint);
  }

}

//Finishes current line segment
function clear_segment(){

    //allow_new_points = false;
    prevx = undefined;
    prevy = undefined;
  
}

//creates the Surface of Rotation
function xySOR(){
  if(allow_new_points == false){
    SOR();
  }
}

function SOR(){
  
  if(line_segments.length > 1)
  {
  allow_new_points = false;
  clear_segment(); 
  
  var yrotation = 0;
  //var yrotation = document.getElementById("yrotation").value;
  var xrotation = document.getElementById("xrotation").value;
  //var xrotation = 0;

  //for each point, convert it to new plane
  var YZpoints = [];
  for(var j = 0; j < line_segments.length; j++){
    //rotates point to the YZ plane
    // & convers 0 through 500 to -1 through 1 coordinates
    newpoint = {
      x: 0,
      y: (line_segments[j].y - 250)/250,
      z: (line_segments[j].x -250)/250
    };
    YZpoints.push(newpoint);
  }

  //create a new collection of points for skeleton N times for each rotation
  var skeleton = []
  var num_rotations = document.getElementById("n").value;
  for(var i = 0; i < num_rotations; i++){
    var segment = [];
    //iterates through YZ points
    for(var j = 0; j < YZpoints.length; j++){
      var newpoint = {
        //x: YZpoints[j].z * Math.sin((2*Math.PI * i/num_rotations + 2*Math.PI *yrotation/360)),
        //y: YZpoints[j].y * Math.cos((2*Math.PI) * xrotation/360),
        //z: YZpoints[j].z * Math.cos((2*Math.PI * i/num_rotations + 2*Math.PI * yrotation/360) + (2*Math.PI) * xrotation/360),
        x: YZpoints[j].z * Math.sin((2*Math.PI * i/num_rotations)),
        y: YZpoints[j].y,
        z: YZpoints[j].z * Math.cos(2*Math.PI * i/num_rotations)
      }
      segment.push(newpoint);
    }
    skeleton.push(segment);
  }

  //does the same as above but saves the unrotated points in a global array
  //for later use 
  skel = [];
  for(var i = 0; i < num_rotations; i++){
    var segment = [];
    //iterates through YZ points
    for(var j = 0; j < YZpoints.length; j++){
      var newpoint = {
        x: YZpoints[j].z * Math.sin((2*Math.PI * i/num_rotations)),
        y: YZpoints[j].y,
        z: YZpoints[j].z * Math.cos(2*Math.PI * i/num_rotations)
      }
      segment.push(newpoint);
    }
    skel.push(segment);
  }


 //rotates skeleton
 for(var i = 0; i < skeleton.length; i++){
  for(var j = 0; j < skeleton[i].length; j++){
    //rotation around yz plane
    skeleton[i][j].x = skeleton[i][j].x * Math.cos(Math.PI * 2 * yrotation/360) + skeleton[i][j].z * Math.sin(Math.PI * 2 * yrotation/360);
    
    //rotation around xz plane
    skeleton[i][j].y = skeleton[i][j].y * Math.cos(Math.PI * 2 * xrotation/360) + skeleton[i][j].z * Math.sin(Math.PI * 2 * xrotation/360);
  
    //both
    skeleton[i][j].z = skeleton[i][j].z * (Math.sin(Math.PI * 2 * (xrotation)/360))
     +skeleton[i][j].z * Math.sin(Math.PI * 2 * (yrotation)/360);
  }
 }


  //DRAWING SKELETON STARTS HERE
  //clears canvas for new drawing
  cont.clearRect(0,0, canv.width, canv.height);
  make_axis(cont);
  
  //for each roatated segment
  for(var i = 0; i < skeleton.length; i++){
    //draws that segment
    for(var j = 1; j < skeleton[i].length; j++){
      cont.beginPath();
      cont.strokeStyle = "black";
      cont.moveTo((skeleton[i][j-1].x + 1) * 250,(skeleton[i][j-1].y  + 1) * 250);
      cont.lineTo((skeleton[i][j].x + 1) * 250,(skeleton[i][j].y  + 1) * 250);
      cont.stroke();
    }
  }

  //for each point in origional, connect with siblings in other rotates segments
  for(var i = 0; i < skeleton[0].length; i++){
    
    for(var j = 0; j < skeleton.length; j++){
      cont.beginPath();
      cont.strokeStyle = "black";
      if(j != 0){
        cont.moveTo((skeleton[j][i].x + 1) * 250,(skeleton[j][i].y  + 1) * 250);
        cont.lineTo((skeleton[j-1][i].x + 1) * 250,(skeleton[j-1][i].y  + 1) * 250);
      }
      else{
        cont.moveTo((skeleton[0][i].x + 1) * 250,(skeleton[0][i].y  + 1) * 250);
        cont.lineTo((skeleton[skeleton.length-1][i].x + 1) * 250,(skeleton[skeleton.length-1][i].y  + 1) * 250);
      }
      cont.stroke();
    }
  }

  //connectsevery other diagonal to divide rectangular sides into triangles
  //for every segment

  //each diagonal stroke creates two surfaces (triagnles) that we need to track
  surfaces = [];
  
  for(var i = 0; i < skeleton.length; i++){
    //for every point
    var thisseg = i;
    var nextseg;
    if(i != skeleton.length -1){
      nextseg = i+1;
    }
    else{
      nextseg = 0;
    }
    for(var j = 0; j < skeleton[i].length - 1; j++){

      //
      var uppertri;
      var lowertri;

      //connect it horizontally to the next
      cont.beginPath();
      //if(j % 2 == 0){
      if(true){
        cont.moveTo((skeleton[thisseg][j].x + 1) * 250,(skeleton[thisseg][j].y  + 1) * 250);
        cont.lineTo((skeleton[nextseg][j+1].x + 1) * 250,(skeleton[nextseg][j+1].y  + 1) * 250);

        //gets coordinates of adjacent triangles for shading calculations
        var trileft = thisseg-1;
        if(trileft == -1){
          trileft = skeleton.length -1;
        }
        var triright = thisseg+1;
        if(triright == skeleton.length){
          triright = 0;
        }

        var triup = j-1;
        var istop = false;
        if(triup == -1){ //if triup is a top
          //triup = (skeleton[0]).length;
          triup = (skeleton[0]).length -1;
          istop = true;
          //console.log("triup is: " + triup );
          //triup = skeleton[i].length ;
        }
        var tridown = j+1;
        var isbottom = false;
        if(tridown == skeleton[thisseg].length){
          //tridown =  skeleton[0].length + 1;
          tridown =  skeleton[0].length;
          isbottom = true;
        }

        uppertri = {
          one: {
            seg: thisseg,
            point: j
          },
          two: { //right corner of the triangle
            seg: nextseg,
            point: j
          }, 
          thr: {
            seg: nextseg,
            point:(j+1)
          },
          isend: 0,
          adj:{
            topl: [trileft,triup],
            topm: [thisseg,triup],
            topr: [triright,triup],
            midl: [trileft,j],
            midm: [thisseg,j],
            midr: [triright,j],
            botl: [trileft,tridown],
            botm: [thisseg,tridown],
            botr: [triright,tridown],
          },
          isupper: true,
          istop: istop,
          isbottom: isbottom
        }

        lowertri = {
          one: {
            seg: thisseg,
            point: j
          },
          two: { //right corner of the triangle
            seg: thisseg,
            point: (j+1)
          }, 
          thr: {
            seg: nextseg,
            point:(j+1)
          },
          isend: 0,
          adj:{
            topl: [trileft,triup],
            topm: [thisseg,triup],
            topr: [triright,triup],
            midl: [trileft,j],
            midm: [thisseg,j],
            midr: [triright,j],
            botl: [trileft,tridown],
            botm: [thisseg,tridown],
            botr: [triright,tridown],
          },
          isupper: false,
          istop: istop,
          isbottom: isbottom
        }

        //
        //if(istop){
          //uppertri.adj.topm = uppertri.adj.topl;
          //uppertri.adj.topr = uppertri.adj.topl;
        //}
        //if(isbottom){
          //lowertri.adj.botm = lowertri.adj.botl;
          //lowertri.adj.botr = lowertri.adj.botl;
        //}
      }
      else{
        cont.moveTo((skeleton[thisseg][j+1].x + 1) * 250,(skeleton[thisseg][j+1].y  + 1) * 250);
        cont.lineTo((skeleton[nextseg][j].x + 1) * 250,(skeleton[nextseg][j].y  + 1) * 250);

        uppertri = {
          one: {
            seg: nextseg,
            point: j
          },
          two: { //right corner of the triangle
            seg: thisseg,
            point: j
          }, 
          thr: {
            seg: thisseg,
            point:(j+1)
          }
        }

        lowertri = {
          one: {
            seg: nextseg,
            point: j
          },
          two: { //right corner of the triangle
            seg: nextseg,
            point:(j+1)
          }, 
          thr: {
            seg: thisseg,
            point:(j+1)
          }
        }
      }
      cont.stroke();
      surfaces.push(uppertri);
      surfaces.push(lowertri);
    }
  }
  
  //draws endcaps
  //if(draw_endcaps){
  //if(true){
  for(var i = 0; i < skeleton.length; i++){
    //draws endcaps option
    if(draw_endcaps){
    //if(true){

      //top endcaps
      cont.beginPath();
      cont.strokeStyle = "black";
      cont.moveTo((skeleton[0][0].x + 1) * 250,(skeleton[0][0].y  + 1) * 250);
      cont.lineTo((skeleton[i][0].x + 1) * 250,(skeleton[i][0].y  + 1) * 250);
      cont.stroke();

      //bottom endcaps
      cont.beginPath();
      cont.strokeStyle = "black";
      cont.moveTo((skeleton[0][skeleton[i].length-1].x + 1) * 250,(skeleton[0][skeleton[i].length-1].y  + 1) * 250);
      cont.lineTo((skeleton[i][skeleton[i].length-1].x + 1) * 250,(skeleton[i][skeleton[i].length-1].y  + 1) * 250);
      cont.stroke();
    }
  }
  
  //adds endcaps
  for(var i = 1; i < skeleton.length-1; i++){
    var ip1 = i + 1;
    if(ip1 == skeleton.length-1){
      ip1 = 0
    }
    var ip2 = i + 2;
    if(ip2 == skeleton.length-1){
      ip2 = 0
    }
    else if(ip2 == skeleton.length){
      ip2 = 1
    }
    

    //makes endcap trianlges
    uppertri = {
      two: { 
        seg: 0,
        point: 0
      },
      one: { //point one from all others branch out
        seg: i,
        point: 0
      }, 
      thr: {
        seg: i+1,
        point:0
      },
      isend: 1,
      adj:{
        lower1: [i-1,0],
        lower2: [i,0],
        lower3: [ip1,0],
        lower4: [ip2,0]
      }

    }
    lowertri = {
      two: { 
        seg: 0,
        point: skeleton[i].length-1
      },
      one: { // //point one from all others branch out
        seg: i,
        point: skeleton[i].length-1
      }, 
      thr: {
        seg: i+1,
        point:skeleton[i].length-1
      },
      isend: 2,
      adj:{
        upper1: [i-1,skeleton[i].length-1],
        upper2: [i,skeleton[i].length-1],
        upper3: [ip1,skeleton[i].length-1],
        upper4: [ip2,skeleton[i].length-1],
      }
      
    }
    surfaces.push(uppertri);
    surfaces.push(lowertri);
  }

  adj_matrix = 0;
  
  
  //calculates surface normals
  var normals = FindNormals(skeleton, surfaces);

  //gets colors
  var rgbr = Number(document.getElementById("red").value);
  var rgbg = Number(document.getElementById("green").value);
  var rgbb = Number(document.getElementById("blue").value);

  var colour = [rgbr, rgbg, rgbb];
  if(draw_wire == false){
    FilCol(cont, normals, skeleton, surfaces, colour, num_rotations);
  }
}
}

//toggles the drawing of endpoints
function toggle_end(){
  if(draw_endcaps == false){
    draw_endcaps = true;
  }
  else{
    draw_endcaps = false;
  }
  if(allow_new_points == false){
    SOR();
  }
  DrawWorld();
}

//toggles the drawing of endpoints
function toggle_specular(){
  if(specular == false){
    specular = true;
  }
  else{
    specular = false;
  }
  DrawWorld();
}

function toggle_ambient(){
  if(ambient == false){
    ambient = true;
  }
  else{
    ambient = false;
  }
  DrawWorld();
}

function toggle_wire(){
  if(draw_wire == false){
    flat = false;
    document.getElementById("flat").checked = false;
    gourand = false;
    document.getElementById("gouraud").checked = false;
    draw_wire = true;
    document.getElementById("wireframe").checked = true;
  }
  else{
    document.getElementById("wireframe").checked = true;
  }
  if(allow_new_points == false){
    SOR();
  }

  /*console.log("flat is now: " + flat);
  console.log("gourand is now: " + gourand);
  console.log("wireframe is now: " + draw_wire);*/
  
  DrawWorld();
}

function toggle_gourand(){
  if(gourand == false){
    flat = false;
    document.getElementById("flat").checked = false;
    gourand = true;
    document.getElementById("gouraud").checked = true;
    draw_wire = false;
    document.getElementById("wireframe").checked = false;
  }
  else{
    document.getElementById("gouraud").checked = true;
  }
  DrawWorld();
}

function toggle_flat(){
  if(flat == false){
    flat = true;
    document.getElementById("flat").checked = true;
    gourand = false;
    document.getElementById("gouraud").checked = false;
    draw_wire = false;
    document.getElementById("wireframe").checked = false;
    
  }
  else{
    document.getElementById("flat").checked = true;
  }
  DrawWorld();
}

function toggle_point(){
  if(point == false){
    point = true;
  }
  else{
    point = false;
  }
  DrawWorld();
}

function toggle_directional(){
  if(directional == false){
    directional = true;
  }
  else{
    directional = false;
  }
  DrawWorld();
}

//for writing data to store in objname files
function generate_objname(){
  var objpoly = "";
  var objcoor = "";
  
  //calculates objpoly points
  for(var i = 3; i < 100; i++){
    newpoly = "#"+ i +"_sided-shape\n" + i + '\n';
    
    for(var j = 0; j < i-2; j++){
      newpoly = newpoly + 'tri' +  (j+1) + " " + 1 + " " + (j+1) + " " + (j+2) + '\n';
    }

    objpoly = objpoly + newpoly + "\n";

  }

  //calcuates objcoor coordinates
  for(var i = 3; i < 100; i++){
    newcoor = "#"+ i +"_sided-shape\n" + i + '\n';
    for(var j = 1; j <= i; j++){
      var x = 250 * Math.sin(2 * Math.PI * (j-1)/i);
      var y = 250 * Math.cos(2 * Math.PI * (j-1)/i);
      var z = 0;
      newcoor = newcoor + j + ',' + x + ',' + y + "," + z + '\n';
    }

    objcoor = objcoor + newcoor + "\n";
  }
}

//calculates polygon normals
function FindNormals(skeleton, surf){

  var normals = []

  //given a triangle (p1, p2, p3) we can find surface normal with vectors U = p2-p1 & V = p3 - p1

  for(var i = 0; i < surf.length; i++){
    var p1 = skeleton[surf[i].one.seg][surf[i].one.point]
    var p2 = skeleton[surf[i].two.seg][surf[i].two.point]
    var p3 = skeleton[surf[i].thr.seg][surf[i].thr.point]

    var U = {
      x: p2.x-p1.x,
      y: p2.y-p1.y,
      z: p2.z-p1.z
    };

    var V = {
      x: p3.x-p1.x,
      y: p3.y-p1.y,
      z: p3.z-p1.z
    } ;

    var normal = {
      x: U.y * V.z - U.z * V.y,
      y: U.z * V.x - U.x * V.z,
      z: U.x * V.y - U.y * V.x
    }

    //fixes problem where every other area in a segment is displayed backwards???
    //if(surf[i].one.seg % 2 == 1){
      //normal.x *= -1;
      //normal.y *= -1;
      //normal.z *= -1;
    //}
    normals.push(normal);
  }
  
  return normals;
}

//draws color of upper canvas
function FilCol(contxt, normal, skeleton, surf, clr){
  

  //gets seperate color values from 000000 to FFFFFF number input
  var rgbx = clr[0];
  var rgby = clr[1];
  var rgbz = clr[2];

  //rearranges surfaces in order of z value for better rendering
  var ordered_surf = [];
  for(var i = 0; i < surf.length; i++){
    
    var p1 = skeleton[surf[i].one.seg][surf[i].one.point];
    var p2 = skeleton[surf[i].two.seg][surf[i].two.point];
    var p3 = skeleton[surf[i].thr.seg][surf[i].thr.point];
    var avgz = (p1.z + p2.z + p3.z)/3;

    var ordening = [i, avgz];
    ordered_surf.push(ordening);
    for(var j = 1; j < ordered_surf.length; j++){
        //if new z is lesser than old z, move new z backwards
        if(ordered_surf[ordered_surf.length - j][1] < ordered_surf[ordered_surf.length - j - 1][1]){
          var neworder = ordered_surf[ordered_surf.length - j][0];
          var oldorder = ordered_surf[ordered_surf.length - j - 1][0];
          var newval = ordered_surf[ordered_surf.length - j][1];
          var oldval = ordered_surf[ordered_surf.length - j - 1][1];
  
          ordered_surf[ordered_surf.length - j] = [oldorder, oldval];
          ordered_surf[ordered_surf.length - j - 1] = [neworder, newval];
        }
    }
  }
  


  //for each surface, find the normal and fill color
  for(var i = 0; i < ordered_surf.length; i++){

    var p1 = skeleton[surf[ordered_surf[i][0]].one.seg][surf[ordered_surf[i][0]].one.point]
    var p2 = skeleton[surf[ordered_surf[i][0]].two.seg][surf[ordered_surf[i][0]].two.point]
    var p3 = skeleton[surf[ordered_surf[i][0]].thr.seg][surf[ordered_surf[i][0]].thr.point]

    contxt.beginPath();

    //finds angle between face & lighting vectors
    //lighting is now coming from (1,1,1)
    // calculates angle between light and side 
    var normalMag = Math.sqrt(normal[ordered_surf[i][0]].x ** 2 + normal[ordered_surf[i][0]].y ** 2 + normal[ordered_surf[i][0]].z ** 2);
    var lightMag = Math.sqrt(1**2 + 1**2 + 1**2);
    var lightDotProduct = 1*normal[ordered_surf[i][0]].x + 1*normal[ordered_surf[i][0]].y + 1*normal[ordered_surf[i][0]].z;
    var lightCosAngle = lightDotProduct/(normalMag * lightMag);

    //calculates angle between camera and side
    //checks if facing camera before
    var num_rotations = document.getElementById("n").value;
    var camMag = Math.sqrt(0**2 + 0**2 + 1**2);
    var camDotProduct = 0*normal[ordered_surf[i][0]].x + 0*normal[ordered_surf[i][0]].y + 1*normal[ordered_surf[i][0]].z;
    var camCosAngle = camDotProduct/(2*normalMag * lightMag);

    //fixes mistake in how normals are calculated
    //every other one is backwards
    if(ordered_surf[i][0] % 2 == 1){
      camCosAngle *= -1;
    }
    
    //draws the side if it is facing the camera
    if(camCosAngle > 0){
    //fixes problem where every second triangle is reversed
      if(ordered_surf[i][0] % 2 == 1){
        lightCosAngle *= -1;
      }
      var redcol = rgbx * (lightCosAngle+1)/2;
      var greencol = rgby * (lightCosAngle+1)/2;
      var bluecol = rgbz * (lightCosAngle+1)/2;

    //converts colors to needed hex form
      var redstr = Math.round(redcol).toString(16).toUpperCase();
      if(redstr.length == 1){
        redstr = "0" + redstr;
      }
      var greenstr = Math.round(greencol).toString(16).toUpperCase();
      if(greenstr.length == 1){
        greenstr = "0" + greenstr;
      }
      var bluestr = Math.round(bluecol).toString(16).toUpperCase();
      if(bluestr.length == 1){
        bluestr = "0" + bluestr;
      }
      sidecolor = "#" + redstr + greenstr + bluestr;
      contxt.fillStyle = sidecolor;
      contxt.moveTo((p1.x+1) * 250, (p1.y+1) * 250);
      contxt.lineTo((p2.x+1) * 250, (p2.y+1) * 250);
      contxt.lineTo((p3.x+1) * 250, (p3.y+1) * 250);
      contxt.fill();
    //}
    }
  }
}

function FillColor(contxt, normal, skeleton, surf, clr){
  
  //console.log("shape has " + surf.length + " surfaces");

  //gets seperate color values from 000000 to FFFFFF number input
  var num_rotations = document.getElementById("n").value;
  var rgbx = clr[0];
  var rgby = clr[1];
  var rgbz = clr[2];

  //rearranges surfaces in order of z value for better rendering
  var ordered_surf = [];
  for(var i = 0; i < surf.length; i++){
    
    var p1 = skeleton[surf[i].one.seg][surf[i].one.point];
    var p2 = skeleton[surf[i].two.seg][surf[i].two.point];
    var p3 = skeleton[surf[i].thr.seg][surf[i].thr.point];
    var avgz = (p1.z + p2.z + p3.z)/3;

    //normal values for adjacent triangles
    var adjacent = {
      right: 0,
      left: 0, 
      above: 0,
      below: 0
    }


    var ordening = [i, avgz, adjacent];
    ordered_surf.push(ordening);
    for(var j = 1; j < ordered_surf.length; j++){
        //if new z is lesser than old z, move new z backwards
        if(ordered_surf[ordered_surf.length - j][1] < ordered_surf[ordered_surf.length - j - 1][1]){
          var neworder = ordered_surf[ordered_surf.length - j][0];
          var oldorder = ordered_surf[ordered_surf.length - j - 1][0];
          var newval = ordered_surf[ordered_surf.length - j][1];
          var oldval = ordered_surf[ordered_surf.length - j - 1][1];
  
          ordered_surf[ordered_surf.length - j] = [oldorder, oldval];
          ordered_surf[ordered_surf.length - j - 1] = [neworder, newval];
        }
    }
  }

  //adds a new function to the ordered_surfaces array, adds a third input, 
  //which lists the adjacent shapes to each triangle
  //for(var i = 0; i < ordered_surf.length; i++){
    //if()
  //}
  
  //for each surface, find the normal and fill color
  if(flat){

  //holds each vector
  var vectors = [];


  for(var i = 0; i < ordered_surf.length; i++){

    var p1 = skeleton[surf[ordered_surf[i][0]].one.seg][surf[ordered_surf[i][0]].one.point]
    var p2 = skeleton[surf[ordered_surf[i][0]].two.seg][surf[ordered_surf[i][0]].two.point]
    var p3 = skeleton[surf[ordered_surf[i][0]].thr.seg][surf[ordered_surf[i][0]].thr.point]

    contxt.beginPath();

    //finds angle between face & lighting vectors
    //lighting is now coming from (1,1,1)
    // calculates angle between light and side 
    var normalMag = Math.sqrt(normal[ordered_surf[i][0]].x ** 2 + normal[ordered_surf[i][0]].y ** 2 + normal[ordered_surf[i][0]].z ** 2);
    var lightMag = Math.sqrt(1**2 + 1**2 + 1**2);
    var lightDotProduct = 1*normal[ordered_surf[i][0]].x + 1*normal[ordered_surf[i][0]].y + 1*normal[ordered_surf[i][0]].z;
    var lightCosAngle = lightDotProduct/(normalMag * lightMag);

    //calculates angle between camera and side
    //checks if facing camera before
    var num_rotations = document.getElementById("n").value;
    var camMag = Math.sqrt(0**2 + 0**2 + 1**2);
    var camDotProduct = 0*normal[ordered_surf[i][0]].x + 0*normal[ordered_surf[i][0]].y + 1*normal[ordered_surf[i][0]].z;
    var camCosAngle = camDotProduct/(2*normalMag * camMag);

    //fixes mistake in how normals are calculated
    //every other one is backwards
    if(ordered_surf[i][0] % 2 == 1){
      camCosAngle *= -1;
    }
   
    //draws the side if it is facing the camera
    if(flat && camCosAngle > 0){
      var thisside = surf[ordered_surf[i][0]];
      //var thisside = skeleton[surf[i].one.seg][surf[i].one.point];
      var sidecoords = {
        x: (p1.x + p2.x + p3.x)/3,
        y: (p1.y + p2.y + p3.y)/3,
        z: (p1.z + p2.z + p3.z)/3
      }
      var sidecolor = CalculateLight(sidecoords, [rgbx, rgby, rgbz], pointloc, pointcol, normal[ordered_surf[i][0]])
      //fixes problem where every second triangle is reversed
      /*if(ordered_surf[i][0] % 2 == 1){
        lightCosAngle *= -1;
      }
      var redcol = rgbx * (lightCosAngle+1)/2;
      var greencol = rgby * (lightCosAngle+1)/2;
      var bluecol = rgbz * (lightCosAngle+1)/2;

      //converts colors to needed hex form
      var redstr = Math.round(redcol).toString(16).toUpperCase();
      if(redstr.length == 1){
       redstr = "0" + redstr;
      }
      var greenstr = Math.round(greencol).toString(16).toUpperCase();
      if(greenstr.length == 1){
        greenstr = "0" + greenstr;
      }
      var bluestr = Math.round(bluecol).toString(16).toUpperCase();
      if(bluestr.length == 1){
        bluestr = "0" + bluestr;
      }
      sidecolor = "#" + redstr + greenstr + bluestr;*/
      contxt.fillStyle = sidecolor;
      contxt.moveTo((p1.x+1) * 250, (p1.y+1) * 250);
      contxt.lineTo((p2.x+1) * 250, (p2.y+1) * 250);
      contxt.lineTo((p3.x+1) * 250, (p3.y+1) * 250);
      contxt.fill();
    //}
      }
    }
  }

  //does gouraund shading
  else if(gourand){
    //console.log("shading gouraund");
    for(var i = 0; i < ordered_surf.length; i++){
      //console.log("shading side gouraund");

      //finds angle between face & lighting vectors
      //lighting is now coming from (1,1,1)
      // calculates angle between light and side 
      var sideMag = Math.sqrt(normal[ordered_surf[i][0]].x ** 2 + normal[ordered_surf[i][0]].y ** 2 + normal[ordered_surf[i][0]].z ** 2);
      var camMag = Math.sqrt(0**2 + 0**2 + 1**2);
      var camDotProduct = 0*normal[ordered_surf[i][0]].x + 0*normal[ordered_surf[i][0]].y + 1*normal[ordered_surf[i][0]].z;
      var camCosAngle = camDotProduct/(2*sideMag * camMag);
      if(ordered_surf[i][0] % 2 == 1){
        camCosAngle *= -1;
      }

      /*console.log("camcosAngle is: " + camCosAngle);
      console.log("sidemag is: " + sideMag);
      console.log("cammag is: " + camMag);
      console.log("cam dot product is: " + camDotProduct);*/
      
      //draws the side if it is facing the camera
      if(camCosAngle > 0){



        //gets points that MAKE UP THE POLYGON
        var colors = [];
        var p1 = skeleton[surf[ordered_surf[i][0]].one.seg][surf[ordered_surf[i][0]].one.point]
        var p2 = skeleton[surf[ordered_surf[i][0]].two.seg][surf[ordered_surf[i][0]].two.point]
        var p3 = skeleton[surf[ordered_surf[i][0]].thr.seg][surf[ordered_surf[i][0]].thr.point]

        //finds this surface's relation to others
        var this_nor = normal[ordered_surf[i][0]];


        var corn1N; var corn2N;  var corn3N; 
        if(surf[ordered_surf[i][0]].isend == 0){ //if is not an end triangle, find the ones to all sides (8)
          var topl = surf[ordered_surf[i][0]].adj.topl;
          var topm = surf[ordered_surf[i][0]].adj.topm;
          var topr = surf[ordered_surf[i][0]].adj.topr;
          var midl = surf[ordered_surf[i][0]].adj.midl;
          var midm = surf[ordered_surf[i][0]].adj.midm;
          var midr = surf[ordered_surf[i][0]].adj.midr;
          var botl = surf[ordered_surf[i][0]].adj.topl;
          var botm = surf[ordered_surf[i][0]].adj.botm;
          var botr = surf[ordered_surf[i][0]].adj.botr;

          /*console.log("topl is " + topl + ", istop status " + surf[ordered_surf[i][0]].istop + ", accessing side: " + (topl[0] * skeleton[0].length + topl[1]));
          console.log("topm is " + topm + ", istop status " + surf[ordered_surf[i][0]].istop + ", accessing side: " + (topm[0] * skeleton[0].length + topm[1]));
          console.log("topr is " + topr + ", istop status " + surf[ordered_surf[i][0]].istop + ", accessing side: " + (topr[0] * skeleton[0].length + topr[1]));
          console.log("midm is " + midm);
          console.log("botl is " + botl + ", isbottom status " + surf[ordered_surf[i][0]].isbottom + ", accessing side: " + (botl[0] * skeleton[0].length + botl[1]));
          console.log("botm is " + botm + ", isbottom status " + surf[ordered_surf[i][0]].isbottom + ", accessing side: " + (botm[0] * skeleton[0].length + botm[1]));
          console.log("botr is " + botr + ", isbottom status " + surf[ordered_surf[i][0]].isbottom + ", accessing side: " + (botr[0] * skeleton[0].length + botr[1]));
          //console.log("midr is " + midr);
          //console.log("toplN to check is: " + (topl[0] * (num_rotations-1) + topl[1]))
          //console.log("amount of normals are: " + normal.length);*/
          var toplN = normal[topl[0] * skeleton[0].length + topl[1]];
          var topmN = normal[topm[0] * skeleton[0].length + topm[1]];
          var toprN = normal[topr[0] * skeleton[0].length + topr[1]];
          var midlN = normal[midl[0] * skeleton[0].length + midl[1]];
          var midmN = normal[midm[0] * skeleton[0].length + midm[1]];
          var midrN = normal[midr[0] * skeleton[0].length + midr[1]];
          var botlN = normal[botl[0] * skeleton[0].length + botl[1]];
          var botmN = normal[botm[0] * skeleton[0].length + botm[1]];
          var botrN = normal[botr[0] * skeleton[0].length + botr[1]];

          /*for(var k = 0; k < 9; k++){
           var shape;
           var shapeN;
           switch(k){
            case 0: if(topl.isupper == false){toplN *= -1;} break;
            case 1: if(topm.isupper == false){topmN *= -1;} break;
            case 2: if(topr.isupper == false){toprN *= -1;} break;
            case 3: if(midl.isupper == false){midlN *= -1;} break;
            case 4: if(midm.isupper == false){midmN *= -1;} break;
            case 5: if(midr.isupper == false){midrN *= -1;} break;
            case 6: if(botl.isupper == false){botlN *= -1;} break;
            case 7: if(botm.isupper == false){botmN *= -1;} break;
            case 8: if(botr.isupper == false){botrN *= -1;} break;
           }
          }
          if(topl.isupper == false){
            toplN *= -1;
          }*/
          //console.log("toplN is " + toplN);
          //console.log("toplN is " + topmN);
          //console.log("toplN is " + toprN);
          //console.log("there are " + normal.length + " sides, trying to access side # " + (topl[0] * (num_rotations) + topl[1]));
          //console.log("toplN stats are " + toplN.x);

          //different triangles result in different calculations
          if(surf[ordered_surf[i][0]].adj.isupper == true){
            corn1N = {
              x: (midlN.x + toplN.x + topmN.x + this_nor.x)/4,
              y: (midlN.y + toplN.y + topmN.y + this_nor.y)/4,
              z: (midlN.z + toplN.z + topmN.z + this_nor.z)/4
            }
            corn2N = {
              x: (topmN.x + toprN.x + midrN.x + this_nor.x)/4,
              y: (topmN.y + toprN.y + midrN.y + this_nor.y)/4,
              z: (topmN.z + toprN.z + midrN.z + this_nor.z)/4
            }
            corn3N = {
              x: (botmN.x + midrN.x + botrN.x + this_nor.x)/4,
              y: (botmN.y + midrN.y + botrN.y + this_nor.y)/4,
              z: (botmN.z + midrN.z + botrN.z + this_nor.z)/4
            }
          }
          else{
            corn1N = {
              x: (midlN.x + toplN.x + topmN.x + this_nor.x)/4,
              y: (midlN.y + toplN.y + topmN.y + this_nor.y)/4,
              z: (midlN.z + toplN.z + topmN.z + this_nor.z)/4
            }
            corn2N = {
              x: (botmN.x + botlN.x + midlN.x + this_nor.x)/4,
              y: (botmN.y + botlN.y + midlN.y + this_nor.y)/4,
              z: (botmN.z + botlN.z + midlN.z + this_nor.z)/4
            }
            corn3N = {
              x: (botmN.x + midrN.x + botrN.x + this_nor.x)/4,
              y: (botmN.y + midrN.y + botrN.y + this_nor.y)/4,
              z: (botmN.z + midrN.z + botrN.z + this_nor.z)/4
            }
          }
        }
        else if(surf[ordered_surf[i][0]].isend == 1){ //if is a top end triangle, find below triangles (4)
          var lower1 = surf[ordered_surf[i][0]].adj.lower1;
          var lower2 = surf[ordered_surf[i][0]].adj.lower2;
          var lower3 = surf[ordered_surf[i][0]].adj.lower3;
          var lower4 = surf[ordered_surf[i][0]].adj.lower4;
          /*console.log("lower1 is " + lower1);
          console.log("lower2 is " + lower2);
          console.log("lower3 is " + lower3);
          console.log("lower4 is " + lower4);*/

          var lower1N = normal[lower1[0] * skeleton[0].length + lower1[1]]
          var lower2N = normal[lower2[0] * skeleton[0].length + lower2[1]]
          var lower3N = normal[lower3[0] * skeleton[0].length + lower3[1]]
          var lower4N = normal[lower4[0] * skeleton[0].length + lower4[1]]

          corn1N = {
            x: (this_nor.x + lower1N.x + lower2N.x)/3,
            y: (this_nor.y + lower1N.y + lower2N.y)/3,
            z: (this_nor.z + lower1N.z + lower2N.z)/3,
          }
          corn2N = {
            x: (this_nor.x + lower2N.x + lower3N.x)/3,
            y: (this_nor.y + lower2N.y + lower3N.y)/3,
            z: (this_nor.z + lower2N.z + lower3N.z)/3,
          }
          corn3N = {
            x: (this_nor.x + lower3N.x + lower4N.x)/3,
            y: (this_nor.y + lower3N.y + lower4N.y)/3,
            z: (this_nor.z + lower3N.z + lower4N.z)/3,
          }
          
        }
        else if(surf[ordered_surf[i][0]].isend == 2){ //if is a bottom end triangle, find above triangles (4)
          var lower1 = surf[ordered_surf[i][0]].adj.upper1;
          var lower2 = surf[ordered_surf[i][0]].adj.upper2;
          var lower3 = surf[ordered_surf[i][0]].adj.upper3;
          var lower4 = surf[ordered_surf[i][0]].adj.upper4;
          /*console.log("upper1 is " + lower1);
          console.log("upper2 is " + lower2);
          console.log("upper3 is " + lower3);
          console.log("upper4 is " + lower4);*/


          var lower1N = normal[lower1[0] * skeleton[0].length + lower1[1]]
          var lower2N = normal[lower2[0] * skeleton[0].length + lower2[1]]
          var lower3N = normal[lower3[0] * skeleton[0].length + lower3[1]]
          var lower4N = normal[lower4[0] * skeleton[0].length + lower4[1]]

          corn1N = {
            x: (this_nor.x + lower1N.x + lower2N.x)/3,
            y: (this_nor.y + lower1N.y + lower2N.y)/3,
            z: (this_nor.z + lower1N.z + lower2N.z)/3,
          }
          corn2N = {
            x: (this_nor.x + lower2N.x + lower3N.x)/3,
            y: (this_nor.y + lower2N.y + lower3N.y)/3,
            z: (this_nor.z + lower2N.z + lower3N.z)/3,
          }
          corn3N = {
            x: (this_nor.x + lower3N.x + lower4N.x)/3,
            y: (this_nor.y + lower3N.y + lower4N.y)/3,
            z: (this_nor.z + lower3N.z + lower4N.z)/3,
          }
        }


        //calculates color for each corner
        var colors = [];
        for(var j = 0; j < 3; j++){

          var thiscor
          if(j == 0){
            thiscor = corn1N;
          }
          if(j == 1){
            thiscor = corn2N;
          }
          if(j == 2){
            thiscor = corn3N;
          }

          // calculates angle between light and corner
          /*var normalMag = Math.sqrt(thiscor.x ** 2 + thiscor.y ** 2 + thiscor.z ** 2);
          var lightMag = Math.sqrt(1**2 + 1**2 + 1**2);
          var lightDotProduct = 1*thiscor.x + 1*thiscor.y + 1*thiscor.z;
          var lightCosAngle = lightDotProduct/(normalMag * lightMag);

          //const canvas = document.getElementById("myCanvas");
          //const ctx = canvas.getContext("2d");

          //var surforder = (ordered_surf[i][0] % (2*(skeleton[0].length -1))); //divides into surfaces into values in column column values
          //var everyo = Math.floor(ordered_surf[i][0] / (2*(skeleton[0].length -1))) % 2; //keeps track of which column to switch colors
          //console.log("finding side #: " + ordered_surf[i][0] + " preveryo: "+ (ordered_surf[i][0] / (2*(skeleton[0].length -1))) +" everyo: " + everyo + ' surforder: ' + surforder);
          if(ordered_surf[i][0] % 2 == 1){
            lightCosAngle *= -1;
          }
          //else if(ordered_surf[i][0] % 4 == 0 || ordered_surf[i][0] % 4 == 1){
            //lightCosAngle *= -1;
            //console.log("fixing side #: " + ordered_surf[i][0] + " everyo: " + everyo + ' surforder: ' + surforder);
          //}
          //if(everyo == 0 && (surforder % 4 == 0 || surforder % 4 == 3)){
            //lightCosAngle *= -1;
            //console.log("fixing side #: " + ordered_surf[i][0] + " everyo: " + everyo + ' surforder: ' + surforder);
          //}
          //else if(everyo == 1 && (surforder % 4 == 1 || surforder % 4 == 2)){
            //lightCosAngle *= -1;
            //console.log("fixing side #: " + ordered_surf[i][0] + " everyo: " + everyo + ' surforder: ' + surforder);
          //}

          //console.log("lighcosangle for side " + ordered_surf[i][0] + " is: " + lightCosAngle);

          /*var ordering = (ordered_surf[i][0]/skeleton[0]) % 2;
          if(ordering == 0){
            if(( ((ordered_surf[i][0]) % skeleton[0]) % 4 == 0 || (ordered_surf[i][0]) % 4 == 3) && surf[ordered_surf[i][0]].isend == 0){
              lightCosAngle *= -1;
            }
          }
          else{
            if(( ((ordered_surf[i][0]) % skeleton[0]) % 4 == 1 || (ordered_surf[i][0]) % 4 == 2) && surf[ordered_surf[i][0]].isend == 0){
              lightCosAngle *= -1;
            }
          }*/
          
          /*console.log("this corner is: " + thiscor.x + ", " + thiscor.y + ", " + thiscor.z)
          console.log("normalMag is: " + normalMag);
          console.log("lightMag is: " + lightMag);
          console.log("lightdot product is: " + lightDotProduct);
          console.log("input red, green and blue is: " + rgbx + ", " + rgby + ", " + rgbz);
          console.log("lightcosangle is: " + lightCosAngle);*/
          /*var redcol = Number(rgbx) * (lightCosAngle+1)/2;
          var greencol = Number(rgby) * (lightCosAngle+1)/2;
          var bluecol = Number(rgbz) * (lightCosAngle+1)/2;

          //console.log("redcol is: " + redcol);
    
          //converts colors to needed hex form
          var redstr = Math.round(redcol).toString(16).toUpperCase();
          if(redstr.length == 1){
           redstr = "0" + redstr;
          }
          var greenstr = Math.round(greencol).toString(16).toUpperCase();
          if(greenstr.length == 1){
            greenstr = "0" + greenstr;
          }
          var bluestr = Math.round(bluecol).toString(16).toUpperCase();
          if(bluestr.length == 1){
            bluestr = "0" + bluestr;
          }
          var cornercolor = "#" + redstr + greenstr + bluestr;
          //console.log("cornercolor is: " + cornercolor);*/
          colors[j] = CalculateLight(thiscor, [rgbx, rgby, rgbz],  pointloc, pointcol, normal[ordered_surf[i][0]]);

          
        }

        //console.log("colors for gradient is: ( " + colors[0] + ", " + colors[1] + ", " + colors[2] +")");

        //makes gradients to represent from corners (most color) to other side of triangle (least color)
        var gradient1 = contxt.createLinearGradient(((p2.x + p3.x)/2 + 1) * 250, ((p2.y + p3.y)/2 + 1) * 250, (p1.x + 1) * 250, (p1.y + 1) * 250);
        var gradient2 = contxt.createLinearGradient(((p1.x + p3.x)/2 + 1) * 250, ((p1.y + p3.y)/2 + 1) * 250, (p2.x + 1) * 250, (p2.y + 1) * 250);
        var gradient3 = contxt.createLinearGradient(((p1.x + p2.x)/2 + 1) * 250, ((p1.y + p2.y)/2 + 1) * 250, (p3.x + 1) * 250, (p3.y + 1) * 250);
        //console.log("gradient 1 location is: " +(p1.x + 1) * 250 + " " + (p1.y + 1) * 250);

        //adds color to gradients
        gradient1.addColorStop(1, colors[0]);
        gradient2.addColorStop(1, colors[1]);
        gradient3.addColorStop(1, colors[2]);

        //creates patj to represent the triangle we are filling
        let region = new Path2D();
        region.moveTo((p1.x + 1) * 250, (p1.y + 1) * 250);
        region.lineTo((p2.x + 1) * 250, (p2.y + 1) * 250);
        region.lineTo((p3.x + 1) * 250, (p3.y + 1) * 250);
        region.lineTo((p1.x + 1) * 250, (p1.y + 1) * 250);
        region.closePath();

        //fills the region with the created gradient
        contxt.fillStyle = gradient1;
        contxt.fill(region);
        contxt.fillStyle = gradient2;
        contxt.fill(region);
        contxt.fillStyle = gradient3;
        contxt.fill(region);

        //contxt.font = "10px Arial";
        //contxt.strokeText(ordered_surf[i][0],((p1.x + p2.x + p3.x)/3 + 1) * 250, ((p1.y + p2.y + p3.y)/3 + 1) * 250);

        // Create a Gradient
        //const grd = contxt.createLinearGradient(0, 0, 170, 0);
        //grd.addColorStop(0, "black");
        //grd.addColorStop(1, "white");

        // Draw a filled Rectangle
        /*contxt.fillStyle = grd;
        contxt.fillRect(20, 20, 150, 100);

        for(var i = 0; i < ordered_surf.length; i++){
    //equalizes colors on one "side"
    if(ordered_surf[i][0] % 2 == 1 && surf[ordered_surf[i][0]].isend == 0){
      var p1p = skeleton[surf[ordered_surf[i][0]-1].one.seg][surf[ordered_surf[i][0]-1].one.point];
      var p2p = skeleton[surf[ordered_surf[i][0]-1].two.seg][surf[ordered_surf[i][0]-1].two.point];
      var p3p = skeleton[surf[ordered_surf[i][0]-1].thr.seg][surf[ordered_surf[i][0]-1].thr.point];

      //creates patj to represent the triangle we are filling
      let region = new Path2D();
      region.moveTo((p1p.x + 1) * 250, (p1p.y + 1) * 250);
      region.lineTo((p2p.x + 1) * 250, (p2p.y + 1) * 250);
      region.lineTo((p3p.x + 1) * 250, (p3p.y + 1) * 250);
      region.lineTo((p1p.x + 1) * 250, (p1p.y + 1) * 250);
      region.closePath();
      contxt.fillStyle = gradient1;
      contxt.fill(region);
      contxt.fillStyle = gradient2;
      contxt.fill(region);
      contxt.fillStyle = gradient3;
      contxt.fill(region);
    }
  }

        console.log("finished gradient: " + i);*/
      }
    }
  }

}

//finishes currently made SOR, inserts it into below
function Finish(){
  //if a SOR is made, insert it into the smaller world
  if(allow_new_points == false){

    allow_new_points = true;

    world_skel.push(skel);
    world_surfaces.push(surfaces);
    world_adj_matrix.push(adj_matrix);

    var rgbr = Number(document.getElementById("red").value);
    var rgbg = Number(document.getElementById("green").value);
    var rgbb = Number(document.getElementById("blue").value);
    var colour = [rgbr, rgbg, rgbb];
    world_colors.push(colour);

    //ALLOWS NEW OBJECTS TO BE INSERTED
    allow_new_points = false;

    var startingscale = [0.5,0.5,0.5];
    world_scale.push(startingscale);

    var startingrota = [0,0,0];
    world_rota.push(startingrota);

    var startingtrans = [0,0,0];
    world_trans.push(startingtrans);

    document.getElementById("transselect").value = world_colors.length -1;
    updateInputs();
  }
  
  DrawWorld();
}

function DrawWireframe(skeleton, contxt){

  //for each roatated segment
  for(var i = 0; i < skeleton.length; i++){
    //draws that segment
    for(var j = 1; j < skeleton[i].length; j++){
      contxt.beginPath();
      contxt.strokeStyle = "black";
      contxt.moveTo((skeleton[i][j-1].x + 1) * 250,(skeleton[i][j-1].y  + 1) * 250);
      contxt.lineTo((skeleton[i][j].x + 1) * 250,(skeleton[i][j].y  + 1) * 250);
      contxt.stroke();
    }
  }

  //for each point in origional, connect with siblings in other rotates segments
  for(var i = 0; i < skeleton[0].length; i++){
    
    for(var j = 0; j < skeleton.length; j++){
      contxt.beginPath();
      contxt.strokeStyle = "black";
      if(j != 0){
        contxt.moveTo((skeleton[j][i].x + 1) * 250,(skeleton[j][i].y  + 1) * 250);
        contxt.lineTo((skeleton[j-1][i].x + 1) * 250,(skeleton[j-1][i].y  + 1) * 250);
      }
      else{
        contxt.moveTo((skeleton[0][i].x + 1) * 250,(skeleton[0][i].y  + 1) * 250);
        contxt.lineTo((skeleton[skeleton.length-1][i].x + 1) * 250,(skeleton[skeleton.length-1][i].y  + 1) * 250);
      }
      contxt.stroke();
    }
  }

  for(var i = 0; i < skeleton.length; i++){
    //draws endcaps option
    if(draw_endcaps){
    //if(true){

      //top endcaps
      contxt.beginPath();
      contxt.strokeStyle = "black";
      contxt.moveTo((skeleton[0][0].x + 1) * 250,(skeleton[0][0].y  + 1) * 250);
      contxt.lineTo((skeleton[i][0].x + 1) * 250,(skeleton[i][0].y  + 1) * 250);
      contxt.stroke();

      //bottom endcaps
      contxt.beginPath();
      contxt.strokeStyle = "black";
      contxt.moveTo((skeleton[0][skeleton[i].length-1].x + 1) * 250,(skeleton[0][skeleton[i].length-1].y  + 1) * 250);
      contxt.lineTo((skeleton[i][skeleton[i].length-1].x + 1) * 250,(skeleton[i][skeleton[i].length-1].y  + 1) * 250);
      contxt.stroke();
    }
  }
}

function DrawWorld(){
  make_axis(world_cont);

  //for each object, apply transformations & calculate normals
  var transformed_world = [];
  var normals = [];
  for(var i = 0; i < world_skel.length ; i++){

    var scaled_skel = ScaleSkel(world_skel[i], world_scale[i]);
    var rota_skel = RotateSkel(scaled_skel, world_rota[i]);
    var trans_skel = TranslateSkel(rota_skel, world_trans[i])
    var normal = FindNormals(trans_skel,  world_surfaces[i]);

    normals.push(normal);
    transformed_world.push(trans_skel);
  }


  //array of realative object x values, trans_copy[i] = (order of the object in world_trans, x value)
  var trans_copy = [];
  for(var i = 0; i < world_trans.length ; i++){
    var trans_index = [i, world_trans[i][2]]
    trans_copy.push(trans_index);
    //swap objects untill they are correct order
    for(var j = 1; j < trans_copy.length; j++){
      if(trans_copy[trans_copy.length - j][1] < trans_copy[trans_copy.length - j - 1][1]){
        var neworder = trans_copy[trans_copy.length - j][0];
        var oldorder = trans_copy[trans_copy.length - j - 1][0];
        var newval = trans_copy[trans_copy.length - j][1];
        var oldval = trans_copy[trans_copy.length - j - 1][1];

        trans_copy[trans_copy.length - j] = [oldorder, oldval];
        trans_copy[trans_copy.length - j - 1] = [neworder, newval];
      }
    }
  }

  //draws the selected objects in the correct order
  for(var i = 0; i < trans_copy.length ; i++){
    sel_obj = trans_copy[i][0];
    DrawWireframe(transformed_world[sel_obj], world_cont);
    if(draw_wire == false){
      FillColor(world_cont, normals[sel_obj], transformed_world[sel_obj], world_surfaces[sel_obj], world_colors[sel_obj]);
    }
  }
}

//updates the sliders accordingly when we select a new object
function updateInputs(){
  var sel_obj = document.getElementById("transselect").value;
  if(sel_obj < world_scale.length){
    document.getElementById("xscale").value = world_scale[sel_obj][0];
    document.getElementById("yscale").value = world_scale[sel_obj][1];
    document.getElementById("zscale").value = world_scale[sel_obj][2];

    document.getElementById("xrota").value = world_rota[sel_obj][0];
    document.getElementById("yrota").value = world_rota[sel_obj][1];
    document.getElementById("zrota").value = world_rota[sel_obj][2];

    document.getElementById("xtrans").value = world_trans[sel_obj][0];
    document.getElementById("ytrans").value = world_trans[sel_obj][1];
    document.getElementById("ztrans").value = world_trans[sel_obj][2];
  }

}

function ChangeScale(){
  var sel_obj = document.getElementById("transselect").value;
  if(sel_obj < world_scale.length){
    var xscale = document.getElementById("xscale").value;
    var yscale = document.getElementById("yscale").value;
    var zscale = document.getElementById("zscale").value;
    var newscale = [xscale, yscale, zscale];
    world_scale[sel_obj] = newscale;
    DrawWorld();
  }
}

function ScaleSkel(skeleton, scaling){
  var scaled_skel = [];
  var xscale = scaling[0];
  var yscale = scaling[1];
  var zscale = scaling[2];
  
  for(var i = 0; i < skeleton.length; i++){
    var segment = [];
    for(var j = 0; j < skeleton[i].length; j++){
      var newpoint = {
        x: skeleton[i][j].x * xscale,
        y: skeleton[i][j].y * yscale,
        z: skeleton[i][j].z * zscale
      }
      segment.push(newpoint);
    }
    scaled_skel.push(segment);
  }
  return scaled_skel;
}

function ChangeRota(){
  var sel_obj = document.getElementById("transselect").value;
  if(sel_obj < world_rota.length){
    var xrota = document.getElementById("xrota").value;
    var yrota = document.getElementById("yrota").value;
    var zrota = document.getElementById("zrota").value;
    var newrota = [xrota, yrota, zrota];
    world_rota[sel_obj] = newrota;
    DrawWorld();
  }
}

function RotateSkel(skeleton, rotation){
  var xrota = Math.PI * rotation[0]/180;
  var yrota = Math.PI * rotation[1]/180;
  var zrota = Math.PI * rotation[2]/180;

  //does x rotation
  var x_rotated_skel = [];
  for(var i = 0; i < skeleton.length; i++){
    var segment = [];
    for(var j = 0; j < skeleton[i].length; j++){
      var newpoint = {
        x: skeleton[i][j].x,
        y: skeleton[i][j].y * Math.cos(xrota) - skeleton[i][j].z * Math.sin(xrota),
        z: skeleton[i][j].y * Math.sin(xrota) + skeleton[i][j].z * Math.cos(xrota)
      }
      segment.push(newpoint);
    }
    x_rotated_skel.push(segment);
  }

  //does y rotation
  var y_rotated_skel = [];
  for(var i = 0; i < x_rotated_skel.length; i++){
    var segment = [];
    for(var j = 0; j < x_rotated_skel[i].length; j++){
      var newpoint = {
        x: x_rotated_skel[i][j].x * Math.cos(yrota) + x_rotated_skel[i][j].z * Math.sin(yrota),
        y: x_rotated_skel[i][j].y,
        z: (-1) * x_rotated_skel[i][j].x * Math.sin(yrota) + x_rotated_skel[i][j].z * Math.cos(yrota)
      }
      segment.push(newpoint);
    }
    y_rotated_skel.push(segment);
  }

  //does y rotation
  var z_rotated_skel = [];
  for(var i = 0; i < y_rotated_skel.length; i++){
    var segment = [];
    for(var j = 0; j < y_rotated_skel[i].length; j++){
      var newpoint = {
        x: y_rotated_skel[i][j].x * Math.cos(zrota) - y_rotated_skel[i][j].y * Math.sin(zrota),
        y: y_rotated_skel[i][j].x * Math.sin(zrota) + y_rotated_skel[i][j].y * Math.cos(zrota),
        z: y_rotated_skel[i][j].z
      }
      segment.push(newpoint);
    }
    z_rotated_skel.push(segment);
  }

  return z_rotated_skel;
}

function ChangeTrans(){
  var sel_obj = document.getElementById("transselect").value;
  if(sel_obj < world_trans.length){
    var xtrans = Number(document.getElementById("xtrans").value);
    var ytrans = Number(document.getElementById("ytrans").value);
    var ztrans = Number(document.getElementById("ztrans").value);
    var newtrans = [xtrans, ytrans, ztrans];
    world_trans[sel_obj] = newtrans;
    DrawWorld();
  }
}

function ChangePoint(){

    var xpoint = Number(document.getElementById("xpoint").value);
    var ypoint = Number(document.getElementById("ypoint").value);
    var zpoint = Number(document.getElementById("zpoint").value);
    pointloc = [xpoint, ypoint, zpoint];
    //console.log("new points are: " + pointloc[0] + " " + pointloc[1], + " " + pointloc[2])
    DrawWorld();

}

function TranslateSkel(skeleton, trans){
  var translated_skel = [];
  for(var i = 0; i < skeleton.length; i++){
    //console.log("completed outerloop, i is: " + i);
    var segment = [];
    for(var j = 0; j < skeleton[i].length; j++){
      var newpoint = {
        x: skeleton[i][j].x + Number(trans[0]),
        y: skeleton[i][j].y + Number(trans[1]),
        z: skeleton[i][j].z + Number(trans[2])
      }
      segment.push(newpoint);
    }
    translated_skel.push(segment);
  }
  return translated_skel;
}

function SelectClosestObj(){
  MouseEnterWorld();
  var clickpoint = mouse_coords();
  clickpoint[0] = Number(clickpoint[0]) - world_canv.width/2;
  clickpoint[1] = Number(clickpoint[1]) - world_canv.width/2 - 350;
  var sel_obj = 0;

  //finds object 
  for(var i = 0; i < world_trans.length; i++){
    //if another object is closer, thats the new closest
    curr_dist = Math.sqrt( (clickpoint[0] - world_trans[sel_obj][0]) ** 2 + (clickpoint[1] - world_trans[sel_obj][1]) ** 2);
    next_dist = Math.sqrt( (clickpoint[0] - world_trans[i][0]) ** 2 + (clickpoint[1] - world_trans[i][1]) ** 2);
    if(next_dist < curr_dist){
      sel_obj = i;
    }
  }

  //once closest is found to point clicked, select it
    document.getElementById("transselect").value = sel_obj;
    updateInputs();
}

function MouseEnterWorld(){
  mouse_over_world = true;
}
function MouseLeaveWorld(){
  mouse_over_world = false;
}

//moves selected object on mouse click if mouse is close enough
function MoveSelObj(){
  var sel_obj = Number(document.getElementById("transselect").value);
  if(sel_obj < world_trans.length){
    var clickpoint = mouse_coords();
    clickpoint[0] = Number(clickpoint[0]) - world_canv.width/2;
    clickpoint[1] = Number(clickpoint[1]) - world_canv.width/2 - 350;
    curr_dist = Math.sqrt( (clickpoint[0] - world_trans[sel_obj][0]) ** 2 + (clickpoint[1] - world_trans[sel_obj][1]) ** 2);

    //console.log("currdist is: " + curr_dist)
    if(mouse_over_world){
      world_trans[sel_obj][0] = clickpoint[0]/250;
      world_trans[sel_obj][1] = clickpoint[1]/250;
      updateInputs();
      DrawWorld();
    }
  }
}

function CalculateLight(thiscor, rgb, lightcoor, lightcol, normal){
  var color;

  //console.log("point is: " + point + ", directional is: " + directional + ", ambient is: " + ambient);
  //console.log("thiscor.x is: "  + thiscor.x);
  // calculates angle between light (111) and corner
  var normalMag = Math.sqrt(thiscor.x ** 2 + thiscor.y ** 2 + thiscor.z ** 2);
  var lightMag = Math.sqrt(1**2 + 1**2 + 1**2);
  var lightDotProduct = 1*thiscor.x + 1*thiscor.y + 1*thiscor.z;
  var lightCosAngle = lightDotProduct/(normalMag * lightMag);

  //if(ordered_surf[i][0] % 2 == 1){
    //lightCosAngle *= -1;
  //}
  //console.log("normal mag is: " + normalMag + ", lightMag is: " + lightMag + ", light cosAngle is: " + lightCosAngle);
  //console.log("red is: " + rgb[0] + ", green is: " + rgb[1] + ", blue is: " + rgb[2]);

  //if directional is enabled, add the directional light
  var redcol = 0; var bluecol = 0; var greencol = 0;
  if(directional){
    redcol = Number(rgb[0]) * (lightCosAngle+1)/2;
    greencol = Number(rgb[1]) * (lightCosAngle+1)/2;
    bluecol = Number(rgb[2]) * (lightCosAngle+1)/2;
  }

  //console.log("1- redcol is: " + redcol + ", greencol is: " + greencol + ", bluecol is: " + bluecol);

  //if point is enabled, add the light from a specific point light
  var lightPointMag = Math.sqrt(lightcoor[0]**2 + lightcoor[1]**2 + lightcoor[2]**2);
  var lightPointDotProduct = lightcoor[0]*thiscor.x + lightcoor[1]*thiscor.y + lightcoor[2]*thiscor.z;
  var lightPointCosAngle = lightPointDotProduct/(normalMag * lightPointMag);
  var lightPointDistance = Math.sqrt((lightcoor[0] + thiscor.x)**2 + (lightcoor[1] + thiscor.y)**2 + (lightcoor[2] + thiscor.z)[2]**2); //farther from the point one is, the less it is affected by the light
  //console.log("side x is: " + thiscor.x + ", lightcor x is: " + lightcoor[0]);
  if(point /*&& lightPointCosAngle > */){ //side is only affected by light source if it is facing it

    //will add 3d point lating when more time permits, for now 2D will function

    var dist = Math.sqrt( (thiscor.x - lightcoor[0])**2 + (thiscor.y - lightcoor[1])**2)
    redcol += Number(rgb[0] * lightcol[0])/(150*(1+dist));
    greencol += Number(rgb[1] * lightcol[1])/(150*(1+dist));
    bluecol += Number(rgb[2] * lightcol[2])/(150*(1+dist));

    if(ambient == false && directional == false){
      redcol *= 1.5; greencol *= 1.5; bluecol *= 1.5;
    }
  }

  //console.log("2- redcol is: " + redcol + ", greencol is: " + greencol + ", bluecol is: " + bluecol);

  //if Ambient is enabled, add a flat value to each light
  if(ambient){
    if(point == false && directional == false){
      redcol += Math.floor(300 * rgb[0]/255); greencol += Math.floor(300 * rgb[1]/255); bluecol += Math.floor(300 * rgb[2]/255);
    }
    else{
      redcol += Math.floor(80 * rgb[0]/255); greencol += Math.floor(80 * rgb[1]/255); bluecol += Math.floor(80 * rgb[2]/255);
    }
    if(redcol >= rgb[0]){redcol = rgb[0];} 
    if(greencol >= rgb[1]){greencol = rgb[1];}
    if(bluecol >= rgb[2]){bluecol = rgb[2];}
  }
  

  //reflects specular off of directional light
  if(specular && directional){
    //finds halfway vector 
    camvector = [0,0,1];
    directvector = [1,1,1];
    midvector = [(camvector[0] + directvector[0])/2, (camvector[1] + directvector[1])/2, (camvector[2] + directvector[2])/2];

    var xtrans = document.getElementById("xtrans").value;
    var ytrans = document.getElementById("ytrans").value;
    var ztrans = document.getElementById("ztrans").value;

    var orig_points = {
      x: normal.x - xtrans,
      y: normal.y - ytrans,
      z: normal.z - ztrans
    }

    //if point is enabled, add the light from a specific point light
    var midMag = Math.sqrt(midvector[0]**2 + midvector[1]**2 + midvector[2]**2);
    var Nmag = Math.sqrt(thiscor.x**2 + thiscor.y**2 + thiscor.z**2);
    var midDotProduct = midvector[0]*thiscor.x + midvector[1]*thiscor.y + midvector[2]*thiscor.z;
    //var midDotProduct = midvector[0]*2*(thiscor.x - 250) + midvector[1]*2*(thiscor.y-250) + midvector[2]*2*(thiscor.z-250);
    var midCosAngle = midDotProduct/(Nmag * midMag);
    console.log("midcosangle is: " + midCosAngle + ", middotproduct is: " + midDotProduct + " Nmag is: " + Nmag + "midMag is: " + midMag);
    if(midCosAngle > 0){
      //console.log("adding sheen");
      redcol += 255 *(midCosAngle**4);
      greencol += 255 *(midCosAngle**4);
      bluecol += 255 *(midCosAngle**4);
    }
  }

  //reflects specular off of directional light
  if(specular && point){
    //finds halfway vector 
    camvector = [0,0,1];
    directvector = pointcol;
    //directvector = [1,1,1];
    midvector = [(camvector[0] + directvector[0])/2, (camvector[1] + directvector[1])/2, (camvector[2] + directvector[2])/2];

    //if point is enabled, add the light from a specific point light
    var midMag = Math.sqrt(midvector[0]**2 + midvector[1]**2 + midvector[2]**2);
    var midDotProduct = midvector[0]*thiscor.x + midvector[1]*thiscor.y + midvector[2]*thiscor.z-250;
    var Nmag = Math.sqrt(thiscor.x**2 + thiscor.y**2 + thiscor.z**2);
    var midCosAngle = midDotProduct/(Nmag * midMag * 8) + 0.8 ;

    //console.log("midcosangle is: " + midCosAngle + ", middotproduct is: " + midDotProduct + " Normalmag is: " + Nmag+ "midMag is: " + midMag);
    if(midCosAngle > 0){
      redcol += 255 * 6.5 * (midCosAngle**4);
      greencol += 255 * 6.5 * (midCosAngle**4);
      bluecol += 255 * 6.5 * (midCosAngle**4);
    }
  }
    
  //converts colors to needed hex form
  if(redcol >= 255){redcol = 255;}
  var redstr = Math.round(redcol).toString(16).toUpperCase();
  if(redstr.length == 1){
    redstr = "0" + redstr;
  }
  if(greencol >= 255){greencol = 255;}
  var greenstr = Math.round(greencol).toString(16).toUpperCase();
  if(greenstr.length == 1){
    greenstr = "0" + greenstr;
  }
  if(bluecol >= 255){bluecol = 255;}
  var bluestr = Math.round(bluecol).toString(16).toUpperCase();
  if(bluestr.length == 1){
    bluestr = "0" + bluestr;
  }
  //console.log("3- redstr is: " + redstr + ", greenstr is: " + greenstr + ", bluestr is: " + bluestr);

  var color = "#" + redstr + greenstr + bluestr;
  //console.log("ending color is: " + color);
  return color;
}


