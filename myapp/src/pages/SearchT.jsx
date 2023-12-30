import React, { useEffect } from "react";

export const SearchT = () => {
  useEffect(() => {
    const input = document.getElementById("searchInput");
    const handleSearch = () => {
      const filter = input.value.toUpperCase();
      const paragraphs = document.querySelectorAll(".search-text p");
      paragraphs.forEach((p) => {
        const txtValue = p.textContent.toUpperCase();
        if (txtValue.includes(filter)) {
          const highlightedText = p.textContent.replace(
            new RegExp(filter, "gi"),
            (match) => `<span class="highlight">${match}</span>`
          );
          p.innerHTML = highlightedText;
        } else {
          p.innerHTML = p.textContent;
        }
      });
    };
    input.addEventListener("input", handleSearch);

    return () => {
      input.removeEventListener("input", handleSearch);
    };
  }, []);

  return (
    <>
      {/* <Flex justifyContent="center" alignItems="center"> */}
      <input
        style={{ width: 300, marginRight: "12px", height: "30px" }}
        id="searchInput"
        placeholder="Search text..."
        borderColor={"black"}
      />

      {/* <Flex justifyContent="flex-end" alignItems="flex-end"></Flex> */}

      <style>
        {`
          .highlight {
            background-color: orange;
            /* Adjust other styles as needed */
          }
        `}
      </style>
      {/* </Flex> */}
    </>
  );
};

export default SearchT;
