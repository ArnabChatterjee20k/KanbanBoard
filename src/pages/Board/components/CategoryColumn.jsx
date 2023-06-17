import { Draggable } from "react-beautiful-dnd";
import { List } from "antd";
import StrictModeDroppable from "./StrictModeDroppable";

export default function CategoryColumn({ id }) {
  const data = ["todo", "prac", "api", "dsa"];

  return (
    <Draggable draggableId={"col-" + id} index={id}>
      {(provided, snapshot) => {
        return (
          <div
            className="bg-cyan-300"
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <h1 className="text-2xl">Category Title</h1>

            <StrictModeDroppable droppableId={"col-" + id} type="COLUMN">
              {(provided, snpashot) => {
                return (
                  <div
                    className="bg-red-400"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <List>
                      {data.map((e, i) => (
                        <ListItemDraggable index={i} key={i} item={e} id={id} />
                      ))}
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
    <Draggable draggableId={"item-" + id + index} key={index} index={index}>

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
