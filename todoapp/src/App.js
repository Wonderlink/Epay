import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import { loadTasks } from './store/taskSlice';
import './styles/App.css';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load tasks from local storage on app mount
    dispatch(loadTasks());
  }, [dispatch]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 Todo List</h1>
        <p>Organize your tasks efficiently</p>
      </header>
      <main className="app-main">
        <HomeScreen />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Todo List App. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
