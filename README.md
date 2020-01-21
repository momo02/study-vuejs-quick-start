Vue.js Quick Start 
======================

06 컴포넌트 기초
----------------------
### 6.1 컴포넌트 조합

- Vue.js 컴포넌트들을 조합해 전체 어플리케이션을 작성한다.
- 컴포넌트들은 부모-자식 관계로 트리 구조를 형성한다. 부모 컴포넌트가 자식 컴포넌트를 포함하는 형태이다.
- 부모 컴포넌트는 속성(Props)를 통해서 자식 컴포넌트로 정보를 전달한다.   
전달 방향은 주로 부모에서 자식으로만 향한다.(단방향)
- 자식 컴포넌트는 부모 컴포넌트로 이벤트를 발신할 수 있다.   
자식 컴포넌트에서 사용자 정의 이벤트를 정의하고 이벤트를 발생시키면, 부모컴포넌트에서 이벤트 핸들러 메서드를 호출하도록 작성한다.   
- ``` 속성 전달과 이벤트 발신이 부모-자식간의 상호작용을 일으키는 방법! ```


- 컴포넌트 기반으로 개발할때 data옵션은 각 컴포넌트의 로컬 상태(Local State)를 관리하기 위한 용도로만 사용한다.
- 하나의 컴포넌트를 애플리케이션에서 여러 번 사용할 경우에 모두 다른 상태 정보를 가져야 한다.   
    - 따라서 data옵션을 단순한 객체 값으로 작성할 수 없다. (객체가 참조형 값이므로 모두 동일한 값을 참조하게 되기 때문)   
    - 이러한 이유로 컴포넌트에서의 **data옵션은 반드시 함수로 작성하고, 함수 내부에서 객체를 리턴** 하도록 작성한다.


### 6.2 컴포넌트의 작성
- Vue.component(tagname,options)   
    - tagname : 컴포넌트를 사용할 태그명
    - options : 컴포넌트에서 렌더링할 templete 등을 지정

- 뷰 컴포넌트 작성 예시   
  ```    
  Vue.component('hello-component', {
    template : '<div>hello world!!!</div>'
  })   
  ```
- 태그명은 대소문자를 구별하지 않기 때문에 케밥 표기법(kebob casing)을 따르는 것이 좋다.  ex) hello-component 

- template옵션에 적용할 수 있는 값 : 위 예시처럼 인라인 템플릿 방식으로 템플릿 문자열을 직접 지정해도 되지만 (권장하지 않는 방식)
  템플릿 문자열을 포함하고 있는 `<template>`태그, `<script type="text/x-template">` 태그의 id를 지정해도 된다.  

[inline template 방식을 이용한 컴포넌트 작성 예](ch06_component_basic/06-01~03_component_using_inline_template.html)   
[`<template>` 태그를 이용한 컴포넌트 작성 예](ch06_component_basic/06-04_component_using_template_tag.html)   
[`<script type="text/x-template">` 태그를 이용한 컴포넌트 작성 예](ch06_component_basic/06-05_component_using_script_tag.html)


### 6.3 DOM 템플릿 구문 작성 시 주의 사항
- 컴포넌트의 템플릿 문자열을 사용할 때 주의할 점이 있다. HTML요소들은 자식 요소로 포함시킬 수 있는 요소들이 정해져 있는 경우가 있고, 
이 사항을 브라우저가 구문 분석을 수행하는데 Vue 컴포넌트가 사용되면 때때로 오류가 발생하기도 한다.

#### 1. 컴포넌트의 템플릿 문자열로 인해 렌더링 오류가 발생할 수 있다.
- [컴포넌트의 템플릿 문자열로 인한 렌더링 오류 예](ch06_component_basic/06-06_rendering_error.html) 
    - 위 예제에서 `<select>`태그 안에서 <option-component>라는 태그를 사용할 수 있다라는 것이 브라우저에 등록되어 있지 않다. 
      브라우저는 이 태그들을 구문 분석하는 작업을 먼저 수행한 후 Vue컴포넌트를 렌더링하는데 구문 분석 단계에서 DOM 요소가 올바르지 않다고    판단하기때문에 제대로 렌더링하지 못하는 문제가 발생한다.

- 위 같은 문제를 해결하기 위해서 is 특성(attribute)을 이용한다.
    - [is 특성을 사용하여 렌더링 오류 해결 예](ch06_component_basic/06-07_resolve_redering_error_using_is_attribute.html) 

- [예제06-06](ch06_component_basic/06-06_rendering_error.html)의 18~19행 같은 코드가 `<script type="text/x-template">` 태그 안에서 사용되거나 .vue 확장자를 사용하는 단일 파일 컴포넌트(Single File Component)를   
작성하는 경우에는 굳이 is 특정을 사용하지 않아도 되지만, `<template>`태그를 사용할 때는 is 특성을 사용해야 한다.
    - [`<script type="text/x-template">` 태그 안에서 사용 예](ch06_component_basic/06-08_resolve_redering_error_using_x-template_script.html) 

#### 2. 템플릿 문자열 안에서 루트 요소(Root Element)는 하나여야 한다.
- [다중 루트 요소들로 인한 렌더링 오류 예](ch06_component_basic/06-06_02_rendering_error_due_to_multi_root_elements.html)
    - 렌더링 X - 루트 요소 여러개 
    ``` 
    <template id="helloTemplate1">
        <div>hello</div>
        <div>world</div>
    </template>   
    ```
    - 렌더링 O - 루트 요소 하나
    ``` 
    <template id="helloTemplate2">
        <div>
            <div>hello</div>
            <div>world</div>
        </div>
    </template>
    ```


### 6.4 컴포넌트에서의 data 옵션
- 컴포넌트 내부의 로컬 상태 정보를 저장하기 위해 data 옵션을 사용할 수 있지만, data옵션에 객체를 직접 지정하면   
컴포넌트가 정상적으로 렌더링되지 않고 오류 발생.
    - [data옵션에 객체 직접 지정으로 인한 렌더링 오류 예](ch06_component_basic/06-09_rendering_error_due_to_directly_assign_object_as_data.html)
- 정상적으로 렌더링 되려면 data옵션에 함수가 주어져야 한다. **함수가 호출되어 리턴된 객체가 data옵션에 주어져야 한다.** 
    - [data옵션에 함수 지정(함수로 부터 리턴된 객체를 data값으로 사용)](ch06_component_basic/06-10_resolve_redering_error_using_object_returned_from_function.html)

- data 옵션에 함수를 지정하는 이유 ?  
    - 동일한 컴포넌트가 여러번 사용될 경우 **각 컴포넌트가 동일한 객체를 가리키지 않고 서로 다른 객체를 참조하기 위해서** 이다.
     함수가 호출될때 마다 매번 만들어진 객체가 리턴되기 때문에 서로 다른 객체를 참조한다.
    -  data옵션에 함수를 지정하더라도 모두 동일한 객체를 참조하도록 할 수 있지만 이 방식은 사용하면 안된다.
        - [동일한 객체가 참조되었을 때 일어나는 상황 예](ch06_component_basic/06-11_problem_due_to_same_object_reference.html)
        - Vue 컴포넌트에서의 데이터 옵션에 함수를 지정할 때, 리턴값은 반드시 **함수 내부에서 선언된 객체**여야 한다. (동일한 객체를 참조하지 않기 위해)


### 6.5 props와 event
- Vue 컴포넌트들이 부모-자식 관계로 형성되었을 때, 각 컴포넌트 내부의 데이터는 캡슐화되기 때문에 다른 컴포넌트나 앱에서 접근할 수 없다. 
    - 따라서 부모 컴포넌트에서 자식 컴포넌트로 필요한 정보를 전달하기 위해서는 **속성(props)을 이용**해야 한다.
    - 반대로 자식 컴포넌트에서 부모 컴포넌트로의 전달은 **이벤트를 이용**한다. 자식 컴포넌트에서 사용자 정의 이벤트를 필요한 정보와 함께 발신(emit)하면 부모 컴포넌트에서 v-on 디렉티브를 이용해 이벤트를 처리한다. 

#### 6.5.1 props를 이용한 정보 전달
- 부모 컴포넌트에서 자식 컴포넌트로 필요한 정보를 전달하기 위해서는 속성(props)을 이용. **단, 부모에서 자식으로 단방향으로만 전달할 수 있다.** 
- Vue 컴포넌트를 정의할 때 props라는 옵션을 작성하고 props명을 배열로 나열한다.
    - [props를 이용한 data 전달 예](ch06_component_basic/06-12_data_transfer_from_parent_to_child_using_props.html)
- 컴포넌트 작성시 속성명을 부여할 때 카멜 표기법(camel casing)을 사용했다면 (ex.myMessage) 
  태그에서 속성명을 사용할 정보를 전달할 때는 반드시 케밥 표기법(kebob casing)을 사용한다. (ex.my-message)   
  태그 작성시 특성(attribute)는 대소문자를 구분하지 않기 때문이다.
    - [props명에 카멜 표기법을 사용한 경우 data 전달 예](ch06_component_basic/06-13.html)
- 속성을 정의할 때 속성명을 배열 형태로 나열할 수도 있지만, 속성에 대한 엄격한 유효성 검증이 필요하다면 객체 형태를 사용한다. 
    - [객체 형태의 props 옵션 사용 예](ch06_component_basic/06-14~15.html)
- 속성으로 전달할 값이 배열이나 객체인 경우, 기본값(default value)을 부여할때 함수의 리턴값으로 부여하도록한다. (data옵션을 부여할 때 함수의 리턴값으로 부여했던 것과 같은 맥락)   또한 속성값을 전달할 때는 v-bind 디렉티브를 이용한다.
    - [배열 타입 속성 기본값 적용 예](ch06_component_basic/06-16.html)   
    - [배열 타입 속성값 전달 예](ch06_component_basic/06-17.html)

#### 6.5.2 event를 이용한 정보 전달
- event를 이용해서 전달하는 방법은 사용자 정의 이벤트를 활용한다. 자식 컴포넌트에서 이벤트를 발신(emit)하고 부모 컴포넌트에서 v-on 디렉티브를 이용해 이벤트를 수신한다. 
    - [이벤트를 이용한 자식 컴포넌트에서 부모 컴포넌트로의 데이터 전달 예](ch06_component_basic/06-18)

#### 6.5.3 props와 event 예제
- 연락처 조회 Component 예제 (props & event 활용)

    ##### Step01. 기본 틀 갖추기 [[Step01 코드]](ch06_component_basic/06-19_contact_search_component_exam_step1.html)

    ##### Step02. 자식 컴포넌트인 contactlist-component 작성 [[Step02 코드]](ch06_component_basic/06-20_contact_search_component_exam_step2.html)

    ##### Step03. 자식 컴포넌트인 search-component 작성 [[Step03 코드]](ch06_component_basic/06-21_contact_search_component_exam_step3.html)

    ##### Step04. 부모 컴포넌트인 search-contact-component 작성 [[Step04 코드]](ch06_component_basic/06-22_contact_search_component_exam_step4.html)

    ##### Step05. Vue 인스턴스를 만들어 컴포넌트가 화면에 나타나도록 마무리 [[Step05 코드]](ch06_component_basic/06-23_contact_search_component_exam_step5.html)


### 6.6 이벤트 버스 객체를 이용한 통신
- 서로 형제 관계이거나 부모와 손자, 증손자 관계인 컴포넌트들 사이에도 정보를 전달하고자 할 경우에 사용할 수 있는 방법이
**이벤트 버스(Event Bus) 객체**를 만드는 것이다. 비어 있는 Vue 인스턴스를 만들어서 사용하면 된다. 
    - ex) `` var eventBus = new Vue(); ``
    - 별도의 데이터 정보를 가지지 않고, 순수하게 이벤트를 통해서 컴포넌트 간의 정보 교환만을 위해서 사용한다.
- 이벤트를 수신하는 컴포넌트는 미리 이벤트 핸들러를 등록해두어야 한다. 이를 위해 Vue 인스턴스의 생명주기의 created 이벤트 훅을 이용해 Vue인스턴스가 만들어질 때 $on 메서드를 사용해 이벤트 수신 정보를 등록해둔다.
- 이벤트를 발신하는 컴포넌트에서는 $emit 메서드를 호출한다.
- [형제 컴포넌트 간 이벤트 버스 객체를 이용한 통신 예](ch06_component_basic/06-24)


### 6.7 Todolist 실전 예제
- 이벤트 버스를 이용해 컴포넌트 사이의 정보를 교환하는 Todolist 예제

    ##### Step01. 기본 틀과 이벤트 버스 객체 작성 [[Step01 코드]](ch06_component_basic/06-25_todoList_exam_with_eventBus_step1.html)

    ##### Step02. 자식 컴포넌트인 contactlist-component 작성 [[Step02 코드]](ch06_component_basic/06-26_todoList_exam_with_eventBus_step2.html)

    ##### Step03. 자식 컴포넌트인 search-component 작성 [[Step03 코드]](ch06_component_basic/06-27_todoList_exam_with_eventBus_step3.html)

    ##### Step04. 부모 컴포넌트인 search-contact-component 작성 [[Step04 코드]](ch06_component_basic/06-28_todoList_exam_with_eventBus_step4.html)
