document.addEventListener('DOMContentLoaded', function () {
    // Hide info boxes on page load
    document.getElementById('recyclable').style.display = 'none';
    document.getElementById('non-recyclable').style.display = 'none';
    
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
            introText: "Not sure which items are recyclable? Find out below!",
            items: {
                paper: "Paper",
                plastic: "Plastic",
                glass: "Glass",
                metal: "Metal",
                textile: "Textile",
                electronics: "Electronics"
            },
                // Existing English translations
                disposalInstructions: {
                    eBin: "Place recyclable electronic wastes in <span class='bin-text e-bin-text'>e-Bin</span>",
                    blueBin: "Place recyclables in <span class='bin-text blue-bin-text'>Blue Bin</span>"
                },
                unableToFind: 'Unable to find the item? Click HERE to find out more!',
            
            recyclableTitle: "Yes, these are recyclable!",
            nonRecyclableTitle: "No, these are NOT recyclable!",
            recyclableData: {
                paper: [
                    { text: "Newspaper", image: "images/Paper/newspaper.jpg" },
                    { text: "Egg tray", image: "images/Paper/egg tray.jpg" },
                    { text: "Calendar", image: "images/Paper/calendar.jpg" },
                    { text: "Magazine", image: "images/Paper/magazine.jpg" },
                    { text: "Textbook", image: "images/Paper/textbook.jpg" },
                    { text: "Cardboard", image: "images/Paper/cardboard.jpg" },
                    { text: "Office paper", image: "images/Paper/office paper.jpg" },
                    { text: "Beverage carton", image: "images/Paper/beverage carton.jpg" },
                    { text: "Brochure", image: "images/Paper/brochure.jpg" },
                    { text: "Envelope", image: "images/Paper/envelope.jpg" },
                    { text: "Gift wrapping paper", image: "images/Paper/gift wrapping paper.jpg" },
                    { text: "Receipt", image: "images/Paper/receipt.jpg" },
                    { text: "Red packet", image: "images/Paper/red packet.jpg" },
                    { text: "Toilet roll tube", image: "images/Paper/toilet roll tube.jpg" },
                ],
                plastic: [
                    { text: "Plastic Bottle", image: "images/Plastic/bottles.jpg" },
                    { text: "CDs or DVDs", image: "images/Plastic/cd or dvd.jpg" },
                    { text: "Detergent bottle", image: "images/Plastic/detergent bottle.jpg" },
                    { text: "Plastic egg tray", image: "images/Plastic/egg tray.jpg" },
                    { text: "Medicine bottle", image: "images/Plastic/medicine bottle.jpg" },
                    { text: "Plastic bag", image: "images/Plastic/plastic bag.jpg" },
                    { text: "Plastic container", image: "images/Plastic/plastic container.jpg" },
                    { text: "Plastic film", image: "images/Plastic/plastic film.jpg" },
                    { text: "Shampoo, body wash bottles", image: "images/Plastic/shampoo, body wash bottles.jpg" },
                    { text: "Plastic clothes hanger", image: "images/Plastic/clothes hanger.jpg" },
                ],
                glass: [
                    { text: "Food glass bottle", image: "images/glass/food glass bottle.jpg" },
                    { text: "Beverage glass bottle", image: "images/glass/beverage glass bottle.jpg" },
                    { text: "Home-use glassware", image: "images/glass/home use glassware.jpg" },
                    { text: "Perfume glass bottle", image: "images/glass/perfume glass bottle.jpg" },
                    { text: "Cosmetic glass bottle", image: "images/glass/cosmestic glass bottle.jpg" },
                ],

                metal: [
                    { text: "Medals", image: "images/metal/medals.jpg" },
                    { text: "Metal bottle cap", image: "images/metal/metal bottle cap.jpg" },
                    { text: "Paint container", image: "images/metal/paint container.jpg" },
                    { text: "Metal cutlery", image: "images/metal/metal cutlery.jpg" },
                    { text: "Steel wool", image: "images/metal/steel wool.jpg" },
                    { text: "Food metal can", image: "images/metal/food metal can.jpg" },
                    { text: "Beverage metal can", image: "images/metal/beverage metal can.jpg" },
                    { text: "Clean aluminum tray", image: "images/metal/clean aluminum tray.jpg" },
                    { text: "Clean aluminum foil", image: "images/metal/clean aluminum foil.jpg" },
                    { text: "Empited aerosol can", image: "images/metal/aerosol can.jpg" },
                ],
                textile: [
                    { text: "Clean clothes", image: "images/textile/clothes.jpg" },
                    { text: "Cap", image: "images/textile/cap.jpg" },
                    { text: "Curtain", image: "images/textile/curtain.jpg" },
                    { text: "Pillowcase", image: "images/textile/pillowcase.jpg" },
                    { text: "Household linen", image: "images/textile/household linen.jpg" },
                    { text: "Blanket", image: "images/textile/blanket.jpg" },
                    { text: "Bedsheet", image: "images/textile/bedsheet.jpg" },
                    { text: "Shoes", image: "images/textile/shoes.jpg" },
                    { text: "Boots", image: "images/textile/boots.jpg" },
                    { text: "Soft toy", image: "images/textile/soft toy.jpg" },
                    { text: "belt", image: "images/textile/belt.jpg" },
                    { text: "Bag", image: "images/textile/bag.jpg" },
                ],
                electronics: [
                    { text: "Regulated Electronics Waste", isHeader: true },
                    { text: "Laptop", image: "images/electronics/laptop.jpg" },
                    { text: "Tablet", image: "images/electronics/tablet.jpg" },
                    { text: "Printer", image: "images/electronics/printer.jpg" },
                    { text: "Powerbank", image: "images/electronics/powerbank.jpg" },
                    { text: "Mobile phone", image: "images/electronics/mobile phone.jpg" },
                    { text: "Modem/Router", image: "images/electronics/modem or router.jpg" },
                    { text: "Light bulb", image: "images/electronics/light bulb.jpg" },
                    { text: "Fluorescent tube", image: "images/electronics/fluorescent tube.jpg" },
                    { text: "Household battery", image: "images/electronics/household battery.jpg" },
                    { text: "Computer monitor screen", image: "images/electronics/computer monitor screen.jpg" },
                    { text: "Non-regulated Electronics Waste", isHeader: true },
                    { text: "Blender", image: "images/electronics/blender.jpg" },
                    { text: "Camera", image: "images/electronics/camera.jpg" },
                    { text: "Vacuum cleaner", image: "images/electronics/vacuum cleaner.jpg" },
                    { text: "Coffee machine", image: "images/electronics/coffee machine.jpg" },
                    { text: "Fan", image: "images/electronics/fan.jpg" },
                    { text: "Game console", image: "images/electronics/game console.jpg" },
                    { text: "Hair dryer", image: "images/electronics/hair dryer.jpg" },
                    { text: "Microwave", image: "images/electronics/microwave.jpg" },
                    { text: "Rice cooker", image: "images/electronics/rice cooker.jpg" },
                    { text: "Electric toothbrush", image: "images/electronics/electric toothbrush.png" },
                ],
            },
            nonRecyclableData: {
                paper: [
                    { text: "Waxed paper", image: "images/Paper/waxed paper.jpg" },
                    { text: "Paper towel", image: "images/Paper/paper towel.jpg" },
                    { text: "Paper disposable", image: "images/Paper/paper disposable.jpg" },
                    { text: "Tissue paper", image: "images/Paper/tissue paper.jpg" },
                    { text: "Toilet paper", image: "images/Paper/toilet paper.jpg" },
                    { text: "Wooden chopsticks", image: "images/Paper/wooden chopsticks.jpg" },
                    { text: "Pizza box", image: "images/Paper/pizza box.jpg" },
                ],
                plastic: [
                    { text: "Melamine cup", image: "images/Plastic/melamine cups.jpg" },
                    { text: "Plastic cutlery", image: "images/Plastic/plastic cutlery.jpg" },
                    { text: "Drinking straw", image: "images/Plastic/drinking straw.jpg" },
                    { text: "Casette & video tapes", image: "images/Plastic/casette and video tapes.jpg" },
                    { text: "Styrofoam products", image: "images/Plastic/styrofoam product.jpg" },
                    { text: "Polystyrene foam products", image: "images/Plastic/polystyrene foam product.jpg" },
                    { text: "Expired credit card", image: "images/Plastic/expired credit card.jpg" },
                ],
                glass: [
                    { text: "Light bulb", image: "images/glass/light bulb.jpg" },
                    { text: "Bakeware", image: "images/glass/bakeware.jpg" },
                    { text: "Tempered glass", image: "images/glass/tempered glass.jpg" },
                    { text: "Windows", image: "images/glass/window glass.jpg" },
                    { text: "Mirror", image: "images/glass/mirror.jpg" },
                    { text: "Ceramic product", image: "images/glass/ceramic product.jpg" },
                    { text: "Borosilicate glassware", image: "images/glass/borosilicate glassware.jpg" },
                    { text: "Oven-safe food container", image: "images/glass/oven safe food container.jpg" },
                ],
                metal: [
                    { text: "Rusty metal can", image: "images/metal/rusty metal can.jpg" },
                    { text: "Dirty aluminum tray", image: "images/metal/dirty aluminum tray.jpg" },
                    { text: "Dirty aluminum foil", image: "images/metal/dirty aluminum foil.jpg" },
                ],
                textile: [
                    { text: "Underwear", image: "images/textile/underwear.jpg" },
                    { text: "Pillow sponge", image: "images/textile/pillow sponge.jpg" },
                    { text: "Mattress foam", image: "images/textile/mattress foam.jpg" },
                ],
                electronics: [
                    { text: "Broken lamp", image: "images/electronics/broken lamp.jpg" },
                    { text: "Broken light bulb", image: "images/electronics/broken light bulb.jpg" },
                ]
            }
        },
        zh: {
            pageTitle: "回收信息指南",
            introText: "不确定哪些物品可以回收？在下方查看！",
            items: {
                paper: "纸",
                plastic: "塑料",
                glass: "玻璃",
                metal: "金属",
                textile: "纺织品",
                electronics: "电子产品"
            },
                // Chinese translations
                disposalInstructions: {
                    eBin: "请将可回收的电子废弃物放入<span class='bin-text e-bin-text'>电子回收箱</span>",
                    blueBin: "请将可回收物品放入<span class='bin-text blue-bin-text'>蓝色回收箱</span>",
                    greenBin: "请将可回收物品放入<span class='bin-text green-bin-text'>绿色回收箱</span>",
                    textileBin: "请将可回收物品放入<span class='bin-text textile-bin-text'>纺织品回收箱</span>",
                },
                unableToFind: '找不到物品？点击此处了解更多！',
                // Add other Chinese translations here

            recyclableTitle: "是的，这些是可回收的！",
            nonRecyclableTitle: "不，这些不可回收！",
            recyclableData: {
                paper: [
                    { text: "报纸", image: "images/Paper/newspaper.jpg" },
                    { text: "蛋托", image: "images/Paper/egg tray.jpg" },
                    { text: "日历", image: "images/Paper/calendar.jpg" },
                    { text: "杂志", image: "images/Paper/magazine.jpg" },
                    { text: "教科书", image: "images/Paper/textbook.jpg" },
                    { text: "纸板", image: "images/Paper/cardboard.jpg" },
                    { text: "办公用纸", image: "images/Paper/office paper.jpg" },
                    { text: "饮料纸盒", image: "images/Paper/beverage carton.jpg" },
                    { text: "宣传册", image: "images/Paper/brochure.jpg" },
                    { text: "信封", image: "images/Paper/envelope.jpg" },
                    { text: "礼品包装纸", image: "images/Paper/gift wrapping paper.jpg" },
                    { text: "收据", image: "images/Paper/receipt.jpg" },
                    { text: "红包", image: "images/Paper/red packet.jpg" },
                    { text: "卫生纸卷筒", image: "images/Paper/toilet roll tube.jpg" },
                ],
                plastic: [
                    { text: "塑料瓶", image: "images/Plastic/bottles.jpg" },
                    { text: "光盘或DVD", image: "images/Plastic/cd or dvd.jpg" },
                    { text: "洗涤剂瓶", image: "images/Plastic/detergent bottle.jpg" },
                    { text: "塑料蛋托", image: "images/Plastic/egg tray.jpg" },
                    { text: "药瓶", image: "images/Plastic/medicine bottle.jpg" },
                    { text: "塑料袋", image: "images/Plastic/plastic bag.jpg" },
                    { text: "塑料容器", image: "images/Plastic/plastic container.jpg" },
                    { text: "塑料膜", image: "images/Plastic/plastic film.jpg" },
                    { text: "洗发水、沐浴露瓶", image: "images/Plastic/shampoo, body wash bottles.jpg" },
                    { text: "塑料衣架", image: "images/Plastic/clothes hanger.jpg" },
                ],
                glass: [
                    { text: "食品玻璃瓶", image: "images/glass/food glass bottle.jpg" },
                    { text: "饮料玻璃瓶", image: "images/glass/beverage glass bottle.jpg" },
                    { text: "家用玻璃器皿", image: "images/glass/home use glassware.jpg" },
                    { text: "香水玻璃瓶", image: "images/glass/perfume glass bottle.jpg" },
                    { text: "化妆品玻璃瓶", image: "images/glass/cosmestic glass bottle.jpg" },
                ],
                metal: [
                    { text: "奖牌", image: "images/metal/medals.jpg" },
                    { text: "金属瓶盖", image: "images/metal/metal bottle cap.jpg" },
                    { text: "油漆容器", image: "images/metal/paint container.jpg" },
                    { text: "金属餐具", image: "images/metal/metal cutlery.jpg" },
                    { text: "钢丝绒", image: "images/metal/steel wool.jpg" },
                    { text: "食品金属罐", image: "images/metal/food metal can.jpg" },
                    { text: "饮料金属罐", image: "images/metal/beverage metal can.jpg" },
                    { text: "干净的铝盘", image: "images/metal/clean aluminum tray.jpg" },
                    { text: "干净的铝箔", image: "images/metal/clean aluminum foil.jpg" },
                    { text: "空气喷雾罐", image: "images/metal/aerosol can.jpg" },
                ],
                textile: [
                    { text: "干净的衣物", image: "images/textile/clothes.jpg" },
                    { text: "帽子", image: "images/textile/cap.jpg" },
                    { text: "窗帘", image: "images/textile/curtain.jpg" },
                    { text: "枕套", image: "images/textile/pillowcase.jpg" },
                    { text: "家用亚麻制品", image: "images/textile/household linen.jpg" },
                    { text: "毯子", image: "images/textile/blanket.jpg" },
                    { text: "床单", image: "images/textile/bedsheet.jpg" },
                    { text: "鞋子", image: "images/textile/shoes.jpg" },
                    { text: "靴子", image: "images/textile/boots.jpg" },
                    { text: "毛绒玩具", image: "images/textile/soft toy.jpg" },
                    { text: "皮带", image: "images/textile/belt.jpg" },
                    { text: "包", image: "images/textile/bag.jpg" },
                ],
                electronics: [
                    { text: "受管制电子废弃物", isHeader: true },
                    { text: "笔记本电脑", image: "images/electronics/laptop.jpg" },
                    { text: "平板电脑", image: "images/electronics/tablet.jpg" },
                    { text: "打印机", image: "images/electronics/printer.jpg" },
                    { text: "充电宝", image: "images/electronics/powerbank.jpg" },
                    { text: "手机", image: "images/electronics/mobile phone.jpg" },
                    { text: "调制解调器/路由器", image: "images/electronics/modem or router.jpg" },
                    { text: "灯泡", image: "images/electronics/light bulb.jpg" },
                    { text: "荧光灯管", image: "images/electronics/fluorescent tube.jpg" },
                    { text: "家用电池", image: "images/electronics/household battery.jpg" },
                    { text: "电脑显示器", image: "images/electronics/computer monitor screen.jpg" },
                    { text: "非受管制电子废弃物", isHeader: true },
                    { text: "搅拌机", image: "images/electronics/blender.jpg" },
                    { text: "相机", image: "images/electronics/camera.jpg" },
                    { text: "吸尘器", image: "images/electronics/vacuum cleaner.jpg" },
                    { text: "咖啡机", image: "images/electronics/coffee machine.jpg" },
                    { text: "风扇", image: "images/electronics/fan.jpg" },
                    { text: "游戏机", image: "images/electronics/game console.jpg" },
                    { text: "吹风机", image: "images/electronics/hair dryer.jpg" },
                    { text: "微波炉", image: "images/electronics/microwave.jpg" },
                    { text: "电饭煲", image: "images/electronics/rice cooker.jpg" },
                    { text: "电动牙刷", image: "images/electronics/electric toothbrush.png" },
                ],
            },
            nonRecyclableData: {
                paper: [
                    { text: "蜡纸", image: "images/Paper/waxed paper.jpg" },
                    { text: "纸巾", image: "images/Paper/paper towel.jpg" },
                    { text: "一次性纸制品", image: "images/Paper/paper disposable.jpg" },
                    { text: "面巾纸", image: "images/Paper/tissue paper.jpg" },
                    { text: "卫生纸", image: "images/Paper/toilet paper.jpg" },
                    { text: "木筷子", image: "images/Paper/wooden chopsticks.jpg" },
                    { text: "披萨盒", image: "images/Paper/pizza box.jpg" },
                ],
                plastic: [
                    { text: "美耐皿杯", image: "images/Plastic/melamine cups.jpg" },
                    { text: "塑料餐具", image: "images/Plastic/plastic cutlery.jpg" },
                    { text: "饮用吸管", image: "images/Plastic/drinking straw.jpg" },
                    { text: "磁带和录像带", image: "images/Plastic/casette and video tapes.jpg" },
                    { text: "泡沫塑料制品", image: "images/Plastic/styrofoam product.jpg" },
                    { text: "聚苯乙烯泡沫制品", image: "images/Plastic/polystyrene foam product.jpg" },
                    { text: "过期信用卡", image: "images/Plastic/expired credit card.jpg" },
                ],
                glass: [
                    { text: "灯泡", image: "images/glass/light bulb.jpg" },
                    { text: "烤盘", image: "images/glass/bakeware.jpg" },
                    { text: "钢化玻璃", image: "images/glass/tempered glass.jpg" },
                    { text: "窗户玻璃", image: "images/glass/window glass.jpg" },
                    { text: "镜子", image: "images/glass/mirror.jpg" },
                    { text: "陶瓷制品", image: "images/glass/ceramic product.jpg" },
                    { text: "硼硅酸盐玻璃器皿", image: "images/glass/borosilicate glassware.jpg" },
                    { text: "耐热食品容器", image: "images/glass/oven safe food container.jpg" },
                ],
                metal: [
                    { text: "生锈的金属罐", image: "images/metal/rusty metal can.jpg" },
                    { text: "脏的铝盘", image: "images/metal/dirty aluminum tray.jpg" },
                    { text: "脏的铝箔", image: "images/metal/dirty aluminum foil.jpg" },
                ],
                textile: [
                    { text: "内衣", image: "images/textile/underwear.jpg" },
                    { text: "枕头海绵", image: "images/textile/pillow sponge.jpg" },
                    { text: "床垫泡沫", image: "images/textile/mattress foam.jpg" },
                ],
                electronics: [
                    { text: "破损的灯", image: "images/electronics/broken lamp.jpg" },
                    { text: "破损的灯泡", image: "images/electronics/broken light bulb.jpg" },
                ]
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
            const translatedText = translations[lang].items[item];
            tile.querySelector('.info-tile-text').textContent = translatedText;
          });

        // Update language button styles
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
        document.getElementById('lang-zh').classList.toggle('active', lang === 'zh');
    
        // Update the recycling info if an item is selected
        if (selectedItem) {
            updateRecyclingInfo(selectedItem);
        }
    
        // Clear any greyed-out states
        document.querySelectorAll('.item-tile').forEach(tile => {
            tile.classList.remove('greyed-out');

        // Update disposal instructions
        document.querySelector('.disposal-instruction.e-bin h4').innerHTML = translations[lang].disposalInstructions;
        document.querySelector('.disposal-instruction.blue-bin h4').innerHTML = translations[lang].disposalInstructions;
        document.querySelector('.disposal-instruction.textile-bin h4').innerHTML = translations[lang].disposalInstructions;
        document.querySelector('.disposal-instruction.green-bin h4').innerHTML = translations[lang].disposalInstructions;
        
        // Update unable to find text
        document.querySelector('.unable-to-find-caption-link h5').innerHTML = translations[lang].unableToFind;

        // Update recyclable and non-recyclable titles
        document.querySelector('.recyclable-title').textContent = translations[lang].recyclableTitle;
        document.querySelector('.non-recyclable-title').textContent = translations[lang].nonRecyclableTitle;
});

    }

    function updateRecyclingInfo(item) {
        const recyclableElement = document.getElementById('recyclable');
        const nonRecyclableElement = document.getElementById('non-recyclable');
    
        // Show the info boxes
        recyclableElement.style.display = 'block';
        nonRecyclableElement.style.display = 'block';

        function createItemElements(data) {
            let html = '';
        
            data.forEach(item => {
                if (item.isHeader || item.isSubHeader) {
                    html += `
                        <div class="subheader-row">
                            <h4 class="subheader">${item.text}</h4>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="info-tile" style="background-image: url('${item.image || ''}')">
                            <span class="item-tile-text">${item.text || ''}</span>
                        </div>
                    `;
                }
            });
        
            return `
                <div class="info-tiles-wrapper">
                    ${html}
                </div>
            `;
        }
    
        let recyclableContent = `
            <h3 class="recyclable-title">${translations[currentLanguage].recyclableTitle || ''}</h3>
        `;
    
        if (item === 'electronics') {
            recyclableContent += `
                <p class="electronics-info">${translations[currentLanguage].electronicsInfo || ''}</p>
            `;
        }
    
        recyclableContent += createItemElements(translations[currentLanguage].recyclableData[item] || []);
    
        // Add the new row for recyclable items (paper, plastic, glass, metal)
        if (['paper', 'plastic', 'glass', 'metal'].includes(item)) {
            recyclableContent += `
                <div class="disposal-instruction blue-bin">
                    <h4>Place recyclables in Blue Bin</h4>
                </div>
                <div class="bin-content-container blue-bin-content">
                    <div class="bin-image-wrapper">
                        <div class="bin-image-container">
                            <img src="images/Main/blue bin.jpg" alt="Blue Bin" class="bin-image">
                        </div>
                    </div>
                </div>
                <div class="bin-caption-container">
                        <a href="https://www.nea.gov.sg/our-services/waste-management/waste-collection-systems" class="caption-link">
                        <p><strong>Click HERE to find out where the bins are located!</strong></p>
                     </a>
                </div>
            `;
        }

    // Add the new row for textile
    if (item === 'textile') {
        recyclableContent += `
            <div class="disposal-instruction textile-bin">
                <h4>Place recyclables in Textile Bin</h4>
            </div>
            <div class="bin-content-container">
                <div class="bin-image-wrapper">
                    <div class="bin-image-container">
                        <img src="images/Main/textile bin.jpg" alt="Textile Bin" class="bin-image">
                    </div>
                </div>
                <div class="bin-caption-container">
                    <a href="https://www.google.com/maps/d/viewer?mid=1lC9ANeqb5ik94u7oZEtkccG-k4iCFaE&ll=1.358088337051256%2C103.82508924999999&z=11" class="caption-link">
                        <p><strong>Click HERE to find out where the bins are located!</p>
                    </a>
                </div>
            </div>
        `;
    }

    // Add the new row for electronics
    if (item === 'electronics') {
        recyclableContent += `
            <div class="disposal-instruction e-bin">
                <h4>Place recyclables in e-Bin</h4>
            </div>
            <div class="bin-content-container e-bin-content">
                <div class="bin-image-wrapper">
                    <div class="bin-image-container">
                        <img src="images/Main/e-bin1.jpg" alt="e-Bin1" class="bin-image">
                        <img src="images/Main/e-bin2.jpg" alt="e-Bin2" class="bin-image">
                        <img src="images/Main/e-bin3.jpg" alt="e-Bin3" class="bin-image">
                        <img src="images/Main/RE e-bin.jpg" alt=" Regulated waste e-Bin" class="bin-image">
                        <img src="images/Main/RE e-bin1.jpg" alt="Regulated waste e-Bin1" class="bin-image">
                        <img src="images/Main/RE e-bin2.jpg" alt="Regulated waste e-Bin2" class="bin-image">
                    </div>
                </div>
            </div>
            <div class="bin-caption-container">
                <a href="https://alba-ewaste.sg/drop-off-locations/" class="caption-link">
                    <p><strong>Click HERE to find out where the regulated e-Bins are located!</strong></p>
                </a>
                <a href="https://www.nea.gov.sg/our-services/waste-management/3r-programmes-and-resources/e-waste-management/where-to-recycle-e-waste" class="caption-link">
                    <p><strong>Click HERE to find out where the non-regulated e-Bins are located!</strong></p>
                </a>
            </div>
        `;
}

        recyclableElement.innerHTML = recyclableContent;
    
        let nonRecyclableContent = `
        <h3 class="non-recyclable-title">${translations[currentLanguage].nonRecyclableTitle || ''}</h3>
    `;

    nonRecyclableContent += createItemElements(translations[currentLanguage].nonRecyclableData[item] || []);

    // Add the new row for non-recyclable items (all categories)
    nonRecyclableContent += `
        <div class="disposal-instruction green-bin">
            <h4>${translations[currentLanguage].disposeInGreenBin || 'Dispose in Green Bin'}</h4>

        </div>
                    
                <div class="bin-image-wrapper">
                    <div class="bin-image-container">
                    <img src="images/Main/green bin.jpg" alt="Green Bin" class="bin-image">
                </div>
                <div class="bin-caption-container">
                    <p><strong>You may dispose them as general waste.</p>
                </div>
            </div>
    `;

    nonRecyclableElement.innerHTML = nonRecyclableContent;
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
            
            // Hide all info boxes
            document.getElementById('recyclable').style.display = 'none';
            document.getElementById('non-recyclable').style.display = 'none';
            
            // Update info and show boxes for the clicked item
            updateRecyclingInfo(item);
            
            // Remove greyed-out class from all tiles
            document.querySelectorAll('.item-tile').forEach(t => {
                t.classList.remove('greyed-out');
            });
            
            // Add greyed-out class to all tiles except the clicked one
            document.querySelectorAll('.item-tile:not([data-item="' + item + '"])').forEach(t => {
                t.classList.add('greyed-out');
            });
        });
    });

            // Clear any greyed-out states on page load
            document.querySelectorAll('.item-tile').forEach(tile => {
                tile.classList.remove('greyed-out');
            });

    // Set the initial language on page load
    updateLanguage(currentLanguage);
})