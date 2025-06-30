const GameCard = ({ title, link, img }) => {
    return (
        <a href={link} className="block w-full max-w-xs">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-sm active:shadow-sm transition-shadow duration-200 ease-in-out cursor-pointer border border-gray-200 overflow-hidden w-full h-48">
                <div className="flex flex-col h-full">
                    <div className="w-full h-32 bg-gray-100 border-b border-gray-200 flex items-center justify-center flex-shrink-0">
                        <img src={img} alt={title} />
                        {/* <div className="w-16 h-16 border-2 border-gray-400 rounded-sm relative">
                            <div className="absolute top-2 left-2 w-3 h-3 rounded-full border-2 border-gray-400"></div>
                            <div className="absolute bottom-2 left-2 right-2 h-1 bg-gray-300 transform rotate-12"></div>
                            <div className="absolute bottom-2 left-3 right-3 h-1 bg-gray-400 transform -rotate-12"></div>
                        </div> */}
                    </div>
                    <div className="p-4 bg-orange-200 text-center flex-1 flex items-center justify-center">
                        <h3 className="text-gray-700 font-medium text-xl leading-tight">
                            {title}
                        </h3>
                    </div>
                </div>
            </div>
        </a>
    );
};

const GameCardsGrid = () => {
    const cards = [
        { title: "Inclusion &\nDiversity", id: 1, link: "/inclusion", img: "/inclusion.jpg" },
        { title: "Financial\nLiteracy", id: 2, link: "/financial", img: "/financial.jpg" },
        { title: "Workplace\nEtiquette", id: 3, link: "/workplace", img: "/workplace.png" },
        { title: "PoSH", id: 4, link: "/posh", img: "/posh.jpg" },
    ];

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
                    {cards.map((card) => (
                        <GameCard
                            key={card.id}
                            title={card.title}
                            link={card.link}
                            img={card.img}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameCardsGrid;