import React, { useEffect, useState } from 'react'

const Task = () => {
    const [taskHistory, setTaskHistory] = useState()


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8081/task');
            const data = await res.json()
            console.log(data)
            setTaskHistory(data)

        }
        fetchData()
    }, [])



    return (
        <div>
            <h2>Task History</h2>
            {taskHistory ? (
                taskHistory.map((task) => {
                    return (
                        <div key={task.id} className='task-hist'>
                            <p>{task.id}</p>
                            <h2>Title: {task.title}</h2>
                            <h4>Description: {task.description}</h4>
                            <p>Created at: {new Date(task.created_at).toLocaleString('en-US', { timeZone: 'GMT' })}</p>
                        </div>
                    )
                })) :
                <h1>loading...</h1>
            }

        </div>
    )
}

export default Task
