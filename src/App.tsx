import { lazy, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyles } from './styles/global';

const Home = lazy(() => import('./pages/home'));
const Lesson03 = lazy(() => import('./pages/03_basic_scene'));

function App(): ReactElement {
  return (
    <>
      <GlobalStyles/>
      <Suspense fallback={ <></> }>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="lessons/03" element={ <Lesson03/> }/>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
