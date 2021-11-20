import { ReactElement } from 'react';
import * as S from './styles';

const lessons = [
  { link: 'lessons/03', name: 'Aula 03 - Cena Básica' },
  { link: 'lessons/05', name: 'Aula 03 - Transformando Objetos' },
];

function Home(): ReactElement {
  return (
    <S.Container>
      <S.Title>Bem-vindo aos meus estudos de ThreeJS</S.Title>

      <ul>
        <li>
          { lessons.map(lesson => (
            <S.Link key={lesson.link} to={ lesson.link }>{ lesson.name }</S.Link>
          )) }
        </li>
      </ul>
    </S.Container>
  );
}

export default Home;
