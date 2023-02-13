import { useEffect, useState } from 'react';
import axios from 'axios';
import Test from './Test';

function App() {
  const [saramList, setSaramList] = useState([]);
  useEffect(() => {
    // axios 모듈을 활용한 Ajax 처리
    axios.get('http://localhost:5000/car').then((response) => {
      setSaramList(response.data);
    });
  }, []);

  return (
    <div>
      <h1>길동이의 홈페이지</h1>
      <Test />
      <ul>
        {saramList.map((saram) => {
          return (
            <li key={saram.no}>
              {saram.name}, {saram.company}, {saram.year}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
