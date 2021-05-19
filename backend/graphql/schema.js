const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = require("graphql");

const getAllUsers = require("./queries/getAllUsers");
const getGroups = require("./queries/getGroups");
const getAllUserNames = require("./queries/getAllUserNames");
const acceptInvite = require("./queries/acceptInvite");
const getTransactions = require("./queries/getTransactions");
const getUser = require("./queries/getUser");

const login = require("./mutations/login");
const createGroup = require("./mutations/createGroup");
const signup = require("./mutations/signup");
const updateUser = require("./mutations/updateUser");

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
    user_id: { type: GraphQLString },
    group_id: { type: GraphQLString },
    group_name: { type: GraphQLString },
    total_users: { type: GraphQLInt },
    user_list: { type: GraphQLList(UserList) },
    has_invite: { type: GraphQLBoolean },
    Group: { type: Group },
    status: { type: GraphQLInt },
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
    Group: { type: Group },
  }),
});

const User = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    _id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    email: { type: GraphQLString },
    full_name: { type: GraphQLString },
    name: { type: GraphQLString },
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
    user_id: { type: GraphQLString },
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

const UserListInputType = new GraphQLInputObjectType({
  name: "userListInput",
  fields: () => ({
    _id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    has_invite: { type: GraphQLBoolean },
    canBeDeleted: { type: GraphQLInt },
    email: { type: GraphQLString },
    full_name: { type: GraphQLString },
  }),
});

const GroupInputType = new GraphQLInputObjectType({
  name: "groupInput",
  fields: () => ({
    _id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    group_id: { type: GraphQLString },
    group_name: { type: GraphQLString },
    total_users: { type: GraphQLInt },
    user_list: { type: GraphQLList(UserListInputType) },
    has_invite: { type: GraphQLBoolean },
    Group: { type: GroupInputType },
    status: { type: GraphQLInt },
    no_of_users: { type: GraphQLInt },
  }),
});

const TransactionInputType = new GraphQLInputObjectType({
  name: "transactionInput",
  fields: () => ({
    _id: { type: GraphQLString },
    amount: { type: GraphQLString },
    payment_status: { type: GraphQLString },
    cleared: { type: GraphQLBoolean },
    date_paid: { type: GraphQLString },
    paid_by: { type: GraphQLString },
    paid_to: { type: GraphQLString },
    group_id: { type: GraphQLString },
    Group: { type: GroupInputType },
    user_id: { type: GraphQLString },
    page: { type: GraphQLInt },
    size: { type: GraphQLInt },
    orderBy: { type: GraphQLInt },
    groupList: { type: GraphQLList(GraphQLInt) },
  }),
});

const ExpenseInputType = new GraphQLInputObjectType({
  name: "expenseInput",
  fields: () => ({
    _id: { type: GraphQLString },
    amount: { type: GraphQLString },
    desc: { type: GraphQLString },
    date_paid: { type: GraphQLString },
    expense_type: { type: GraphQLString },
    paid_by: { type: GraphQLString },
    group_id: { type: GraphQLString },
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
    getGroups: {
      type: new GraphQLList(Group),
      description: "Get all groups",
      args: {
        getGroupsDetails: { type: UserInputType },
      },
      resolve: (parent, args) => {
        return getGroups(args.getGroupsDetails);
      },
    },
    getAllUserNames: {
      type: new GraphQLList(User),
      description: "Get all user names",
      resolve: () => {
        return getAllUserNames();
      },
    },
    acceptInvite: {
      type: Group,
      description: "accept invite",
      args: {
        acceptInviteDetails: { type: GroupInputType },
      },
      resolve: (parent, args) => {
        return acceptInvite(args.acceptInviteDetails);
      },
    },
    getTransactions: {
      type: new GraphQLList(Transaction),
      description: "Get all transactions",
      resolve: () => {
        return getTransactions();
      },
    },
    getUser: {
      type: User,
      description: "get user details",
      args: {
        getUserDetails: { type: UserInputType },
      },
      resolve: (parent, args) => {
        return getUser(args.getUserDetails);
      },
    },
    getTransactionsForUser: {
      type: GraphQLList(Transaction),
      description: "Get all transactions for user",
      args: {
        getTransForUserDetails: { type: TransactionInputType },
      },
      resolve: (parent, args) => {
        return getTransactionsForUser(args.getTransForUserDetails);
      },
    },
    getTransactionsForGroup: {
      type: GraphQLList(Transaction),
      description: "Get all transactions for Group",
      args: {
        getTransForGroupDetails: { type: TransactionInputType },
      },
      resolve: (parent, args) => {
        return getTransactionsForGroup(args.getTransForGroupDetails);
      },
    },
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
        return login(args.userDetails);
      },
    },
    signup: {
      type: User,
      description: "User Signup",
      args: {
        userDetails: { type: UserInputType },
      },
      resolve: (parent, args) => {
        console.log(args.userDetails);
        return signup(args.userDetails);
      },
    },
    createGroup: {
      type: Group,
      description: "Create Group",
      args: {
        createGroupDetails: { type: GroupInputType },
      },
      resolve: (parent, args) => {
        return createGroup(args.createGroupDetails);
      },
    },
    updateUser: {
      type: User,
      description: "update user",
      args: {
        updateUserDetails: { type: UserInputType },
      },
      resolve: (parent, args) => {
        return updateUser(args.updateUserDetails);
      },
    },
    newExpense: {
      type: Expense,
      description: "Add a new Expense",
      args: {
        newExpenseDetails: { type: ExpenseInputType },
      },
      resolve: (parent, args) => {
        return newExpense(args.newExpenseDetails);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
