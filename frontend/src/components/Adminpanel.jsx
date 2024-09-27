import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Create quizzes and manage users here.</p>
    </div>
  );
};

export default AdminPanel;
