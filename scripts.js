document.addEventListener('DOMContentLoaded', function () {
    const recyclingInfo = document.getElementById('recycling-info');
    const pageElements = {
        pageTitle: document.getElementById('page-title'),
        introText: document.getElementById('intro-text'),
        dropdownLabel: document.getElementById('dropdown-label'),
        guideTitle: document.getElementById('guide-title')
    };
    let currentLanguage = 'en';
    let selectedItem = null;

    const translations = {
        en: {
            pageTitle: "Recycling Info Guide",
            introText: "Find out which items are recyclable!",
            items: {
                paper: "Paper",
                plastic: "Plastic",
                glass: "Glass",
                metal: "Metal",
                textile: "Textile",
                electronics: "Electronics"
            },
            recyclableTitle: "Yes, these are recyclable!",
            nonRecyclableTitle: "No, these are NOT recyclable!",
            recyclableData: {
                paper: [
                    { text: "Newspapers", image: "images/paper/newspaper.jpg" },
                    { text: "Cardboard", image: "images/paper/cardboard.jpg" },
                    { text: "Office paper", image: "images/paper/office paper.jpg" }
                ],
                plastic: "Most plastics with recycling symbols.",
                glass: "Glass bottles and jars.",
                metal: "Aluminum and steel cans.",
                textile: "Some textiles can be recycled or donated.",
                electronics: "Many electronics can be recycled at special facilities."
            },
            nonRecyclableData: {
                paper: [
                    { text: "Waxed paper", image: "images/paper/waxed paper.jpg" },
                    { text: "Used paper towel", image: "images/paper/used paper towel.jpg" },
                    { text: "Used paper disposable", image: "images/paper/used paper disposable.jpg" },
                    { text: "Used tissue paper", image: "images/paper/used tissue paper.jpg" },
                ],
                plastic: "Plastic bags, styrofoam, and certain types of plastic packaging.",
                glass: "Broken glass, mirrors, and light bulbs.",
                metal: "Paint cans and aerosol cans.",
                textile: "Heavily soiled or contaminated textiles.",
                electronics: "Batteries and certain types of electronics may need special disposal."
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
                textile: "纺织品",
                electronics: "电子产品"
            },
            recyclableTitle: "是的，这些是可回收的！",
            nonRecyclableTitle: "不，这些是不可回收的！",
            recyclableData: {
                paper: "报纸、纸板和办公用纸。",
                plastic: "大多数带有回收标志的塑料。",
                glass: "玻璃瓶和玻璃罐。",
                metal: "铝罐和钢罐。",
                textile: "某些纺织品可以回收或捐赠。",
                electronics: "许多电子产品可以在特殊设施回收。"
            },
            nonRecyclableData: {
                paper: "蜡纸、使用过的纸巾和受污染的纸。",
                plastic: "塑料袋、泡沫塑料和某些类型的塑料包装。",
                glass: "破碎的玻璃、镜子和灯泡。",
                metal: "油漆罐和气雾罐。",
                textile: "严重污损或受污染的纺织品。",
                electronics: "电池和某些类型的电子产品可能需要特殊处理。"
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
    
        // Update the recycling info if an item is selected
        if (selectedItem) {
            updateRecyclingInfo(selectedItem);
        }
    
    }

    function updateRecyclingInfo(item) {
        const recyclableElement = document.getElementById('recyclable');
        const nonRecyclableElement = document.getElementById('non-recyclable');

        function createItemElements(data) {
            return data.map(item => `
                <div class="info-tile" style="background-image: url('${item.image}')">
                    <span class="info-tile-text">${item.text}</span>
                </div>
            `).join('');
        }

        recyclableElement.innerHTML = `
        <h3>${translations[currentLanguage].recyclableTitle}</h3>
        <div class="info-items-container">
            ${createItemElements(translations[currentLanguage].recyclableData[item])}
        </div>
    `;

    nonRecyclableElement.innerHTML = `
        <h3>${translations[currentLanguage].nonRecyclableTitle}</h3>
        <div class="info-items-container">
            ${createItemElements(translations[currentLanguage].nonRecyclableData[item])}
        </div>
    `;
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
            selectedItem = item;
        updateRecyclingInfo(item);
        });
    });

    // Set the initial language on page load
    updateLanguage(currentLanguage);
});