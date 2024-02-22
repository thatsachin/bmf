import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { DropdownMenu, Button } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import ThemeContext from "./Context";
import { useEffect } from "react";

const navList = "hover:text-blue-700 px-4 hover:rounded active:accent-indigo-700 cursor-pointer hover:bg-yellow-300";

const Navbar = () => {

    const { loggedIn, username, logoutUser, checkLoggedIn } = useContext(ThemeContext);
    
    useEffect(() => {
        checkLoggedIn();
    }, [])

    function showLoginToast() {
        toast("Please Login First!");
    }
    
    return (
        <nav className="shadow border-b border-black px-10 py-3 flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-indigo-600">BookMyFlight</Link>
            {loggedIn && 
            <ul className="sm:hidden md:flex text-lg items-center justify-center font-medium">
                <Link to="/flight-search" className={navList}>Flights</Link>
                <Link to="/all-bookings" className={navList}>Bookings</Link>
                <Link to="/profile" className={navList}>Profile</Link>
            </ul>}
            {!loggedIn && 
            <ul className="sm:hidden md:flex text-lg items-center justify-center font-medium">
                <li className={navList} onClick={showLoginToast}>Flights</li>
                <li className={navList} onClick={showLoginToast}>Hotels</li>
                <li className={navList} onClick={showLoginToast}>Bus</li>
                <li className={navList} onClick={showLoginToast}>My Trips</li>
                <li className={navList} onClick={showLoginToast}>Support</li>
            </ul>}
            { loggedIn ? 
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Button variant="soft" size="3">
                            {username}
                            <CaretDownIcon />
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="end" size="2" className="cursor-pointer">
                        <DropdownMenu.Item onClick={logoutUser}>Logout</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root> : 
            <Link className="text-lg font-medium cursor-pointer hover:bg-indigo-700 hover:text-white active:bg-indigo-600 bg-orange-500 text-white px-5 py-1 rounded-md" to="/auth">Sign In</Link>}
        </nav>
    );
}

export default Navbar;