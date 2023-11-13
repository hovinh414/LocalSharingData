const filterTasks = (tasks, filter) => {
    // const copy_tasks = [...tasks]

    filteredTasks = tasks.filter(task => {
        if (filter === 'To do') {
            return task.completed === false;
        }

        return task.completed === true;
    })

    return filteredTasks
}

export default filterTasks