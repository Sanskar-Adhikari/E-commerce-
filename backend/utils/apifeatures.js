class ApiFeatures{
    constructor(query, queryStr){
        this.query= query;  //this.query can be something like product.find
        this.queryStr = queryStr;
    }

    search(){
        const keyword= this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options: "i",  //case insensitive
            },
        }:
        {

        };
        this.query= this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryCopy= {...this.queryStr}  //so that we pass it as value and not reference

        //removing some fields for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);

        //filter by price
          let queryStr= JSON.stringify(queryCopy); //converting object to string 
          queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);


        this.query = this.query.find(JSON.parse(queryStr));  //converting back to object

        return this;
    }

    pagination(resultPerPage)
    {
        const currentPage= Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage-1);
        this.query= this.query.limit(resultPerPage).skip(skip)
        return this;
    }
}


module.exports= ApiFeatures;