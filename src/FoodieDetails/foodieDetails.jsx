import React, { Component } from 'react';
import './foodieDetails.css';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent  from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FoodieAceptationForm from '../FoodieAceptationForm/foodieAceptationForm'


const styles = {
    card: {
      minWidth: 275,
      marginTop: 15,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };
  

class FoodieDetails extends Component{
    
    constructor(props){
        super(props)
        
        // this.app = firebase.initializeApp(DB_CONFIG);
        // this.provider = new firebase.auth.GoogleAuthProvider();
        // this.auth =firebase.auth();
        this.dbFooder = props.app.database().ref().child('fooderRequest');
        this.addFooderRequest = this.addFooderRequest.bind(this);
        this.removeFooderRequest = this.removeFooderRequest.bind(this);
        this.classes = props.classes
        this.restaurant = props.restaurant
        this.minRange = props.minRange
        this.maxRange = props.maxRange
        this.useCard = props.useCard
        this.foodieId = props.foodieId
        this.menuUrl = props.menuUrl
        this.user = props.user
        this.regUser = props.regUser
        this.handleRemoveFoddieRequest = props.handleRemoveFoddieRequest.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.state = {
          open: false,
          fooderRequest: [],
        }
    }
    handleClose = () => {
        this.setState({ open: false });
      };
    handleClickOpen = (foodieId) => {
        this.setState({ open: true });
     };
    handleRemoveFoddieRequest(id){
        this.props.removeFoodieRequest(id)
    }
    removeFooderRequest(fooderId)
    {
        this.dbFooder.child(fooderId).remove();
    }
    addFooderRequest(userReg,name,foodieId,wants,cost)
    {
        // console.log(this.dbFooder)

        this.dbFooder.push().set({
          cost: cost,
          wants: wants,
          name: name,
          foodieId: foodieId,
          user:userReg
        })
    }
    componentWillMount(){
        const previusRequest = this.state.fooderRequest;
        this.dbFooder.orderByChild("foodieId").equalTo(this.foodieId).on('child_added', snap => {
            
            previusRequest.push({
              id: snap.key,
              cost: snap.val().cost,
              wants: snap.val().wants,
              name: snap.val().name,
              foodieId: snap.val().foodieId,
              user:snap.val().user
            })
            this.setState({
              fooderRequest: previusRequest,
            })
        })
        
        this.dbFooder.on('child_removed', snap => {
            for (var i = 0; i < previusRequest.length; i++) {
              if(previusRequest[i].id === snap.key){
                previusRequest.splice(i,1)
              }
            }
            this.setState({
              fooderRequest: previusRequest
            })
        })
    
    
    }
    render(props)
    {
        
        const classes = this.classes
        return (
            <Grid item xs={12} md={6}>
                <Card className={classes.card}>
                    <CardContent>
                    <Typography variant="headline" component="h2">
                        {this.restaurant}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        ${ this.minRange} - ${ this.maxRange } 
                    </Typography>
                    <Typography component="p">
                        {this.useCard ? 'Credit card allowed': 'Cash only'}                       
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <FoodieAceptationForm 
                        restaurant={this.restaurant} 
                        foodieId={this.foodieId} 
                        menuUrl={this.menuUrl}
                        minRange={this.minRange} 
                        maxRange={this.maxRange} 
                        useCard={this.useCard}
                        regUser={this.regUser}
                        addFooderRequest={this.addFooderRequest}
                        handleRemoveFooderRequest={this.removeFooderRequest}
                        fooders = {this.state.fooderRequest}
                    />
                    {
                    
                        this.user === this.regUser.email ?
                        <Button size="small" variant="raised" color="primary" onClick={()=> this.handleRemoveFoddieRequest(this.foodieId)}>
                            Remove
                        </Button>
                        :
                        null
                    }
                    
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}
FoodieDetails.propTypes = {
    classes: propTypes.object.isRequired,
    restaurant: propTypes.string,
    minRange: propTypes.string,
    maxRange: propTypes.string,
    useCard: propTypes.bool
}
export default withStyles(styles)(FoodieDetails);