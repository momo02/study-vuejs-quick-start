"use strict";

var arr = [10, 20, 30, 40];
//arr의 배열 값 순서대로 a1,a2,a3 변수에 각각 10,20,30을 할당.
var a1 = arr[0],
    a2 = arr[1],
    a3 = arr[2];

console.log(a1, a2, a3);

var p1 = { name: "홍길동", age: 20, gender: "M" };
// p1객체의 name속성을 변수 n에 할당하고 p1.age를 변수 변수 a에 할당.
// p1객체의 속성과 할당하려는 변수의 이름이 동일할 때는 변수명을 생략 가능.
var n = p1.name,
    a = p1.age,
    gender = p1.gender;

console.log(n, a, gender);