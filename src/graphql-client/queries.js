import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

const getPet = gql`
    query pets{
        pets{
            id 
            name
            type
            ownerId
        }
    }
`;

const getOwn = gql`
    query owners{
        owners{
            id 
            name
        }
    }
`;

const CreatePet = gql`
    mutation createPet($name: String!, $type: String!, $ownerId: Int!){
        createPet(createPetInput:{name: $name, type: $type, ownerId: $ownerId}){
            id 
            name
            type
            ownerId
        }
    }
`;

const DeletePet = gql`
    mutation deletPet($id: Int!){
        deletePet(id: $id){
        id
        }
    }
`;

const GetPetId = gql`
    query Getpetid($id: Int!){
        getPet(id: $id){
        id, name,type
            owner{
            id
            name
            }
        }
    }
`;

const UpdatePet = gql`
mutation updatePet($id: Int!,$input: UpdatePetInput!){
    updatePet(id: $id,updatePetInput:$input){
     id
     ownerId
     name
     type
   } 
   }
`;

export {getPet,getOwn,CreatePet, DeletePet, GetPetId, UpdatePet};