const validator=require('validator');
const { ParameterException } =require('./http-exception');
const { get,last,set,cloneDeep } = require('lodash');
const { findMembers } =require('./util');

class LinValidator{
    constructor(){
        this.data={};
        this.parsed={};
    }
    _assembleAllParams(ctx){
        return {
            body:ctx.request.body,
            query:ctx.request.query,
            path:ctx.params,
        }
    }
}