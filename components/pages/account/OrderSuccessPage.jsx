import { CheckCircle, CheckCircle2, Image } from "lucide-react";

const OrderSuccess = ({ orderId }) => {
  return (
    <>
      <div className="mt-24 w-full">
        <div className="w-full flex items-center justify-center py-24">
          <div className="flex flex-col gap-2 justify-center items-center">
            <CheckCircle2 fill="green" size={50} strokeWidth={3} color="white" />
            <h2 className="text-3xl font-semibold">THANK YOU</h2>
            <p className="text-gray-400">Payment is successfully processed and your order is on the way</p>
            <p className="text-gray-400">Order ID: {orderId}</p>
          </div>

        </div>
        <div className="h-[500px]  bg-[#f4ede3] p-16">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">YOUR ORDER DETAILS</h2>
              <div className="grid grid-cols-4 gap-3 items-center">
                <Image src={""} alt={""} width={100} height={150} />
                <div className="w-full flex flex-col gap-1">
                  <h5 className="text-base font-semibold">Product Name</h5>
                  <p className="text-base">Ayurveda Shampoo & Conditioner Kit</p>
                  <p></p>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <h5 className="text-base font-semibold">Quantity</h5>
                  <p className="text-base">1</p>
                  <p></p>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <h5 className="text-base font-semibold">Price</h5>
                  <p className="text-base">Rs. 500</p>
                  <p></p>
                </div>


              </div>
              <div className="flex flex-row items-center justify-between">
                <span className=" text-xl font-semibold">TOTAL</span>
                <span className=" text-xl font-semibold">Rs. 1000</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full grid grid-cols-2">
                <div className="w-full flex flex-col gap-1">
                  <h5 className="text-base font-semibold">Summary</h5>
                  <p className="text-base">order ID: ORD-1735201144833</p>
                  <p className="text-base">Order Date: December 26, 2024</p>
                  <p className="text-base">Order Total: ₹520</p>
                </div>
                <div className="w-full flex flex-col gap-1">
                  <h5 className="text-base font-semibold">Shipping address</h5>
                  <p className="text-base tracking-wider">Divyanshu Vishwakarma
                    I want experience in real life project
                    hj, Madhya Pradesh</p>
                  <p className="text-base">India - 487551</p>
                  <p className="text-base">Contact No. 000000000</p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <h5 className="text-base font-semibold">Payment method</h5>
                <p className="text-base">Pay on Delivery (Cash/Card). Cash on delivery (COD) available.</p>
                <p className="text-base">Card/Net banking acceptance subject to device availability.</p>
              </div>

              <div className="w-full bg-[#f9f9f9] p-4">
                <h2 className="text-2xl text-center font-medium">Expected date of delivery</h2>
                <h2 className="text-2xl text-center font-semibold ">October 22, 2023</h2>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
