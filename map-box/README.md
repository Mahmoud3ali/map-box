Welcome to client side of map-box

Some context about what's happening here
Usually I'd add that in ADRs (Architecture Decision Records) but for simplicity I'm adding only the summary of the decisions I made here

- Global state (Using redux)

  - Even though I'd recommend zustand + jotai for handling global state, redux is used here to handle global state
  - The only global state we're consuming here is auth state

- Server state (Using react-query)

  - Server state is any data fetched/mutated through the server and we would like to keep it in sync with the server
  - They might be somewhat global, but their truth is only at the server level
  - App is consuming users/ploygons from the server, though we're not mutating any, this is the right tool (in this setup) to handle that kind of data

- React router

  - RequireAuth can be used as a HOC, but react community is kind of deprecating the use of HOC in general so I decided to make it only composable

- Models folder

  - For bigger project I prefer to keep server schema/types under the RAW\_\* naming to make sure when they break they break at one place
  - This would span adding transformers (change between raw -> client type or vise versa)
  - But since we have control over server here I decided to keep it simple

- Services folder

  - This folder is where we add functions taking to external service
  - This also include agents that are used to communicate with these services
    - I'm using axios here to ease adding the auth headers
    - Usually I try to keep this file configured in one place in case we decided to use another agent (fetch for example)
  - This would also contain transformers if we needed any
  - Service classes
    - These classes are a way for keeping service and any needed functionality together
    - For example, if we need to handle errors per class of service, maybe any 404 on polygon service we need to try to refresh the JWT token
      this class can make sure that any 404 error received is handled through one handler that's present in this class
    - Also, if we want to attach/remove handlers per views. for example any error under home page will be handled by displaying it as a toast
      But for users page, we'll display an inline text at the very top.
      Classes can come in handy in these situations if we exposed a class function that accept listener on errors so that each view can add these at the beginning
      But we'll need to figure out if we need these classes to have a single identity or not by then.
    - There's some drawbacks to this approach though, if we need to code split some service it would be a lot harder to do than functions.

- Config components

  - Just a way of grouping configurations of every library in one place in case they changed

- External Libraries
  - Zod -> this is a great tool to add server validation/ client input validation and get types from it
    I'm using it lightly here, but it's very scalable in big projects, specially on the service layer
  - React Hook Form -> A great library to handle forms in react
