
const addItem = document.querySelector('.txt')
const addBtn = document.querySelector('.btn_add')
const toDoList = document.querySelector('.list')

const tab = document.querySelector('.tab')
const tabList = document.querySelectorAll('.tab li')
const tabAll = document.querySelector('li[data-tag="All"]')

const listFooter = document.querySelector('.list_footer p')
const clearBtn = document.querySelector('.clear_Item')


let toDoData = []

// 切換tab
tab.addEventListener('click', function(item){
    tabList.forEach(function(e) {
        e.classList.remove('active')
    })
    item.target.classList.add('active')
    // 切換tab時候，更新資料
    if (item.target.getAttribute('data-tag') == 'InProgress') {
        filterData = toDoData.filter(data => data.isChecked == false)
        renderData(filterData)
    } else if (item.target.getAttribute('data-tag') == 'Finished') {
        filterData = toDoData.filter(data => data.isChecked == true)
        renderData(filterData)
    } else {
        renderData(toDoData)
    }
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

    }
    // console.log(toDoData)
    renderData(toDoData)
})

clearBtn.addEventListener('click', function(item) {
    
    toDoData = toDoData.filter(e => e.isChecked == false)

    tabList.forEach(tabItem => {
        if (tabItem.classList.contains('active')) {
            activeTab = tabItem.getAttribute('data-tag');
            if (activeTab == 'Finished') {
                filterData = toDoData.filter(data => data.isChecked == true)
                renderData(filterData)
            } else if (activeTab == 'InProgress') {
                filterData = toDoData.filter(data => data.isChecked == false)
                renderData(filterData)
            } else {
                renderData(toDoData)
            }
        }
    })
    
})

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
    tabList.forEach(function(e) {
        e.classList.remove('active')
    })
    tabAll.classList.add('active')
    renderData(toDoData)
    addItem.value = ""
})

// 渲染
function renderData(toDoData) {
    let str = ''
    let progressNum = 0


    toDoData.forEach(function(e, index) {
        if (e.isChecked == true) {
            isChecked = "checked"
        } else {
            isChecked = ""
            progressNum += 1
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
    listFooter.textContent = `${progressNum}個待完成項目`
}


