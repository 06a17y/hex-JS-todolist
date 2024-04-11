
const addItem = document.querySelector('.txt')
const addBtn = document.querySelector('.btn_add')
const toDoList = document.querySelector('.list')

const tab = document.querySelector('.tab')
const tabList = document.querySelectorAll('.tab li')

let toDoData = []

// 切換tab
tab.addEventListener('click', function(item){
    tabList.forEach(function(e) {
        e.classList.remove('active')
    })
    item.target.classList.add('active')
    renderData(toDoData)
})

toDoList.addEventListener('click', function(item) {
    const clickIndex = item.target.getAttribute('data-index')
    // 刪除項目
    if (item.target.getAttribute('class') == 'delete') {
        toDoData.splice(clickIndex, 1)
    } else {
    // 待完成、未完成判斷
        if (item.target.checked == true) {
            toDoData[clickIndex].isChecked = true
            
        } else {
            toDoData[clickIndex].isChecked = false
        }
        renderData(toDoData)
    }   
})

function updateList () {
    console.log(toDoList)
}

// 新增
addBtn.addEventListener('click', () => {
    if (addItem.value.trim() == '') {
        alert('請輸入待辦事項')
        return
    } else {
        let obj = {
            content: addItem.value.trim(),
            isChecked: false
        }
        toDoData.push(obj)
    }
    renderData(toDoData)
    addItem.value = ""
})

function renderData(toDoData) {
    let str = ''
    toDoData.forEach(function(e, index) {
        if (e.isChecked == true) {
            isChecked = "checked"
        } else {
            isChecked = ""
        }
        str += `<li>
                    <label class="checkbox">
                    <input type="checkbox" data-index="${ index }" ${ isChecked } />
                    <span>${ e.content }</span>
                    </label>
                    <a href="#" class="delete" data-index="${ index }"></a>
                </li>`
    })
    toDoList.innerHTML = str
}

