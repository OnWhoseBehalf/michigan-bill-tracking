const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Law groups can be "chapter, division, statute"
// Sections, which actually contain the text of laws, are seperate
const lawGroupSchema = mongoose.Schema({
    id: String,
    title: String,
    type: String, // chapter, division, statute
    description: String,
    sourceLink: String, // url fragment
    lawGroups: [{ type: ObjectId, ref: 'LawGroup' }],
    sections: [{ type: ObjectId, ref: 'Section' }],
});

const sectionSchema = mongoose.Schema({
    id: String,
    title: String,
    type: String, // always "section"
    description: String,
    sourceLink: String, // url fragment
    lawGroup: { type: ObjectId, ref: 'LawGroup' }, // parent lawGroup
    body: String // the actual bill
});

module.exports.LawGroup = mongoose.model('LawGroup', lawGroupSchema);
module.exports.Section = mongoose.model('Section', sectionSchema);
