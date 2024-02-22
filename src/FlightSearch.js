import { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, redirect } from "react-router-dom";
import ThemeContext from "./Context";

const FlightSearch = () => {

    const { loggedIn } = useContext(ThemeContext);
    const navigate = useNavigate();
    
    useEffect(() => {

        switch(loggedIn) {
            case false:
                navigate("/");
                break;
        }
    }, [loggedIn]);
    
    const [ searchForm, setSearchForm ] = useState({});
    const [ availableFlights, setAvailableFlights ] = useState([]);

    async function getFlights() {
        if(!searchForm.from || !searchForm.to || !searchForm.date) {
            toast.error("Please fill all the fields!");
        }
        else if(searchForm.from === searchForm.to) {
            toast.error("Source and destination cannot be same!");
        } 
        else {
            const response = await axios.post("http://localhost:8000/api/v1/flight/search", {
                from: searchForm.from,
                to: searchForm.to,
                date: searchForm.date
            }, { withCredentials: true });
            if(response.data.success) {
                setAvailableFlights(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        }
        
    }

    function bookTicket(id) {
        navigate("/flight-booking/" + id);
    }

    return (
        <div className="flex-1 flex flex-col justify-start items-center">
            <div className="flex items-center justify-center h-fit bg-gray-100 mt-5">
                <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-black">
                    <div className="grid grid-cols-3 gap-4">
                    <select className="border border-gray-300 p-2 rounded-l-lg" onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}>
                        <option>From</option>
                        <option>Mumbai</option>
                        <option>Pune</option>
                        <option>Bangalore</option>
                        <option>Delhi</option>
                        <option>Gujarat</option>
                    </select>
                    <select className="border border-gray-300 p-2 rounded-r-lg" onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}>
                        <option>To</option>
                        <option>Gujarat</option>
                        <option>Delhi</option>
                        <option>Bangalore</option>
                        <option>Pune</option>
                        <option>Mumbai</option>
                    </select>
                    <input
                        type="date"
                        min={new Date().toISOString().slice(0, 10)}
                        value={searchForm.date}
                        onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg"
                    />
                    </div>
                    <button onClick={getFlights} className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Search Flights
                    </button>
                </div>
            </div>
            { availableFlights && availableFlights.map(data => (
                <div className="flex justify-center items-center h-fit mt-5">
                <div className="border border-gray-300 rounded-lg p-6">
                    <div className="grid grid-cols-6 gap-2 font-bold">
                    <div>Airline</div>
                    <div>From</div>
                    <div>To</div>
                    <div>Fare</div>
                    <div>Journey Date</div>
                    <div></div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        <div>{data.airline}</div>
                        <div>{data.from}</div>
                        <div>{data.to}</div>
                        <div>₹&nbsp;{data.price}</div>
                        <div>{data.date}</div>
                        <div>
                            <button onClick={() => bookTicket(data._id)} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
            )) }
        </div>
    );
}

export default FlightSearch;