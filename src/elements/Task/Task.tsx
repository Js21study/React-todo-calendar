import React, { FC, useEffect, useState } from 'react';
import { TaskProps } from '../../components/Calendar/Calendar';
import CustomCheckbox from '../CustomCheckbox';
import styles from './Task.module.css';

interface DayProps {
  task: TaskProps | undefined;
  tasks: (TaskProps | undefined)[];
  isEdit: boolean;
  setTasks: React.Dispatch<React.SetStateAction<(TaskProps | undefined)[]>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Task: FC<DayProps> = ({ task, isEdit, tasks, setTasks }) => {
  const [value, setValue] = useState(task?.name);
  const [selectedAnswers, setSelectedAnswers] = useState(task?.label);

  useEffect(() => {
    if (!isEdit && value === '') setTasks([...tasks].filter((el) => el?.id !== task?.id));
  }, [tasks, isEdit, value]);

  const changeTask = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!!task) {
      const updatedTasks = tasks.map((t) => {
        setValue(e.target.value);
        if (!!t) {
          if (task.id === t.id) {
            return { ...task, name: e.target.value };
          }
        }
        return t;
      });
      setTasks(updatedTasks);
    }
  };
  const handleCheckboxChange = (answer: string) => {
    if (selectedAnswers?.includes(answer)) {
      setSelectedAnswers(selectedAnswers.filter((item) => item !== answer));
    } else {
      if (selectedAnswers) setSelectedAnswers([...selectedAnswers, answer]);
    }

    if (!!task) {
      const updatedTasks = tasks.map((t) => {
        if (!!t) {
          if (task.id === t.id && selectedAnswers) {
            return { ...task, label: selectedAnswers };
          }
        }
        return t;
      });
      if (updatedTasks) setTasks(updatedTasks);
    }
  };

  return (
    <div className={styles.task} onClick={(e) => e.stopPropagation()} id={task?.id.toString()}>
      <div className={styles.labels}>
        {selectedAnswers?.map((label) => (
          <div
            key={label}
            className={
              label === 'home'
                ? styles.homeLabel
                : label === 'education'
                ? styles.educationLabel
                : label === 'hobby'
                ? styles.hobbyLabel
                : ''
            }
          ></div>
        ))}
      </div>
      <textarea
        value={value}
        className={styles.taskName}
        disabled={!isEdit}
        onChange={changeTask}
      />
      {isEdit && (
        <div>
          <CustomCheckbox
            label="Hobby"
            checked={selectedAnswers?.includes('hobby')}
            onChange={() => handleCheckboxChange('hobby')}
            color="red"
          />
          <CustomCheckbox
            label="Education"
            checked={selectedAnswers?.includes('education')}
            onChange={() => handleCheckboxChange('education')}
            color="blue"
          />
          <CustomCheckbox
            label="Home"
            checked={selectedAnswers?.includes('home')}
            onChange={() => handleCheckboxChange('home')}
            color="yellowgreen"
          />
        </div>
      )}
    </div>
  );
};
