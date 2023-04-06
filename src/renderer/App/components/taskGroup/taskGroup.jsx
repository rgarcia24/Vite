import React from 'react'

import './taskGroup.css'
import cartedGroupIcon from '../../images/cartedGroup.png'
import checkoutsGroupIcon from '../../images/checkoutsGroup.png'
import declinesGroupIcon from '../../images/declinesGroup.png'
import Menu from "../Menu"
import { Group } from "@mantine/core"



const taskGroup = ({ name, tasks, index, id, selectTaskGroup, deleteTaskGroup, status, selectedTaskGroup, editTaskGroup, editTaskGroupAction, duplicateTaskGroup }) => {


    return (
   
                    <div  className={`taskGroupComp-div  ${selectedTaskGroup === id ? "taskGroupSelected" : ""}`} >
                        <Group position="apart" mt="md">
                            <p className='taskGroup-name' onClick={() => selectTaskGroup(index)} >{name}</p>
                            <Menu deleteTaskGroup={deleteTaskGroup}
                                id={id}
                                index={index}
                                editTaskGroup={editTaskGroup}
                                name={name}
                                editTaskGroupAction={editTaskGroupAction}
                                duplicateTaskGroup={duplicateTaskGroup}
                            />
                        </Group>

                        <p className='task-Amount'>{tasks} Tasks</p>
                        <div className='carted-div'>
                            <img src={cartedGroupIcon} alt="" className='group-icons' /><p>{status.carted}</p>
                        </div>
                        <div className='checkouts-div'>
                            <img src={checkoutsGroupIcon} alt="" className='group-icons' /><p>{status.checkouts}</p>
                        </div>
                        <div className='declines-div'>
                            <img src={declinesGroupIcon} alt="" className='group-icons' /><p>{status.declines}</p>
                        </div>
                    </div>
              
          

        
    )
}

export default taskGroup
