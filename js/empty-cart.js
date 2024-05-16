import {
    getCart,
    getProducts,
    getProductInCart,
    setProductInCart,
    ProductInCart,
    addToCart,
    removeFromCart,
    parseImage,
    parsePrice
} from './api.js';

const productsContainer = document.querySelector('.cart__grid-list');
const totalProducts = document.querySelector('.cart__grid-total');
let allProducts;

document.addEventListener("DOMContentLoaded", async () => {
    allProducts = await getProducts();
    renderPage();
});

const renderPage = () => {
    const productsInCart = getCart();

    /** @type {ProductInCart[]} */
    const filteredProducts = allProducts
        .filter(p => Object.keys(productsInCart).includes(p.id))
        .map(p => {
            return {
                ...p,
                amount: getProductInCart(p.id)
            }
        });
    
    showProducts(filteredProducts);
}

/** @param {ProductInCart[]} data */
const showProducts = (data) => {
    while (productsContainer.firstChild) {
        productsContainer.removeChild(productsContainer.firstChild);
    }
    for (const product of data) {
        const productElement = document.createElement('li');
        productElement.classList.add('cart__grid-item');
        // IMAGE
        const productImage = new Image(124, 129);
        productImage.src = parseImage(product.image);
        productImage.alt = product.name;
        productImage.classList.add('cart__grid-img');
        productElement.appendChild(productImage);

        // NAME + QUANTITY
        const nameQuantityContainer = document.createElement('div');
        nameQuantityContainer.classList.add('cart__grid-wrapper--first');
        // Name
        const productName = document.createElement('p');
        const productNameText = document.createTextNode(product.name);
        productName.appendChild(productNameText);
        productName.classList.add('cart__grid-name');
        nameQuantityContainer.appendChild(productName);
        // Quantity
        const productQuantity = document.createElement('div');
        productQuantity.classList.add('cart__grid-quantity');
        // quantity title
        const productQuantityTitle = document.createElement('p');
        const productQuantityTitleText = document.createTextNode('Количество:');
        productQuantityTitle.appendChild(productQuantityTitleText);
        productQuantityTitle.classList.add('cart__grid-quantity__title');
        productQuantity.appendChild(productQuantityTitle);
        // quantity content
        const productQuantityContent = document.createElement('div');
        productQuantityContent.classList.add('quantity__wrapper');
        // - 1
        const productQuantityDecreaseButton = document.createElement('button');
        productQuantityDecreaseButton.classList.add('cart__grid-button--remove');
        productQuantityDecreaseButton.addEventListener('click', (e) => {
            e.preventDefault();
            removeFromCart(product.id);
            renderPage();
        });
        const productQuantityDecreaseButtonImage = new Image(30, 30);
        productQuantityDecreaseButtonImage.src = '../img/cart/buttons/remove.svg';
        productQuantityDecreaseButton.appendChild(productQuantityDecreaseButtonImage);
        // amount
        const productQuantityContentValue = document.createElement('span');
        productQuantityContentValue.classList.add('cart__grid-quantity__value');
        const productQuantityContentValueText = document.createTextNode(product.amount);
        productQuantityContentValue.appendChild(productQuantityContentValueText);
        // + 1
        const productQuantityIncreaseButton = document.createElement('button');
        productQuantityIncreaseButton.classList.add('cart__grid-button--add');
        productQuantityIncreaseButton.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(product.id);
            renderPage();
        });
        const productQuantityIncreaseButtonImage = new Image(30, 30);
        productQuantityIncreaseButtonImage.src = '../img/cart/buttons/add.svg';
        productQuantityIncreaseButton.appendChild(productQuantityIncreaseButtonImage);
        // add to wrapper
        productQuantityContent.appendChild(productQuantityDecreaseButton);
        productQuantityContent.appendChild(productQuantityContentValue);
        productQuantityContent.appendChild(productQuantityIncreaseButton);
        //
        productQuantity.appendChild(productQuantityContent);
        nameQuantityContainer.appendChild(productQuantity);
        //
        productElement.appendChild(nameQuantityContainer);
        // PRICE + REMOVE
        const priceRemoveWrapper = document.createElement('div');
        priceRemoveWrapper.classList.add('cart__grid-wrapper--second');
        // price
        const priceWapper = document.createElement('div');
        priceWapper.classList.add('cart__grid-price');
        // old price
        if (product.oldPrice) {
            const oldPrice = document.createElement('span');
            oldPrice.classList.add('cart__grid-price--old');
            const oldPriceText = document.createTextNode(parsePrice(product.oldPrice));
            oldPrice.appendChild(oldPriceText);
            priceWapper.appendChild(oldPrice);
        }
        // current price
        const currentPrice = document.createElement('p');
        currentPrice.classList.add('cart__grid-price--now');
        const currentPriceText = document.createTextNode(parsePrice(product.price));
        currentPrice.appendChild(currentPriceText);
        priceWapper.appendChild(currentPrice);
        priceRemoveWrapper.appendChild(priceWapper);
        // remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('cart__grid-button--delete');
        removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            setProductInCart(product.id, 0);
            renderPage();
        });
        // remove button image (svg)
        const removeButtonImage = new Image(30, 30);
        removeButtonImage.src = '../img/cart/buttons/delete.svg';

        removeButton.appendChild(removeButtonImage);
        removeButton.style.width = 
        priceRemoveWrapper.appendChild(removeButton);
        productElement.appendChild(priceRemoveWrapper);
        // finish!!!
        productsContainer.appendChild(productElement);
    }
}

{/* <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0H22C24.8003 0 26.2004 0 27.27 0.544967C28.2108 1.02433 28.9757 1.78924 29.455 2.73005C30 3.79961 30 5.19974 30 8V22C30 24.8003 30 26.2004 29.455 27.27C28.9757 28.2108 28.2108 28.9757 27.27 29.455C26.2004 30 24.8003 30 22 30H8C5.19974 30 3.79961 30 2.73005 29.455C1.78924 28.9757 1.02433 28.2108 0.544967 27.27C0 26.2004 0 24.8003 0 22V8Z" fill="#F0EAD2"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0835 18.9165C11.5312 18.9165 11.0835 18.4688 11.0835 17.9165L11.0835 14.4165C11.0835 13.8642 11.5312 13.4165 12.0835 13.4165C12.6358 13.4165 13.0835 13.8642 13.0835 14.4165L13.0835 17.9165C13.0835 18.4688 12.6358 18.9165 12.0835 18.9165Z" fill="#6C584C"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9165 18.9165C17.3642 18.9165 16.9165 18.4688 16.9165 17.9165L16.9165 14.4165C16.9165 13.8642 17.3642 13.4165 17.9165 13.4165C18.4688 13.4165 18.9165 13.8642 18.9165 14.4165L18.9165 17.9165C18.9165 18.4688 18.4688 18.9165 17.9165 18.9165Z" fill="#6C584C"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.64463 9.64781C6.18212 9.58562 5.55441 9.5835 4.58333 9.5835H4.5V7.5835H4.58333C4.60535 7.5835 4.6273 7.5835 4.64916 7.5835C4.69256 7.5835 4.73566 7.58349 4.77847 7.5835H25.2215C25.2643 7.58349 25.3074 7.5835 25.3508 7.5835L25.5 7.5835V9.5835H25.4167C24.4456 9.5835 23.8179 9.58562 23.3554 9.64781C22.9216 9.70612 22.7857 9.80027 22.7096 9.87639C22.6334 9.95252 22.5393 10.0885 22.481 10.5222C22.4188 10.9847 22.4167 11.6124 22.4167 12.5835L22.4167 19.816C22.4167 20.7025 22.4168 21.4663 22.3345 22.078C22.2464 22.7335 22.0476 23.3618 21.538 23.8715C21.0283 24.3811 20.4 24.5799 19.7445 24.668C19.1328 24.7503 18.369 24.7502 17.4825 24.7502H12.5175C11.631 24.7502 10.8672 24.7503 10.2555 24.668C9.60003 24.5799 8.97167 24.3811 8.46201 23.8715C7.95235 23.3618 7.75361 22.7335 7.66547 22.078C7.58324 21.4663 7.58328 20.7025 7.58333 19.816L7.58333 12.5835C7.58333 11.6124 7.58121 10.9847 7.51903 10.5222C7.46071 10.0885 7.36656 9.95252 7.29044 9.87639C7.21432 9.80027 7.07837 9.70612 6.64463 9.64781ZM20.6399 9.5835H9.36008C9.42624 9.80167 9.47045 10.027 9.50119 10.2557C9.58343 10.8674 9.58338 11.6312 9.58334 12.5177C9.58333 12.5395 9.58333 12.5615 9.58333 12.5835V19.7502C9.58333 20.7212 9.58546 21.349 9.64764 21.8115C9.70595 22.2452 9.8001 22.3811 9.87623 22.4573C9.95235 22.5334 10.0883 22.6275 10.522 22.6859C10.9845 22.748 11.6123 22.7502 12.5833 22.7502H17.4167C18.3877 22.7502 19.0155 22.748 19.478 22.6859C19.9117 22.6275 20.0476 22.5334 20.1238 22.4573C20.1999 22.3811 20.294 22.2452 20.3524 21.8115C20.4145 21.349 20.4167 20.7212 20.4167 19.7502L20.4167 12.5177C20.4166 11.6312 20.4166 10.8674 20.4988 10.2557C20.5296 10.027 20.5738 9.80167 20.6399 9.5835Z" fill="#6C584C"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8881 3.66779C17.2686 3.25479 16.3418 2.9165 15.0001 2.9165C13.6584 2.9165 12.7315 3.25489 12.112 3.66799C11.8068 3.87146 11.5904 4.08383 11.4427 4.26102C11.3692 4.34931 11.3131 4.42836 11.2718 4.49265C11.2512 4.52479 11.2342 4.55327 11.2205 4.57742C11.2136 4.5895 11.2076 4.6005 11.2024 4.61034L11.1951 4.62423L11.1919 4.63051L11.1904 4.63347L11.1897 4.63491C11.1893 4.63562 11.189 4.63632 12.0657 5.07458L11.189 4.63633C10.942 5.13033 11.1423 5.73098 11.6363 5.97792C12.1172 6.2183 12.6991 6.03491 12.9575 5.56934C12.9612 5.56404 12.9684 5.55437 12.9793 5.54121C13.014 5.4996 13.0892 5.42023 13.2216 5.33197C13.4771 5.1616 14.0085 4.9165 15.0001 4.9165C15.9918 4.9165 16.5232 5.16155 16.7787 5.33189C16.9111 5.42013 16.9863 5.49947 17.0209 5.54106C17.0319 5.55421 17.039 5.56387 17.0428 5.56917C17.3012 6.03469 17.8831 6.21802 18.364 5.9776C18.858 5.73061 19.0582 5.12994 18.8112 4.63596L17.9168 5.08317C18.8112 4.63596 18.8108 4.63525 18.8105 4.63454L18.8098 4.6331L18.8083 4.63014L18.8051 4.62386L18.7978 4.60997C18.7925 4.60013 18.7865 4.58913 18.7797 4.57706C18.766 4.55291 18.749 4.52442 18.7283 4.49228C18.687 4.42801 18.631 4.34897 18.5574 4.26069C18.4098 4.08353 18.1933 3.87121 17.8881 3.66779Z" fill="#6C584C"></path>
</svg> */}