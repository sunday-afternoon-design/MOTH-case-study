import p5 from "p5";

let sketch = function(p) {
    let w = 130;
    let h = 24;
    let d = 24;
    let c0 = -500;
    let c1 = -800;
    let c2 = 900;
    let cam1;
    let size = 14.5;
    let img1, img2, img3;
    let height;

    p.setup = function() {
        height = p.windowWidth / 3072 * 1572
        let canvas = p.createCanvas(p.windowWidth, height, p.WEBGL);
        canvas.parent("canvas-container");
        p.angleMode(p.DEGREES);
        p.noStroke();
        cam1 = p.createCamera();
        cam1.setPosition(c0, c1, c2);
        cam1.lookAt(0, 0, 0);
        cam1.ortho(-p.windowWidth / 2, p.windowWidth / 2, -height / 2, height / 2, 0.01, 5000);
        p.setCamera(cam1);
        let max = (((0 - p.windowWidth / 2) / 1000 / 36) * 100) / 2 + 0.5;
    };

    p.windowResized = function() {
        height = p.windowWidth / 3072 * 1572
        p.resizeCanvas(p.windowWidth, height);
        cam1.ortho(-p.windowWidth / 2, p.windowWidth / 2, -height / 2, height / 2, 0.01, 5000);
    };

    p.preload = function() {
        img1 = p.loadImage("1-15.png");
        img2 = p.loadImage("1-16.png");
        img3 = p.loadImage("1-17.png");
    };

    let rotationchange = 0;
    let speed = .1
    let mx = 0,
        my = 0;

    p.draw = function() {
        height = p.windowWidth / 3072 * 1572
        size = p.windowWidth / 3072 * 15.5
        console.log(p.windowWidth)
        p.clear();

        rotationchange += speed;
        speed = p.abs(mx) + 0.5;
        mx = -((((p.mouseX - 120) - p.windowWidth / 2) / 1000 / 36) * 100) / 1.3;
        my = -((p.mouseY - 90) - height / 2) / 1200;

        // p.translate(0, 0, -h / 2);
        c0 = lerp(c0, -800 + mx * 300, 0.1);
        c1 = lerp(c1, -400 + my * 500, 0.1);

        cam1.setPosition(c0, c1, c2);
        cam1.lookAt(0, 0, 0);
        p.scale(size);

        // porch
        p.push();
        p.rotateX(90 + rotationchange);
        p.translate(0, 0, h / 2);
        p.texture(img1);
        p.plane(w, h);
        p.pop();
        p.push();
        p.rotateX(rotationchange);
        p.texture(img2);
        p.translate(0, 0, h / 2);
        p.plane(w, h);
        p.pop();

        // pop up
        p.push();
        p.texture(img3);
        p.translate(-w / 2, 0, 0);
        p.rotateX(rotationchange);
        p.rotateY(-90);
        p.plane(h, h);
        p.pop();

        // pop up
        p.push();
        p.rotateX(270 + rotationchange);
        p.translate(0, 0, h / 2);
        p.texture(img1);
        p.plane(w, h);
        p.pop();

        // porch
        p.push();
        p.rotateX(180 + rotationchange);
        p.translate(0, 0, h / 2);
        p.texture(img2);
        p.plane(w, h);
        p.pop();

        // the moth back
        p.push();
        p.texture(img3);
        p.translate(w / 2, 0, 0);
        p.rotateX(rotationchange);
        p.rotateY(90);
        p.plane(h, h);
        p.pop();

        // p.translate(0, 0, -8 + h / 2);
    };
};

let myp5 = new p5(sketch);

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

function map(value, min1, max1, min2, max2) {
    return (value - min1) * (max2 - min2) / (max1 - min1) + min2;
}



let topoffset = map(window.innerWidth, 3072, 550, 1, 60)
document.getElementById("canvas-container").style.position = "absolute"
document.getElementById("canvas-container").style.top = topoffset + "px"
document.getElementById("canvas-container").style.zindex = "1"