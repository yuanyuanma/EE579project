var freq=0;
//var amp=0;
var fs = require('fs');
var file = "data.txt";	

function sleep(millisecond){
	var start=new Date().getTime();
	for(var i=0;i<1e7;i++){
		if((new Date().getTime()-start)>millisecond){
			break;
		}
	}
}

fs.readFile(file,'ascii',function(err,data){
		if(err){
			return console.log(err);
		}
		if(data!==null){
			data = data.split("\n");
			var i=0;
			while(i<data.length){
				var newdata=data[i];
				i++;
				newdata=newdata.split(" ");
				var freqString=newdata[0];
				var ampString=newdata[1];
				freq=parseInt(freqString);
				amp=parseInt(ampString);				
				console.log("Got freq value of: ", freq);
				console.log("Got amp value of:",amp);
				var color;
				if(freq<=0){
				color=0.01;
				}
				else if(freq>1050){
				color=1.0;
				}
			    else{
				color=freq/1050;
				color=color.toFixed(3);
			    }
			    var brightness;
			    if(amp<=0){
				    brightness=0.15;
			    }
			    else if (amp>10000000){
				    brightness =1.0;
			    }
			    else{
			        brightness= amp/10000000*1.5;
			        brightness=brightness.toFixed(3);
			        if(brightness<0.15)
			        	brightness=0.15
			        if(brightness>1.0)
			        	brightness=1.0
			    }
			    //console.log("\tSetting brightness to %d\n",brightness);
			    console.log("\tSetting color to %d\n",color);
			    console.log("\tSetting brightness to %d\n",brightness);
			    dev$.selectByID('WDFL000012').set('hsl',{h:color,s:1,l:brightness});
			    //dev$.selectByID('WDFL00000J').set('hsl',{h:color,s:1,l:brightness});
			    //sleep(500);
			    
			}
		}
	}
)

/*dev$.selectByID('WDFL000012').set('hsl',{h:0.2,s:1,l:0.5});
sleep(5500);
dev$.selectByID('WDFL000012').set('hsl',{h:0.4,s:1,l:0.78});
sleep(5500);
dev$.selectByID('WDFL000012').set('hsl',{h:0.7,s:1,l:0.32});
sleep(5500);
dev$.selectByID('WDFL000012').set('hsl',{h:0.3,s:1,l:0.15});
sleep(5500);
dev$.selectByID('WDFL000012').set('hsl',{h:0.6,s:1,l:0.66});
sleep(5500);
dev$.selectByID('WDFL000012').set('hsl',{h:0.9,s:1,l:0.5});
*/

