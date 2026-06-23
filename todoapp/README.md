# Todo List Application

A modern, feature-rich to-do list application with local storage functionality. Built with React and React Native, this app allows you to manage your tasks efficiently.

## Features

- ✅ Create, read, update, and delete tasks
- 💾 Local storage persistence
- 🏷️ Categorize tasks with tags
- 🎯 Priority levels (High, Medium, Low)
- 📅 Due date management
- ✨ Mark tasks as complete
- 🔍 Search and filter tasks
- 📊 Task statistics and analytics
- 🎨 Clean, intuitive UI
- ⚡ Real-time updates

## Project Structure

```
todoapp/
├── src/
│   ├── components/
│   │   ├── TaskItem.js
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   ├── CategoryFilter.js
│   │   └── TaskStats.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── TaskDetailScreen.js
│   │   ├── CreateTaskScreen.js
│   │   └── SettingsScreen.js
│   ├── services/
│   │   ├── storageService.js
│   │   └── taskService.js
│   ├── store/
│   │   ├── index.js
│   │   └── taskSlice.js
│   ├── styles/
│   │   └── theme.js
│   └── App.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Installation

### For React Web App:

```bash
cd todoapp
npm install
npm start
```

### For React Native:

```bash
cd todoapp
npm install
npm start
# Then choose: a for Android, i for iOS
```

## Technologies Used

- **React / React Native** - UI framework
- **Redux Toolkit** - State management
- **AsyncStorage / LocalStorage** - Persistent data storage
- **React Navigation** - Navigation (React Native)
- **Axios** - API calls (optional)
- **React Router** - Routing (Web version)

## Usage

### Creating a Task

1. Click the "Add Task" button
2. Enter task title and description
3. Set priority level (High, Medium, Low)
4. Add categories/tags
5. Set due date (optional)
6. Click "Save Task"

### Managing Tasks

- **Complete Task**: Click the checkbox next to the task
- **Edit Task**: Click the edit icon
- **Delete Task**: Click the trash icon
- **Filter Tasks**: Use category filters
- **Search Tasks**: Use the search bar

### Data Persistence

All tasks are automatically saved to local storage. Your data persists even after closing the app.

## API Reference

### Task Object Structure

```javascript
{
  id: string,
  title: string,
  description: string,
  completed: boolean,
  priority: 'high' | 'medium' | 'low',
  dueDate: string (ISO format),
  categories: string[],
  createdAt: string (ISO format),
  updatedAt: string (ISO format)
}
```

## Local Storage Keys

- `todos_list` - Array of all tasks
- `todos_settings` - User preferences
- `todos_categories` - Available categories

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
