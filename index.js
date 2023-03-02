$(document).ready(function(){
    let globalnum=0; //for switching between images
    let ary=[]; //images array
    let toggle=true; //for animated effect
    //making the context
    const canv = document.getElementById('drawingCanvas');
    canv.width = window.innerWidth-20;
    canv.height = window.innerHeight;
    const ctx = canv.getContext('2d');
    //populating the pictures array
    for(let i=1;i<8;i++){
        async function drawimg(){
            try {
                const img = await document.createElement('img');
                //here you need to add different string for you local files
                img.src='./pics/home/'+i+'.png';
                img.onload=()=>{
                    ary.push(img);
                    console.log('loaded')
                }
            }
            catch (error){
                console.log('problemo')
            }
        }
        drawimg();
    }
    console.log(ary);
    //you will need an array with different photos to pull off this effect    
    document.addEventListener('mousedown',OnMouseDown);
    function OnMouseDown(e){
        console.log(e);
        document.addEventListener('mousemove',OnMouseMove);
        document.addEventListener('mouseup',OnMouseUp);
    }
    function OnMouseMove(e){
        const xcord = e.offsetX;
        const ycord = e.offsetY;
        console.log(xcord,ycord);
        if(toggle){
            //doing the aimation part
            setInterval(()=>{
                ctx.drawImage(ary[globalnum],xcord,ycord,500,500);
                    console.log(globalnum);
                    if (globalnum===6){
                        globalnum=0;
                    }else{
                        globalnum++;
                    }
            },1000)
            toggle=false;
        }else{
            //some images wont be animated which is being done by this part
            ctx.drawImage(ary[globalnum],xcord,ycord,500,500);
            console.log(globalnum);
            if (globalnum===6){
                globalnum=0;
            }else{
                globalnum++;
            }
            toggle=true;
        }
    }
    function OnMouseUp(e){
        console.log(e);
        toggle=false; //less animations
        document.removeEventListener('mousemove',OnMouseMove);
        document.removeEventListener('mouseup',OnMouseUp);
    }

})