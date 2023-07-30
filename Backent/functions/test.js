var shot = 0
const items = ["samsung","s23 ultra pro max","iPhone"]
for ( var i = 0;i<1000;i++){
    var random=Math.round(Math.random() * 2) 
    console.log(random)
    if(0<random<4){
        shot++
    }else{
        console.log("An error occured")
    }
}
console.log(shot)