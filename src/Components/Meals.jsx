import useHttp from '../Hooks/useHttp.jsx';
import MealItem from './MealItem.jsx';
import Error from './Error.jsx';


const requestConfig = {};
const Meals = () => {
  

const {data:loadedMeals,loading,error} = useHttp("https://food-order-app-2qac.onrender.com/meals",requestConfig,[]);
 
if(loading){
  return <p className='center'>fetching meals...</p>
}

if(error){
  return <Error title="failed to fetch meals" message={error}/>
}


  return (
    <ul id='meals'>
  {loadedMeals.map((meal)=> (
    <MealItem key={meal.id} meal={meal}/>
  ))}
    </ul>
  )
}

export default Meals;
