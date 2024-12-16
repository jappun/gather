const EventHeader = ( { name, date }) => {
    const dateToText = () => {
        const dateObj = new Date(date);
        const options = { year: "numeric", month: "long", day: "numeric" }; 
        return dateObj.toLocaleDateString("en-CA", options);
    }

    return (
        // <div className="flex flex-col items-center py-16 font-bold rounded-xl bg-secondary-two text-primary">
        //     <div className="text-6xl">
        //         {name}
        //     </div>
        //     <div className="text-4xl">
        //         {dateToText(date)}
        //     </div>        
        //     </div>

    <div className="relative bg-secondary-two rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-secondary-two/40 opacity-50"></div>
      
      <div className="relative z-10 py-10 px-6 text-center">

        <div className="flex flex-col items-center space-y-4">
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-background 
            bg-background/10 px-6 py-3 rounded-xl shadow-lg">
            {name}
          </h1>
          
          <div className="text-2xl md:text-3xl font-semibold 
          text-primary bg-background/10 inline-block 
          px-4 py-2 rounded-full">
          {dateToText()}
        </div>

        </div>
      </div>
    </div>

    );

};

export default EventHeader