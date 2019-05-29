const glob = require("glob");
const mongoose = require("mongoose");
const { resolve } = require("path");
const {connect} =require('../index')
const schemaJs = glob.sync(resolve(__dirname, "**/*.js"));
; (async () => {
	schemaJs.forEach(require);
    const Movies =mongoose.model("Movie");
    console.log('sb')
    await connect()
    const movie=await Movies.find({})
    console.log(movie);
    
})();
