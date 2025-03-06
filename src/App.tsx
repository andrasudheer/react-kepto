import { KeptoProvider } from './components/keptoContext/keptoContex';
import Zepto from './components/zepto';

function App() {
  return (
    <>
      <KeptoProvider>
        <Zepto />
      </KeptoProvider>
    </>
  );
}

export default App;
