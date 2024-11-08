document.addEventListener('DOMContentLoaded', function () {
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
            items: {
                paper: "Paper",
                plastic: "Plastic",
                glass: "Glass",
                metal: "Metal",
                organic: "Organic waste",
                electronics: "Electronics"
            },
            recyclableData: {
                paper: "Yes, paper is recyclable! Please recycle newspapers, cardboard, and office paper.",
                plastic: "Yes, most plastics are recyclable! Check the recycling symbol on the item for the type of plastic.",
                glass: "Yes, glass bottles and jars are recyclable! Please ensure they are clean before recycling.",
                metal: "Yes, metals like aluminum and steel are recyclable! Be sure to rinse cans before recycling.",
                organic: "Organic waste like food scraps can be composted. Check with local services for composting options.",
                electronics: "Electronics such as phones, computers, and batteries require special recycling. Check local e-waste recycling facilities."
            }
        },
        zh: {
            pageTitle: "回收信息指南",
            introText: "了解哪些物品可以回收！",
            items: {
                paper: "纸",
                plastic: "塑料",
                glass: "玻璃",
                metal: "金属",
                organic: "有机废物",
                electronics: "电子产品"
            },
            recyclableData: {
                paper: "是的，纸张是可回收的！请回收报纸、纸板和办公纸张。",
                plastic: "是的，大多数塑料是可回收的！请检查物品上的回收符号以确认塑料类型。",
                glass: "是的，玻璃瓶和玻璃罐是可回收的！回收前请确保它们是干净的。",
                metal: "是的，铝和钢等金属是可回收的！请在回收前冲洗罐头。",
                organic: "像食物残渣这样的有机垃圾可以堆肥。请与当地服务咨询堆肥选项。",
                electronics: "手机、电脑和电池等电子产品需要特别回收。请查看当地的电子废物回收设施。"
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

    // Add click event listeners to tiles
    document.querySelectorAll('.item-tile').forEach(tile => {
        tile.addEventListener('click', function () {
            const item = tile.getAttribute('data-item');
            recyclingInfo.textContent = translations[currentLanguage].recyclableData[item] || "Information not available.";
        });
    });

    // Set the initial language on page load
    updateLanguage(currentLanguage);
});