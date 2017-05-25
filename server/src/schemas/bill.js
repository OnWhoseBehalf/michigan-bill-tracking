const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// type Bill = {
//   id: string,
//   description: string,
//   sponsors: Array<Legislator.id>,
//   categories: Array<Category>,
//   references: Array<Reference>,
//   versions: Array<Version.id>,
// }

const billSchema = mongoose.Schema({
    id: String,
    description: String,
    // Do we want a seperate schema for these?
    // sponsors: [String],
    // references: [{ type: ObjectId, ref: 'Law' }], // I dont know if we need this
    categories: [{ type: ObjectId, ref: 'Category' }],
    versions: [{
        sections: [{
          id: { type: ObjectId, ref: 'Section' },
          date: Date,
          changes: [{
            from: Number,
            count: Number,
            text: String,
          }]
        }]
    }],
});

const categorySchema = mongoose.Schema({
    name: String,
    url: String,
});

module.exports.Bill = mongoose.model('Bill', billSchema);
module.exports.Category = mongoose.model('Category', categorySchema);
