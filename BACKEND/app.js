import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/test')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Backend Response:</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default App;


useEffect(() => {
  fetch('http://localhost:5000/test')  // your backend route
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error(err));
}, []);
