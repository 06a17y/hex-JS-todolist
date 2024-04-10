
const addItem = document.querySelector('.txt')
const addBtn = document.querySelector('.btn_add')
const toDoList = document.querySelector('.list')
console.log(toDoList)
let toDoData = []


// 新增
addBtn.addEventListener('click', function(item) {
    if (addItem.value.trim() == '') {
        alert('請輸入待辦事項')
        return
    } else {
        let obj = {
            content: addItem.value.trim()
        }
        toDoData.push(obj)
    }
    renderData()
})

function renderData() {
    let str = ''
    toDoData.forEach(function(e, index) {
        str += `<li>
                <label class="checkbox" for="">
                <input type="checkbox" />
                <span>${ e.content }</span>
                </label>
                <a href="#" class="delete"></a>
            </li>`
    })
    toDoList.innerHTML = str
}


