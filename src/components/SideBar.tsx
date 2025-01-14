import { useEffect, useState } from "react"
import axios from 'axios'
import { useFilter } from "../hooks/useFilters";

interface Product {
  category: string
}

interface Data {
  products: Product[];
}

interface fetchResponse {
    data: Data
}

const SideBar = () => {

  const [categories, setCategories] = useState<string []>()
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ])

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined)
  }

  const handleRadioChangeCategories = (category:string): void => {
    setSelectedCategory(category)
  }

  const handleKeywordClick = (keyword:string): void=> {
    setKeyword(keyword)
  }

  const handleResetFilters = (): void => {
    setSearchQuery('')
    setSelectedCategory('')
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setKeyword('')
  }


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: fetchResponse = await axios.get(
          "https://dummyjson.com/products"
        );
        const uniqueCategories = Array.from(new Set(response.data.products.map((product) => product.category)))
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error fecthing caegories ', error)
      }
    }

    fetchCategories()
  }, [])
  

  return (
    <div className="w-64 p-5 w-full h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 py-3 w-full sm:mb-0"
          placeholder="Search Product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-center mt-3 items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2  px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>
        {/*categories section*/}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        <section>
          {categories?.map((category, index) => (
          <label className="block mb-2" key={index}>
            
                <input
                  type="radio"
                  name="category"
                  value={category}
                  className="mr-2 w-[16px] h-[16px]"
                  onChange={()=> handleRadioChangeCategories(category)}
                  checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </label>
          ))}
        </section>
        {/* {Keywords section} */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">
          keywords
          </h2>
          <div>
            {keywords.map((keyword, index)=> 
            <button key={index} className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
            onClick={()=> handleKeywordClick(keyword)}>
              {keyword.toUpperCase()}
            </button>)}
          </div>
        </div>
        <button className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
        onClick={handleResetFilters}>
          Reset Filters
        </button>
      </section>
    </div>
  );
}

export default SideBar