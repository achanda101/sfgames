import { Link } from 'react-router-dom'

const GameCard = ({ title, link, img }) => {
    let bgColor = "bg-orange-200";
    if (link === "/inclusion") bgColor = "bg-purple-200";
    else if (link === "/financial") bgColor = "bg-orange-200";
    else if (link === "/workplace") bgColor = "bg-blue-200";
    else if (link === "/posh") bgColor = "bg-red-200";
    else if (link === "/dashboard") bgColor = "bg-green-200";

    return (
        <Link to={link} className="block w-full max-w-xs">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-sm active:shadow-sm transition-shadow duration-200 ease-in-out cursor-pointer border border-gray-200 overflow-hidden w-full h-48">
                <div className="flex flex-col h-full">
                    <div className="w-full h-32 bg-gray-100 border-b border-gray-200 flex items-center justify-center flex-shrink-0">
                        <img src={img} alt={title} />
                    </div>
                    <div className={`p-4 ${bgColor} text-center flex-1 flex items-center justify-center`}>
                        <h3 className="text-gray-700 font-medium text-xl leading-tight">
                            {title}
                        </h3>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const GameCardsGrid = () => {
    const cards = [
        { title: "Inclusion &\nDiversity", id: 1, link: "/inclusion", img: "/inclusion.jpg" },
        { title: "Financial\nLiteracy", id: 2, link: "/financial", img: "/financial.jpg" },
        { title: "Workplace\nEtiquette", id: 3, link: "/workplace", img: "/workplace.png" },
        { title: "PoSH", id: 4, link: "/posh", img: "/posh.jpg" },
        { title: "Analytics\nDashboard", id: 5, link: "/dashboard", img: "/dashboard.png" },
    ];

    return (
        <div className="min-h-screen bg-green-100 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
                    {cards.map((card, index) => (
                        <div key={card.id} className={index === 4 ? "sm:col-span-2 sm:flex sm:justify-center" : ""}>
                            <GameCard
                                title={card.title}
                                link={card.link}
                                img={card.img}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameCardsGrid;