class ApiFeatures{
    /**/
    /*
    constructor
    NAME
        constructor - Instantiates a new object of the Query class.
    SYNOPSIS
        constructor(query, queryStr);
        query -> Mongoose query object that needs to be executed.
        queryStr -> Query string containing the search parameters.
    DESCRIPTION
        The Constructor function is used to instantiate a new object of the class.
    RETURNS
        An object of the Query class.
    */
    /**/
    constructor(query, queryStr){
        this.query= query;  //this.query can be something like product.find
        this.queryStr = queryStr;
    }
    /* constructor(query, queryStr) */



    /**/
    /*
    search()
    NAME
        search - Filters the query based on a keyword search.
    SYNOPSIS
        search();
    DESCRIPTION
        This method is used to search a query based on a keyword. It is used to perform a case-insensitive substring search on a 
        database collection by matching a keyword string against the name field of each document in the collection.
    RETURNS
        Returns the filtered query.
    */
    /**/
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
    /* search(); */



    /**/
    /*
    filter()
    NAME
        filter - Filters the data based on the query string received from the client.
    SYNOPSIS
        filter = ();
    DESCRIPTION
        Removes some fields from the query string received from the client such as "keyword", "page", "limit", and 
        filters the data based on the "gt", "gte", "lt", "lte" operators.
    RETURNS
        Returns the filtered data as an object for further processing.
    */
    /**/
    filter(){
        const queryCopy= {...this.queryStr}  //so that we pass it as value and not reference

        //removing some fields for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);

        //filter by price
        let queryStr= JSON.stringify(queryCopy); //converting object to string 
        queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`); //converting to mongodb recognizable syntax
        this.query = this.query.find(JSON.parse(queryStr));  //converting back to object

        return this;
    }
    /* filter = (); */


    /*
    pagination
    NAME
        pagination
    SYNOPSIS
        pagination(resultPerPage)
        resultPerPage -> The number of results to display per page.
    DESCRIPTION
        It gets the current page number and calculates the number of documents to skip based on the current page and the resultPerPage values.
        Then it limits the number of results to display per page and skips the required number of documents based on the page number.
    RETURNS
        Returns the updated query object.
    */
    pagination(resultPerPage)
    {
        const currentPage= Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage-1);
        this.query= this.query.limit(resultPerPage).skip(skip)
        return this;
    }
    /* pagination(resultPerPage) */
}

module.exports= ApiFeatures;