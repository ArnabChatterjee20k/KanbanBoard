import Card from "antd/es/card/Card";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function TaskCard({ item, index, id }) {
  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided, snapshot) => (
        <Card
          className="m-2 bg-gray-50"
          ref={provided.innerRef}
          bodyStyle={{ paddingBlock: "1rem", paddingInline: "2rem" }}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Link to={`/tasks/${id}`}>
            <div className="flex gap-4 w-full justify-between">
              <p className="text-base font-semibold">{item}</p>
              <FormOutlined />
            </div>
          </Link>
        </Card>
      )}
    </Draggable>
  );
}
