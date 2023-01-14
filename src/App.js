
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

import Navbar from './Components/navbar';
import MathCalculator from './Components/mathCalc';
import { Route, Routes } from 'react-router-dom';
import StartPage from './Components/startPage';

function App() {

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ height: 68, background: '#ECEBED' }}>
        <Navbar />
      </Header>
      <Content style={{ padding: '0 30px' }}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          {
            components.map((com, key) => {
              return (
                <Route
                  exact
                  key={key}
                  path={com.route}
                  element={com.component}
                />
              )
            })
          }
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;

const components = [
  {
    route: "/maths",
    component: <MathCalculator />
  }
]
