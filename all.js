const addItem = document.querySelector('.txt')
const addBtn = document.querySelector('.btn_add')
const toDoList = document.querySelector('.list')

const tab = document.querySelector('.tab')
const tabList = document.querySelectorAll('.tab li')
const tabAll = document.querySelector('li[data-tag="All"]')

const listFooter = document.querySelector('.list_footer p')
const clearBtn = document.querySelector('.clear_Item')

let tabType = "All";
let toDoData = []

// 切換tab
tab.addEventListener('click', function(item){
    tabList.forEach(function(e) {
        e.classList.remove('active')
    })
    item.target.classList.add('active')
    
    tabType = item.target.getAttribute('data-tag');
    
    renderData()
})

// 點選刪除和待完成/未完成
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

    }
    renderData()
})

// 清除所有已完成項目
clearBtn.addEventListener('click', function(item) {
    
    toDoData = toDoData.filter(e => e.isChecked == false)
    
    renderData()
    
})

// 新增TODO項目
addItem.addEventListener('keydown', function(e) {
    if (e.key !== "Enter") return;
    addBtn.click();
})


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
    tabList.forEach(function(e) {
        e.classList.remove('active')
    })
    tabType = "All";
    tabAll.classList.add('active')
    
    renderData()
    addItem.value = "" 
})

// 渲染
function renderData() {
    let allStr = ''
    let progressNum = 0

    toDoData.forEach(function(e, index) {
        if (e.isChecked == true) {
            isChecked = "checked"
        } else {
            isChecked = ""
            progressNum += 1
        }
        str = `<li>
                    <label class="checkbox">
                    <input type="checkbox" data-index="${ index }" ${ isChecked } />
                    <span>${ e.content }</span>
                    </label>
                    <a href="#" class="delete" data-index="${ index }"></a>
                </li>`
        
        // 過濾顯示資料
        if ((e.isChecked === true) && (tabType === "All" || tabType === "Finished")) {
            allStr += str;
        } else if ((e.isChecked === false) && (tabType === "All" || tabType === "InProgress")) {
            allStr += str;
        }
    })

    toDoList.innerHTML = allStr
    listFooter.textContent = `${progressNum}個待完成項目`
}

