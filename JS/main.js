let submit=document.getElementById('submit'),
    form=document.getElementById('form-list'),
    head=document.querySelector('.head'),
    edits=document.querySelectorAll('.fa-edit'),
    pName=document.getElementById("name"),
    price=document.getElementById('price'),
    discount=document.getElementById('discount'),
    total=document.getElementById('total'),
    category=document.getElementById('category'),
    amount=document.getElementById('amount'),
    tbody=document.querySelector('tbody'),
    deleteAll=document.getElementById('deletAll');


let mood='Create';
let temp;

let dataProduct;
if(localStorage.product!=null){
    dataProduct=JSON.parse(localStorage.getItem('product'));
    showData(dataProduct);
}else{
    dataProduct=[];
};

// get Total 
function getTotal(){
    if(price.value !==''){
        let result= +price.value - (+price.value* +discount.value)/100;
        return result;
    }

}    

//Create Product
submit.onclick=(e)=>{
    e.preventDefault();
    if(pName.value==''||price.value==''||category.value==''){
        alert('Please Enetr valid Product')
    }else{
        let newProduct={
            name:pName.value.toLowerCase(),
            price:price.value,
            discount:discount.value,
            total:getTotal(),
            category:category.value,
            amount:amount.value,
        }

        if(mood==='Create'){
                dataProduct.push(newProduct);
        }else{
            dataProduct[temp]=newProduct;
            submit.value='Create';
            head.innerHTML='Create';
            mood='Create';
        }
        localStorage.setItem('product',JSON.stringify(dataProduct));
        clearInput();
        //Show Data
        showData(dataProduct);
    }
};





//claer All Input
function clearInput(){
    pName.value='';
    price.value='';
    discount.value='';
    category.value='';
    amount.value='';

}



function showData(arr){
    tbody.innerHTML='';
    arr.forEach((product,index) => {
        let row=document.createElement('tr');
        row.innerHTML=`<td>${index}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.discount}%</td>
                        <td>${product.total}</td>
                        <td>${product.category}</td>
                        <td>${product.amount}</td>
                        <td>
                            <span onclick='updatePro(${index})' class="btn btn-success py-1 px-3 btn-sm edit">Edit</span>
                            <span onclick='deletePro(${index})' class="btn btn-danger py-1 btn-sm delete">Delete</span>
                        </td>
                        `
        tbody.appendChild(row);                
    });
    if(dataProduct.length>0){
        deleteAll.classList.remove('show');
    }else{
        deleteAll.classList.add('show');
    }
}


//Update Product
function updatePro(i){
    let ele=dataProduct[i];
    pName.value=ele.name.toLowerCase();
    price.value=ele.price;
    discount.value=ele.discount;
    category.value=ele.category;
    amount.value=ele.amount;
    submit.value='Update';
    head.innerHTML='Update';
    mood='Update';
    temp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//SearchProducts
function SearchProducts(serach_input){
    let newDate=[]
    dataProduct.forEach(element => {
        if(element.name.toLowerCase().includes(serach_input.toLowerCase())){
            newDate.push(element);
            showData(newDate);
        }
    });
}


//Delete Product
function deletePro(index){
    dataProduct.splice(index,1);
    localStorage.setItem('product',JSON.stringify(dataProduct));
    showData(dataProduct);
}

// Delete All Products 
function deleteAllProducts(){
    localStorage.clear();
    dataProduct=[];
    showData(dataProduct);
}
