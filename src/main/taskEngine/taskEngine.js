import fs from 'fs'
import FootsiteTask from '../sites/footsites'
import YeezySupplyTask from '../sites/yeezysupply'


class TaskEngine {
  constructor(foldername) {
    this.folderName = foldername
    this.taskData = JSON.parse(
      fs.readFileSync(`${this.folderName}/tasks.json`, "utf8")
    );
  }


  loadTasks() {
    if (this.taskData.length === 0) return console.log("No task loaded")

    let tasksLoaded = []

    // loop through task groups and return a array of all tasks
    this.taskData.map((taskGroups) => {
      taskGroups.tasks.map((task => {
        if (task.store === "footlocker") {
          let tasks = new FootsiteTask(
            taskGroups.GroupID,
            task.taskID,
            task.profile,
            task.proxy,
            task.sizes,
            task.store,
            task.sku
          );
          tasksLoaded.push(tasks);
        }

        if (task.store === "yeezysupply") {
          let tasks = new YeezySupplyTask(
            taskGroups.GroupID,
            task.taskID,
            task.profile,
            task.proxy,
            task.sizes,
            task.store,
            task.sku
          );
          tasksLoaded.push(tasks)
        }
      }))

    })
    return tasksLoaded

  }

}

export default TaskEngine