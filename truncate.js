//jshint esversion:6


//test jusqu'à ce que j'apprenne que .subString() existe. 

exports.truncate = function (str, maxLength) {

    if (str.length >= maxLength) {

        let truncate = str.slice(0, 100);
        return truncate;


    }

}