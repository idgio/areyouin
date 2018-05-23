import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class FormDialog extends React.Component {
    
 constructor(props){
    super(props)
    this.user = props.user
    
  }
  state = {
    open: false,
    useCard: false,
    newFoodieRestaurant: '',
    newFoodieMenuUrl: '',
    newFoodieMinRange: '',
    newFoodieMaxRange: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleUserInput = name => event => {
       this.setState({ [name]: event.target.value });
  }
  handleCreate = () => {
      this.props.addFoodieRequest(this.state.newFoodieRestaurant,this.state.newFoodieMenuUrl,this.state.newFoodieMinRange, this.state.newFoodieMaxRange, this.state.useCard, this.user.email )
       this.setState({  
            open: false,
            newFoodieRestaurant: '',
            newFoodieMenuUrl: '',
            newFoodieMinRange: '',
            newFoodieMaxRange: '', 
            useCard: false,
        });
  }
  render() {
    return (
      <div>
     
        <Button variant="fab" color="primary" aria-label="add" className="btnFloatBottomRight"  onClick={this.handleClickOpen}>
              <AddIcon />
        </Button>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New FoddieRequest</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new FoodieRequest please fill the following.
            </DialogContentText>
            <FormControl component="div" fullWidth>
                <FormGroup >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="restaurant"
                      label="Restaurant"
                      type="text"
                      value={this.state.newFoodieRestaurant}
                      onChange = {this.handleUserInput('newFoodieRestaurant')}
                      fullWidth
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                      
                      margin="dense"
                      id="menuUrl"
                      label="Menu url "
                      type="text"
                      fullWidth
                      helperText="Optional"
                      value={this.state.newFoodieMenuUrl}
                      onChange = {this.handleUserInput('newFoodieMenuUrl')}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                      
                      margin="dense"
                      id="minRange"
                      label="Min Range ($)"
                      type="text"
                      fullWidth
                      helperText="Optional"
                      value={this.state.newFoodieMinRange}
                      onChange = {this.handleUserInput('newFoodieMinRange')}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                      
                      margin="dense"
                      id="maxRange"
                      label="Max Range ($)"
                      type="text"
                      fullWidth
                      helperText="Optional"
                      value={this.state.newFoodieMaxRange}
                      onChange = {this.handleUserInput('newFoodieMaxRange')}
                    />
                </FormGroup>
                <FormGroup>
                    
                    <FormControlLabel
                    control={
                      <Switch
                      checked={this.state.useCard}
                      onChange={this.handleChange('useCard')}
                      value="useCard"
                      
                    />
                    }
                    label="Credit card allowed"
                    />
                </FormGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}