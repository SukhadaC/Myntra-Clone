const convinienceFee=99;
let bagItemsObjects=[];
const onLoadBag=()=>{
    loadBagItems();
    displayBagItems();
    displayBagSummary();

   
}
const displayBagSummary=()=>{
  let bagSummaryElement=document.querySelector('.bag-summary');
  let totalItems=bagItemsObjects.length;
  let totalMrp=0;
  let totalDiscount=0;
  let finalPayment=0;
  bagItemsObjects.forEach(bagItem=>{
    totalMrp+=bagItem.original_price;
    totalDiscount+=bagItem.original_price-bagItem.current_price;


  });
  if(totalMrp-totalDiscount>0)
  finalPayment=totalMrp-totalDiscount+convinienceFee;
else
finalPayment=0;
  bagSummaryElement.innerHTML=`
  <div class="bag-details-container">
                <div class="price-header">Price Details (${totalItems} items)</div>
                <div class="price-item">
                    <span class="price-item-bag">Total MRP</span>
                    <span class="price-item-value">₹ ${totalMrp}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-bag">Discount on MRP</span>
                    <span class="price-item-value priceDetail-base-discount">₹-(${totalDiscount})</span>
                </div>
                <div class="price-item">
                    <span class="price-item-bag">Convinence Fee</span>
                    <span class="price-item-value">₹ 99</span>
                </div>
                <div class="price-footer">
                    <span class="price-item-bag">Total Price</span>
                    <span class="price-item-value">₹ ${finalPayment}</span>
                </div>
            </div>
            <button class="btn-place-order">
                <div class="css-xjhrni">Place Order</div>
            </button>
  `
}
let loadBagItems=()=>{
   
    bagItemsObjects=bagItems.map(itemId=>{
        for(let i=0;i<items.length;i++)
        {
            if(itemId==items[i].id)
            {
                return items[i];
            }
        }
    });
}

const displayBagItems=()=>{
    const containerElement=document.querySelector('.bag-items-container');
    innerHtml='';
    bagItemsObjects.forEach(bagItem => {
        innerHtml+=generateItemHTML(bagItem);
    });
    containerElement.innerHTML+=innerHtml;
    

}
const removeFromBag=(itemId)=>{
  bagItems=bagItems.filter(bagItemId=>bagItemId != itemId);
  localStorage.setItem('bagItem',JSON.stringify(bagItems))
  const containerElement=document.querySelector('.bag-items-container');
  containerElement.innerHTML=``;
  loadBagItems();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}
const generateItemHTML=(item)=>{
    return ` <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`
}

onLoadBag();