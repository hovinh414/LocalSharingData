const countCompletedSubTask = (subTaskList) => {
    let count = 0

    subTaskList.map(subTask => {
        if (subTask.completed === true) {
            count++
        }
    })

    return count
}

export default countCompletedSubTask