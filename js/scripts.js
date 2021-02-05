$(function(){
    $('input').change(function(){
        let sideA = parseInt($('#sideA').val());
        let sideB = parseInt($('#sideB').val());
        let sideC = parseInt($('#sideC').val());
        resetHtml();

        //check all 3 fields are filled
        if(sideA && sideB && sideC){
            if(sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA){
                let type = getSideClassification(sideA,sideB,sideC);

                //calculate angles
                let angleA = calculateAngle(sideA, sideB, sideC);
                let angleB = calculateAngle(sideB, sideA, sideC);
                let angleC = calculateAngle(sideC, sideA, sideB);
                //let angleTotal = angleA + angleB + angleC;
                let angleType = getAngleClassification(angleA,angleB,angleC);

                let $angles = `<ul>`;
                $angles += `<li>Angle A: ${angleA}&deg;</li>`;
                $angles += `<li>Angle B: ${angleB}&deg;</li>`;
                $angles += `<li>Angle C: ${angleC}&deg;</li>`;
                $angles += `</ul>`;
                $("#angles").html($angles);

                $('#output').text(`These side lengths produce a valid ${angleType} ${type} triangle.`);

                drawTriangle(sideA,sideB,sideC,angleA,angleB,angleC);
            }else{
                $('#output').text("These side lengths do not produce a valid triangle.");
            }
        }
    });
});

function resetHtml(){
    $('#output').text(""); //reset output text each time
    $("#angles").html("");
    var c = document.getElementById("triangle");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
}

//will return the angle opposite of the first given side
function calculateAngle(sideA, sideB, sideC){
    return Math.round(Math.acos((Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) / (2 * sideB * sideC)) * 57.2958);//57.2958 to convert from radians
}

function getSideClassification(sideA,sideB,sideC){
    if(sideA == sideB && sideB == sideC){//equilateral
        return "equilateral";
    }else if(sideA == sideB || sideB == sideC || sideA == sideC){ //Isosceles
        return "isosceles";
    }else{//All different, Scalene
        return "scalene";
    }
}

function getAngleClassification(angleA,angleB,angleC){
    if(angleA == 90 || angleB == 90 || angleC == 90){
        return "right";
    }else if(angleA < 90 && angleB < 90 && angleC < 90){
        return "acute";
    }else if(angleA > 90 || angleB > 90 || angleC > 90){
        return "obtuse";
    }
    return "";
}

//was mostly playing with this, not 100% confident in
function drawTriangle(sideA,sideB,sideC,angleA,angleB,angle){
    var c = document.getElementById("triangle");
    var ctx = c.getContext("2d");
    
    let newXY = lineToAngle(ctx,250,250,sideB * 25,0);
    ctx.fillText('b', 250 + (sideB * 12),270);
    newXY = lineToAngle(ctx,newXY['x'],newXY['y'],sideC * 25,180 - (-1 * angleA));
    ctx.fillText('c', newXY['x'] + (sideC * 12),newXY['y'] + (sideC * 12));
    ctx.fillText('a', newXY['x'] - (sideC * 12),newXY['y'] + (sideC * 12));
    //newXY = lineToAngle(ctx,newXY['x'],newXY['y'],sideA * 10, 180 - angleB);
    ctx.moveTo(newXY['x'], newXY['y']);
    ctx.lineTo(250, 250);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

function lineToAngle(ctx, x1, y1, length, angle) {
    angle *= Math.PI / 180;

    var x2 = x1 + length * Math.cos(angle),
        y2 = y1 + length * Math.sin(angle);

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    return {x: x2, y: y2};
}

//Scalene (side) -> No equal sides
//Isosceles (side) -> 2 equal sides
//Equilateral (side) -> 3 equal sides
//Acute (angle) 3 angles < 90 degrees
//Obtuse (angle) 1 angle > 90 degrees
//Right (angle) 1 angle = 90 degrees