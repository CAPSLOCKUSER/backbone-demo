/**
 * Comment list controller and view
 * Subscribes to comment collection events and renders a list of comments according
 *
 * @class CommentlistView
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */
define([
  'backbone',
  'view/commentview'
], function (Backbone,
             CommentView) {
  var CommentlistView = Backbone.View.extend(
    /** @lends CommentlistView.prototype */
    {
      /**
       * Subscribe to collection 'reset' and 'add' events
       */
      initialize() {
        this.collection.on('reset', this.reset, this);
        this.collection.on('add', this.add, this);

        this._firstRender();
      },

      /**
       * Render comments using CommentView instances for each model in the collection.
       * @returns {CommentlistView} Returns the view instance itself, to allow chaining view commands.
       */
      render() {
        // first clean up the container
        this.$el.empty();

        // iterate over models in collection and render comments using the CommentView view class
        this.collection.each(model => this.add(model));

        return this;
      },

      add(model) {
        // create new CommentView instance
        const commentview = new CommentView({ model });

        // append rendered CommentView instance to CommentlistViews container
        this.$el.append(commentview.render().$el);

        return this;
      },

      _firstRender() {
        this.collection.each(model => {
          const isPreRendered = !!model.attributes.source;
          if (isPreRendered) {
            this._awakePrerenderedComment(model);
          } else {
            this.add(model);
          }
        });

        return this;
      },

      _awakePrerenderedComment(model) {
        new CommentView({ model, el: model.attributes.source });
        model.unset('source', { silent: true });
      }
    }
  );

  return CommentlistView;
});
