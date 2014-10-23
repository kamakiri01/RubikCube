var m4_rotX = function(th){
    return [
        1, 0, 0, 0,
        0, Math.cos(th), Math.sin(th), 0,
        0, -Math.sin(th), Math.cos(th), 0,
        0, 0, 0, 1
    ];
};
var m4_rotY = function(th){
    return [
        Math.cos(th), 0, -Math.sin(th), 0,
        0, 1, 0, 0,
        Math.sin(th), 0, Math.cos(th), 0,
        0, 0, 0, 1
    ]; 
};
var m4_rotZ = function(th){
    return [
        Math.cos(th), Math.sin(th), 0, 0,
        -Math.sin(th), Math.cos(th), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]; 
};
//----------平行移動行列
var tleng = 0.2;
var m4_traX = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0, tleng, tleng, 1
];
var m4_traY = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    tleng, 0, tleng, 1
];
var m4_traZ = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    tleng, tleng, 0, 1
];


