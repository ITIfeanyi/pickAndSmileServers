const { buildSchema } = require("graphql");

const schema = buildSchema(`
    
 type Query {
     info:String!
     getProducts:[PRODUCT!]!
     getSkincare:[PRODUCT!]!
     getSingleProduct(id:ID):PRODUCT!
     getProductCategory(category:ProductCategory):[PRODUCT!]!
     getOrder:[ORDER!]!
     login(email:String! password:String!) : AuthPayLoad!
 }  
 type Mutation{
    createProduct(input:productInput):PRODUCT!
    createUser(input:userInput):AuthPayLoad!
}

 enum ProductCategory{
     Camera
     Groceries
     Skincare
     Appliances
     Clothes
     Computers
     Kitchen
     Health
 }

 type PRODUCT {
     id:ID!
     name:String!
     description:String!
     shortDescription:String!
     price: Float!
     discount:Float
     image_url:String!
     category:String!
     stock_available:Int!
 }
 input productInput{
    name:String!
    description:String!
    shortDescription:String!
    price: Float!
    discount:Float
    image_url:String!
    category:String!
    stock_available:Int!
 }

 type USER {
     id: ID!
     name: String!
     email:String!
     phoneNum:String!
     password:String!
     order:[ORDER!]!
 }
 input userInput{
    name: String!
    email:String!
    phoneNum:String!
    password:String!
 }
 type Error{
    path:String!
    message:String!
}

 type UserRegistrationResponse{
     ok:Boolean
     errors:[Error!]
     user: USER   
 }

 type AuthPayLoad{
    ok:Boolean
    errors:[Error!]  
    user:LoggedInUser
 }
 type LoggedInUser{
    userId:ID!
    userName:String!
    isAdmin:Boolean
    token:String!
    tokenExpiration:Int!
 }

 type CART{
     userId:USER!
     cart_product:single_product!
     total_price:Float!
     address:String!
     address_city:String!
     address_country:String!
 }
 
 input cartInput{
   userId:ID!
    address:String!
    address_city:String!
    address_country:String!
    single_product1:single_product_input!
    total_price:Float!

 }

 type single_product{
    product_id:PRODUCT
    qty:Int
    price:Float  
 }

 input single_product_input{
   product_id: ID
   qty:Int
   price:Float
   
 }

 type ORDER{
    order:[CART!]!
 }
`);

module.exports = schema;
