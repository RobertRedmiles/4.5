const { sequelize, testConnection } = require("./models/conn");
const Category = require("./models/categoryModel")
const Item = require("./models/itemModels")

testConnection();

const findCategories = async () => {
    const result = await Category.findAll();
    console.log(JSON.stringify(result));
}

const findItemByCategoryId = async (id) => {
    const result = await Item.findAll({where: {category_id: id}});
    console.log(JSON.stringify(result));
}

const findAllItemsGreaterThan = async (num) => {
    const result = await Item.findAll({where: price > num})
    console.log(JSON.stringify(result));

}

const createNewCategory = async (name) => {
    await Category.create({
        name: name
    });
    findCategories();
}

// const updatingCategory = async () => {
//     await Category.update({ name: "meats"}, {where: {id: 3}})
//     findCategories();
// }

const deleteCategory = async () => {
    await Category.destroy({where: {id: 3}});
    findCategories();
}

const findItems = async () => {
    const results = await Item.findAll({include: Category});
    console.log(JSON.stringify(results));
}

const createNewItem = async (name, category, price, description) => {
    await Item.create({
        name: name,
        category_id: category,
        price: price,
        description: description
    });
    findCategories();
}


createNewCategory('meat');
createNewCategory('fruit');

//updatingCategory();
createNewItem('pork', 1, 120.99, 'juicy pig');
createNewItem('chicken', 1, 120.99, 'juicy bird');
createNewItem('bananas', 2, 1.99, 'juicy banana');
createNewItem('apple', 2, 2.99, 'juicy apple');
findItemByCategoryId(2);
findAllItemsGreaterThan(20);

// findItems();

// deleteCategory();



// findCategories();
