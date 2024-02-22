function SeatPicker({ setSelectedSeats, selectedSeats, totalSeats, bookedSeats }) {

  const handleSeatClick = (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]); 
    }
  };

  function disableButton(seatNumber) {
    if(bookedSeats === undefined || bookedSeats.length === 0) {
        return false;
    } else {
        return bookedSeats.includes(seatNumber);
    }
}

  return (
    <div className="text-center md:flex-col sm:w-full sm:flex sm:justify-center sm:items-center md:w-2/5">
      <p className="text-xl mb-4">Select your seat(s)</p>
        <div className="max-w-full flex flex-wrap gap-2 justify-start items-center">
            {[...Array(totalSeats)].map((_, index) => (
                <button 
                key={index}
                disabled={disableButton(index+1)}
                className={`${disableButton(index+1) ? 'bg-red-600 text-white' : selectedSeats.includes(index+1) ? 'bg-green-500 text-white' : 'bg-white'} cursor-pointer border border-gray-300 max-w-10 max-h-10 w-10 h-10 p-3 mx-1 text-center rounded flex items-center justify-center'`} onClick={() => handleSeatClick(index+1)}>
                {index+1}
                </button>
            ))}
        </div>
    </div>
  );
}

export default SeatPicker;