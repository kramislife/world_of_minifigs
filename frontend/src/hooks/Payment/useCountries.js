import { useState, useEffect } from "react";
import { countries } from "countries-list";

export const useCountries = (onCountrySelect) => {
  const [userCountry, setUserCountry] = useState(null);

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
    flag: country.emoji,
  }));

  // Updated custom styles to match the new input design
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "0.5rem",
      minHeight: "56px",
      padding: "0 8px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "rgba(59, 130, 246, 0.5)",
      },
      ...(state.isFocused && {
        borderColor: "rgb(59, 130, 246)",
      }),
    }),
    menu: (base) => ({
      ...base,
      background: "rgb(2, 6, 23)", // Darker, solid background
      backdropFilter: "none", // Remove any transparency
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "0.5rem",
      padding: "4px",
      zIndex: 50,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      maxHeight: "500px", // Limit height and enable scroll
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(59, 130, 246, 0.1)" : "transparent",
      color: "white",
      padding: "10px 12px",
      cursor: "pointer",
      "&:hover": {
        background: "rgba(59, 130, 246, 0.1)",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)",
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      "&:hover": {
        color: "rgba(255, 255, 255, 0.8)",
      },
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
