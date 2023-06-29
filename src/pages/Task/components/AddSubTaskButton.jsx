import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useSubTaskStore } from "../store/subTaskStore"
import { useTaskStore } from "../../Board/store/taskStore"

export default function AddSubTaskButton({taskId}) {
    const addSubTask = useSubTaskStore(state=>state.createSubTasks)
    const addSubTaskToTask = useTaskStore(state=>state.addSubTask)
    function createSubTask(){
        const id = crypto.randomUUID()
        addSubTask(id,"undefined")
        addSubTaskToTask(taskId,id)
    }
  return (
    <Button onClick={createSubTask} icon={<PlusOutlined />}>Add</Button>
  )
}