import React, { useState, useEffect, useContext } from 'react'
import { ipcRenderer } from 'electron'
import Winbuttons from '../../components/winButtons/winbuttons';
import Navbar from '../../components/navbar/nav'
import Clock from '../../components/clock/clock'
import TaskGroup from '../../components/taskGroup/taskGroup'
import { v4 as uuidv4 } from 'uuid';
import GlobalsContext from '../../services/GlobalsContext';
import TaskGroupModal from '../../components/taskGroupModal';
import { AnimatePresence, motion, useCycle } from "framer-motion"
import TaskPage from './taskPage';


import './tasks.css'
import addTaskGroupIcon from '../../images/addTaskGroup.png'


const tasks = () => {

    const [isVisible, onCycle] = useCycle(true, false);
    const { taskGroups, setTaskGroups } = useContext(GlobalsContext)
    const [taskGroupID, setTaskGroupID] = useState()
    const [taskGroupIndex, setTaskGroupIndex] = useState();
    const [tasks, setTasks] = useState([])
    const [showTask, setShowTask] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [isEditting, setIsEditting] = useState(false);
    const [editID, setEditID] = useState('');


    useEffect(() => {
        ipcRenderer.on("updateTasks-status", (event, data) => {
            setTasks((prevTasks) => {
                return prevTasks.map((task) => {
                    if (data.id === task.taskID) {
                        task.status = data.status
                    }
                    return task
                })
            })

        })
        return () => {
            ipcRenderer.removeAllListeners("updateTasks-status")
        }
    }, [])




    const startTasks = (id) => {
        ipcRenderer.send("startAll", id)

    }

    const stopTasks = (id) => {
        ipcRenderer.send("stopAll", id);

    }
    const selectTaskGroup = (index) => {
        setTasks(taskGroups[index].tasks)
        setTaskGroupID(taskGroups[index].GroupID)
        setShowTask(true)
        setTaskGroupIndex(index)

    }
    const createTaskGroup = () => {
        if (groupName === "") {
        }
        else {
            setModalOpen(false)
            const newTaskGroupObj = {
                name: groupName,
                GroupID: uuidv4(),
                tasks: [],
                status: {
                    carted: 0,
                    checkouts: 0,
                    declines: 0
                }
            }
            const newTaskGrouplist = [...taskGroups, newTaskGroupObj]
            ipcRenderer.send('saveTaskGroups', newTaskGrouplist)
            setTaskGroups(newTaskGrouplist)
            setGroupName('')

        }
    }
    const editTaskGroupAction = (id, name) => {
        setEditID(id)
        setGroupName(name)
        setModalOpen(true)
        setIsEditting(true)
    }
    const editTaskGroup = () => {
        if (groupName === '') return

        const newTaskGrouplist = [...taskGroups];
        newTaskGrouplist[editID].name = groupName

        ipcRenderer.send('saveTaskGroups', newTaskGrouplist)
        setTaskGroups(newTaskGrouplist)
        setModalOpen(false)
        setIsEditting(false)
        setGroupName('')
    }
    const deleteTaskGroup = (id) => {

        if (taskGroupID === id) {
            setShowTask(false)
        }
        const newTaskGroupList = taskGroups.filter((taskgroup, index) => taskgroup.GroupID !== id);
        setTaskGroups(newTaskGroupList)
        ipcRenderer.send('saveTaskGroups', newTaskGroupList)
    }
    const duplicateTaskGroup = (id) => {
        const dupGroup = taskGroups[id]

        const newTaskGroupList = [...taskGroups,
        {
            "name": `${dupGroup.name} Copy`,
            "GroupID": uuidv4(),
            "tasks": dupGroup.tasks,
            "status": {
                "carted": 0,
                "checkouts": 0,
                "declines": 0
            }
        }]
        setTaskGroups(newTaskGroupList)
        ipcRenderer.send('saveTaskGroups', newTaskGroupList)
    }
    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <Winbuttons />
                    <Navbar />
                    <Clock />
                    <motion.div
                        key="tasks-page"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='taskGroup-div'>
                            <div className='group-Header'>
                                <h1 className='taskgroup-header'>Task Groups</h1>  <img src={addTaskGroupIcon} alt="" onClick={() => setModalOpen(true)} />
                            </div>


                            <AnimatePresence>
                                {taskGroups.map((taskGroup, index) => {
                                    return (
                                        <motion.div
                                            key={taskGroup.GroupID}
                                            exit={{ opacity: 0 }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >

                                            <TaskGroup
                                                name={taskGroup.name}
                                                tasks={taskGroup.tasks.length}
                                                index={index}
                                                id={taskGroup.GroupID}
                                                selectTaskGroup={selectTaskGroup}
                                                deleteTaskGroup={deleteTaskGroup}
                                                status={taskGroup.status}
                                                selectedTaskGroup={taskGroupID}
                                                editTaskGroup={editTaskGroup}
                                                editTaskGroupAction={editTaskGroupAction}
                                                duplicateTaskGroup={duplicateTaskGroup} />
                                        </motion.div>

                                    )
                                })}
                            </AnimatePresence>

                        </div>

                        <div className='tasks-div'>
                            {showTask ? <h1 className='tasks-header'>Tasks</h1> : null}
                            {showTask ? <TaskPage startTasks={startTasks} stopTasks={stopTasks} taskGroupID={taskGroupID} tasks={tasks} taskGroupIndex={taskGroupIndex} /> : null}
                        </div>

                        <TaskGroupModal open={modalOpen} setOpen={setModalOpen} groupName={groupName} setGroupName={setGroupName} isEditting={isEditting} addTaskGroup={createTaskGroup} editTaskGroup={editTaskGroup} />

                    </motion.div>
                </>


            )
            }
        </AnimatePresence >

    )
}

export default tasks
