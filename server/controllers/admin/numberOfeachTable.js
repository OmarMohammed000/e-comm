import db from "../../models/index.js";
// getting the number of items in the database to display in the admin dashboard
async function getNumberOfProducts(){
    const numberOfProducts=await db.Product.count();
    return numberOfProducts;
}
async function getNumberOfUsers(){
    const numberOfUsers=await db.User.count();
    
    return numberOfUsers;
}
async function getNumberOfCato(){
    const numberOfCato=await db.Category.count();
    
    return numberOfCato;
}
async function dashboardNums(req, res) {
    try {
        const userCount = await getNumberOfUsers();
        const productCount = await getNumberOfProducts();
        const categoryCount = await getNumberOfCato();

        res.json({
            userCount: userCount,
            productCount: productCount,
            categoryCount: categoryCount
        });
    } catch (error) {
        console.error("Error fetching dashboard numbers:", error);
        res.status(500).json({ message: "Error fetching dashboard numbers" });
    }
}
export default dashboardNums;