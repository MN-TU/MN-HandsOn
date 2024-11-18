import translations from './translations.js';

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

    // Initialize language
    updateLanguage(currentLanguage);

    // Event listeners for language buttons
    document.getElementById('lang-en').addEventListener('click', function () {
        updateLanguage('en');
    });

    document.getElementById('lang-zh').addEventListener('click', function () {
        updateLanguage('zh');

    });

    document.getElementById('lang-ms').addEventListener('click', function () {
        updateLanguage('ms');
    });
    document.getElementById('lang-ta').addEventListener('click', function () {
        updateLanguage('ta');
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

    function updateLanguage(lang) {
        currentLanguage = lang;
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        // Update other language-specific elements
        //document.getElementById('unable-to-find').textContent = translations[lang].unableToFind;

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
    
        recyclableElement.style.display = 'block';
        nonRecyclableElement.style.display = 'block';
    
        function createItemElements(data) {
            let html = '';
            let isElectronics = data.some(item => item.text === "Regulated Electronics Waste" || item.text === "受管制电子废弃物");
        
            if (isElectronics) {
                html += `<h3 class="recyclable-subtitle"></h3>`;
            }
        
            data.forEach(item => {
                if (item.isHeader) {
                    html += `<div class="subheader-row full-width"><h4 class="subheader">${item.text}</h4></div>`;
                } else {
                    html += `
                        <div class="info-tile" style="background-image: url('${item.image}')">
                            <span class="item-tile-text">${item.text}</span>
                        </div>
                    `;
                }
            });
            return html;
        }
    
        let recyclableContent = `
            <h3 class="recyclable-title">${translations[currentLanguage].recyclableTitle}</h3>
            <div class="info-tiles-wrapper">
                ${createItemElements(translations[currentLanguage].recyclableData[item] || [])}
            </div>
        `;
    
        if (['paper', 'plastic', 'glass', 'metal'].includes(item)) {
            recyclableContent += `
                <div class="disposal-instruction blue-bin">
                    ${translations[currentLanguage].disposalInstructions.blueBin}
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
                        <p><strong>${translations[currentLanguage].binCaption.blueBin}</strong></p>
                    </a>
                </div>
                
            `;
        } else if (item === 'textile') {
            recyclableContent += `
                <div class="disposal-instruction textile-bin">
                    ${translations[currentLanguage].disposalInstructions.textileBin}
                </div>
                <div class="bin-content-container textile-bin-content">
                    <div class="bin-image-wrapper">
                        <div class="bin-image-container">
                            <img src="images/Main/textile bin.jpg" alt="Textile Bin" class="bin-image">
                        </div>
                    </div>
                </div>
                <div class="bin-caption-container">
                    <a href="https://www.google.com/maps/d/viewer?mid=1lC9ANeqb5ik94u7oZEtkccG-k4iCFaE&ll=1.358088337051256%2C103.82508924999999&z=11" class="caption-link">
                        <p><strong>${translations[currentLanguage].binCaption.textileBin}</strong></p>
                    </a>
                </div>
            `;
        } else if (item === 'electronics') {
            recyclableContent += `
                <div class="disposal-instruction e-bin">
                ${translations[currentLanguage].disposalInstructions.eBin}
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
                    <p><strong>${translations[currentLanguage].binCaption.eBinRegulated}</strong></p>
                </a>
                <a href="https://www.nea.gov.sg/our-services/waste-management/3r-programmes-and-resources/e-waste-management/where-to-recycle-e-waste" class="caption-link">
                    <p><strong>${translations[currentLanguage].binCaption.eBinIrregulated}</strong></p>
                </a>
            </div>
            `;
        }
        
    
        recyclableElement.innerHTML = recyclableContent;
    
        let nonRecyclableContent = `
            <h3 class="non-recyclable-title">${translations[currentLanguage].nonRecyclableTitle}</h3>
            <div class="info-tiles-wrapper">
                ${createItemElements(translations[currentLanguage].nonRecyclableData[item] || [])}
            </div>
            <div class="disposal-instruction green-bin">
                ${translations[currentLanguage].disposalInstructions.greenBin}
            </div>
            <div class="bin-content-container green-bin-content">
                <div class="bin-image-wrapper">
                    <div class="bin-image-container">
                        <img src="images/Main/green bin.jpg" alt="Green Bin" class="bin-image">
                    </div>
                </div>
            <div class="bin-caption-container">
                        <p><strong>${translations[currentLanguage].binCaption.greenBin}</strong></p>
                </div>
            <div class="bin-caption-container">
                <p><strong>${translations[currentLanguage].binCaption.greenBin}</strong></p>
            </div>
        `;
    
        nonRecyclableElement.innerHTML = nonRecyclableContent;
    }
})
