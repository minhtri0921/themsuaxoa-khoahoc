var listcourses = []

async function getData() {
    listcourses = await axios('http://localhost:3004/courses');
    listcourses = listcourses.data;

    function renderCourses(course) {
        return ` <li>
        <h2>${course.name}</h2>
        <p>${course.description}</p>
        <button id="remove" onclick= "remove(${course.id})">Xóa</button>
        <button id="update" onclick="update(${course.id})">Sửa</button>
        </li>`
    }
    function displayCourse(listcourses) {
        let ulElement = $('#list-courses')
        let str = ''
        for (const course of listcourses) {
            str += renderCourses(course)
        }
        ulElement.html(str)
    }
    displayCourse(listcourses)

}
getData()

let nameElement = $("input#name")
let typeElement = $("input#description")
function handleBlurInput(input) {
    var errorElement = input.parent().children()[2];
    input.blur(function () {
        if (input.val() === '') {
            let errorMesagge = "Vui lòng nhập"
            $(errorElement).attr('style', 'color: red; font-style: italic;');
            $(errorElement).text(errorMesagge);
        } else {
            $(errorElement).text('');
        }
    })
}
handleBlurInput(nameElement)
handleBlurInput(typeElement)

$('#add').click(async function () {
    let newName = $("input#name").val()
    let newDescription = $("input#description").val()

    if (newName && newDescription) {
        $("p#error-message").text('')
        let formData = {
            name: newName,
            description: newDescription
        }

        await axios({
            method: "POST",
            url: 'http://localhost:3004/courses',
            data: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        })

        getData()
    } else {
        $("p#error-message").attr('style', 'color: red; font-style: italic;')
        $("p#error-message").text('Vui lòng nhập đầy đủ thông tin')
    }
})

function update(id) {
    let courseUpdate = listcourses.find(function (course) {
        return course.id === id
    })
    $("input#name").val(courseUpdate.name)
    $("input#description").val(courseUpdate.description)

    $("button#updt").show()
    $("button#add").toggle()
    $("button").click(async function () {
        $("button#add").show()
        $("button#updt").toggle()
        let newName = $("input#name").val()
        let newDescription = $("input#description").val()
        if (newName && newDescription) {
            let formData = {
                name: newName,
                description: newDescription
            }

            await axios({
                method: "PUT",
                url: 'http://localhost:3004/courses/' + id,
                data: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            })
            $("input#name").val('')
            $("input#description").val('')
            getData()
        } else {
            $("input#name").val('')
            $("input#description").val('')
            handleBlurInput(nameElement)
            handleBlurInput(typeElement)
        }
    })
}

async function remove(id) {
    await axios({
        method: "DELETE",
        url: 'http://localhost:3004/courses' + "/" + id,

        headers: { "Content-Type": "application/json" },
    })

    getData()
}