const fs=require('fs')
const { title } = require('process')

class ProductManager{
    
    constructor(path){
        this.products=[],
        this.path = path;
    }

    addProducts( title, description, price, thumbnail, code, stock){
        let newProduct={
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if(this.products.length === 0){
            newProduct.id = 1
        } else {
            newProduct.id = this.products[this.products.length -1].id + 1;
        }

        
        if (this.products.find(prod => prod.title === newProduct.title) || this.products.find(prod => prod.description === newProduct.description) || this.products.find(prod => prod.price === newProduct.price) || this.products.find(prod => prod.thumbnail === newProduct.thumbnail) || this.products.find(prod => prod.code === newProduct.code) || this.products.find(prod => prod.stock === newProduct.stock)){
            console.error("Product already exist!");
            return "Product already exist!";
        } else {
            this.products.push(newProduct);
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 5))
        }
        
    }

    getProducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }else return [];
    }

    getProductById(productId){
        let searchedProductId = this.products.findIndex(prod => prod.id == productId);
        
        if (searchedProductId === -1){
            console.error("Product not found!"); 
            return "Product not found!";          
        } else {
            return this.products[searchedProductId];
        }
    }
    deleteProductById(productId){
        
        let productToDelete = this.products.find(prod => prod.id === productId);
        let filteredProductList = [];

        if (!productToDelete){
            console.error("The product you want to delete does not exist!")
            return
        } else {
            filteredProductList = this.products.filter((prod) => prod.id !== productToDelete.id);
            this.products = filteredProductList;
            fs.writeFileSync(this.path, JSON.stringify(filteredProductList, null, 5))  
            return;    
        }

    }
    updateProduct(id, propertyToChange, newProperty){
        let productToChange = this.products.find(prod => prod.id === id);
        let productToChangeIndex = this.products.findIndex(prod => prod.id === id);
        let arrayToWrite = [];
     
        if (!productToChange){
            console.error("The product you want to update does not exist!");
            return;
        } else if (!productToChange.hasOwnProperty(propertyToChange)){
            console.error("The product you want to update does not contain the property specified!");
            return;
        } else {
            productToChange[[propertyToChange]] = newProperty;
            this.products[productToChangeIndex] = productToChange;
            arrayToWrite = this.products;
            fs.writeFileSync(this.path, JSON.stringify(arrayToWrite, null, 5));                 
            return;
        }
    }

}

let productManagerClass = new ProductManager('./products.json');

// console.log(productManagerClass.getProducts());

productManagerClass.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);

// console.log(productManagerClass.getProducts());

productManagerClass.addProducts("producto prueba", "Este es un producto pruebas", 2050, "Sin Imagsen", "asdabc123", 250);
productManagerClass.addProducts("proasdducto prueba", "Este es un producto prueba", 123200, "Sin Imaasdgen", "ab213c123", 2556);
productManagerClass.addProducts("producto1 prueba", "Este es un asdproducto prueba", 2200, "Sin Imagawden", "a12bc123", 25);

// console.log(productManagerClass.getProducts());

// console.log(productManagerClass.getProductById(1));
// console.log(productManagerClass.getProductById(5));

productManagerClass.addProducts("producto prueba 2", "Este es un producto prueba 2", 220, "Sin Imagen 2", "abc123 2", 225);
productManagerClass.addProducts("producto prueba 3", "Este es un producto prueba 3", 330, "Sin Imagen 3", "abc133 3", 335);

// console.log(productManagerClass.getProducts());
productManagerClass.deleteProductById(3);
console.log(productManagerClass.getProducts());
productManagerClass.deleteProductById(2);
console.log(productManagerClass.getProducts());
productManagerClass.deleteProductById(3);

console.log("Aca abajo estar la actualización");
productManagerClass.updateProduct(1, "payasadas", "Producto Genial 1")
productManagerClass.updateProduct(1, "title", "Producto Genial 1")
console.log("Aca arriba estar la actualización");
console.log(productManagerClass.getProducts());

