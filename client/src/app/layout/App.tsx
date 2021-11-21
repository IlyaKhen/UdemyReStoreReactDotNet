import { useEffect, useState } from "react";
import { Product } from "../models/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
    .then(responce => responce.json())
    .then(data => setProducts(data))
  }, []) //effect callback and second param is dependency empty array (with dependency this method will be called only once)

  function addProduct() {
    setProducts(prevState => [...prevState, 
      { 
        id: prevState.length + 101,
        name: 'product' + (prevState.length + 1), 
        price: (prevState.length * 100) + 100,
        brand: 'some brand',
        description: 'some description',
        pictureUrl: 'http://pic'
      }]);
  }

  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map( product => (
          <li key={product.id}>{product.name} - {product.price}</li> 
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
