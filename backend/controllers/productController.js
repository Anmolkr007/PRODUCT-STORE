import { sql } from "../config/db.js";



export const getProducts = async (req,res)=>{
    try {
        const products = await sql`
        select * from products
        order by created_at desc
        `
        res.status(200).json({success:true,data:products})
    } catch (error) {
        console.log("Error in getProducts function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getProduct = async(req,res)=>{
    const {id} =req.params
    try {
        const product = await sql`
        select * from products
        where id = ${id}
        `
        // console.log(product);
        if(product.length === 0){
            return res.status(404).json({success:false,message:"product not found"})
        }
        
        res.status(200).json({success:true,data:product[0]})
    } catch (error) {
        console.log("Error in getProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const CreateProduct = async(req,res)=>{
    const {name,price,image} = req.body;
    if(!name || !price || !image){
        return res.status(400).json({success:false,message:"all fields are required"})
    }
    try {
        const product = await sql`
        insert into products (name,price,image)
        values (${name},${price},${image})
        `
        res.status(201).json({success:true,message:"product created",data:product[0]})
    } catch (error) {
        console.log("Error in createProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const updateProduct = async(req,res)=>{
    const {id} = req.params
    const {name,price,image} = req.body
    try {
        const product = await sql`
        update products
        set name=${name},price=${price},image=${image}
        where id = ${id}
        returning *
        `
        if(product.length === 0){
            return res.status(404).json({success:false,message:"product not found"})
        }
        res.status(200).json({success:true,message:"product updated",data:product[0]})
    } catch (error) {
        console.log("Error in updateProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const deleteProduct = async(req,res)=>{
    const {id} = req.params
    try {
        const product = await sql`
        delete from products where id = ${id} returning *
        `
        if(product.length === 0){
            return res.status(404).json({success:false,message:"product not found"})
        }
        res.status(200).json({success:true,message:"product deleted",data:product[0]})
    } catch (error) {
        console.log("Error in deleteProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}