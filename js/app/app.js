/**
 * Application controller view
 * Starts application, inits a new CommentCollection collection, assigns the empty list to
 * a CommentlistView controller, also inits a NewButtonView instance to handle new comment insertion.
 *
 * Check index.html to find the place where App is initialized, it's right after the container
 * DOM node is rendered.
 *
 * @class App
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */

import 'demo.css';

define([
  'backbone',
  'jquery',
  'model/commentcollection',
  'view/newbuttonview',
  'view/randombuttonview',
  'view/listview'
], function (Backbone,
             $,
             CommentCollection,
             NewButtonView,
             RandomButtonView,
             CommentlistView) {

  function getDirectText(el) {
    return $(el).clone().children().remove().end().text();
  }

  function getPrerenderedData($collection) {
    const $preRenderedData = $collection.map((index, el) => ({
      author: $(el).find('strong').text(),
      text: getDirectText(el).trim(),
      source: el,
    }));
    return $preRenderedData.get();
  }

  var App = Backbone.View.extend(
    /** @lends App.prototype */
    {
      /**
       * Initialize new application instance
       */
      initialize: function () {
        // create empty comment collection
        const $comments = $('ul.commentlist > li');
        const preRenderedData = getPrerenderedData($comments);
        const notPrerenderedData = { author: 'foo', text: 'im not even prerendered' };
        const collection = new CommentCollection(preRenderedData.concat(notPrerenderedData));

        // bind the NewButtonView to the already rendered 'newcomment' DOM element, we'll need to know the
        // collection to work with so FormView can insert the new comment properly
        new NewButtonView({ collection: collection, el: this.$el.find('.newcomment') });

        // bind the RandomButtonView to the already rendered 'randomcomment' DOM element
        new RandomButtonView({ collection: collection, el: this.$el.find('.randomcomment') });

        // create comment list view, assign our empty collection
        const commentlistView = new CommentlistView({ collection: collection, el: this.$el.find('.commentlist') });
        commentlistView.render();
      }
    }
  );

  $(() => {
    new App({
      el: $('#application')
    });
  });

  return App;
});

/**
 * Documentation related comments
 */
/**
 * @name Backbone
 * @class Backbone
 * Application is a Backbone based application
 * @link http://documentcloud.github.com/backbone/
 */


/**
 * @name Backbone.Model
 * @class Backbone.Model
 * Backbone model superclass
 * @link http://documentcloud.github.com/backbone/
 */

/**
 * @name Backbone.Collection
 * @class Backbone.Collection
 * Backbone collection superclass
 * @link http://documentcloud.github.com/backbone/
 */

/**
 * @name Backbone.View
 * @class Backbone.View
 * By default all views extend Backbone.View
 * @link http://documentcloud.github.com/backbone/
 */

