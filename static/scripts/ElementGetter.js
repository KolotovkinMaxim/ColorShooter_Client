"use strict";

export default  class ElementGetter{
    getIt(s){
        const elementId = s.toString();
        return document.getElementById(elementId);
    }
}
