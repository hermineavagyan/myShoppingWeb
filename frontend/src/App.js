
import './App.css';
import data from './data';

function App() {
  return (
    <div>
      <header >
        <a href="/">myShoppingWeb</a>
      </header>
      <main>
        <h1> List Products</h1>
      </main>
      {data.products.map(product => (<div>
        <img src={product.image} alt={product.name} />
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>))}
    </div>
  );
}

export default App;
