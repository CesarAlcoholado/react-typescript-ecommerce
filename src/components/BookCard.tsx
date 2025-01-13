import { Link } from "react-router-dom"

interface BookCardProps {
  id: string;
  title: string;
  price: number;
  image: string
}


export const BookCard: React.FC<BookCardProps>  = ({id, title, price, image}) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
      <img src={image} alt={title} className="w-full h-32 object-cover mb-2"/>
      <h2>{title}</h2>
      <p>{price}</p>
      </Link>
    </div>
  )
}
