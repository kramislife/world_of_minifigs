import React from "react";
import { Input } from "@/components/ui/input";
import { Calendar, HelpCircle } from "lucide-react";
import Stripe from "@/assets/Stripe.svg";
import Mastercard from "@/assets/Mastercard.svg";

const CardSection = ({ onSubmit, onCardDetailsChange, cardDetails }) => {
  return (
    <div className="space-y-6">
      <div className="mt-4 space-y-4">
        {/* Card number input */}
        <div className="relative">
          <Input
            type="text"
            variant="floating"
            label="Card number"
            placeholder=" "
            maxLength="19"
            pattern="\d*"
            value={cardDetails.cardNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, "");
              const formatted = value.match(/.{1,4}/g)?.join("-") || value;
              onCardDetailsChange("cardNumber", formatted);
            }}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <img src={Mastercard} alt="Mastercard" className="h-6 w-auto" />
            <img src={Stripe} alt="Stripe" className="h-6 w-auto" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Expiration date input */}
          <div className="relative">
            <Input
              type="text"
              variant="floating"
              label="Expiration date (MM/YY)"
              placeholder=" "
              maxLength="5"
              pattern="\d*"
              value={cardDetails.expiryDate}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, "");
                const formatted = value.match(/.{1,2}/g)?.join("/") || value;
                onCardDetailsChange("expiryDate", formatted);
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Security code (CVV) input */}
          <div className="relative group">
            <Input
              type="text"
              variant="floating"
              label="CVV"
              placeholder=" "
              maxLength="4"
              pattern="\d*"
              value={cardDetails.cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, "");
                onCardDetailsChange("cvv", value);
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-help">
              <HelpCircle className="h-5 w-5 text-gray-400" />
              <div className="invisible group-hover:visible absolute right-0 bottom-full mb-3 w-60 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg leading-relaxed font-light">
                A 3-4 digit security code on back of your card
              </div>
            </div>
          </div>
        </div>

        {/* Name on card input */}
        <Input
          type="text"
          variant="floating"
          label="Name on card"
          placeholder=" "
          value={cardDetails.nameOnCard}
          onChange={(e) => onCardDetailsChange("nameOnCard", e.target.value)}
        />
      </div>

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
        type="submit"
        onClick={onSubmit}
      >
        <span className="font-semibold">Pay Now</span>
      </button>
    </div>
  );
};

export default CardSection;
