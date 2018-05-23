import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FoodieDetail from './FoodieDetails/foodieDetails';
import AppBar from './Header/header';
import Grid from '@material-ui/core/Grid';
import FormDialog from './FoodieRequestForm/foodieRequestForm'
import ReactNotifications from 'react-browser-notifications';
import appimage from './Images/applogo.png';
import {DB_CONFIG} from './Config/config'
import firebase from 'firebase';
import 'firebase/database';
import './App.css';
const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff5722' }, 
    secondary: { main: '#8BC34A' }, 
  },
});

class App extends Component {
  constructor(props){
    super(props)
   // if (!firebase.apps.length){
      this.app = firebase.initializeApp(DB_CONFIG);
      this.provider = new firebase.auth.GoogleAuthProvider();
      this.auth =firebase.auth();
      
      this.db = this.app.database().ref().child('foodieRequest');
      //this.dbFooder = this.app.database().ref().child('fooderRequest');
    //}
    this.addFoodieRequest = this.addFoodieRequest.bind(this);
    this.removeFoodieRequest = this.removeFoodieRequest.bind(this);
    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.state = {
      foodieDetails: [],
      user: null,
      newFoodieRestaurant: null,
      initialDataLoaded: false,
    }
  }
  componentWillMount()
  {
     this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
          const previusRequest = this.state.foodieDetails;
      this.db.on('child_added', snap => {
        
        previusRequest.push({
          id: snap.key,
          restaurant: snap.val().restaurant,
          minRange: snap.val().minRange,
          maxRange: snap.val().maxRange,
          useCard: snap.val().useCard,
          user: snap.val().user,
          menuUrl: snap.val().menuUrl
        })
        this.setState({
          foodieDetails: previusRequest,
        })
        if (this.state.initialDataLoaded) {
          this.setState({
            newFoodieRestaurant: snap.val().restaurant
          })
          if(this.n.supported())
          {
            //this.n.show();
            setTimeout(() => {
              this.n.show();
            }, 300);
          }
        }
        
      })
      this.db.once('value', snap => {
        this.setState({
          initialDataLoaded: true
        })
      });
      this.db.on('child_removed', snap => {
        for (var i = 0; i < previusRequest.length; i++) {
          if(previusRequest[i].id === snap.key){
            previusRequest.splice(i,1)
          }
        }
         this.setState({
          foodieDetails: previusRequest
        })
      })
        } 
      });
    
  }
  componentDidMount()
  {
    
      // this.auth.onAuthStateChanged((user) => {
      //   if (user) {
      //     this.setState({ user });
      //   } 
      // });
      
      
    
  }
  
  addFoodieRequest(restaurant,menuUrl,minRange, maxRange, useCard, userReg)
  {
    // const previus = this.state.foodieDetails;
    // previus.push({
    //   id: previus.length +1,
    //   restaurant: restaurant,
    //   minRange: minRange,
    //   maxRange: maxRange,
    //   useCard: useCard
    // });
    // this.setState({
    //   foodieDetails : previus
    // })
    this.db.push().set({
      restaurant: restaurant,
      menuUrl: menuUrl,
      minRange: minRange,
      maxRange: maxRange,
      useCard: useCard,
      user:userReg
    })
  }
  removeFoodieRequest(foodieId)
  {
    this.db.child(foodieId).remove();
  }
  Login()
  {
    this.auth.signInWithPopup(this.provider) 
    .then((result) => {
      const user = result.user;
      
      if (Notification.permission === "granted") 
      { 
        console.log('all cool')
        
      }
      else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          console.log('all cool')
        });
      }
      this.setState({
        user
      });
    });
  }
  Logout() {
    this.auth.signOut()
      .then(() => {
        this.setState({
          user: null,
          foodieDetails: [],
        });
      });
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="foodieWrapper">
          <div className="foodieHeader">
            <AppBar user={this.state.user} handleLogin={this.Login} handleLogout={this.Logout}/>
          </div>
          
          {this.state.user ?
            <div className="foodieBody">
              <Grid container spacing={16}>
                {
                  this.state.foodieDetails.slice(0).reverse().map((foodie) => {
                    return (
                      <FoodieDetail 
                      key={foodie.id} 
                      foodieId={foodie.id} 
                      restaurant={foodie.restaurant} 
                      minRange={foodie.minRange} 
                      maxRange={foodie.maxRange} 
                      useCard={foodie.useCard}
                      user={foodie.user}
                      menuUrl={foodie.menuUrl}
                      regUser = {this.state.user}
                      handleRemoveFoddieRequest={this.removeFoodieRequest}
                      app = {this.app}
                      />
                    )
                  })
                  
                }
              </Grid>
              <div className="foodieFooter">
                < FormDialog  addFoodieRequest={this.addFoodieRequest} user={this.state.user}/>
              </div>
              <ReactNotifications
                onRef={ref => (this.n = ref)} // Required
                title="Are you in for?" // Required
                body= {this.state.newFoodieRestaurant}
                icon= {appimage}
              />
            </div>
            
            :
            <div className='wrapper'>
              <p>You must be logged.</p>
            </div>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
