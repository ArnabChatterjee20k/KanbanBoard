import { Draggable } from "react-beautiful-dnd";
import { List } from "antd";
import StrictModeDroppable from "./StrictModeDroppable";
import sampleData from "../../../sampleData";
import { useColumnStore } from "../store/columnStore";

export default function CategoryColumn({ id, index }) {
  const data = ["todo", "prac", "api", "dsa"];
  const { columns } = useColumnStore((state) => ({
    columns: state.columns,
  }));
  const currentColumn = columns[id];
  const orderedTasks = columns[id].taskIds;
  console.log({ orderedTasks });
  const { tasks } = sampleData;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className=" min-w-[200px]"
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <h1 className="text-2xl">{currentColumn.title}</h1>

            <StrictModeDroppable droppableId={id} type="TASK-DROPPABLE">
              {(provided, snpashot) => {
                return (
                  <div
                    // className="bg-red-400"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <List>
                      {orderedTasks.length
                        ? orderedTasks.map((taskId, i) => (
                            <ListItemDraggable
                              index={i}
                              key={taskId}
                              item={tasks[taskId].content}
                              id={taskId}
                            />
                          ))
                        : null}
                    </List>
                    {provided.placeholder}
                  </div>
                );
              }}
            </StrictModeDroppable>
          </div>
        );
      }}
    </Draggable>
  );
}

const ListItemDraggable = ({ item, index, id }) => {
  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided, snapshot) => (
        <List.Item
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {item}
        </List.Item>
      )}
    </Draggable>
  );
};
