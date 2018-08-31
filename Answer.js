var $ = function (selector) {
    var elements = [];

    //Just a tag
    if (selector.indexOf(".") == -1 && selector.indexOf("#") == -1) {
        var foundTags = toArray(document.getElementsByTagName(selector))
        foundTags.forEach(e => {
            elements.push(e)
        })
    }

    //Just an id
    if (selector.indexOf("#") == 0) {
        idSelector = selector.split("#")[1];
        elements.push(document.getElementById(idSelector));
    }

    //Just a class
    if (selector.indexOf(".") == 0) {
        classSelector = selector.split(".")[1]
        var foundClasses = toArray(document.getElementsByClassName(classSelector));
        foundClasses.forEach(e => {
            elements.push(e);
        })
    }

    //Multiple selector Tag, id and class
    if (selector.indexOf("#") > 0 || selector.indexOf(".") > 0) {
        var sharp = selector.indexOf("#");
        var dot = selector.indexOf(".");
        var tag, id, klass;

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

        var foundTags = toArray(document.getElementsByTagName(tag));
        var foundId = [document.getElementById(id)];
        var foundClasses = toArray(document.getElementsByClassName(klass));

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

var toArray = function (element) {
    return Array.from(element)
}