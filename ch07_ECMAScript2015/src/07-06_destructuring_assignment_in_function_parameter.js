//구조분해 할당과 기본 파라미터를 함께 사용.
function addContact({ name, phone, email = "이메일 없음", age = 0 }) {
    console.log("이름 : " + name);
    console.log("전번 : " + phone);
    console.log("이메일 : " + email);
    console.log("나이 : " + age);
}

//addContact 함수를 호출할 때 자바스크립트 객체를 파라미터 값으로 전달. 
//전달된 객체는 구조분해 할당을 수행. 객체의 속성이 존재하지않는 경우 기본값으로 할당. 
//이와 같이 객체로 파라미터 값을 전달하는 경우 파라미터의 전달 순서는 실행 결과에 영향을 주지 않음. 
addContact({
    phone: "010-3434-8989",
    name: "이몽룡"
})