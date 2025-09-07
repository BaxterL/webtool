// src/App.jsx
// 从 react-router-dom 中导入所需组件
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// 导入你的页面组件
import HomePage from './pages/home';
import NcmPage from './pages/ncm';
import NotFoundPage from './pages/404'
import './App.css';

function App() {
  return (
    // 使用 BrowserRouter 包裹整个应用，使其具备路由能力
    <BrowserRouter>
      <div className="App">
        {/* 创建导航栏 */}
        <nav className="app-nav">
          {/* Link 组件用于导航，不会刷新页面 */}
          <Link to="/" className="linkbox">主页</Link>
          <Link to="/ncm-to-mp3" className="linkbox">NCM转换MP3</Link>
        </nav>

        {/* Routes 和 Route 组件是路由的核心 */}
        {/* Routes 是容器，Route 是具体的路由规则 */}
        <Routes>
          {/* path 指定路径，element 指定要渲染的组件 */}
          {/* 当路径是 '/' 时，渲染 HomePage 组件 */}
          <Route path="/" element={<HomePage />} />
          {/* 当路径是 '/text-tool' 时，渲染 TextToolPage 组件 */}
          <Route path="/ncm-to-mp3" element={<NcmPage />} />
          {/* 可以添加一个兜底路由，匹配所有未定义的路径，常用于显示404页面 */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;