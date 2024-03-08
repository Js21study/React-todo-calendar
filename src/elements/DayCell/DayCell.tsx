import React, { FC, useState } from 'react';
import { TaskProps } from '../../components/Calendar/Calendar';
import { Task } from '../Task/Task';
import styles from './DayCell.module.css';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { DayCellStyles } from './DayCellStyles';
import { v4 as uuidv4 } from 'uuid';
import HolidaysBlock from '../HolidaysBlock/HolidaysBlock';

interface DayCallBlockProps {
  isCurrentMonth: boolean;
  tasks: (TaskProps | undefined)[];
  setTasks: React.Dispatch<React.SetStateAction<(TaskProps | undefined)[]>>;
  day: Date;
}
export const DayCell: FC<DayCallBlockProps> = ({ isCurrentMonth, tasks, setTasks, day }) => {
  const [isEdit, setIsEdit] = useState(false);
  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const existingTask = tasks.find((task) => task?.id.toString() === taskId);
    const droppedDiv = e.nativeEvent.target as HTMLDivElement;
    if (droppedDiv) {
      const id = droppedDiv.id;
      const dateObject = new Date(Date.parse(id));
      if (existingTask) {
        const updatedTasks = tasks.map((t) => {
          if (!!t) {
            if (existingTask.id === t.id) {
              return {
                ...existingTask,
                day: dateObject.getDate(),
                month: dateObject.getMonth(),
                year: dateObject.getFullYear(),
              };
            }
          }
          return t;
        });
        if (updatedTasks) {
          setTasks(updatedTasks);
        }
      }
    } else console.log('Dropped element is null or undefined.');
  };

  const clickDayCell = (day: Date) => {
    setIsEdit(!isEdit);
    const existingTask = tasks.find(
      (task) =>
        task?.day === day.getDate() &&
        task?.month === day.getMonth() &&
        task?.year === day.getFullYear(),
    );
    if (!existingTask) {
      const newTaskId = uuidv4();
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: newTaskId,
          name: 'New Task',
          day: day.getDate(),
          month: day.getMonth(),
          year: day.getFullYear(),
          label: ['home'],
        },
      ]);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };
  const dragStart = (e: React.DragEvent<HTMLDivElement>, task: TaskProps) => {
    if (task) e.dataTransfer.setData('text/plain', task?.id);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div onDrop={drop} onDragOver={allowDrop}>
        <DayCellStyles
          isCurrentMonth={isCurrentMonth}
          isDate={true}
          onClick={() => clickDayCell(day)}
          id={day.toString()}
        >
          <HolidaysBlock date={day.toISOString().substring(0, 10)} />
          <p> {day.getDate()}</p>

          {tasks?.map((task, i) =>
            task?.day === day.getDate() &&
            task?.month === day.getMonth() &&
            task.year === day.getFullYear() ? (
              <Droppable droppableId={task.id} key={task.id}>
                {(provided) => (
                  <div
                    className={styles.wrapper}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <span className={styles.text}> 1 card</span>
                    <Draggable key={task.id} draggableId={task.id.toString()} index={i}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          draggable={true}
                          onDragStart={(e) => dragStart(e, task)}
                        >
                          <Task
                            tasks={tasks}
                            task={task}
                            isEdit={isEdit}
                            setTasks={setTasks}
                            setIsEdit={setIsEdit}
                          />
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) : (
              ''
            ),
          )}
        </DayCellStyles>
      </div>
    </DragDropContext>
  );
};
