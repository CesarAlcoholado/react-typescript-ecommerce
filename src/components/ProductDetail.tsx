import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: number;
  images: string[]
}

export interface Root {
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export const ProductDetail: React.FC<Product> = ({name, price, description, images, rating}) => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>()

  useEffect(() => {
    const getProduct = async () => {
      try {
        if(id) {
         const response: Root = await axios.get(`https://dummyjson.com/products/${id}`)
         console.log(response.data)
         setProduct(response.data)
        }
        
      } catch (error) {
        console.error(error)
      }
    }
    getProduct()
  }, [id])

  if(!product) return <h1>loading...</h1>
  

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-[50%] h-auto mb-5"
      />
      <h1 className="text-xl mb-4 font-bold">{product.title}</h1>
      <p className='mb-4 text-gray-700 w-[70%]'>{product.description}</p>
      <div className="flex">
        <p>{product.price}</p>
        <p className="ml-10">Rating: {product.rating}</p>
      </div>
    </div>
  );
}
