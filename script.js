let currentStep = 1;
const totalSteps = 3;
let selectedTheme = null;

// Apply Theme
function applyTheme(themeId) {
    selectedTheme = themeId;
    document.querySelectorAll('.theme-card').forEach((card, index) => {
        card.classList.toggle('active', index === themeId - 1);
    });
}

// Move to Next Step
function nextStep() {
    if (currentStep === 1) {
        if (!selectedTheme) {
            alert('Please select a theme before proceeding.');
            return;
        }
    } else if (currentStep === 2) {
        const productType = document.getElementById('productType').value;
        if (!productType) {
            alert('Product Type is mandatory.');
            return;
        }
    } else if (currentStep === 3) {
        const product = {
            name: document.getElementById('productName').value || "No Name",
            description: document.getElementById('productDescription').value || "No Description",
            image: document.getElementById('previewImg').src,
            listPrice: parseFloat(document.getElementById('listPrice').value) || 0,
            netPrice: parseFloat(document.getElementById('netPrice').value) || 0,
            discountPercentage: parseFloat(document.getElementById('discountPercentage').value) || 0,
            shippingCharges: parseFloat(document.getElementById('shippingCharges').value) || 0,
            stockLevel: parseInt(document.getElementById('stockLevel').value) || 0
        };

        // Store product data in LocalStorage
        localStorage.setItem('product', JSON.stringify(product));

        // Redirect to dashboard
        window.location.href = "dashboard.html";
        return;
    }

    // Move to the next step
    if (currentStep < totalSteps) {
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        currentStep++;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    }
}

// Move to Previous Step
function previousStep() {
    if (currentStep > 1) {
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        currentStep--;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    }
}

// Live Preview
function updatePreview() {
    const productName = document.getElementById('productName').value || "Product Name";
    const productDescription = document.getElementById('productDescription').value || "No Description";

    document.getElementById('previewName').innerText = productName;
    document.getElementById('previewDescription').innerText = productDescription;
}

// Image Upload Preview
function uploadImage(event) {
    const reader = new FileReader();
    reader.onload = () => document.getElementById('previewImg').src = reader.result;
    reader.readAsDataURL(event.target.files[0]);
}

// Calculate the discounted price
function calculatePrice() {
    const listPrice = parseFloat(document.getElementById('listPrice').value) || 0;
    const discountPercentage = parseFloat(document.getElementById('discountPercentage').value) || 0;

    let netPrice = listPrice - (listPrice * discountPercentage / 100);
    document.getElementById('netPrice').value = netPrice.toFixed(2);

    // Update price in the preview
    let priceText = discountPercentage > 0
        ? `<s>₹${listPrice.toFixed(2)}</s> ₹${netPrice.toFixed(2)}`
        : `₹${listPrice.toFixed(2)}`;
    
    document.getElementById('priceDetails').innerHTML = priceText;
}
