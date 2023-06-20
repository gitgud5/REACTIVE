# Car Listing
Okay so what does this application do?

1. teaches about useState
2. Teaches on how to use useState depending on previous values
3. how to write class names
6. How to use an API
7. REDUX, slices and how to use it

## Some fun things to remember

1. Remember you can always get data from a state or anything, store it in one variable, so that the original data is conserved and you can filter or change data however you want by creating a mutated copy from the original data.
2. Okay reducers are fun things:  
&emsp; Now Firstly, a slice contains a name, initialState and reducers. The reducers are the functions that are called on the dispatching an action. Actions are basically a way to tell what reducer to run. So we export reducers manually from the slice so that we won't mess up the spelling. Remember basically here is how you call a reducer which a slice makes it easier for us to do. 
    >dispatch({ type: "\<sliceName>/\<reducerName>", payload:"\<some data here>"});
3. Third thing is a good file structure maintained in this project. I can make a lot of logic in the backend but try to give it all one export point so things are simpler when looked at in later life.
4. We can just export stuff directly too like this
>export {something} from "\<some destination with the exported module>"

5. Always remember that custom hooks cannot have default export because we have to call that hook with that specific name it has been created with. And we can do that by just exporting it and importing in the other side with curly braces {}.