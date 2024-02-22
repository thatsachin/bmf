import { useParams } from "react-router-dom";
import ThemeContext from "./Context";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import SeatPicker from "./SeatPicker";

const FlightBooking = () => {

    const { loggedIn, username } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [ disableBookNowButton, setDisableBookNowButton ] = useState(false);

    const { flightId } = useParams();
    const [ flightData, setFlightData ] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    async function getFlightData() {
        if(flightId) {
            const res = await axios.post("https://bmf-backend.onrender.com/api/v1/flight/get-flight-data", { id: flightId }, { withCredentials: true })
            if(res.data.success) {
                setFlightData(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        } else {
            toast.error("Flight ID not found");
        }
    }

    useEffect(() => {
        if(loggedIn) {
            getFlightData();
        }
        // } else {
        //     // console.log("loggedIn value from FlightBooking.js: "+loggedIn);
        //     navigate("/");
        // }
    }, [loggedIn]);

    async function startCheckout() {

        const res = await axios.get("https://bmf-backend.onrender.com/api/v1/flight/get-api-key", { withCredentials: true });
        // console.log("key is: "+res.data.key);
        const response = await axios.post("https://bmf-backend.onrender.com/api/v1/flight/book", { flightId, choosenSeats: selectedSeats }, { withCredentials: true });
        // console.log(response.data);
        if(response.data.success) {
            const options = {
                "key": res.data.key,
                "amount": Number(response.data.order.amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "BookMyFlight",
                "description": "Book My Flight",
                "image": "https://i.imgur.com/FXvf0J8.png",
                "order_id": response.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": "https://bmf-backend.onrender.com/api/v1/flight/payment-verification",
                "prefill": {
                    "name": username,
                    "email": "",
                    "contact": ""
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#010101"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.submit', (response) => {
                setDisableBookNowButton(false)
            });
            rzp1.open();
        }
        else {
            toast(response.data.message);
        }
    }


    function bookTicket() {
        if(selectedSeats.length === 0) {
            toast.error("Please select at least one seat");
        } else {
            setDisableBookNowButton(true);
            startCheckout();
            // toast.success("Ticket booked successfully");
        }
    }

    return (
        <div className="md:flex-1 md:flex sm:flex-col md:flex-row md:justify-evenly md:items-center">
            <div className="sm:px-10 md:flex md:flex-col md:scale-110 sm:flex sm:flex-col sm:justify-center sm:items-center">
            <p className="text-xl mb-4 font-medium text-center">Review your itinerary:</p>
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
                        <td className="border border-gray-400 py-2 px-5">{flightData.from}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Destination</td>
                        <td className="border border-gray-400 py-2 px-5">{flightData.to}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Journey Date</td>
                        <td className="border border-gray-400 py-2 px-5">{flightData.date}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Seat Selected</td>
                        <td className="border border-gray-400 py-2 px-5">{selectedSeats.toString()}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="border border-gray-400 py-2 px-5 font-bold">Price</td>
                        <td className="border border-gray-400 py-2 px-5">₹&nbsp;{selectedSeats.length > 1 ? flightData.price * selectedSeats.length : flightData.price }</td>
                    </tr>
                </tbody>
            </table>
            <button disabled={disableBookNowButton} onClick={bookTicket} className="sm:w-screen md:w-fit px-4 py-2 mt-5 bg-blue-500 text-white font-bold rounded-lg">Book Now</button>
            </div>
            <SeatPicker totalSeats={flightData.totalSeats} bookedSeats={flightData.bookedSeats} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} />
        </div>
    );
}

export default FlightBooking;
