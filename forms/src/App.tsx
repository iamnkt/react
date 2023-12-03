import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/Main/Main';
import { ReactHookForm } from './components/ReactHookForm/ReactHookForm';
import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm';
import Layout from './layout/layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/uncontrolledform" element={<UncontrolledForm />} />
          <Route path="/reacthookform" element={<ReactHookForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
