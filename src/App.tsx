import { AppRouting } from './app-routing';
import { KeptoProvider } from './components/keptoContext/keptoContex';
import Zepto from './components/zepto';

function App() {
  return (
    <>
      <KeptoProvider>
          <AppRouting />
      </KeptoProvider>
    </>
  );
}

export default App;
