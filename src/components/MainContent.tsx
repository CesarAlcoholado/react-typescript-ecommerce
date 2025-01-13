import { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilters"
import { Tally3 } from "lucide-react";
import axios from "axios";
import { BookCard } from "./BookCard";

const MainContent = () => {

  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter()
  
  const [products, setProducts] = useState<Root>([]);
  const [filter, setFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(true)
  const itemsPerPage = 12

  type Root = Root2[];

  interface Root2 {
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

  interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }

  interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }

  interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  }

  const getFilteredProducts = () => {
    let filteredProducts = products;
    
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory)
    }
    
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product)=> product.price >= minPrice)
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product)=> product.price <= maxPrice)
    }

    if (searchQuery !== undefined) {
      filteredProducts = filteredProducts.filter((product)=> product.title.toLocaleLowerCase().includes(searchQuery.toLowerCase()))
    }
    
    switch (filter) {
      case 'expensive': 
        return filteredProducts.sort((a,b)=> b.price - a.price);
      case 'cheap':
        return filteredProducts.sort((a, b) => a.price - b.price);
      case 'popular':
         return filteredProducts.sort((a, b) => a.rating - b.rating);
      default: return filteredProducts
    }
    
  }

  const filteredProducts = getFilteredProducts()

  console.log(filteredProducts);

  const totalProducts = 100
  const totalPages = Math.ceil(totalProducts / itemsPerPage)

  const handleCurrentPageChange = (page: number):void => {
    if (page > 0 && page <= totalPages)
    setCurrentPage(page)
  }

  const getPaginationButtons = ()=> {

    const buttons: number[] = []
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2)

    if(currentPage - 2 < 1){
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }
    if(currentPage + 2 > totalPages){
      startPage = Math.min(totalPages, startPage - (2 - totalPages - currentPage));
    }

    for(let page = startPage; page <= endPage; page++) {
      buttons.push(page)
    }

    return buttons
  }
  


  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

    if(keyword){
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    const getData = async () => {
      try {
        const response: Root = await(await axios.get(url)).data.products;
        setProducts(response)
      } catch (error) {
        console.error(error)
      }
      
    }

    getData()
  }, [currentPage, keyword])
  

  return <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
    <div className="mb-5">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="relative mb-5 mt-5">
          <button className="border px-4 py-2 rounded-full flex items-center">
            <Tally3 className="mr-2"/>
            {filter === 'all' ? 'Filter' : filter.charAt(0).toLowerCase() + filter.slice(1)}
          </button>
          {dropdownOpen && (
            <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
              <button onClick={()=> setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">Cheap</button>
              <button onClick={()=> setFilter('expensive')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">Expensive</button>
              <button onClick={()=> setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">Popular</button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {products.map((product, index)=> <BookCard key={index} id={product.id} title={product.title} image={product.thumbnail} price={product.price}/>)}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
        <button className="border px-4 py-2 mx-2 rounded-full" onClick={()=> handleCurrentPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <div className="flex flex-wrap justify-center">
          {getPaginationButtons().map((page) => 
            (<button key={page} onClick={()=> handleCurrentPageChange(page)} className={`border px-4 py-2 mx-1 rounded-full ${page === currentPage ? "bg-black text-white" : ""}`}>
              {page}
            </button>)
          )}
        </div>
          <button className="border px-4 py-2 mx-2 rounded-full" onClick={()=> handleCurrentPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    {/* previous page
    next page */}
    </div>

    
    </section>;
}

export default MainContent