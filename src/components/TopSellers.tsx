import axios from "axios";
import { useEffect, useState } from "react";
import { Author, Root } from "../../topSellers";

export const TopSellers = () => {

  const [authors, setAuthors] = useState<Author[]>([])

  const handleFollowClick = (index:number)=> {
    setAuthors(prevAuthor => prevAuthor.map((author, i)=> i === index ? {...author, isFollowing: !author.isFollowing}:author))
  }

  useEffect(() => {
    const fetchData = async () => {
    try {
        const response: Root = await axios.get('https://randomuser.me/api/?results=5')
        const authorsData: Author[] = response.data.results.map((author)=> ({
          name: `${author.name.first} ${author.name.last}`,
          isFollowing: false,
          image: author.picture.medium
        }))
        setAuthors(authorsData)
      } catch (error) {
        console.error(error)
      }
    }
      
    fetchData()
  }, [])
  

  return (
    <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded ">
      <h2 className="text-xl font-bold mb-5">Top Sellers</h2>
      <ul>
        {authors.map((author, index) => (
          <li key={index} className="flex items-center justify-between mb-4">
            <section className="flex justify-center items-center">
              <img
                src={author.image}
                className="w-[25%] h-[25%] justify-center rounded-full"
                alt={author.name}
              />
              <span className="ml-4">{author.name}</span>
            </section>
            <button
              className={`py-1 px-3 rounded ${
                author.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-black text-white"
              }`}
              onClick={()=> handleFollowClick(index)}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
