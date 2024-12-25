// interface PackOption {
//     id: string;
//     title: string;
//     price: number;
//     isPopular?: boolean;
//   }

const packOptions = [
    { id: "pack-2", title: "PACK OF 2", price: 2750 },
    { id: "pack-5", title: "PACK OF 5", price: 6000, isPopular: true },
    { id: "pack-10", title: "PACK OF 10", price: 11000 },
    { id: "pack-15", title: "PACK OF 15", price: 15000 },
];

export default function PackOptions() {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {packOptions.map((pack) => (
                <button
                    key={pack.id}
                    className={`p-4 rounded-lg border ${pack.isPopular
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                >

                    <span className="text-xs mx-auto text-white bg-[#FF6F61] w-fit px-4  py-1 rounded-sm font-medium mb-1 block">
                    10% OFF
                    </span>

                    <div className="text-xl text-nowrap text-dark_jungle_green font-medium">{pack.title}</div>
                    <div className="text-lg text-dark_jungle_green font-normal">₹{pack.price}</div>
                </button>
            ))}
        </div>
    );
}