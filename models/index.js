const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");
const Genre = require("./Genre");
const SubGenre = require("./SubGenre");

Comment.belongsTo(BlogPost, {
    foreignKey: "topic_id",
    onDelete: "CASCADE"
})

BlogPost.hasMany(Comment, {
    foreignKey: "topic_id"
})

Comment.belongsTo(User, {
    foreignKey: "user_id"
})

BlogPost.belongsTo(User, {
    foreignKey: "user_id"
})

User.hasMany(BlogPost, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
})

Genre.hasMany(SubGenre, {
    foreignKey: "",
})

SubGenre.belongsTo(Genre, {
    foreignKey: "",
})

module.exports = { User, BlogPost, Comment, Genre, SubGenre, };