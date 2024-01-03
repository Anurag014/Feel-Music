import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react";
import { TfiSearch, TfiClose } from "react-icons/tfi";
const Navbar = () => {
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search);

        if (search === '') {
            toast.warning('Please enter something to search', {
                description: "You can't search for nothing!",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
        }
    };

    return (
        <>
            <nav>
                <form onSubmit={handleSearch}>
                    <div className={`relative md:mx-20 items-center w-1/2 p-4 ${showSearch ? "flex min-[850px]:hidden w-auto" : "hidden min-[850px]:flex"}`}>
                        <TfiSearch className="absolute left-8 cursor-pointer" onClick={handleSearch} />
                        <Input
                            type="search"
                            placeholder="Search songs, albums, artists"
                            className="md:py-6 pl-12 rounded-lg text-lg placeholder:text-[#a8a9ad] md:placeholder:text-lg"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        {search && <TfiClose className="absolute right-8 cursor-pointer" onClick={() => setSearch('')} />}
                    </div>
                    <div className={`justify-end w-full ${showSearch ? "hidden min-[850px]:flex" : "flex min-[850px]:hidden"}`}>
                        <TfiSearch className="cursor-pointer mr-10 my-5" onClick={() => setShowSearch(prevValue => !prevValue)} />
                    </div>
                </form>
            </nav>
        </>
    );
};

export default Navbar;



