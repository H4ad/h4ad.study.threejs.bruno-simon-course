import { ReactElement } from 'react';
import * as S from './styles';

const lessons = [
  { link: 'lessons/03', name: 'Aula 03 - Cena Básica' },
  { link: 'lessons/05', name: 'Aula 05 - Transformando Objetos' },
  { link: 'lessons/06', name: 'Aula 06 - Animações' },
  { link: 'lessons/07', name: 'Aula 07 - Cameras' },
  { link: 'lessons/08', name: 'Aula 08 - FullScreen e Resizing' },
  { link: 'lessons/11', name: 'Aula 11 - Texturas' },
  { link: 'lessons/12', name: 'Aula 12 - Materiais' },
];

function Home(): ReactElement {
  return (
    <S.Container>
      <S.Title>Bem-vindo aos meus estudos de ThreeJS</S.Title>

      <ul>
        { lessons.map(lesson => (
          <S.ListItem key={ lesson.link }>
            <S.Link to={ lesson.link }>{ lesson.name }</S.Link>
          </S.ListItem>
        )) }
      </ul>
    </S.Container>
  );
}

export default Home;
