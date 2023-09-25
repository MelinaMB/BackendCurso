import mongoose from "mongoose";
import { ProductModel } from "../src/DAO/models/products.model.js"
import { it } from "mocha";
import chai from "chai";
import { ProductsModels } from "../src/DAO/classes/products.dao.js";
import supertest from 'supertest';

// const productoDao = new ProductsModels();
const expect = chai.expect;
const requester = supertest('http://localhost:8080');

await mongoose.connect(
    "mongodb+srv://melinambustos:jq7wYzhXfWRZtGpe@backend-coder.rpukb6t.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

let cookieNameAdmin;
let cookieValueAdmin;

before(async () => {
    const result = await requester.post("api/user/login").send({
        email: "test@gmail.com",
        password: "123",
    });

    const cookie = result.headers["set-cookie"][0];
    expect(cookie).to.be.ok;

    cookieNameAdmin = cookie.split("=")[0];
    cookieValueAdmin = cookie.split("=")[1];

    expect(cookieNameAdmin).to.be.ok.and.eql("connect.sid");
    expect(cookieValueAdmin).to.be.ok;
    
});

// describe("Test del modelo y dao de producto", () => {
//     // let productoCreado
//     // it("Test para obtener todos los productos de mi BD", async function () {
//     //    const productos = await ProductModel.find();

//     //    if(productos.length >=0){
//     //        productos.forEach(product=>{
//     //            expect(product._id).to.be.an('object');
//     //            expect(product.title).to.be.a('string');
//     //            expect(product.description).to.be.a('string');
//     //            expect(product.price).to.be.a('number');
//     //            expect(product.code).to.be.a('string');
//     //            expect(product.status).to.be.a('string');
//     //            expect(product.stock).to.be.a('number');
//     //            expect(product.category).to.be.a('string');
//     //            expect(product.thumbnails).to.be.a('array')
//     //         });

//     //     }
//     //     expect(Array.isArray(productos)).to.be.ok; 
//     //     expect(productos).to.be.an("array");

//     // });

//     // it("Test para crear un producto", async function () {
//     //     const newProd = {
//     //         title: "algodon",
//     //         description: "algodon organico",
//     //         price: 300,
//     //         code: "abc234113887",
//     //         status: true,
//     //         stock: 20,
//     //         category: "almacen",
//     //         thumbnails: "http://imagendealgodon.com"
//     //     };
//     //     productoCreado = await ProductModel.create(newProd);
//     //     expect(productoCreado).to.have.property("_id");
//     //     expect(productoCreado._id).to.be.ok;
//     // });


//     // it("Test de update del producto.dao", async function () {
//     //     const producto = await productoDao.updateOne(productoCreado._id, {
//     //         title: "algodon 2.0",
//     //         description: "algodon organico",
//     //         price: 300,
//     //         code: "abc234113887",
//     //         status: true,
//     //         stock: 20,
//     //         category: "almacen",
//     //         thumbnails: "http://imagendealgodon.com"
//     //     });

//     //     expect(producto).to.be.an('object').to.be.ok
//     // });

//     // it("Test para eliminar el producto generado", async function () {

//     //     const producto = await productoDao.deleteOne(productoCreado._id);
//     //     expect(producto).to.be.an("object");
//     // });

// })

describe('Test de endpoint productos', () => {
    
    it('En endpoint POST /api/products crear un producto', async () => {
        const prodMock = {
            title: "algodonn",
            description: "algodon organico",
            price: 300,
            code: "abc234113886",
            status: true,
            stock: 20,
            category: "almacen",
            thumbnails: "http://imagendealgodon.com"
        }

        const response = await requester.post('/api/products').send(prodMock).set("Cookie", [`${cookieNameAdmin}=${cookieValueAdmin}`]);
        const { status, ok, _body } = response;
        expect(status).to.equal(200);
        expect(_body.payload).to.have.property("_id");

    });
})