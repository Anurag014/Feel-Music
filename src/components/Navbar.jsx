import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { TfiSearch, TfiClose } from "react-icons/tfi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSearch } from "@/context/SearchContext.jsx";
import { useNavigate } from "react-router-dom";
import { MdHistory, MdSettings } from "react-icons/md";
import { createElement } from "react";
import { Link } from "react-router-dom";

const ClickableIcon = ({ icon, to}) => {
  return (
      <Link to={to}>
          <div className="flex sm:flex-col md:flex-row justify-start items-center sm:space-x-0 md:space-x-8hover:bg-red-500 p-2 transition-all duration-300 rounded-md">
              {icon && createElement(icon, { size: 25 })}
          </div>
      </Link>
  );
};

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { searchQuery, setSearchQuery, updateSearchResults, loading } = useSearch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearch(e.target.value);
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    navigate('/')

    if (search.trim() === '') {
      toast.warning('Please enter something to search', {
        description: "You can't search for nothing!",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      setSearchQuery(search);
      await updateSearchResults();
      console.log(searchQuery);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <form onSubmit={handleSearch} className="w-[50%]" >
          <div className="relative flex items-center">
            <div className="absolute left-6 cursor-pointer">
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <TfiSearch onClick={handleSearch} />
              )}
            </div>
            <Input
              type="search"
              placeholder="Search songs, albums, artists"
              className="md:py-6 pl-12 rounded-lg text-lg placeholder:text-[#a8a9ad] md:placeholder:text-lg"
              onChange={handleChange}
              value={search}
            />
            {search && (
              <TfiClose className="absolute right-8 cursor-pointer" onClick={() => setSearch('')} />
            )}
          </div>
        </form>
        <div className="flex items-center pr-4">
          <ClickableIcon icon={MdHistory} to="" />
          <ClickableIcon icon={MdSettings} to="" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
