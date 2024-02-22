import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Success = () => {

    const [ searchParams ] = useSearchParams();
    const orderRefId = searchParams.get("ref");
    const [ flightData, setFlightData ] = useState({});

    async function getFlightData() {
        const res = await axios.post("https://bmf-backend.onrender.com/api/v1/flight/get-booked-ticket-data", { refId: orderRefId }, { withCredentials: true });
        
        if(res.data.success) {
            setFlightData(res.data);
        }
        else {
            toast.error(res.data.message);
        }
    }

    useEffect(() => {
        getFlightData();
    }, []);

    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="sm:px-10 md:flex md:flex-col sm:flex sm:flex-col sm:justify-center sm:items-center">
            <p className="text-3xl mb-2 font-medium text-center">Payment Successful!</p>
            <p className="text-lg mb-4 font-medium text-center">Transaction ID: <span className="text-blue-500 italic">{orderRefId}</span></p>
            <table className="border-collapse border border-gray-400 w-max">                
                <tbody>
                    <tr className="bg-gray-200">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Airline</td>
                        <td className="border border-gray-400 py-2 px-5">{flightData.airline}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Airline Code</td>
                        <td className="border border-gray-400 py-2 px-5">{flightData.airlineCode}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Origin</td>
                        <td className="border border-gray-400 py-2 px-5">{flightData.origin}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Destination</td>
                        <td className="border border-gray-400 py-2 px-5">{flightData.destination}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Journey Date</td>
                        <td className="border border-gray-400 py-2 px-5">{flightData.date}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Seat Selected</td>
                        <td className="border border-gray-400 py-2 px-5">{(flightData.seatBooked).toString()}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Price</td>
                        <td className="border border-gray-400 py-2 px-5">₹&nbsp;{ flightData.amount }</td>
                    </tr>
                </tbody>
            </table>
            <Link to="/all-bookings" className="sm:w-screen md:w-fit px-4 py-2 mt-5 bg-blue-500 text-white font-bold rounded-lg">Go to your bookings</Link>
            </div>
        </div>
    );
}

export default Success;
