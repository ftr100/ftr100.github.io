const fov_default = 90;

const base = [
    {x: -100, y: 50, z: 10},
    {x: 100, y: 50, z: 10},
    {x: 100, y: 50, z: 500},
    {x: -100, y: 50, z: 500},

    {x: -100, y: -100, z: 10},
    {x: 100, y: -100, z: 10},
    {x: 100, y: -100, z: 500},
    {x: -100, y: -100, z: 500}
];

const box1 = [
    {x: 50, y: 50, z: 100},
    {x: 100, y: 50, z: 100},
    {x: 100, y: 50, z: 200},
    {x: 50, y: 50, z: 200},

    {x: 50, y: 20, z: 100},
    {x: 100, y: 20, z: 100},
    {x: 100, y: 20, z: 200},
    {x: 50, y: 20, z: 200}
];

const box2 = [
    {x: -50, y: 50, z: 70},
    {x: -30, y: 50, z: 50},
    {x: -10, y: 50, z: 70},
    {x: -30, y: 50, z: 90},
    {x: -50, y: 20, z: 70},
    {x: -30, y: 20, z: 50},
    {x: -10, y: 20, z: 70},
    {x: -30, y: 20, z: 90}
];

const box3 = [
    {x: 10, y: 50, z: 20},
    {x: 50, y: 50, z: 20},
    {x: 50, y: 50, z: 40},
    {x: 10, y: 50, z: 40},

    {x: 10, y: 30, z: 20},
    {x: 50, y: 30, z: 20},
    {x: 50, y: 30, z: 40},
    {x: 10, y: 30, z: 40}
];

const side_box1 = [
    {x: -100, y: 50, z: 230},
    {x: -90, y: 50, z: 230},
    {x: -90, y: 50, z: 280},
    {x: -100, y: 50, z: 280},

    {x: -100, y: -20, z: 230},
    {x: -90, y: -20, z: 230},
    {x: -90, y: -20, z: 280},
    {x: -100, y: -20, z: 280}
];

const side_box2 = [
    {x: -100, y: 50, z: 300},
    {x: -90, y: 50, z: 300},
    {x: -90, y: 50, z: 350},
    {x: -100, y: 50, z: 350},

    {x: -100, y: -20, z: 300},
    {x: -90, y: -20, z: 300},
    {x: -90, y: -20, z: 350},
    {x: -100, y: -20, z: 350}
];

const centerbox = [
    {x: -50, y: 50, z: 230},
    {x: 20, y: 50, z: 230},
    {x: 20, y: 50, z: 350},
    {x: -50, y: 50, z: 350},

    {x: -50, y: 10, z: 230},
    {x: 20, y: 10, z: 230},
    {x: 20, y: 10, z: 350},
    {x: -50, y: 10, z: 350}
];

const frame1 = [
    {x: 100, y: -10, z: 400},
    {x: 100, y: -10, z: 280},
    {x: 100, y: -60, z: 280},
    {x: 100, y: -60, z: 400},
];

const boxes = [
    base, box1, box2, box3, side_box1, side_box2, centerbox
];


const transform_box = (array, d) => {
    return array.map(arr => ({x: d*(arr.x / arr.z), y: d*(arr.y / arr.z)}));
};

function draw_box(ctx, array, center) {
    ctx.beginPath();
    ctx.translate(center.x, center.y);
    ctx.moveTo(array[0].x, array[0].y);
    ctx.lineTo(array[1].x, array[1].y);
    ctx.lineTo(array[2].x, array[2].y);
    ctx.lineTo(array[3].x, array[3].y);
    ctx.closePath();
    ctx.stroke();

    ctx.moveTo(array[4].x, array[4].y);
    ctx.lineTo(array[5].x, array[5].y);
    ctx.lineTo(array[6].x, array[6].y);
    ctx.lineTo(array[7].x, array[7].y);
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(array[0].x, array[0].y);
    ctx.lineTo(array[4].x, array[4].y);
    ctx.moveTo(array[1].x, array[1].y);
    ctx.lineTo(array[5].x, array[5].y);
    ctx.moveTo(array[2].x, array[2].y);
    ctx.lineTo(array[6].x, array[6].y);
    ctx.moveTo(array[3].x, array[3].y);
    ctx.lineTo(array[7].x, array[7].y);
    ctx.stroke();
    ctx.translate(-center.x, -center.y);
}

function draw_face(ctx, array, center) {
    ctx.beginPath();
    ctx.translate(center.x, center.y);
    ctx.moveTo(array[0].x, array[0].y);
    ctx.lineTo(array[1].x, array[1].y);
    ctx.lineTo(array[2].x, array[2].y);
    ctx.lineTo(array[3].x, array[3].y);
    ctx.closePath();
    ctx.stroke();
    ctx.translate(-center.x, -center.y);
}

window.onload = draw_fov(fov_default);


function draw_fov(fov) {
    const canvasfov = document.getElementById('fov-draw');
    const center = {
        x: canvasfov.width / 2,
        y: canvasfov.height / 2
    };
    const ctx = canvasfov.getContext('2d');
    const d = ((canvasfov.width / 2) / Math.tan((fov / 2) * Math.PI / 180));

    show_fov(fov);

    ctx.beginPath();
    ctx.fillStyle = 'lightslategray'; /*lightsteelblue*/
    ctx.fillRect(0, 0, canvasfov.width, canvasfov.height);

    boxes.forEach(box => {
        draw_box(ctx, transform_box(box, d), center);
    });
    draw_face(ctx, transform_box(frame1, d), center);
}


function show_fov(fov) {
    const wide_fov = 2 * Math.atan((4 / 3) * Math.tan((fov / 2) * Math.PI / 180)) * 180 / Math.PI;

    document.getElementById("fov-normal").textContent = fov;
    document.getElementById("fov-wide").textContent = wide_fov;
}

function get_fov() { return document.getElementById("fov-field").value; }

function set_fov(fov) { draw_fov(fov); }

function reset_fov() {
    var fov_text = document.getElementById("fov-field");
    fov_text.value = fov_default;
    draw_fov(fov_default);
}


function calc_sens() {
    const dpi = document.getElementById("dpi-field").value;
    const sens = document.getElementById("sens-field").value;

    document.getElementById("calc-result").textContent = (360/(0.022 * dpi * sens)) * 2.54;
}

function change_dpi(n) {
    var dpi = document.getElementById("dpi-field");
    dpi.value = n;
}
