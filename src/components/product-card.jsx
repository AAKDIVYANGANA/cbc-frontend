export default function ProductCard(props){

  return (
    <div className="product-card">
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <p>Product price: {props.price}</p>
        <button>Add to cart</button>
    </div>
  )
}