import './App.css';
import Calcular from './componentes/Calcular';

function App() {
  return (
    <>
    <div className="App">
      <h1>Conversor divisas con <a href="https://www.frankfurter.app/">FrankFurter API</a>.</h1>
      <Calcular />
    </div>
    <h2 className='creador'>Creado y codificado por <a href="https://oscaromargn.github.io/portafolio">Oscar Garcia</a>.</h2>
    </>
  );
}

export default App;
