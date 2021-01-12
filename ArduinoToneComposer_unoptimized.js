//Declaring constants
const looping=document.getElementById("loopbool"),
canv=document.getElementById('tonecompcanv'),
canv2=document.getElementById('toneoverlay'),
canv3=document.getElementById("gridcanv"),
volslid=document.getElementById("volsliderinp"),
repinp=document.getElementById("repsinp"),
durainp=document.getElementById("notedurinp"),
combinp=document.getElementById("combinebool"),
btReset=document.getElementById("resetbt"),
btExp=document.getElementById("expbt"),
btImp=document.getElementById("impbt"),
btExpC=document.getElementById("expcbt"),
btPlay=document.getElementById("playbt"),
backgroundcolor="#222222",
linecolor="#bbbbbb",
rectcolor="#bbbbbb",
font = "20px Arial",
fontcolor=linecolor,
bottommargin=5,
frequenciesInHz=[130.81,138.59,146.83,155.56,164.81,174.61,185.00,196.00,207.65,220.00,233.08,246.94,
261.63,277.18,293.66,311.13,329.63,349.23,369.99,392.00,415.30,440.00,466.16,493.88,
523.25,554.37,587.33,622.25,659.25,698.46,739.99,783.99,830.61,880.00,932.33,987.77];
//Declaring Variables
var tones=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],
volume=0.5,
ctx=canv.getContext("2d"),
ctx2=canv2.getContext("2d"),
ctx3=canv3.getContext("2d"),
data=[],
comb=false,
playingbool=false,
tonelength=200;//in ms
var reps=80;
reps++;
var width=(reps+1)*32;
var height=800,
horizontalsegments=36;
var temp = (reps-1);
//Assigning default UI elements
combinp.checked=comb;
looping.checked=false;
durainp.value=tonelength.toString();
repinp.value=temp.toString();
ctx.canvas.width=width;
ctx3.canvas.width=width;
updateReps();
volume=Number(volslid.value)/100;
if (!isNaN(durainp.value)&&(!isNaN(parseFloat(durainp.value)))){
  tonelength=parseInt(durainp.value);
}
drawgrid(height,width,reps+1,ctx3);
drawOverlay();
//Generates the floating notes on the left of the canvas.
function drawOverlay(){
  const font = "20px Arial";
  const fontcolor=linecolor;
  var bottommargin=5;
  var octpos=0;
  ctx2.fillStyle=rectcolor;
  ctx2.fillRect(0, 0, canv2.width, canv2.height);
  ctx2.font = font;
  ctx2.fillStyle=backgroundcolor;
  ctx2.strokeStyle=backgroundcolor;
  ctx2.lineWidth=2;
  for (let i=0;i<=3;i++){
    for (let j=0;j<=11;j++){
      ctx2.beginPath();
      ctx2.moveTo(0,octpos+j*height/horizontalsegments);
      ctx2.lineTo(width,octpos+j*height/horizontalsegments);
      ctx2.stroke();
      ctx2.fillText(tones[11-j], 3, octpos+(j+1)*height/horizontalsegments-bottommargin);
    }
    octpos=height/3*i;
  }
  ctx2.moveTo(32,0);
  ctx2.lineTo(32,height);
  ctx2.stroke();
}
//Draw the notes on the canvas, used in updateCanvas.
function drawnotes(height,width,reps,ctx,data){
  ctx.fillStyle=rectcolor;
  for (let i=0;i<=data.length;i++){
    if (data[i]!=0){
    drawNote(i,data[i]);
  }
  }
}
//Draw the grid on the canvas, used in updateCanvas.
function drawgrid(height,width,reps,cont){
  var octpos=0; //Variable to hold which position the octave starts at
  cont.font = font;
  cont.fillStyle=fontcolor;
  cont.canvas.width=width;
  //Draw columns
  cont.beginPath();
  cont.strokeStyle=linecolor;
  for(let i=0;i<=reps;i++){
    if (i==1){
      cont.lineWidth=4;
      cont.moveTo(i*(width/reps),0);
      cont.lineTo(i*(width/reps),height);
      cont.stroke();
      cont.lineWidth=2;
    }
    else{
      cont.moveTo(i*(width/reps),0);
      cont.lineTo(i*(width/reps),height);
      cont.stroke();
    }
    }

  //Draw lines
  for (let i=0;i<=3;i++){//Per octave
    cont.strokeStyle=linecolor;
    for (let j=0;j<=11;j++){//Per tone in the octave
      cont.beginPath();
      if (j!=0){
        cont.moveTo(0,octpos+j*height/horizontalsegments);
        cont.lineTo(width,octpos+j*height/horizontalsegments);
        cont.stroke();
      }
      cont.closePath();
    }
    if (i!=3){
      cont.beginPath();
      cont.lineWidth=4;
      cont.moveTo(0,octpos+12*height/horizontalsegments);
      cont.lineTo(width,octpos+12*height/horizontalsegments);
      cont.stroke();
      cont.lineWidth=2;
      cont.closePath();
      }
    octpos=height/3*i;
  }
}
//Start playing a tone.
function starttone(id){
    if (!isNaN(id)){
      var context = new AudioContext();
      var osci = context.createOscillator();
      osci.frequency.value=frequenciesInHz[id-1];
      osci.type="square";
      vol = context.createGain();
      vol.gain.value=volume;
      osci.connect(vol).connect(context.destination);
      osci.start();
      return osci;
    }
    else{
      //A bit hacky, but this makes it not crash.
      var context = new AudioContext();
      var osci = context.createOscillator();
      osci.frequency.value=0;
      osci.start();
      return osci;}
  }
//Copy audio array, clean it and play music.
function play(audio){
  playingbool=true;
  var workingarray = audio.slice(0,audio.length);
  music(cleanupArray(workingarray));
  }
//Start and stop songs when they are needed.
async function music(arr){
  while (arr.length!=0){
    if (playingbool==false){
      arr=[];
    }
    var count = 1;
    var id = arr[0];
    if (arr.length>1){
      if (comb||(id==0)){
        while (arr[1]==id){
          count++;
          arr.shift();
        }
      }
    }
    if (arr[0]!=0){//check so its not a pause
      var currenttone=starttone(arr[0]);
      await new Promise(r => setTimeout(r, tonelength*count));
      currenttone.stop();
    }
    else{
      await new Promise(r => setTimeout(r, tonelength*count));
    }
    arr.shift();
  }
  if (looping.checked==true){
      play(cleanupArray(data));
    }
  else{
    playingbool=false;
  }
  }
//Changes data array after clicking in the grid.
function updateData(xpos,ypos){
  if (xpos!=0){
    var arrpos=xpos-1;
    var diff = (arrpos-data.length);
    if (data.length<=arrpos){ //in case the data array is too small extend it to fit the relevant data.
      for (let i=0;i<diff;i++){ //Add as many empty notes as needed.
        data.push(0);
      }
      data.push(ypos);  //And add the relevant note after that.
      drawNote(arrpos,ypos);
    }
    else{ //If the clicked data field already exists in the array
      if (data[arrpos]==ypos){ //If you click on a already defined block, it disappears
        data[arrpos]=0;
        deleteNote(arrpos,ypos);
      }
      else{
        deleteNote(arrpos,data[arrpos]);
        data[arrpos]=ypos;  //else it is inserted.
        drawNote(arrpos,ypos);
      }
    }

  }
}
//Redraw note
function drawNote(xpos,ypos){
ctx.beginPath();
var posy = (35-ypos)*(height/horizontalsegments);
//Without rounding the values, there will be artefacts when drawing and deleting something left over.
ctx.fillRect(Math.round((xpos+1)*width/(reps+1)),Math.round(posy),Math.round((width/reps)),Math.round((height/horizontalsegments)));
ctx.stroke();
}
//Delete note
function deleteNote(xpos,ypos){
var posy = (35-ypos)*(height/horizontalsegments);
//Without rounding the values, there will be artefacts when drawing and deleting something left over.
ctx.clearRect(Math.round((xpos+1)*width/(reps+1)),Math.round(posy),Math.round((width/reps)),Math.round((height/horizontalsegments)));
}
//Set data to [] and redraw grid.
function reset(){
  data=[];
  canv.width=width;
}
//Create Code string and put makeCode in it.
function exportCode(){
  var returnstring="void playTune(){\n  int buzzerpin=0;\n"
  returnstring+=makeCode(data.slice(),"");
  returnstring+="}"
  alert(returnstring);
}
//Make code from dataarray.ä
function makeCode(dataarray,codestring){
  while(dataarray.length!=0){
    var count=1;
    var id = dataarray[0];
    var time = 0;
    if (dataarray.length>1){
      if (comb||(id==0)){
        while (dataarray[1]==id){
          count++;
          dataarray.shift();
        }
      }
    }
    var time = (count*tonelength);
    if (id==0){
      codestring+="  delay("+time.toString()+");\n";
      dataarray.shift();
    }
    else{
      var freq = Math.round(frequenciesInHz[id]);
      codestring+="  tone(buzzerpin,"+freq.toString()+","+time.toString()+");\n";
      dataarray.shift();
    }
  }
  return codestring;
}
//Clear and redraw canvas.
function redrawAllNotes(){
  width=(reps+1)*32;
  canv.width=width;
  drawnotes(height,width,reps+1,ctx,data);
}
//Delete pauses at end of array.
function cleanupArray(uglyarray){
  var controllvar = true;
  while (uglyarray[(uglyarray.length-1)]==0){
    uglyarray.pop();
  }
  return uglyarray;
}
//Make string from data array.
function exportSong(){
  /*
  Export string is surrounded by "-". Entries are separated by ",".
  At first the global vars are added, then a "+" appears, then the notes.
  General form (every variable name in brackets.):
  -(reps),(tonelength)+(data)-
  */
  var newar = cleanupArray(data);
  if (looping.checked){var loopingbool = 1;}
  else {var loopingbool = 0;}
  if (combinp.checked){var combining = 1;}
  else {var combining = 0;}
  var expreps = 0;
  if (data.length<reps){
    expreps=data.length;
  }
  var expstr = "-"+(expreps.toString())+","+(tonelength.toString())+","+(loopingbool.toString())+","+(combining.toString())+"+"+newar.toString()+"-";
  expstr=expstr.replace(",NaN","");
  prompt("Copy the following string for saving/sharing:",expstr); //Prompt is much nicer to copy the defaultstring than alert.
}
//Refresh Input UI elements.
function updateReps(){
  playingbool=false;
  if (!isNaN(repinp.value)&&(!isNaN(parseFloat(repinp.value)))){
    reps=parseInt(repinp.value);
    if (data.length>reps){
      data=data.slice(0,reps);
    }
    redrawAllNotes();
    drawgrid(height,width,reps+1,ctx3);
  }
}
//Read data string and put in variables.
function importSong(){
  var userinput = prompt("Please enter your exported data:", "");
  if (userinput==""){
    reset();
  }
  else{
    if (!(userinput==null)){
      //Make sure it has the required form.
      if(userinput[0]=="-"&&userinput[userinput.length-1]=="-"){
        //Insert the saved data.
        userinput=userinput.substr(1,userinput.length-2);
        var settings = userinput.split("+")[0].split(",");
        var notes = userinput.split("+")[1].split(",");
        if (notes.length>settings[0]){
          alert("The data is not formatted correctly. Sorry.");
        }
        else{
          if (settings[2]=="1"){
            looping.checked=true;
          }
          else if (settings[2]=="0"){
            looping.checked=false;
          }
          if (settings[3]=="1"){
            combinp.checked=true;
            comb=true;
          }
          else if (settings[3]=="0"){
            combinp.checked=false;
            comb=false;
          }
          reps = Number(settings[0]);
          repinp.value=reps.toString();
          tonelength=Number(settings[1]);
          durainp.value=tonelength.toString();
          var arrlength = notes.length;
          for (let i=0;i<=arrlength;i++){
            notes[i]=Number(notes[i]);
            if ((notes[i]>36)||(notes[i]<0)){
              alert("The data is not formatted correctly. Sorry.");
            }
          }
          data = notes;
          redrawAllNotes();
          drawgrid(height,width,reps+1,ctx3);
        }
      }
    }
  }
}
//Event listeners
canv.addEventListener('click', function(event) {
  const rect = canv.getBoundingClientRect();
  var x=event.clientX-rect.left,
  y=event.clientY-rect.top;
  cellwidthx=width/(reps+1),//The +1 comes from the one "invisible" column under the notes
  cellwidthy=height/horizontalsegments,
  cellx=Math.floor(x/cellwidthx),
  celly=36-Math.floor(y/cellwidthy)-1;
  updateData(cellx,celly);
});
combinp.addEventListener("click",function(event){
  comb=combinp.checked;
});
btReset.addEventListener("click",function(event){
  reset();
});
btExp.addEventListener("click",function(event){
  exportSong();
});
btImp.addEventListener("click",function(event){
  importSong();
});
btExpC.addEventListener("click",function(event){
  exportCode();
});
btPlay.addEventListener("click",function(event){
  if (playingbool==false){
    play(data);
  }
  else{
    playingbool=false;
  }
});
volslid.addEventListener("click",function(event){
  volume=Number(volslid.value)/100;
});
durainp.addEventListener("change",function(event){
  if (!isNaN(durainp.value)&&(!isNaN(parseFloat(durainp.value)))){
    tonelength=parseInt(durainp.value);
  }
});
repinp.addEventListener("change",function(event){
  updateReps();
  redrawAllNotes();
});
