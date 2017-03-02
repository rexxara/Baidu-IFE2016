
var GalleryComposite = function (heading, id) {
    this.children = [];

    this.element = $('<div id="' + id + '" class="composite-gallery"></div>')
    .append('<span>' + heading + '</span>');
}

GalleryComposite.prototype = {
    add: function (child) {
        this.children.push(child);
        this.element.append(child.getElement());
    },

    remove: function (child) {
        for (var node, i = 0; node = this.getChild(i); i++) {
            if (node == child) {
                this.children.splice(i, 1);
                this.element.detach(child.getElement());
                return true;
            }

            if (node.remove(child)) {
                return true;
            }
        }

        return false;
    },

    getChild: function (i) {
        return this.children[i];
    },

    hide: function () {
        for (var node, i = 0; node = this.getChild(i); i++) {
            node.hide();
        }

        this.element.hide(0);
    },

    show: function () {
        for (var node, i = 0; node = this.getChild(i); i++) {
            node.show();
        }

        this.element.show(0);
    },

    getElement: function () {
        return this.element;
    }
}
////////////////////////////////////////////////////

var GalleryImage = function (src,clas,id) {
    this.children = [];

    this.element = $('<div />')
    .attr('id', id)
    .attr('class',clas)
    .attr('src', src);
}

GalleryImage.prototype = {
    // Due to this being a leaf, it doesn't use these methods,
    // but must implement them to count as implementing the
    // Composite interface
    //////
    run:function(){
        console.log(this.element.eq(0));
        this.element.attr("class","rex");
    },
    stop:function(){
        let temp=this.element;
        setTimeout(function() {
            temp.removeClass("rex"); 
        }, 2000);
    },
    //////
    add: function () { },

    remove: function () { },

    getChild: function () { },

    hide: function () {
        this.element.hide(0);
    },

    show: function () {
        this.element.show(0);
    },

    getElement: function () {
        return this.element;
    }
}
//////////////////////////////////////////////
function init(){
var container = new GalleryComposite('', 'allgalleries');
var gallery1 = new GalleryComposite('--------------------', 'gallery1');
var spaceShip1 = new GalleryImage('image1.jpg',"ss", 'spaceShip1');
var spaceShip2 = new GalleryImage('image2.jpg','ss', 'spaceShip2');

gallery1.add(spaceShip1);
gallery1.add(spaceShip2);
container.add(gallery1);
// Make sure to add the top container to the body,
// otherwise it'll never show up.
container.getElement().appendTo('body');
container.show();
}
init();