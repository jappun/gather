const EventHeader = ( { name, date }) => {
    const dateToText = () => {
        const dateObj = new Date(date);
        const options = { year: "numeric", month: "long", day: "numeric" }; 
        return dateObj.toLocaleDateString("en-CA", options);
    }

    return (
        <div className="flex flex-col items-center py-16 font-bold rounded-xl bg-secondary-two text-primary">
            <div className="text-6xl">
                {name}
            </div>
            <div className="text-4xl">
                {dateToText(date)}
            </div>        
            </div>
    )

}

export default EventHeader