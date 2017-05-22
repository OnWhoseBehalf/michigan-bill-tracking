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
    references: [{ type: ObjectId, ref: 'LawSchema' }],
    categories: [{ type: ObjectId, ref: 'CategorySchema' }],
    versions: [{ type: ObjectId, ref: 'BillVersionSchema' }],
});

const categorySchema = mongoose.Schema({
    name: String,
    url: String,
});

const lawSchema = mongoose.Schema({
    id: String,
    url: String,
});

const billVersionSchema = mongoose.Schema({
    sections: [{
      id: String,
      changes: [{
        from: Number,
        count: Number,
        text: String,
      }]
    }]
});

module.exports.BillSchema = mongoose.model('BillSchema', billSchema);
