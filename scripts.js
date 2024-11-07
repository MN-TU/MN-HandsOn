document.addEventListener('DOMContentLoaded', function () {
  const itemSelect = document.getElementById('item-select');
  const recyclingInfo = document.getElementById('recycling-info');
  const pageElements = {
      pageTitle: document.getElementById('page-title'),
      introText: document.getElementById('intro-text'),
      dropdownLabel: document.getElementById('dropdown-label'),
      guideTitle: document.getElementById('guide-title')
  };
  let currentLanguage = 'en';

  // Translations for static page elements
  const translations = {
      en: {
          pageTitle: "Recycling Info Guide",
          introText: "Find out which items are recyclable!",
          dropdownLabel: "Select an item to check if it's recyclable:",
          guideTitle: "Recyclable Materials Guide"
      },
      zh: {
          pageTitle: "回收信息指南",
          introText: "了解哪些物品可以回收！",
          dropdownLabel: "选择一个物品以检查它是否可以回收：",
          guideTitle: "可回收材料指南"
      }
  };

  // Translations for recyclable items
  const recyclableData = {
      paper: {
          en: "Yes, paper is recyclable! Please recycle newspapers, cardboard, and office paper.",
          zh: "是的，纸张是可回收的！请回收报纸、纸板和办公纸张。"
      },
      plastic: {
          en: "Yes, most plastics are recyclable! Check the recycling symbol on the item for the type of plastic.",
          zh: "是的，大多数塑料是可回收的！请检查物品上的回收符号以确认塑料类型。"
      },
      glass: {
          en: "Yes, glass bottles and jars are recyclable! Please ensure they are clean before recycling.",
          zh: "是的，玻璃瓶和玻璃罐是可回收的！回收前请确保它们是干净的。"
      },
      metal: {
          en: "Yes, metals like aluminum and steel are recyclable! Be sure to rinse cans before recycling.",
          zh: "是的，铝和钢等金属是可回收的！请在回收前冲洗罐头。"
      },
      organic: {
          en: "Organic waste like food scraps can be composted. Check with local services for composting options.",
          zh: "像食物残渣这样的有机垃圾可以堆肥。请与当地服务咨询堆肥选项。"
      },
      electronics: {
          en: "Electronics such as phones, computers, and batteries require special recycling. Check local e-waste recycling facilities.",
          zh: "手机、电脑和电池等电子产品需要特别回收。请查看当地的电子废物回收设施。"
      }
  };

  // Function to update page text based on the selected language
  function updateLanguage(lang) {
      currentLanguage = lang;

      // Update static page elements
      pageElements.pageTitle.textContent = translations[lang].pageTitle;
      pageElements.introText.textContent = translations[lang].introText;
      pageElements.dropdownLabel.textContent = translations[lang].dropdownLabel;
      pageElements.guideTitle.textContent = translations[lang].guideTitle;

      // Update item description if an item is already selected
      const selectedItem = itemSelect.value;
      if (selectedItem) {
          recyclingInfo.textContent = recyclableData[selectedItem][lang] || "Information not available.";
      } else {
          recyclingInfo.textContent = "";
      }
  }

  // Event listeners for language buttons
  document.getElementById('lang-en').addEventListener('click', function () {
      updateLanguage('en');
  });

  document.getElementById('lang-zh').addEventListener('click', function () {
      updateLanguage('zh');
  });

  // Event listener for the dropdown
  itemSelect.addEventListener('change', function () {
      const selectedItem = itemSelect.value;
      if (selectedItem) {
          recyclingInfo.textContent = recyclableData[selectedItem][currentLanguage] || "Information not available.";
      } else {
          recyclingInfo.textContent = "";
      }
  });

  // Set the initial language on page load
  updateLanguage(currentLanguage);
});
