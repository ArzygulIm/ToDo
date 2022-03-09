let todos = []

const createTask = (e) => {
    e.preventDefault()
    let message = document.getElementById('text')
    let descr = document.getElementById('descr')

    if (message.value.length >= 3 && descr.value.length >= 3) {
        let todo = {
            id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
            message: message.value,
            descr: descr.value,
            status: false,
            date: new Date()

        }
        todos.push(todo)
        console.log(todos)
        message.value = ''
        descr.value = ''
        renderTodos()
    } else {
        alert('Minimum length is 3 symbols')
    }
}



const renderTodos = () => {
    const output = document.getElementById('output')
    output.innerHTML = ''

    todos.map(todo => {

        let block = document.createElement('div')
        block.style.background = todo.status===true?'lightgreen':'coral'
        block.className = 'block'

        let row = document.createElement('div')
        row.className = row

        let mess = document.createElement('h2')
        let descr = document.createElement('h2')
        let date = document.createElement('p')

        let reminder = document.createElement('p')

        let btnWrap = document.createElement('div')
        let done = document.createElement('button')
        let edit = document.createElement('button')
        let del = document.createElement('button')
        let descr_btn = document.createElement('button')
        btnWrap.style.display='flex'
        let delText = document.createElement('div')
        let editText = document.createElement('div')
        let descr_btnText = document.createElement('div')
        let doneText = document.createElement('div')
        
        
        let delImg = document.createElement('img')
        let editImg = document.createElement('img')
        let doneImg = document.createElement('img')
        descr_btnImg = document.createElement('img')

        done.style.display = todo.status ? 'none' : 'flex'

        todo.status ? reminder.textContent = 'Todo is Completed' : null


        mess.textContent = `Name: ${todo.message}`
        descr.textContent = `Description: ${todo.descr}`

        let current_date = todo.date
        date.textContent = `
        Todo was created ${current_date.getDate()} -
        ${current_date.getMonth() + 1}  
        - ${current_date.getFullYear()} 
        ${current_date.getHours()} : ${current_date.getMinutes()} : ${current_date.getSeconds()}
      `

        delImg.src = "images/delete.png"
        editImg.src = "images/edit.png"
        descr_btnImg.src = "images/editdes.png"
        doneImg.src = "images/done.png"

        done.addEventListener('click', () => {
            doneTodo(todo.id)
            console.log(todo.id)
        })

        del.addEventListener('click', () => {

            todo.status ? deleteTodo(todo.id) : alert('todo is not complete')
        })

        edit.addEventListener('click', () => {
            editTodo(todo.id)
        })

        descr_btn.addEventListener('click', () => {
            editDescription(todo.id)
        })

        del.addEventListener('mouseover',()=>{
            delText.textContent='Delete'
            delText.style.width='100px'
        })
        del.addEventListener('mouseleave',()=>{
            delText.style.width='0'
            delText.textContent=''
        })

        edit.addEventListener('mouseover',()=>{
            editText.textContent='Edit Name'
            editText.style.width='100px'
        })
        edit.addEventListener('mouseleave',()=>{
            editText.style.width='0'
            editText.textContent=''
        })

        descr_btn.addEventListener('mouseover',()=>{
            descr_btnText.textContent='Edit descriptions'
            descr_btnText.style.width='200px'
        })
        descr_btn.addEventListener('mouseleave',()=>{
            descr_btnText.style.width='0'
            descr_btnText.textContent=''
        })

        done.addEventListener('mouseover',()=>{
            doneText.textContent='Done'
            doneText.style.width='100px'
        })
        done.addEventListener('mouseleave',()=>{
            doneText.style.width='0'
            doneText.textContent=''
        })

        del.append(delImg,delText)
        edit.append(editImg,editText)
        descr_btn.append(descr_btnImg,descr_btnText)
        done.append(doneImg,doneText)
        btnWrap.append(del, edit, descr_btn, done)
        block.append(mess, descr, date, reminder, btnWrap)
        output.append(block)


    })
}

const doneTodo = (id) => {
    todos.map(el => {

        if (id == el.id) {
            el.status = true
            renderTodos()
        }
    })
}


const deleteTodo = (id) => {
    todos = todos.filter(el => el.id != id)
    renderTodos()
}

const editTodo = (id) => {
    todos.map(el => {

        if (id == el.id) {
            let newMessage = prompt('Edit Todo')
            if (newMessage == null || newMessage == '' || newMessage.trim() == '') {
                el.message
            } else if (newMessage.length <= 3) {
                alert('Minimum length is 3 symbols')
            } else {
                console.log(newMessage)
                el.message = newMessage
                renderTodos()
            }

        }
    })
}

const editDescription = (id) => {
    todos.map(el => {

        if (id == el.id) {
            let newDescr = prompt('Edit Description')
            if (newDescr == null || newDescr == '' || newDescr.trim() == '') {
                el.descr
            } else if (newDescr.length <= 3) {
                alert('Minimum length is 3 symbols')
            } else {
                console.log(newDescr)
                el.descr = newDescr
                renderTodos()
            }

        }
    })
}