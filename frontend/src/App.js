
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

        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product_info">
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>

                <p><strong>${product.price}</strong></p></div>
              <button>Add to cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
