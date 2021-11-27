# Dicas para Performance

## Referências

- [Performance Pitfalls](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls)
- [Scaling Performance](https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance)

## Texturas

### Referências

- [Bruno Simon - Textures](https://threejs-journey.com/lessons/11)

Ao usar a propriedade `minFilter` com o valor de `NearestFilter`, você pode setar a propriedade `generateMinimaps` para `false`, isso faz com que o ThreeJS não gere imagens menores da textura para serem carregadas e mantém apenas a imagem original.

O `NearestFilter` em `minFilter` é mais performático do que os outros tipos de filtro.
