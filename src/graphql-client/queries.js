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

export {getPet,getOwn,CreatePet};