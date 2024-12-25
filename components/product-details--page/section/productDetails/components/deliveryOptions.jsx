import Image from "next/image";

const deliveryOptions = [
    {
      url: '/EMI-Available.png',
      title: "EMI Available",
    },
    {
      url: "/Cash-on-Delivery-Available.png",
      title: "Cash On Delivery Available",
    },
    {
      url: "/Free-Shipping.png",
      title: "Free Shipping On Orders Above ₹999",
    },
  ];
  
  export default function DeliveryOptions() {
    return (
      <div className="flex justify-between items-center mt-6 py-4 border-t border-gray-200">
        {deliveryOptions.map((option, index) => (
          <div key={index} className="flex items-center gap-2 flex-col">
            <Image src={option.url} alt={option.title} width={40} height={40} />
            <span className="text-sm text-center text-gray-600">{option.title}</span>
          </div>
        ))}
      </div>
    );
  }