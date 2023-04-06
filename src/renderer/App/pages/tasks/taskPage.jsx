import React from 'react'
import TaskComp from '../../components/TaskComp/taskComp'
import { AnimatePresence, motion, useCycle } from "framer-motion"


import addTaskIcon from '../../images/addTasksIcon.png'
import changeDelaysIcon from '../../images/changeDelaysIcon.png'
import searchTasksIcon from '../../images/searchTaskIcon.png'


const taskPage = ({ startTasks, stopTasks, taskGroupID, tasks, taskGroupIndex }) => {

    const [isVisible, onCycle] = useCycle(true, false);

    return (
        <AnimatePresence exitBeforeEnter>
            {isVisible && (
                <motion.div
                    key={taskGroupID}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className='tasks'>
                        <img src={addTaskIcon} alt="" className='task-icons' />
                        <img src={changeDelaysIcon} alt="" className='task-icons' />
                        <img src={searchTasksIcon} alt="" className='task-icons' />
                        <div className='taskBar-btns'>
                            <button className='taskbarStart-btn' onClick={() => startTasks(taskGroupID)}>Start</button>
                            <button className='taskbarStop-btn' onClick={() => stopTasks(taskGroupID)}>Stop</button>
                            <button className='taskbarEdit-btn'>Edit</button>
                            <button className='taskbarDelete-btn'>Delete</button>
                        </div>

                        <div className='task-bar'>
                            <h1 className='store-header'>Store</h1>
                            <h1 className='product-header'>Product</h1>
                            <h1 className='profile-header'>Profile</h1>
                            <h1 className='size-header'>Size</h1>
                            <h1 className='proxyheader'>Proxy</h1>
                            <h1 className='mode-header'>Mode</h1>
                            <h1 className='status-header'>Status</h1>
                            <h1 className='actions-header'>Actions</h1>
                        </div>
                        <div className='tasks-list'>
                            {tasks.map(task => {
                                return (
                                    <TaskComp taskID={task.taskID} key={task.taskID} store={task.store} profile={task.profile} sizes={task.sizes} proxy={task.proxy} mode={task.mode} status={task.status} sku={task.sku} GroupID={taskGroupIndex}></TaskComp>
                                )
                            })}

                        </div>
                    </div>
                </motion.div>

            )}
        </AnimatePresence>
    )
}

export default taskPage