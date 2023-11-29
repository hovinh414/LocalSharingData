const filterTasks = (tasks, filter) => {
    // const copy_tasks = [...tasks]


    const filteredTasks = tasks.filter(task => {
        if (filter === 'To do') {
            return task.isDone === false;
        }

        return task.isDone === true;
    })

    return filteredTasks;
}

export default filterTasks