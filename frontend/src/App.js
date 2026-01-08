import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import Toasts from './Toast';

function App() {
  return (
    <div className="app-shell">
      <PipelineToolbar />
      <div className="content">
        <header className="app-header">
          <div className="app-header__title">Vector Pipeline Editor</div>
          <div className="app-header__actions">
            <div className="app-header__hint">Drag nodes to build a pipeline</div>
          </div>
        </header>
        <PipelineUI />
        <div style={{ padding: 12 }}>
          <SubmitButton />
        </div>
        <Toasts />
      </div>
    </div>
  );
}

export default App;
