const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);  //For Sanatizing the HTML
const showdown = require('showdown');
const converter = new showdown.Converter();

const articleSchema = new mongoose.Schema({
    title : {
        required : true,
        type : String
    },
    description : {
        type : String
    },
    markdown : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : () => Date.now()
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    sanitizedHtml : {
        type : String,
        required : true
    }
});

//This function is going to run before 'validation' on the articleSchema
articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, { lower : true , strict : true })
    }

    if(this.markdown) {
        //this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
        this.sanitizedHtml = converter.makeHtml(this.markdown);
    }
    next();
});

module.exports = mongoose.model('Article', articleSchema, "blogs");