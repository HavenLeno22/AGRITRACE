fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

const cors = require('cors');
app.use(cors());
