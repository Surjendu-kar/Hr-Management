"use client";
import React, { useState, useEffect } from "react";
import { styled, Stack, Typography, Snackbar } from "@mui/material";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import AddTaskButton from "@/components/AddTask/AddTaskButton";
import TaskPopup from "@/components/ManageTask/TaskPopup";
import { useTaskForm } from "@/hooks/useTaskForm";
import loadingAnimation from "@/public/assets/loading.json";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import TaskList from "../ManageTask/TaskList";
import NoTaskAnimation from "../NoTaskAnimation/NoTaskAnimation";

const MainContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

const AddTaskButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  marginTop: "0.5rem",
});

const Heading = styled(Typography)({
  fontSize: "1.7rem",
  fontWeight: "bold",
});

interface TaskContentProps {
  initialTasks: Task[];
}

export function TaskContent({ initialTasks }: TaskContentProps): JSX.Element {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  const {
    tasks,
    taskName,
    setTaskName,
    description,
    setDescription,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    editingTask,
    isFormOpen,
    setIsFormOpen,
    snackbarOpen,
    snackbarMessage,
    deletingTasks,
    addingTasks,
    resetForm,
    handleAddOrUpdateTask,
    handleDeleteTask,
    handleEditTask,
    handleSnackbarClose,
  } = useTaskForm(initialTasks);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingAnimation animationData={loadingAnimation} />;
  }

  const now = dayjs();
  const isToday = pathname === "/today";

  const filteredTasks = tasks.filter((task) => {
    const taskDate = dayjs(task.dueDate);
    if (isToday) {
      return taskDate.isBefore(now, "day") || taskDate.isSame(now, "day");
    } else {
      return taskDate.isAfter(now, "day");
    }
  });

  const headingText = isToday ? "Today" : "Inbox";

  return (
    <MainContainer>
      <Heading>{headingText}</Heading>

      <TaskList
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        deletingTasks={deletingTasks}
        addingTasks={addingTasks}
      />

      <AddTaskButtonContainer>
        {!isFormOpen ? (
          <AddTaskButton setIsFormOpen={setIsFormOpen} />
        ) : (
          <TaskPopup
            onClose={() => setIsFormOpen(false)}
            taskName={taskName}
            setTaskName={setTaskName}
            description={description}
            setDescription={setDescription}
            priority={priority}
            setPriority={setPriority}
            dueDate={dueDate}
            setDueDate={setDueDate}
            handleAddOrUpdateTask={handleAddOrUpdateTask}
            resetForm={resetForm}
            isEditing={!!editingTask}
          />
        )}
      </AddTaskButtonContainer>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />

      {filteredTasks.length === 0 && !isFormOpen && <NoTaskAnimation />}
    </MainContainer>
  );
}
