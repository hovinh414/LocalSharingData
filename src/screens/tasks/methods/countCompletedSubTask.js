const countCompletedSubTask = (subTaskList) => {
    let count = 0


    if (subTaskList) {
        subTaskList.map(subTask => {
            if (subTask.isDone === true) {
                count++
            }
        })
    
    }

    return count
}

export default countCompletedSubTask