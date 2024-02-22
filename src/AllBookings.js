import ThemeContext from "./Context";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const AllBookings = () => {

    const { loggedIn } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [ allBookings, setAllBookings ] = useState([]);

    async function getAllBookings() {
        const res1 = await axios.get("https://bmf-backend.onrender.com/api/v1/flight/get-all-bookings", { withCredentials: true });
        if(res1.data.success) {
            setAllBookings([]);
            const res1Data = res1.data.data;
            res1Data.map(async (data, index) => {
                const res = await axios.post("https://bmf-backend.onrender.com/api/v1/flight/get-flight-data", { id: data.flightId }, { withCredentials: true });   
                if(res.data.success) {
                    setAllBookings(prevState => [...prevState, {
                        bookingId: data._id,
                        airlineCode: res.data.data.airlineCode,
                        airline: res.data.data.airline,
                        date: res.data.data.date,
                        seatNumber: data.seatNumber
                    }]);
                }
            })
        }
    }
    
    useEffect(() => {
        if(!loggedIn) {
            navigate("/");
        }
        getAllBookings();
    }, [loggedIn]);

    return (
        <div className="flex-1 flex justify-center items-top py-10">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border text-center border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Booking ID</th>
                        <th className="border border-gray-300 px-4 py-2">Airline Code</th>
                        <th className="border border-gray-300 px-4 py-2">Airline Name</th>
                        <th className="border border-gray-300 px-4 py-2">Journey Date</th>
                        <th className="border border-gray-300 px-4 py-2">Seat Number(s)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allBookings && allBookings.map((data, index) => (
                        <tr key={index+"allBookindsData"}>
                            <td className="border border-gray-300 px-4 py-2">{data.bookingId}</td>
                            <td className="border border-gray-300 px-4 py-2">{data.airlineCode}</td>
                            <td className="border border-gray-300 px-4 py-2">{data.airline}</td>
                            <td className="border border-gray-300 px-4 py-2">{data.date}</td>
                            <td className="border border-gray-300 px-4 py-2">{data.seatNumber.toString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllBookings;
