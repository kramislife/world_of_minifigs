import { useState, useEffect } from "react";
import { countries } from "countries-list";

export const useCountries = (onCountrySelect) => {
  const [userCountry, setUserCountry] = useState(null);

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
    flag: country.emoji,
  }));

  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      minHeight: "50px",
    }),
    menu: (base) => ({
      ...base,
      padding: "4px",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "400px",
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      padding: "10px 12px",
      marginBottom: "4px",
      borderRadius: "0.375rem",
      backgroundColor: state.isSelected
        ? "#facc15"
        : state.isFocused
        ? "#e5e7eb" 
        : "transparent",
      color: "black",
    }),
  };

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const countryCode = data.country_code;
        const country = countryOptions.find(
          (option) => option.value === countryCode
        );
        if (country) {
          setUserCountry(country);
          onCountrySelect(country.label);
        }
      })
      .catch((error) => console.error("Error fetching location:", error));
  }, []);

  return {
    userCountry,
    setUserCountry,
    countryOptions,
    customStyles,
  };
};
