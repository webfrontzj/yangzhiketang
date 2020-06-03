const jwt=require('jsonwebtoken');


const findMembers=function(instance,{
    prefix,
    specifiedType,
    filter
}){
    function _find(instance){
        if(instance.__proto__ === null){
            return []
        }

        let names=Reflect.ownKeys(instance);
        names=names.filter((name)=>{
            return _shouldKeep(name);
        });
        return [...names,..._find(instance.__proto__)]
    }
    function _shouldKeep(value){
        if(filter){
            if(filter(value)){
                return true;
            }
        }
        if(prefix){
            if(value.startsWidth(prefix)){
                return true;
            }
        }
        if(specifiedType){
            if(instance[value] instanceof specifiedType){
                return true;
            }
        }
    }
    return _find(instance)
}

const generateToken=function (uid,scope){
    const secretKey=global.config.security.secretKey;
    const expiresIn=global.config.security.expiresIn;
    const token=jwt.sign({
        uid,
        scope
    },secretKey,{
        expiresIn:expiresIn
    })
    return token;
}

module.exports={
    findMembers,
    generateToken
}