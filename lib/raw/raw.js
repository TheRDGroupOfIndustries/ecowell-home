{/* <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="cardNumber" className="block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    placeholder="Card Number"
                    className="w-full p-2 border rounded"
                    value={billingDetails.cardNumber}
                    onChange={handleChange}
                  />
                  {billingDetails.cardNumber && (
                    <span
                      className="absolute right-2 top-8 text-xl cursor-pointer"
                      onClick={() => clearInput("cardNumber")}
                    >
                      &times;
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="expiry" className="block mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      id="expiry"
                      placeholder="MM/YY"
                      className="p-2 border rounded w-full"
                      value={billingDetails.expiry}
                      onChange={handleChange}
                    />
                    {billingDetails.expiry && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("expiry")}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="cvv" className="block mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      id="cvv"
                      placeholder="CVV"
                      className="p-2 border rounded w-full"
                      value={billingDetails.cvv}
                      onChange={handleChange}
                    />
                    {billingDetails.cvv && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("cvv")}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div> */}