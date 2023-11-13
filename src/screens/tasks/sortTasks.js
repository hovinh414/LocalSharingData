export default sortTasks = (tasks) => {
  const copy_tasks = [...tasks]

  copy_tasks.sort((task1, task2) => {
    if (task1.completed && !task2.completed) {
      return 1;
    } else if (!task1.completed && task2.completed) {
      return -1;
    }

    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const priorityA = priorityOrder[task1.priority];
    const priorityB = priorityOrder[task2.priority];

    return priorityA - priorityB;
  })
  return copy_tasks
}