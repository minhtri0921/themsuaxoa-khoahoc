var listcourses = [];
async function renderCourses() {

    listcourses = await fetch('http://localhost:3004/courses')
        .then(function (response) {
            return response.json()
        });


    function render(course) {
        return `<li>
                    <h2>${course.name}</h2>
                    <p>${course.description}</p>
                    <button onclick="remove(${course.id})">Xóa</button>
                    <button onclick="update(${course.id})">Sửa</button>
                </li>`
    }
    function render1(list) {
        let listElement = document.querySelector('ul')
        let str = ''
        for (const course of list) {
            str += render(course)
        }
        listElement.innerHTML = str
    }
    render1(listcourses)
}
renderCourses()

async function remove(id) {
    var result = confirm('Bạn có muốn xóa khóa học này ? ')
    if (result === true) {
        // listcourses.splice(index, name)
        var options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        await fetch('http://localhost:3004/courses' + '/' + id, options)
            .then(function (response) {
                return response.json();
            });
    } else {
        renderCourses(listcourses)
    }
    renderCourses()
}
let newNameCourse = document.getElementById('name')
let newDescriptionCourse = document.getElementById('description')

function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message');
    input.onblur = function () {
        if (input.value === '') {
            errorElement.setAttribute('style', 'color: red; font-style: italic;');
            errorElement.innerText = 'Vui lòng nhập';
        } else {
            errorElement.innerText = '';
        }
    }
}

handleBlurInput(newNameCourse);
handleBlurInput(newDescriptionCourse);

function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message');
    input.onblur = function () {
        if (input.value === '') {
            errorElement.setAttribute('style', 'color: red; font-style: italic;');
            errorElement.innerText = 'Vui lòng nhập';
        } else {
            errorElement.innerText = '';
        }
    }
}

handleBlurInput(chieuDaiElement);
handleBlurInput(chieuRongElement);


async function add() {

    let newNameCourse = document.getElementById('name').value
    let newDescriptionCourse = document.getElementById('description').value

    if (newNameCourse && newDescriptionCourse) {
        var formData = {
            name: newNameCourse,
            description: newDescriptionCourse
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        await fetch('http://localhost:3004/courses', options)
            .then(function (response) {
                return response.json();
            });

        renderCourses()
    } else {
        let errorElement = document.getElementById('error-message')
        errorElement.innerHTML = 'Vui lòng nhập đầy đủ thông tin '
        errorElement.style.color = 'red'
    }
}
async function update(id) {
    let course = listcourses.find(function (course) {
        return course.id === id
    })


    document.getElementById('name').value = course.name
    document.getElementById('description').value = course.description


    let addBtn = document.getElementById('add')
    addBtn.style.display = 'none'

    let updateBtn = document.getElementById('update')
    updateBtn.style.display = 'block'

    updateBtn.onclick = async function () {
        let newNameCourse = document.getElementById('name')
        let newDescriptionCourse = document.getElementById('description')

        var formData = {
            name: newNameCourse.value,
            description: newDescriptionCourse.value
        }

        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        await fetch('http://localhost:3004/courses' + "/" + id, options)
            .then(function (response) {
                return response.json();
            });
        document.getElementById('name').value = ''
        document.getElementById('description').value = ''
        addBtn.style.display = 'block'
        updateBtn.style.display = 'none'
        renderCourses()
    }
}