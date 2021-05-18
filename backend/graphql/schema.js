const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
  //   GraphQLScalarType,
} = require("graphql");

const getAllUsers = require("./queries/getAllUsers");

const login = require("./mutations/login");

// const dateScalar = new GraphQLScalarType({
//   name: "Date",
//   parseValue(value) {
//     return new Date(value);
//   },
//   serialize(value) {
//     return value.toISOString();
//   },
// });

const Comment = new GraphQLObjectType({
  name: "comment",
  fields: () => ({
    _id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    name: { type: GraphQLString },
    comment: { type: GraphQLString },
    date_posted: { type: GraphQLString },
  }),
});

const Expense = new GraphQLObjectType({
  name: "expense",
  fields: () => ({
    _id: { type: GraphQLString },
    amount: { type: GraphQLString },
    desc: { type: GraphQLString },
    date_paid: { type: GraphQLString },
    expense_type: { type: GraphQLString },
    paid_by: { type: GraphQLString },
    group_id: { type: GraphQLString },
    commnts: { type: GraphQLList(Comment) },
  }),
});

const UserList = new GraphQLObjectType({
  name: "userList",
  fields: () => ({
    _id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    has_invite: { type: GraphQLBoolean },
  }),
});

const Group = new GraphQLObjectType({
  name: "group",
  fields: () => ({
    _id: { type: GraphQLString },
    group_name: { type: GraphQLString },
    total_users: { type: GraphQLInt },
    user_list: { type: GraphQLList(UserList) },
  }),
});

const Transaction = new GraphQLObjectType({
  name: "transaction",
  fields: () => ({
    _id: { type: GraphQLString },
    amount: { type: GraphQLString },
    payment_status: { type: GraphQLString },
    cleared: { type: GraphQLBoolean },
    date_paid: { type: GraphQLString },
    paid_by: { type: GraphQLString },
    paid_to: { type: GraphQLString },
    group_id: { type: GraphQLString },
  }),
});

const User = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    full_name: { type: GraphQLString },
    password: { type: GraphQLString },
    profile_picture: { type: GraphQLString },
    phone: { type: GraphQLString },
    currency: { type: GraphQLString },
    time_zone: { type: GraphQLString },
    language: { type: GraphQLString },
    status: { type: GraphQLInt },
  }),
});

const UserInputType = new GraphQLInputObjectType({
  name: "userInput",
  fields: () => ({
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    full_name: { type: GraphQLString },
    password: { type: GraphQLString },
    profile_picture: { type: GraphQLString },
    phone: { type: GraphQLString },
    currency: { type: GraphQLString },
    time_zone: { type: GraphQLString },
    language: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      description: "Get all users",
      resolve: () => {
        return getAllUsers();
      },
    },
    // login: {
    //   type: User,
    //   description: "User Login",
    //   args: {
    //     userDetails: { type: UserInputType },
    //   },
    //   resolve: (parent, args) => {
    //     return login(args.userDetails);
    //   },
    // },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "mutation",
  description: "Root Mutation",
  fields: () => ({
    login: {
      type: User,
      description: "User Login",
      args: {
        userDetails: { type: UserInputType },
      },
      resolve: (parent, args) => {
        // console.log(args);
        return login(args.userDetails);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
