#! /usr/bin/env node

import inquirer from "inquirer";

import chalk from "chalk";

let todos: string[] = [];
let condition = true;

console.log(
  chalk.redBright.bold("\n \t 😊  Welcome to Kaxhif Todo-list Application 😊\n")
);

let main = async () => {
  while (condition) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        message: chalk.blue(
          "\n \tSelect an Option you want to Use or Work in your To-Do list:\n"
        ),
        type: "list",
        choices: [
          "Add Task",
          "Delete Task",
          "Update task",
          "View To-Do list",
          "Exit from your To-Do list",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "Delete Task") {
      await deleteTask();
    } else if (option.choice === "Update task") {
      await updateTask();
    } else if (option.choice === "View To-Do list") {
      viewTask();
    } else if (option.choice === "Exit from your To-Do list") {
      condition = false;
    }
  }
};
// function to add new task in the list

let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.green("Enter your new task:"),
    },
  ]);
  todos.push(newTask.task);
  console.log(
    chalk.magenta(
      `\n ${newTask.task}: task added succesfully in your To-Do list`
    )
  );
};
// function to view all todo list tasks
let viewTask = () => {
  console.log("\n Your To-Do List:\n");
  todos.forEach((task, index) => {
    console.log(chalk.greenBright(`${index + 1}: ${task}`));
  });
};
//function to delete a task from list

let deleteTask = async () => {
  viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.red(
        "Enter the 'index no.' of the task you want to delete:"
      ),
    },
  ]);
  let deletedTask = todos.splice(taskIndex.index - 1, 1);
  console.log(
    chalk.green(
      `${deletedTask} 👈  this task has been deleted successfully from your To-Do list [for check your list go to option: "view To-Do list"]`
    )
  );
};

//function to update our todo list tast

let updateTask = async () => {
  await viewTask();
  let updatetaskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.redBright(
        "Enter the 'index no' of the task you want to update :"
      ),
    },

    {
      name: "new_task",
      type: "input",
      message: chalk.green("Now Enter your new task name : "),
    },
  ]);

  todos[updatetaskIndex.index - 1] = updatetaskIndex.new_task;
  console.log(chalk.green(
    `Task at index no. ${
      updatetaskIndex.index - 1
    } updated successfully your To-Do list [for updated list check option: "view To-Do list"]`
  ));
};

main();
