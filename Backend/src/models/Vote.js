// models/Votes.js
module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    // Define the model attributes
    feedbackId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Feedback', // This should match the name of the table, usually singular
      key: 'id', // This should match the primary key of the Feedback table, usually 'id'
    },
    },
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // This should match the name of the Users table, usually singular
      key: 'id', // This should match the primary key of the Users table, usually 'id'
    },
    },
    voteType: {
    type: DataTypes.STRING(10), // Limiting the string length for efficiency
    allowNull: false,
    validate: {
      isIn: [['upvote', 'downvote']], // Ensures only 'upvote' or 'downvote' can be stored
    },
    },
  }, {
    timestamps: true, // Assuming you now want timestamps; remove if not
    tableName: 'Votes' // Explicitly specifying table name for clarity
  });
  
  Votes.associate = function(models) {
    // Defining associations
    Votes.belongsTo(models.Feedback, { foreignKey: 'feedbackId', as: 'Feedback' });
    Votes.belongsTo(models.Users, { foreignKey: 'userId', as: 'User' });
  };
  
  return Votes;
};
