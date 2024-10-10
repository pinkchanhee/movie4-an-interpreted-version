// React와 ReactDOM을 가져옵니다.
import React from 'react'; 
import ReactDOM from 'react-dom/client'; // ReactDOM을 가져옵니다.
// 라우팅을 위해 필요한 BrowserRouter를 가져옵니다.
import { BrowserRouter } from 'react-router-dom'; 
// Redux 상태 관리를 위한 Provider를 가져옵니다.
import { Provider } from 'react-redux'; 
// Redux 스토어를 가져옵니다.
import store from './store'; 
// 메인 App 컴포넌트를 가져옵니다.
import App from './App'; 
// 스타일 시트를 가져옵니다.
import './styles/styles.scss'; 

// React 18에서 제공하는 새로운 방법으로 루트 DOM 노드를 생성하여 React 애플리케이션을 렌더링합니다.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* React의 엄격 모드로 렌더링하여 개발 중 오류를 발견할 수 있게 합니다. */}
    <Provider store={store}> {/* Redux 스토어로 애플리케이션을 감쌉니다. */}
      <BrowserRouter> {/* 라우팅을 위한 BrowserRouter로 감쌉니다. */}
        <App /> {/* App 컴포넌트를 렌더링합니다. */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
