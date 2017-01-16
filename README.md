## Project Structure

-index

    -setup (./app/setup.js)
    
        -store (./store) 
        
            -createReducer(./reducers)
                
                -globalNavigation (./components/GlobalNavigation/reducer)
                
                -tabs (./components/ApplicationTabs/reducer)
                
                -feed (./components/Feed/reducer)
         
        -App (./components/App)
        
            -GlobalNavigation (./components/GlobalNavigation)
            
                -NavigationCardStack (NavigationExperimental)
                
                    -renderScene()
                        
                        -props.scene.route.key === 'applicationTabs' 
                            
                            -ApplicationTabs (./components/ApplicationTabs)
                            
                                -Feed (./components/Feed)
                                
                                   -props.scene.route.key === 'list'
                                    
                                      -Items (./components/Items)
                                                                 
                                   -props.scene.route.key === 'details'
                                      
                                      -ItemDetails (./components/ItemsDetails)
                                                                         
                        -props.scene.route.key === 'new'
                           
                            -NewItem (./components/NewItem)
                            

refs by https://github.com/bakery/react-native-complex-nav
                            
                                