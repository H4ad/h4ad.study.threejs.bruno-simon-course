import { lazy, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyles } from './styles/global';

const Home = lazy(() => import('./pages/home'));
const Lesson03 = lazy(() => import('./pages/03_basic_scene'));
const Lesson05 = lazy(() => import('./pages/05_transform_objects'));
const Lesson06 = lazy(() => import('./pages/06_animations'));

function App(): ReactElement {
  return (
    <>
      <GlobalStyles/>
      <Suspense fallback={ <></> }>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="lessons/03" element={ <Lesson03/> }/>
          <Route path="lessons/05" element={ <Lesson05/> }/>
          <Route path="lessons/06" element={ <Lesson06/> }/>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
