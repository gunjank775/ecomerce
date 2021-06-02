import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories =(parentId,categories,category) => {
    let myCategories= [];
        
   
   if(parentId ){
    for(let cat of categories){
        
        
        if(cat._id == parentId){
           
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId,[...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }],category):[
                   { _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children}
                ]
            })
        } else {
           
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length> 0 ? buildNewCategories(parentId,cat.children,category): []
            })
        }

       
    }
    
    return myCategories;
} 
            else{
                console.log("unfedined me hain")
                categories.push({
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                })
                return categories
            }
}

export default (state= initState,action) => {
    switch(action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state= {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state= {
                ...state,
                loading:false,
                categories:action.payload.categories
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            state= {
                ...state,
                loading: true,
                error: action.payload.error
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state= {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category= action.payload.category;
            console.log("reducer me enter kiye hain");
            console.log(category);
            console.log(state.categories);
           const updatedCategories=buildNewCategories(category.parentId,state.categories,category)
           console.log("finally");
           console.log(updatedCategories);
        state={
                ...state,
                categories: updatedCategories,
                loading: false,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state= {
                ...initState
            }
            break;
    }
    return state;
}