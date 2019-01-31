// The model definition is done in /path/to/models/project.js
// As you might notice, the DataTypes are the very same as explained above
module.exports = (sequelize, DataTypes) =>
  sequelize.define('text', {
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    author: DataTypes.UUID,
  });
