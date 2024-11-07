document.addEventListener('DOMContentLoaded', function () {
    const itemSelect = document.getElementById('item-select');
    const recyclingInfo = document.getElementById('recycling-info');
  
    // Information for each recyclable item
    const recyclableData = {
      paper: "Yes, paper is recyclable! Please recycle newspapers, cardboard, and office paper.",
      plastic: "Yes, most plastics are recyclable! Check the recycling symbol on the item for the type of plastic.",
      glass: "Yes, glass bottles and jars are recyclable! Please ensure they are clean before recycling.",
      metal: "Yes, metals like aluminum and steel are recyclable! Be sure to rinse cans before recycling.",
      organic: "Organic waste like food scraps can be composted. Check with local services for composting options.",
      electronics: "Electronics such as phones, computers, and batteries require special recycling. Check local e-waste recycling facilities."
    };
  
    // Event listener for the dropdown
    itemSelect.addEventListener('change', function () {
      const selectedItem = itemSelect.value;
      if (selectedItem) {
        recyclingInfo.textContent = recyclableData[selectedItem] || "Information not available.";
      } else {
        recyclingInfo.textContent = "";
      }
    });
  });
  