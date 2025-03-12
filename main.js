// get total 






// fitch the element 
let myInputs = document.querySelector(".inputs")
let myTitle = document.getElementById("title");
let myPrice = document.getElementById("price")
let myTaxes = document.getElementById("taxes")
let myAds = document.getElementById("ads")
let myDiscount = document.getElementById("discount")
let myTotal = document.getElementById("total")

let myCount = document.getElementById("count")
let myCategory = document.getElementById("category")
let myCreate = document.getElementById("create")
let mySearch = document.getElementById("search")




let DataTable = document.getElementById("DataTable");










// get total 
function getTotal() {


    if (myPrice.value != "") {

        let result = (+myPrice.value + +myTaxes.value + +myAds.value) - +myDiscount.value;
        myTotal.innerHTML = result;
        myTotal.style.backgroundColor = "white";
    } else {
        myTotal.style.backgroundColor = "red";
        myTotal.innerHTML = "";
    }

}















//  1 Create the Data 
let MyArray;
if (localStorage.product != null) {

    MyArray = JSON.parse(localStorage.product);
} else {
    MyArray = []
}








let mood = 'create';
let tmp;




myCreate.onclick = function () {

    let Product = {
        title: myTitle.value.toLowerCase(),
        price: myPrice.value,
        taxes: myTaxes.value,
        ads: myAds.value,
        discount: myDiscount.value,
        total: myTotal.innerHTML,
        count: myCount.value,
        category: myCategory.value.toLowerCase(),
    }

    if (mood === "create") {
        if (Product.count > 1) {
            for (let i = 0; i < Product.count; i++) {
                MyArray.push(Product);
            }
        }
        else {
            MyArray.push(Product);
        }
    }

    else {

        MyArray[tmp] = Product;
        mood = 'create';
        myCreate.innerHTML = "create";
        myCount.style.display = "block";



    }


    localStorage.setItem("product", JSON.stringify(MyArray));

    Clear();
    showData();




}




// 2 Clear data input 
function Clear() {

    myTitle.value = '';
    myPrice.value = '';
    myTaxes.value = '';
    myAds.value = '';
    myDiscount.value = '';
    myTotal.innerHTML = '';
    myCategory.value = '';
    myCount.value = '';
}
// 3 Show data 

function showData() {
    getTotal();

    let table = '';
    for (let i = 0; i < MyArray.length; i++) {

        table += `
                                <tr>
                                     <td>${i}</td>
                                     <td>${MyArray[i].title}</td>
                                     <td>${MyArray[i].price}</td>
                                     <td>${MyArray[i].taxes}</td>
                                     <td>${MyArray[i].ads}</td>
                                     <td>${MyArray[i].discount}</td>
                                     <td>${MyArray[i].total}</td>
                                     <td>${MyArray[i].category}</td>
                                     <td><button onclick=updateItem(${i}) id="update">update</button></td>
                                     <td><button onclick="DeleteItem(${i})" id="Delete">Delete</button></td>
                                   </tr>
                       `

    }
    DataTable.innerHTML = table;

    let DeleteAll = document.getElementById("deleteAll");

    if (MyArray.length > 0) {

        DeleteAll.innerHTML = `
              <button onclick=deleteAll()>DeleteAll (${MyArray.length}) </button>
        `
    } else {

        DeleteAll.innerHTML = "";
    }



}
showData()


// 4 Delete one item  
function DeleteItem(i) {
    // console.log(i)
    MyArray.splice(i, 1)
    localStorage.product = JSON.stringify(MyArray);
    showData()
}



// 5 Delete All item from localStorage and Array 

function deleteAll() {
    localStorage.clear('product');
    MyArray.length = 0;
    showData();    // write here because the update data already now  
}




// 6 update Date 

function updateItem(i) {


    myTitle.value = MyArray[i].title
    myPrice.value = MyArray[i].price
    myTaxes.value = MyArray[i].taxes;
    myAds.value = MyArray[i].ads;
    myDiscount.value = MyArray[i].discount;
    myCategory.value = MyArray[i].category;
    getTotal();
    myCount.style.display = "none";
    myCreate.innerHTML = "update";
    mood = 'update';
    tmp = i;

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });




}



// Search Data 

/*

// let lap;

// function SearchByTitle() {
//     MyArray.find(function (ele) {

//         if (ele.title == mySearch.value) {

//             console.log(ele);
//             lap = ele;

//         } else {
//             console.log("not found")
//         }
//         // console.log( ele.title == mySearch.value);

//     })
//     console.log(lap)
// }

// let lap = SearchByTitle();

// console.log(lap);
*/




let SearchMood = 'title';


function getSearchMood(id) {


    if (id == 'searchTitle') {


        SearchMood = 'title';


    } else {
        SearchMood = 'category';

    }
    mySearch.placeholder = `search By ${SearchMood}`;


    mySearch.focus();
    mySearch = '';
    showData();

}


// Search Data 



function searchData(value) {


    let table = '';
    for (let i = 0; i < MyArray.length; i++) {
        if (SearchMood == 'title') {


            if (MyArray[i].title.includes(value)) {

                table += `
                                            <tr>
                                                 <td>${i}</td>
                                                 <td>${MyArray[i].title}</td>
                                                 <td>${MyArray[i].price}</td>
                                                 <td>${MyArray[i].taxes}</td>
                                                 <td>${MyArray[i].ads}</td>
                                                 <td>${MyArray[i].discount}</td>
                                                 <td>${MyArray[i].total}</td>
                                                 <td>${MyArray[i].category}</td>
                                                 <td><button onclick=updateItem(${i}) id="update">update</button></td>
                                                 <td><button onclick="DeleteItem(${i})" id="Delete">Delete</button></td>
                                               </tr>
                                   `
            }



        }
        else {

            table += `
                                            <tr>
                                                 <td>${i}</td>
                                                 <td>${MyArray[i].title}</td>
                                                 <td>${MyArray[i].price}</td>
                                                 <td>${MyArray[i].taxes}</td>
                                                 <td>${MyArray[i].ads}</td>
                                                 <td>${MyArray[i].discount}</td>
                                                 <td>${MyArray[i].total}</td>
                                                 <td>${MyArray[i].category}</td>
                                                 <td><button onclick=updateItem(${i}) id="update">update</button></td>
                                                 <td><button onclick="DeleteItem(${i})" id="Delete">Delete</button></td>
                                               </tr>
                                   `

        }
    }
    DataTable.innerHTML = table;

}




















































// Delete the all item of product in localStorage

// function DeleteLocalStorage() {

// localStorage.removeItem('product'); // do not forget  this ' key  '  in side the ( )
// }
// DeleteLocalStorage();

