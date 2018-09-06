var $ = function (selector) {
    var elements = [];

    /*
    Search for tags
    Check if there are . or # in the selector, indexOf returns -1 if the value is not found in the selector
    If there are no . or # in the selector we are searching for a tag
    Search for the element, convert the HTML collection returned to an array so we can iterate over it
    Finally push the result to the elements array 
    */
    if (selector.indexOf(".") == -1 && selector.indexOf("#") == -1) {
        var foundTags = toArray(document.getElementsByTagName(selector))
        foundTags.forEach(e => {
            elements.push(e)
        })
    }

    /*
    Search for an id
    Check if there is a # in the first position of the selector
    If there is a # in the first position we are searching for an id
    Split the selector string to get the name of the id we are searching for
    Finally get the element we are searching for and push the result to the elements array 
    */
    if (selector.indexOf("#") == 0) {
        var idSelector = selector.split("#")[1];
        elements.push(document.getElementById(idSelector));
    }

    /*
    Search for a class
    Checking if there is a . in the first position of the selector
    If there is a . in the first position we are searching for a class
    Split the selector string to get the name of the class we are searching for
    Get the elements we are searching for, convert the HTML collection returned to an array so we can iterate over it
    Finally push the result to the elements array 
    */
    if (selector.indexOf(".") == 0) {
        var classSelector = selector.split(".")[1]
        var foundClasses = toArray(document.getElementsByClassName(classSelector));
        foundClasses.forEach(e => {
            elements.push(e);
        })
    }

    /*
    Multiple selector Tag, id and class
    */
    if (selector.indexOf("#") > 0 || selector.indexOf(".") > 0) {
        //Get the position of the # and . on the selector so we can compare them and look for a class or id first
        var sharp = selector.indexOf("#");
        var dot = selector.indexOf(".");
        var tag, id, klass;

        //Split the selector and use substring to get the class/id name
        if (sharp == -1) { //Tag and class
            tag = selector.split(".")[0]
            klass = selector.split(".")[1]
        } else if (dot == -1) { //Tag and id
            tag = selector.split("#")[0]
            id = selector.split("#")[1]
        } else { // Tag, class and id
            if (dot < sharp) {
                tag = selector.split(".")[0]
                id = selector.substring(sharp + 1)
                klass = selector.substring(dot + 1, sharp)
            } else {
                tag = selector.split("#")[0]
                id = selector.substring(sharp + 1, dot)
                klass = selector.substring(dot + 1)
            }
        }

        //Search for the elements, convert the HTML collections to arrays
        var foundTags = toArray(document.getElementsByTagName(tag));
        var foundId = [document.getElementById(id)];
        var foundClasses = toArray(document.getElementsByClassName(klass));

        //Finally push the result to the elements array
        foundTags.forEach(e => {
            if (!id) {
                elements.push(e)
            }
            if (!klass) {
                elements.push(e)
            }
            if (foundClasses.includes(e) && foundId.includes(e)) {
                elements.push(e)
            }
        })
    }
    return elements;
}

//Creates an array from an HTML collection so we can iterate over it
var toArray = function (element) {
    return Array.from(element)
}