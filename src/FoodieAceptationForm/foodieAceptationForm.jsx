import React from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
//import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  btnDetails:{
    marginLeft: 4,
    marginRight: 4,
  },
  root: {
    
    width: '100%',
    position: 'fixed',
    bottom: 0,
    paddingBottom: 20,
    backgroundColor: '#efefef'
  },
  formControl: {
    width: '50%',
    display: '-webkit-inline-box !important',
    marginLeft: '20% !important'
  },
  formGroup:{
    width: '45%',
    marginLeft: '3.5%',
    display: 'flex'
  },
  mianroot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  
  constructor(props){
        super(props)
        this.classes = props.classes
        this.restaurant = props.restaurant
        this.foodieId = props.foodieId
        this.menuUrl = props.menuUrl
        this.minRange = props.minRange
        this.maxRange = props.maxRange
        this.useCard = props.useCard
        this.regUser = props.regUser
        this.fooders = props.fooders
        this.handleRemoveFooderRequest = props.handleRemoveFooderRequest.bind(this)
        this.state = {
          open: false,
          newFooderWants: '',
          newFooderCost: '',
        }
    }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleRemoveFooderRequest(fooderId)
  {
    this.props.removeFooderRequest(fooderId)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleCreate = () => {
      this.props.addFooderRequest(this.regUser.email, this.regUser.displayName, this.foodieId, this.state.newFooderWants, this.state.newFooderCost)
       this.setState({  
            newFooderWants: '',
            newFooderCost: '',
        });
  }
  
  render() {
    const { classes } = this.props;
    const { newFooderCost, newFooderWants } = this.state;
    
    return (
      <div>
        <Button size="small" variant="raised" onClick={this.handleClickOpen} className={classes.btnDetails}>See details</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Are you in for {this.restaurant}? 
              </Typography>
              { this.menuUrl || this.menuUrl !== '' ?
               <Button color="inherit" href={this.menuUrl} target="_blank">
                  Let me check that menu
                </Button>
                :
                null
              }
            </Toolbar>
          </AppBar>
          <List>
            
            {
                  this.fooders.slice(0).reverse().map((fooder) => {
                    return (
                      <div key={fooder.id} >
                        <ListItem button>
                          <ListItemText primary={fooder.name} secondary={fooder.wants +' - $'+ fooder.cost} />
                          <ListItemSecondaryAction>
                            
                            {
                    
                                fooder.user === this.regUser.email ?
                                <IconButton aria-label="Delete"  onClick={()=> this.handleRemoveFooderRequest(fooder.id)}>
                                  <DeleteIcon />
                                </IconButton>
                                :
                                null
                            }
                            
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </div>
                    )
                  })
                  
            }
          </List>
          <div className={classes.root}>
            <FormControl   className={classes.formControl}>
                  <FormGroup className={classes.formGroup}>
                      <TextField
                        margin="dense"
                        id="fooderwants"
                        label="I Want..."
                        type="text"
                        value={newFooderWants}
                        onChange={this.handleChange('newFooderWants')}
                      />
                  </FormGroup>
                  <FormGroup className={classes.formGroup}>
                      <TextField
                        margin="dense"
                        id="foodercost"
                        label="That cost"
                        type="text"
                        value={newFooderCost}
                        onChange={this.handleChange('newFooderCost')}
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                  </FormGroup>
              </FormControl>
              <Button  variant="raised" color="primary" className={classes.btnDetails} onClick={this.handleCreate}>
                Im in
              </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);