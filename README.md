# Car Listing
Okay so what does this application do?

1. teaches about useState
2. Teaches on how to use useState depending on previous values
3. how to write class names
6. How to use an API
7. REDUX, slices and how to use it

## Some fun things to remember:

1. Remember you can always get data from a state or anything, store it in one variable, so that the original data is conserved and you can filter or change data however you want by creating a mutated copy from the original data.
2. Okay reducers are fun things:  
    Now Firstly, a slice contains a name, initialState and reducers. The reducers are the functions that are called on the dispatching an action. Actions are basically a way to tell what reducer to run. So we export reducers manually from the slice so that we won't mess up the spelling. Remember basically here is how you call a reducer which a slice makes it easier for us to do. 
    ```js
        dispatch({ type: "\<sliceName>/\<reducerName>", payload:"\<some data here>"});
     ```
3. Third thing is a good file structure maintained in this project. I can make a lot of logic in the backend but try to give it all one export point so things are simpler when looked at in later life.
4. We can just export stuff directly too like this
    ```js
        export {something} from "\<some destination with the exported module>"
    ```

5. Always remember that custom hooks cannot have default export because we have to call that hook with that specific name it has been created with. And we can do that by just exporting it and importing in the other side with curly braces {}.

___
----
  

# Form Handling:
okay what does this application do?
*   Teaches about so many states
*   How to set up a JSON web server
*   Custom hook making
*   useContext hook

## JSON Web Server:
How to set up and to use is all in the documentation and the documentation is really easy to read too. In short:  

All we gotta do is set up a db.json file and that file is gonna be used to do big things. We store the data in that file as json key value pair and the json web server makes REST Api for us accordingly. Also we gotta start up the server too, so we run the command
>`json-server -p 3001 --watch db.json`

We can add this line to package.json as a script and use "npm run \<script name>"
Here, -p is to define the port number and --watch means that refresh on every change that we save and keep an eye out for the changes.

----
  
## Custom Hook making:
Okay custom hooks are fun things, and here is what you do with custom hooks. 
**ANYTHING THAT INVOLVES STATES AND REACT HOOKS and dispatch and stuff etc**  
So basically if you see in a react file, that something is using state and is being repeated in multiple places, make a hook for it. For example, in this project I have made a custom hook for useContext because I had to write a lot of code just to get data from it, now, I can easily get the data from the custom hook instead. So useContxt is kinda like redux but simpler and humbler.

----
## useContext Hook:
useContext hook is basically the solution for prop drilling where at first I had to give all the functions and stuff stuff as props to the parent. Now the things that that parent wantned to use were used, and then rest was passed as children. Sometimes parent didn't use any props and it was only for the children. To combat this useContext hook was born. In this hook, the App component is surrounded the the provider and thus the required things whoever need it can easily just take it. It's like a bucket full of food readily available to whoever wants whatever is available in that buckeet.

----
----
# Thunk and RTK:
Now this project, this is a big one.  
Here is what I learned from it:  
*   Reducers
*   Redux Toolkit
*   Redux Thunk
*   Redux Toolkit Query

Now we do it one by one:  
## Reducers:  
So reducers are basically a defined set of ways to change and manipulate a state. Now how to make a reducer? Simple, we got 3 main things for it.
1.  Initial State
2.  Reducer Function
3.  useReducer hook  

Now here is what happens:  
*   First we make an initial state, and remember this state will be useful later in the course.
*   Then we make a reducer function. Now the reducer function is as follows  

    ```js
    function reducer (state, action){
        switch (action.type){
            case <whatever the case is>:
                <perform operations>
                return result
            }
        }
    ```
    As shown above, we can add multiple cases into it and remember to definitely return something. **Whatever we return becomes the new state**.  
    <br><hr>
    Here are a basic few tricks to manipulate objects and return required results (remember, the returned value becomes the new state):  
    *   **Deleting an Item from an Object**  
        Okay here is how we delete an item:
        ```js
            const {itemToDelete, ...newState} = state;  
            return newState;
        ```

    *   **Adding an Item to an Object**
        Here is how to add an item:
        ```js
            state = {...state, propertyName: newValue}  
            return state;
        ```
    *   **Array Mutations**  
        Below are some array mutations:
        ```js
        // Appending an element  
        state = { ...state, arrayProperty: [...state.arrayProperty, newValue] };  
        // Removing an element by index  
        state = {  
              ...state,
            arrayProperty: state.arrayProperty.filter((_, index) => index !== elementIndex)
        };
        // Modifying an element by index
        state = {
        ...state,
        arrayProperty: state.arrayProperty.map((item, index) =>
            index === elementIndex ? modifiedValue : item
        )
        };
        ```
    *   **Nested Object Mutation**:  
        We can also perform object mutation in nested objects too. Syntax is pretty similar
        ```js
                state = {
                        ...state,
                        nestedObject: {
                            ...state.nestedObject,
                            nestedProperty: newValue
                        }
                };
        ```
    <br><hr>
*   Then we pass these initial states and this reducer function to the      **useReducer** hook. The useReducer returns two things as follows
    ```js
        const [state, dispatch] = useReducer(\<reducer>, \<initialState>)
    ```

    As decided before, reducer is the logic to change the state, and dispatch is a function used to dispatch actions as follows:
    ```js
    dispatch({type:"<whatever the action type is>", payload:"some value, object or anything"});
    ```
    Here, the type will be whatever we are making it to be, according to our reducer. And payload is a value used to manipulate the data. Can be object or number or alphabet etc.
----
## Redux Toolkit:  
The documentation of redux toolkit is an easy way to get started. But in short, there are slices, a store which is provided to the application through the storeProvider. Acions are dispatched through useDispatch returned object which we get from react redux. And of course don't forget to have a central point for importing things to the rest of the application.

---
Oh and Also one more important thing is that, *whenever an action is dispatched all the reducers in the STORE (remember only the store, because we dispatch action to the store and the reducers there that we have added which we exported from the slice) listen to it, but only the reducer with the specific address will perform functionalities.* And therfore we can manipulate this behavior by creating a custom action and using the extraBuilders in slices. And then make it listen to this action. 2 birds with one stone.

----

## Redux Thunk
What is thunk?  
    Well thunk is kind of a middleware that is used to handle states while we are getting data from an API.  
    ***Thunk relies on the extrabuilders*** which we discussed in redux toolkit.
    Basically we create a thunk (async thunk if you are gonna be performing an asynchronous function in the thunk) and then we add it to extraBuilders of the specific slice.  
    Now thunk has three types of actions that it automatically dispatches:  
    * **pending** which is dispatched as soon as the async function is run  
    * **fulfilled** which is dispatched when request is fetched successfully  
    * **rejected** which is dispatched when request is rejected or some kind of error occours  
    Now Here is how we add a listener to extraBuilder in slice  

```js
// fetchUsers we got from the thunk we created.
// fetchUsers.pending gives the string address for the action
// console.log it for getting clear concept
builder.addCase(fetchUsers.pending, (state, action) => {
            // Update our state object however appropriate
            // to show the user when we are loading data
            state.isLoading = true;

        });
        // builder.addCase();
        // And we can just keep on adding cases

    
```
For some more clarification, look at the code, it is well commented. Also observe the slices that use Thunk. They make things really clear.  

----
## Redux Toolkit Query
WOW!! REDUX TOOLKIT QUERY. THIS IS THE BOMB. *It handles the states for us and also the slice making* so we don't have to define the states in the slice at all. And this is a big advanatge. It makes code writing easier and faster. And it is well documented on their website. So you won't forget it. BUT, there are a few keypoints that will refresh your memory just in case:  
*   reducerPath spelling should always match when defining in the store. Therefore a common way of doing it is done in the respective API.
*   RTK is an API builder that intereacts with the links and other API efficiently so, when making an RTK API you basically give an endpoint. a method and everything.
*   builder.query when you read on the server, builder.mutation when you make some changes.
* TAGS are used in caching data and knowing when to automatically refetch. We can define tags however we like and we can even use results gotten from the query to define the tags.
* How to use it is a bit diffcult ot explain so it'll be best to see the code. I have made two APIs.
