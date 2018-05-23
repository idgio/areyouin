import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
   rootHeader: {
    flexGrow: 1,
  },
  flexHeader: {
    flex: 1,
  },
  menuButtonHeader: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class SimpleAppBar extends React.Component {
  constructor(props){
    super(props)
    this.handleLogin = props.handleLogin.bind(this); // <-- add this line
    this.handleLogout = props.handleLogout.bind(this); // <-- add this line
    
  }
  handleLogin(){
    this.props.Login()
  }
  handleLogout(){
    this.props.Logout()
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootHeader}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title"  className={classes.flexHeader} color="inherit">
              Are you in for...?
            </Typography>
            {this.props.user ?
              <Button onClick={this.handleLogout} color="inherit">Logout</Button>                
              :
              <Button onClick={this.handleLogin} color="inherit">Login</Button>             
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);