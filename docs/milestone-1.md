Team name: heavy weather
Application name: Allendar

Team Overview:
Duc Nguyen - CodeArtificial

## Application Idea 
### (brief paragraph or two describing your application and the data it works with):
Allendar is a calendar web app that allows you to plan and organize your day. The **task** that you plan comes in a shape of a **task block**. A task block is a dynamic entity that can be created, manuevered, and modified on the app. The app employs the planning procedure **block scheduling** which required the task block to have special properties (listed above. Accompanied the task block are sections of notes, subtasks, reminders, priority ratings, tags, and duration of the task. An additional section of the app is a **journal section** that allows the users to "rate" theirs day. The calendar comes in a variety of different view: kanban, dayily, monthly and yearly.

## Functionality 
### (brief paragraph or two explaining the functionality provided by your application, how it is used, and how it interacts with the data it maintains):
Upon visiting Allendar, the user will be greeted with:
- A navigation and utitlies bar at the top.
- A mini calendar (top left) and tasks manager (bottom left) on the left
- A calendar panel at the center.
- A **staging panel** on the right.

1. Task Creation

In the navigation and utilities bar, there will be a "+" icon. Clicking the icon will open a dropdown menu with a few options and one of them is the "create tasks". Selecting "create a task" will open panel with multiple text fields for the users to enter. These fields are details that comes with the task and have labels on top of the fields like notes, subtasks, priority ratings, etc. When the users are satisfied with the contents they entered, the task will be minimized as a block and appeared in a list panel (staging panel) on the left.

2. Staging and unstaging a task

Similiar to staging files in a commit, tasks that are yet to be placed on the calendar are **staged**. In other words, the staging panel is a placeholder for all the tasks that the user has not placed on the calendar panel. Each task have different height and colors based on their duration and priority ratings. The user can drag the task from the staging panel and onto the calendar panel to see how much time the task takes up on the desired day, week, month or year. 

3. Calendar
 
The calendar panel is at the center of the website since it is the most important are the user need to focus on. The calendar panel comes in with different view mode:

- Kanban: Column-oriented - each column comes with a heading (user inputted) and the rest of the columns are space for tasks for to be dragged on. 

 
 
 The user can drag these tasks blocks from the staging panel and onto the calendar panel to plan and organize their schedules. These task blocks can be move to any time-slots on the calendar panel. The same process of block creation and placement on the calendar can be repeated for many blocks. When the user want to see the description of the block again, they can clicked on the block and a "block panel" will be opened to see the full details of the task. This will be the implementation of block scheduling. Another option after clicking the "+" icon is to "rate the day". The rate a day panel will allow the user to rate their day in the selected day. There will be a rating fields where the users can rate their day and also a journaling section. Upon finished, the panel will be minimized and attached to that day. The user can revisit their journal by clicking on a book icon attached to that date. 
