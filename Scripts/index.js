let bagItems;

const onLoad=()=>{
    const bagItemsStr=localStorage.getItem('bagItem');
    bagItems=bagItemsStr? JSON.parse(bagItemsStr): []; 
    
    displayHomePage();
    displayBagIcon();
    
    
}
const displayBagIcon=()=>{
    const bagItemCount=document.querySelector(".bag-item-count");
    if(bagItems.length>0)
   {
        bagItemCount.style.visibility='visible';
     bagItemCount.textContent=bagItems.length;

}
    else
    bagItemCount.style.visibility='hidden';

    console.log(bagItems.length);

}
const addToBag=(itemId)=>{
    bagItems.push(itemId)
    localStorage.setItem('bagItem',JSON.stringify(bagItems))
    displayBagIcon();

}

const displayHomePage=()=>{
let innerHtml=''
   
    const itemsContainer=document.querySelector(".items-container");
    if(itemsContainer==null)
    return;
   
    items.forEach((item)=>{
        innerHtml+=` <div class="item-container">
        <img class="item-image" src="${item.image}" alt="item-image">
        <div class="rating">
           ${item.rating.stars}⭐ | ${item.rating.count}
        </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>`
    })
    itemsContainer.innerHTML=innerHtml;

}

onLoad();