import { lazy, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyles } from './styles/global';

const Home = lazy(() => import('./pages/home'));
const Lesson03 = lazy(() => import('./pages/03_basic_scene'));
const Lesson05 = lazy(() => import('./pages/05_transform_objects'));
const Lesson06 = lazy(() => import('./pages/06_animations'));
const Lesson07 = lazy(() => import('./pages/07_cameras'));
const Lesson08 = lazy(() => import('./pages/08_fullscreen_and_resizing'));

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
          <Route path="lessons/07" element={ <Lesson07/> }/>
          <Route path="lessons/08" element={ <Lesson08/> }/>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
