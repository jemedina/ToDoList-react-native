class TodoService {

    getItems() {
        return fetch('https://cool-todo-app.herokuapp.com/getTodoItems')
            .then(res => res.json());
    }

    addItem(newTitle) {
        return fetch('https://cool-todo-app.herokuapp.com/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newTitle,
            }),
        });
    }

    setItemStatus(id, newStatus) {
        return fetch('https://cool-todo-app.herokuapp.com/setItemStatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId: id,
                doneStatus: newStatus
            }),
        })
        .then(resp => resp.json());
    }

    deleteItem(id) {
        return fetch('https://cool-todo-app.herokuapp.com/deleteItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId: id,
            }),
        });
    }

}

export default new TodoService();