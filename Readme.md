# Context Tree of Beautiful DnD

* DragDropContent wraps Droppable or multiple Droppable
* Each Droppable wraps Draggable

* Droppable expects your children to be a function

# Disabling droppable
* using Type prop
* using isdroppabledisabled prop

# What if we want Droppable inside droppable?
If we are going to do this incase we want a kanban app where all the things will be draggable then we will have multiple droppables. To distinguish between them we need to use **type in Droppable**.

<Droppable type="BOARD">
<Droppable type="COLUMN">

The type property in react-beautiful-dnd is used to distinguish between different types of droppable areas or draggable items. It helps in defining the rules and behavior specific to each type.

In the code example provided, type="COLUMN" is used to define the type of the droppable area representing the columns on the board. By setting the type as "COLUMN", you can enforce rules and constraints related to column reordering specifically.
