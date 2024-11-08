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

    const translations = {
        en: {
            pageTitle: "Recycling Info Guide",
            introText: "Find out which items are recyclable!",
            dropdownLabel: "Select a material to check if it's recyclable:",
            guideTitle: "Recyclable Materials Guide",
            dropdownPlaceholder: "--Select a material--",
            items: {
                paper: "Paper",
                plastic: "Plastic",
                glass: "Glass",
                metal: "Metal",
                organic: "Organic waste",
                electronics: "Electronics"
            }
        },
        zh: {
            pageTitle: "回收信息指南",
            introText: "了解哪些物品可以回收！",
            dropdownLabel: "选择一个物品以检查它是否可以回收：",
            guideTitle: "可回收材料指南",
            dropdownPlaceholder: "--选择一个物品--",
            items: {
                paper: "纸",
                plastic: "塑料",
                glass: "玻璃",
                metal: "金属",
                organic: "有机废物",
                electronics: "电子产品"
            }
        }
    };

    function updateLanguage(lang) {
        currentLanguage = lang;

        // Update static page elements
        pageElements.pageTitle.textContent = translations[lang].pageTitle;
        pageElements.introText.textContent = translations[lang].introText;

        // Update tile texts
        document.querySelectorAll('.item-tile').forEach(tile => {
            const item = tile.getAttribute('data-item');
            tile.textContent = translations[lang].items[item];
        });

        // Update language button styles
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
        document.getElementById('lang-zh').classList.toggle('active', lang === 'zh');
    }

    // Event listeners for language buttons
    document.getElementById('lang-en').addEventListener('click', function () {
        updateLanguage('en');
    });

    document.getElementById('lang-zh').addEventListener('click', function () {
        updateLanguage('zh');
    });

    // Set the initial language on page load
    updateLanguage(currentLanguage);
});