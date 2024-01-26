import { useEffect, useState } from "react";
import Data from "../Constants/api/listdata";
const Home = () => {
    //states
    const [display, setdisplay] = useState(false)
    const [filteredList, setFilteredList] = useState(Data);
    const [SelectList, setSelectedList] = useState([])
    const [UnselectList, setUnselectList] = useState(Data)
    //search functionality
    const filterBySearch = (event) => {
        // Access input value
        const query = event.target.value;
        // Create copy of item list
        let updatedList = [...UnselectList];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
            return item.name.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setFilteredList(updatedList);

    };
    const handleselecteditem = (index, e) => {


        const updatedarray = [...SelectList, Data.filter(item => item.id === index)[0]]
        setSelectedList(updatedarray)
        const updatedfilter = UnselectList.filter(item => item.id !== index)
        setFilteredList(updatedfilter)
        setUnselectList(updatedfilter)

        setdisplay(false)
        //clearing the input text
        document.getElementById('search').value = ''

    }
    const handleunselecteditem = (index) => {

        const updatedarray = SelectList.filter(item => item.id !== index)

        setSelectedList(updatedarray)

        const updatedfilter = [...UnselectList, Data.filter(item => item.id === index)[0]]
        setFilteredList(updatedfilter)
        setUnselectList(updatedfilter)


        document.getElementById('search').value = ''
    }
    let count;
    const handleKeyDown = event => {


        // console.log(message);

        if (event.key === 'Backspace' && document.getElementById('search').value === '') {
            // 👇️ your logic here

            count = count + 1;
            if (count === 1) {

            }
            else if (count === 2) {
                if (SelectList.length > 0) {
                    let data = SelectList[SelectList.length - 1];
                    handleunselecteditem(data.id)
                }
            }
            else {
                count = 1;
            }

        }
        else {
            count = 0;
        }
    }
    useEffect(() => {

    }, [filteredList, SelectList])
    return (
        <div class="container mx-auto my-auto">
            <div class=" justify-center items-center">

                <div class="relative flex">
                    {SelectList.map((data, index) => {
                        return (
                            <span class="whitespace-nowrap inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-200">
                                <img src={data.imgURL} class="w-6 h-6 rounded-full mr-3 bg-gradient-to-br from-teal-400 to-blue-500" alt="Avatar" />
                                {data.name}
                                <button onClick={(e) => { handleunselecteditem(data.id, e) }} class=" inline-block w-10 ml-2 -mt-1 -mr-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    <svg class="inline-block w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </span>
                        )
                    })}

                    <input id="search" onClick={(e) => setdisplay(true)} onKeyDown={(e) => { handleKeyDown(e) }} onChange={filterBySearch} type="text" class="w-full  text-gray-700 rounded-md py-2 pl-4 pr-3 sm:text-sm focus:outline-none " placeholder="" />

                </div>
                <div class="h-1 bg-blue-500 w-full"></div>
                <ul style={{ display: display ? "" : "none" }} class="list-disc ml-2">
                    {filteredList.map((data, index) => {
                        return (
                            <li style={{ cursor: "pointer" }} onClick={(e) => { handleselecteditem(data.id, e) }} class=" wl-full border border-transparent flex hover:bg-gray-200 items-center py-4 space-x-4 px-4">
                                <img class="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-500" src={data.imgURL} alt="Avatar" />
                                <div class="flex flex-row space-x-5">
                                    <span class="text-left text-gray-700 font-medium">{data.name}</span>
                                    <span class="text-right text-gray-500 text-sm mt-0.5">{data.email}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
export default Home;
