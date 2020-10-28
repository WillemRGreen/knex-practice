const knex = require('knex')
require('dotenv').config()

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

function searchByProduceName(searchTerm) {
    knexInstance
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .first()
        .then(result => {
            console.log(result)
        })
}

//searchByProduceName('Ghost')

function itemsPaginated(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance
      .select('id', 'name', 'price', 'category')
      .from('shopping_list')
      .limit(productsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
}

//itemsPaginated(2)

function retrieveAfterAddedDate(daysAgo) {
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days' :: INTERVAL`, daysAgo)
        )
        .then(results => {
            console.log(results)
        })
}

//retrieveAfterAddedDate(3)

function totalByCategory() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}
totalByCategory()