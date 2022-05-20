import { gql } from "@apollo/client";

const GET_DOG_PHOTO = gql`
  {
    note(id: "1") {
      name
    }
  }
`;

const CREATE_LINK_MUTATION = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $mobile: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      mobile: $mobile
    ) {
      username
      email
      password
      mobile
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      username
    }
  }
`;

const GET_USER = gql`
  {
    users {
      username
      email
      mobile
      id
    }
  }
`;

const GET_USER_ID = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
      email
      mobile
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $email: String!
    $mobile: String!
    $id: ID!
  ) {
    updateUser(username: $username, email: $email, mobile: $mobile, id: $id) {
      id
      username
      email
      mobile
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      username
      email
      mobile
    }
  }
`;

export {
  GET_DOG_PHOTO,
  CREATE_LINK_MUTATION,
  DELETE_USER,
  GET_USER_ID,
  GET_USER,
  LOGIN_USER,
  UPDATE_USER,
};
